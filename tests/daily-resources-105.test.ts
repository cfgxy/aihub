import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

/** RUYI-105 本批入库的 4 条资源，字段口径以已通过 Review 的正文交付件为准。 */
const expected = [
  {
    slug: "kilo-code",
    name: "Kilo Code",
    type: "app",
    category: "companion-tools",
    officialUrl: "https://kilo.ai/",
    sourceUrl: "https://github.com/Kilo-Org/kilocode",
    image: "/media/kilo-code.png",
    /** 客户端 MIT 与后端 source-available 必须分开表述。 */
    bodyMustMatch: /MIT/,
    bodyMustMatchSecond: /source-available/,
  },
  {
    slug: "almanac",
    name: "Almanac",
    type: "app",
    category: "companion-tools",
    officialUrl: "https://usealmanac.com/",
    sourceUrl: "https://news.ycombinator.com/item?id=49511007",
    image: "/media/almanac.png",
    bodyMustMatch: /未公开|待官方披露/,
    bodyMustMatchSecond: /Slack/,
  },
  {
    slug: "shuohao-skills",
    name: "shuohao-skills",
    type: "skill",
    category: "creative-design",
    officialUrl: "https://github.com/eternityspring/shuohao-skills",
    sourceUrl: "https://github.com/eternityspring/shuohao-skills",
    image: "/media/shuohao-skills.png",
    bodyMustMatch: /Apache-2\.0/,
    bodyMustMatchSecond: /分镜/,
  },
  {
    slug: "x64dbg-mcp-server",
    name: "x64dbg-mcp-server",
    type: "mcp",
    category: "development-code",
    officialUrl: "https://github.com/duty1g/x64dbg-mcp-server",
    sourceUrl: "https://github.com/duty1g/x64dbg-mcp-server",
    image: "/media/x64dbg-mcp-server.png",
    /** 双刃用途必须保留合规提示。 */
    bodyMustMatch: /授权|合规|法律/,
    bodyMustMatchSecond: /MCP/,
  },
] as const;

describe("每日 AI 新资源入库（RUYI-105）", () => {
  for (const item of expected) {
    describe(item.name, () => {
      const seed = resourceSeeds.find((resource) => resource.slug === item.slug);

      it("进入种子目录且类型与分类正确", () => {
        expect(seed, `种子目录缺少 ${item.slug}`).toBeDefined();
        expect(seed!.name).toBe(item.name);
        expect(seed!.type).toBe(item.type);
        expect(seed!.category).toBe(item.category);
        const categories = categorySeeds[item.type as keyof typeof categorySeeds] as ReadonlyArray<readonly string[]>;
        expect(categories.some((category) => category[1] === item.category)).toBe(true);
      });

      it("官方入口与来源链接与已通过 Review 的正文一致", () => {
        expect(seed!.officialUrl).toBe(item.officialUrl);
        expect(seed!.sourceUrl).toBe(item.sourceUrl);
      });

      it("摘要、描述与标签齐全且无占位内容", () => {
        expect(seed!.summary.length).toBeGreaterThan(10);
        expect(seed!.description.length).toBeGreaterThan(20);
        expect(seed!.tags.length).toBeGreaterThanOrEqual(3);
        const text = [seed!.summary, seed!.description, ...seed!.tags].join(" ");
        for (const placeholder of ["TODO", "TBD", "待补", "占位"]) {
          expect(text, `字段含占位内容 ${placeholder}`).not.toContain(placeholder);
        }
      });

      it("详情正文配套本地原创封面，且保留发布口径", () => {
        const profile = getResourceProfile(item.slug);
        expect(profile, `${item.name} 缺少详情正文`).toBeDefined();
        expect(profile!.image).toBe(item.image);
        expect(fs.existsSync(path.join(process.cwd(), "public", profile!.image))).toBe(true);
        expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
        expect(profile!.highlights.length).toBeGreaterThanOrEqual(3);
        expect(profile!.bestFor.length).toBeGreaterThan(10);

        const body = [...profile!.overview, ...profile!.highlights, profile!.bestFor].join(" ");
        expect(body, "正文缺少必备发布口径").toMatch(item.bodyMustMatch);
        expect(body, "正文缺少必备发布口径").toMatch(item.bodyMustMatchSecond);
      });

      it("不托管安装包，链接均指向外部官方渠道", () => {
        const profile = getResourceProfile(item.slug)!;
        for (const url of [seed!.officialUrl, seed!.sourceUrl, profile.imageSource]) {
          expect(url).toMatch(/^https:\/\//);
          expect(url).not.toMatch(/\.(crx|zip|exe|dmg|msi|apk)$/i);
        }
      });
    });
  }

  it("四条封面互不复用，也不占用既有条目的封面", () => {
    const images = expected.map((item) => getResourceProfile(item.slug)?.image);
    expect(new Set(images).size, "本批封面存在重复").toBe(expected.length);

    const others = resourceSeeds
      .filter((resource) => !expected.some((item) => item.slug === resource.slug))
      .map((resource) => getResourceProfile(resource.slug)?.image);
    for (const image of images) {
      expect(others, `封面 ${image} 与既有条目冲突`).not.toContain(image);
    }
  });

  it("slug 在整个种子目录内唯一", () => {
    const slugs = resourceSeeds.map((resource) => resource.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

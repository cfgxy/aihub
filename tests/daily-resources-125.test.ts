import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();
// 与其他 Pages 测试并行执行，各自构建独立目录，避免互相清空产物。
const output = path.resolve(root, "dist-pages-ruyi125");

/** RUYI-125 本批入库的 4 条资源，字段口径以 Owner 批准范围与已定稿正文交付件为准。 */
const expected = [
  {
    slug: "anything2explainer",
    name: "anything2explainer",
    type: "skill",
    category: "creative-design",
    officialUrl: "https://github.com/Vincentwei1021/anything2explainer",
    sourceUrl: "https://github.com/Vincentwei1021/anything2explainer",
    installGuide: `git clone https://github.com/Vincentwei1021/anything2explainer.git
ln -s "$PWD/anything2explainer" ~/.claude/skills/anything2explainer`,
    /** 非商业许可限定不得被弱化。 */
    bodyMustMatch: [/PolyForm/, /非商业/, /Remotion/],
  },
  {
    slug: "short-video-generator-ai",
    name: "short-video-generator-AI",
    type: "app",
    category: "others",
    officialUrl: "https://github.com/Colafornia/short-video-generator-AI",
    sourceUrl: "https://github.com/Colafornia/short-video-generator-AI",
    installGuide: undefined,
    /** 素材版权合规提示不得被弱化。 */
    bodyMustMatch: [/版权/, /已获授权/, /API key/],
  },
  {
    slug: "tokentab",
    name: "tokentab",
    type: "app",
    category: "companion-tools",
    officialUrl: "https://github.com/crwdla/tokentab",
    sourceUrl: "https://github.com/crwdla/tokentab",
    installGuide: undefined,
    /** 「仅本地处理」必须标注为项目自述，不得表述为本站已验证。 */
    bodyMustMatch: [/自述/, /费率表/, /Claude Code/],
  },
  {
    slug: "bang-motion",
    name: "Bang Motion",
    type: "skill",
    category: "creative-design",
    officialUrl: "https://github.com/bangtutorial/bang-motion",
    sourceUrl: "https://github.com/bangtutorial/bang-motion",
    installGuide: `/plugin marketplace add bangtutorial/bang-motion
/plugin install bang-motion@bang-motion`,
    /** 活跃度按采集事实表述，不外推。 */
    bodyMustMatch: [/2026年09月06日/, /GSAP/, /MIT/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-125）", () => {
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

      it("官方入口与来源链接与已定稿正文一致", () => {
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

      it("SKILL 条目提供官方 README 原文安装命令，应用条目不产生安装命令", () => {
        if (item.installGuide) {
          expect(seed!.installGuide).toBe(item.installGuide);
        } else {
          expect(seed!.installGuide, "应用类条目不应录入安装命令").toBeUndefined();
        }
        expect(seed!.configText, "本批 4 条均非 MCP，不得录入 MCP 配置").toBeUndefined();
      });

      it("详情正文配套本地原创插图，且保留发布口径", () => {
        const profile = getResourceProfile(item.slug);
        expect(profile, `${item.name} 缺少详情正文`).toBeDefined();
        expect(profile!.image).toBe(`/media/${item.slug}.png`);
        expect(fs.existsSync(path.join(root, "public", profile!.image))).toBe(true);
        expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
        expect(profile!.highlights.length).toBe(3);
        expect(profile!.bestFor.length).toBeGreaterThan(10);

        const body = [...profile!.overview, ...profile!.highlights, profile!.bestFor].join(" ");
        for (const pattern of item.bodyMustMatch) {
          expect(body, `正文缺少必备发布口径 ${pattern}`).toMatch(pattern);
        }
      });

      it("原创插图标注 AIHub 原创，不冒充官方图片来源", () => {
        const profile = getResourceProfile(item.slug)!;
        expect(profile.imageSource, "原创插图不得声明外部图片来源").toBeUndefined();
        expect(profile.imageCredit).toBe("插图：AIHub 原创设计");
        expect(profile.imageAlt.length).toBeGreaterThan(10);
      });

      it("不托管安装包，链接均指向外部官方渠道", () => {
        for (const url of [seed!.officialUrl, seed!.sourceUrl]) {
          expect(url).toMatch(/^https:\/\//);
          expect(url).not.toMatch(/\.(crx|zip|exe|dmg|msi|apk)$/i);
        }
      });
    });
  }

  it("四条插图互不复用，也不占用既有条目的插图", () => {
    const images = expected.map((item) => getResourceProfile(item.slug)?.image);
    expect(new Set(images).size, "本批插图存在重复").toBe(expected.length);

    const others = resourceSeeds
      .filter((resource) => !expected.some((item) => item.slug === resource.slug))
      .map((resource) => getResourceProfile(resource.slug)?.image);
    for (const image of images) {
      expect(others, `插图 ${image} 与既有条目冲突`).not.toContain(image);
    }
  });

  it("slug 在整个种子目录内唯一", () => {
    const slugs = resourceSeeds.map((resource) => resource.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("静态 Pages 与动态版的获取语义一致（RUYI-125）", () => {
  beforeAll(() => {
    execFileSync("npx", ["tsx", "scripts/build-pages.ts"], {
      cwd: root, stdio: "pipe", env: { ...process.env, PAGES_OUT_DIR: path.basename(output) },
    });
  }, 120_000);

  afterAll(() => fs.rmSync(output, { recursive: true, force: true }));

  const readDetail = (slug: string) => fs.readFileSync(path.join(output, "r", slug, "index.html"), "utf8");

  for (const item of expected) {
    it(`${item.name} 静态详情页保留正文口径并使用本地插图`, () => {
      const html = readDetail(item.slug);
      expect(html).toContain("detail-visual");
      expect(html).toContain("核心能力");
      expect(html).toContain("适合谁");
      expect(html).toContain(`media/${item.slug}.png`);
      expect(html).toContain("插图：AIHub 原创设计");
      expect(html, "原创插图不得出现外部图片来源图注").not.toContain("图片来源：");
    });

    it(`${item.name} 外链带 noopener nofollow 且不托管安装包`, () => {
      const html = readDetail(item.slug);
      expect(html).toMatch(/rel="noopener nofollow"/);
      expect(html).toContain(item.officialUrl.replace(/&/g, "&amp;"));
      expect(html, "站内不得提供安装包下载").not.toMatch(/href="[^"]*\.(zip|exe|dmg|msi|apk)"/i);
    });

    it(`${item.name} 安装命令复制块与资源类型匹配`, () => {
      const html = readDetail(item.slug);
      if (item.installGuide) {
        expect(html).toContain('data-copy="install-guide"');
        // 安装命令经 HTML 转义后写入，逐行校验避免转义差异造成漏判。
        for (const line of item.installGuide.split("\n")) {
          expect(html).toContain(line.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"));
        }
      } else {
        expect(html, "应用类详情页不应出现复制块").not.toContain("copy-section");
      }
      expect(html, "本批无 MCP 条目").not.toContain("MCP 配置");
    });
  }

  it("首页收录全部种子资源且新条目可被检索到", () => {
    const home = fs.readFileSync(path.join(output, "index.html"), "utf8");
    expect(home.match(/<a class="resource-card"/g)!.length).toBe(resourceSeeds.length);
    for (const item of expected) {
      expect(home).toContain(`href="r/${item.slug}/"`);
      expect(home).toContain(item.name);
    }
  });

  it("Pages 产物携带完整 40 位来源 SHA，可回溯构建来源", () => {
    const sources = fs.readFileSync(path.join(output, "SOURCES.txt"), "utf8");
    expect(sources).toMatch(/^source_git_sha: [0-9a-f]{40}(-dirty)?$/m);
    expect(sources).toContain(`resource_count: ${resourceSeeds.length}`);
  });
});

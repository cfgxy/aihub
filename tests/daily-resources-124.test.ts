import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();
const output = path.resolve(root, "dist-pages");

/** RUYI-124 本批入库的 2 条 MCP，字段口径以 Owner 批准范围与已定稿正文交付件为准。 */
const expected = [
  {
    slug: "papergraph-mcp",
    name: "PaperGraph MCP",
    category: "ai-knowledge",
    officialUrl: "https://github.com/lotchuazzz-crypto/papergraph-mcp",
    sourceUrl: "https://github.com/lotchuazzz-crypto/papergraph-mcp",
    image: "/media/papergraph-mcp.png",
    installGuide: "uvx --from git+https://github.com/lotchuazzz-crypto/papergraph-mcp.git@v0.10.0 papergraph-mcp",
    configServerKey: "papergraph",
    /** arXiv 可达性依赖与本地工作区边界不得被弱化。 */
    bodyMustMatch: /arXiv/,
    bodyMustMatchSecond: /SQLite/,
  },
  {
    slug: "computer-use-mcp",
    name: "computer-use-mcp",
    category: "development-code",
    officialUrl: "https://github.com/zavora-ai/computer-use-mcp",
    sourceUrl: "https://github.com/zavora-ai/computer-use-mcp",
    image: "/media/computer-use-mcp.png",
    installGuide: "npx -y @zavora-ai/computer-use-mcp",
    configServerKey: "computer-use",
    /** 完整电脑控制面的高权限边界不得被弱化。 */
    bodyMustMatch: /权限/,
    bodyMustMatchSecond: /profile/,
  },
] as const;

describe("每日 AI 新资源入库（RUYI-124）", () => {
  for (const item of expected) {
    describe(item.name, () => {
      const seed = resourceSeeds.find((resource) => resource.slug === item.slug);

      it("进入种子目录且类型与分类正确", () => {
        expect(seed, `种子目录缺少 ${item.slug}`).toBeDefined();
        expect(seed!.name).toBe(item.name);
        expect(seed!.type).toBe("mcp");
        expect(seed!.category).toBe(item.category);
        expect(categorySeeds.mcp.some((category) => category[1] === item.category)).toBe(true);
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

      it("安装命令取自官方 README，MCP 配置为合法 JSON 且服务名对应", () => {
        expect(seed!.installGuide).toBe(item.installGuide);
        expect(seed!.configText, "MCP 条目缺少可复制的配置 JSON").toBeTruthy();
        const config = JSON.parse(seed!.configText!) as { mcpServers: Record<string, { command: string; args: string[] }> };
        expect(Object.keys(config.mcpServers)).toEqual([item.configServerKey]);
        expect(config.mcpServers[item.configServerKey].command.length).toBeGreaterThan(0);
      });

      it("详情正文配套本地原创插图，且保留发布口径", () => {
        const profile = getResourceProfile(item.slug);
        expect(profile, `${item.name} 缺少详情正文`).toBeDefined();
        expect(profile!.image).toBe(item.image);
        expect(fs.existsSync(path.join(root, "public", profile!.image))).toBe(true);
        expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
        expect(profile!.highlights.length).toBe(3);
        expect(profile!.bestFor.length).toBeGreaterThan(10);

        const body = [...profile!.overview, ...profile!.highlights, profile!.bestFor].join(" ");
        expect(body, "正文缺少必备发布口径").toMatch(item.bodyMustMatch);
        expect(body, "正文缺少必备发布口径").toMatch(item.bodyMustMatchSecond);
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

  it("两条插图互不复用，也不占用既有条目的插图", () => {
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

describe("静态 Pages 与动态版的 MCP 获取语义一致（RUYI-124）", () => {
  beforeAll(() => {
    execFileSync("npx", ["tsx", "scripts/build-pages.ts"], { cwd: root, stdio: "pipe" });
  }, 120_000);

  const readDetail = (slug: string) => fs.readFileSync(path.join(output, "r", slug, "index.html"), "utf8");

  for (const item of expected) {
    it(`${item.name} 静态详情页渲染 MCP 配置与安装命令两个复制块`, () => {
      const html = readDetail(item.slug);
      expect(html).toContain("MCP 配置");
      expect(html).toContain("安装命令");
      expect(html).toContain(item.installGuide);
      // 配置 JSON 经 HTML 转义后写入，校验服务名与命令均可见。
      expect(html).toContain(`&quot;${item.configServerKey}&quot;`);
      expect(html).toContain('data-copy="mcp-config"');
      expect(html).toContain('data-copy="install-guide"');
    });

    it(`${item.name} 静态详情页使用本地插图与原创图注`, () => {
      const html = readDetail(item.slug);
      expect(html).toContain(`media/${item.slug}.png`);
      expect(html).toContain("插图：AIHub 原创设计");
      expect(html, "原创插图不得出现外部图片来源图注").not.toContain("图片来源：");
    });
  }

  it("既有无配置的 MCP 条目不产生占位复制块", () => {
    const html = readDetail("x64dbg-mcp-server");
    expect(html).not.toContain("MCP 配置");
    expect(html).not.toContain("请在管理页补充");
  });

  it("首页收录 9 条资源且新条目可被检索到", () => {
    const home = fs.readFileSync(path.join(output, "index.html"), "utf8");
    expect(home.match(/<a class="resource-card"/g)!.length).toBe(resourceSeeds.length);
    for (const item of expected) {
      expect(home).toContain(`href="r/${item.slug}/"`);
    }
  });
});

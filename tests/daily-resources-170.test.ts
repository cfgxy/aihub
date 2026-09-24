import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-170 本批 2 条资源（Owner 2026-09-24 批准：GitHub Agentic Workflows、Radar），字段口径以批准后的文案与编辑卡片映射为准。 */
const expected = [
  {
    slug: "github-agentic-workflows",
    name: "GitHub Agentic Workflows",
    type: "app",
    category: "companion-tools",
    summary: "GitHub 官方仓库级 Agentic 工作流：以 CLI 扩展把 AI Agent 编入 GitHub 自动化，事件驱动作用于仓库本身。",
    tags: ["官方出品", "开源", "MIT", "GitHub", "Agentic 工作流", "自动化"],
    officialUrl: "https://github.com/github/gh-aw",
    sourceUrl: "https://github.com/github/gh-aw",
    installGuide: "gh extension install github/gh-aw",
    configText: undefined,
    imageAlt: "GitHub Agentic Workflows 精选卡片：GitHub 官方 org 标识配统一深色版式，左侧 APP·辅助工具徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /事件驱动/,
    bodyMustMatch: [/GitHub 官方/, /quickstart/, /MIT/],
  },
  {
    slug: "radar",
    name: "Radar",
    type: "mcp",
    category: "cloud-infrastructure",
    summary: "单二进制开源 Kubernetes UI：零集群安装，内置 MCP server 让 AI Agent 直接检查、调查并操作集群。",
    tags: ["社区出品", "开源", "Apache-2.0", "MCP", "Kubernetes", "可观测性", "集群诊断"],
    officialUrl: "https://radarhq.io",
    sourceUrl: "https://github.com/skyhook-io/radar",
    installGuide: "curl -fsSL https://get.radarhq.io | sh && kubectl radar",
    configText: `{
  "mcpServers": {
    "radar": {
      "type": "http",
      "url": "http://localhost:9280/mcp"
    }
  }
}`,
    imageAlt: "Radar 精选卡片：官网官方矢量雷达图标（祖母绿 accent）配统一深色版式，左侧 MCP·云与基础设施徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /内置 MCP server/,
    bodyMustMatch: [/单二进制/, /Secret/, /RBAC/, /Product Hunt/, /9280/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-170）", () => {
  for (const item of expected) {
    describe(item.name, () => {
      const seed = resourceSeeds.find((resource) => resource.slug === item.slug);
      const profile = getResourceProfile(item.slug);

      it("进入种子目录且字段与已定稿正文一致", () => {
        expect(seed, `种子目录缺少 ${item.slug}`).toBeDefined();
        expect(seed!.name).toBe(item.name);
        expect(seed!.type).toBe(item.type);
        expect(seed!.category).toBe(item.category);
        expect(seed!.summary).toBe(item.summary);
        expect(seed!.tags).toEqual(item.tags);
        expect(seed!.officialUrl).toBe(item.officialUrl);
        expect(seed!.sourceUrl).toBe(item.sourceUrl);
        expect(seed!.installGuide).toBe(item.installGuide);
        expect(seed!.updatedAt).toBe("2026-09-24");
        expect(seed!.configText).toBe(item.configText ?? undefined);

        const categories = categorySeeds[item.type as keyof typeof categorySeeds] as ReadonlyArray<readonly string[]>;
        expect(categories.some((category) => category[1] === item.category)).toBe(true);
      });

      it("description 由前两段 overview 合并且保留关键事实与风险", () => {
        expect(profile, `${item.name} 缺少详情正文`).toBeDefined();
        expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
        expect(seed!.description).toBe(profile!.overview.slice(0, 2).join(""));
        expect(seed!.description).toMatch(item.descriptionMustMatch);
      });

      it("详情正文完整保留风险、未知项和适用人群", () => {
        expect(profile!.highlights.length).toBeGreaterThanOrEqual(3);
        expect(profile!.bestFor.length).toBeGreaterThan(10);
        const body = [...profile!.overview, ...profile!.highlights, profile!.bestFor].join(" ");
        for (const pattern of item.bodyMustMatch) expect(body).toMatch(pattern);
      });

      it("使用编辑卡片映射与固定图注", () => {
        expect(profile!.image).toBe(`/media/${item.slug}.png`);
        expect(profile!.imageAlt).toBe(item.imageAlt);
        expect(profile!.imageCredit).toBe(item.imageCredit);
        expect(profile!.imageSource).toBeUndefined();
        expect(fs.existsSync(path.join(root, "public", profile!.image))).toBe(true);
      });
    });
  }

  it("2 个 slug 与插图均唯一，且保持批准顺序", () => {
    const slugs = expected.map((item) => item.slug);
    const seeded = resourceSeeds.filter((resource) => slugs.includes(resource.slug as (typeof slugs)[number]));
    expect(seeded.map((resource) => resource.slug)).toEqual(slugs);

    const images = expected.map((item) => getResourceProfile(item.slug)?.image);
    expect(new Set(images).size).toBe(expected.length);

    const existingImages = resourceSeeds
      .filter((resource) => !slugs.includes(resource.slug as (typeof slugs)[number]))
      .map((resource) => getResourceProfile(resource.slug)?.image);
    for (const image of images) expect(existingImages).not.toContain(image);
  });
});

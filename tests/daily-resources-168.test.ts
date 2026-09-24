import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-168 本批 3 条新增资源（Owner 2026-09-24 终审通过：ecc、deepseek-reasonix、book-to-skill），字段口径以替换定稿文案与编辑卡片映射为准；taste-skill 为在库条目替换更新，断言保留在 daily-resources-164。 */
const expected = [
  {
    slug: "ecc",
    name: "ECC",
    type: "app",
    category: "companion-tools",
    summary: "给编码 Agent 做性能优化的 harness 系统：技能、本能、记忆、安全一体。",
    tags: ["社区出品", "开源", "MIT", "Agent 优化", "Harness", "编码 Agent", "性能优化"],
    officialUrl: "https://ecc.tools",
    sourceUrl: "https://github.com/affaan-m/ECC",
    installGuide: "npx ecc-universal@2.2.2 setup",
    configText: undefined,
    updatedAt: "2026-09-23",
    imageAlt: "ECC 精选卡片：官方 Hero 视觉配统一版式，左侧 APP 徽章与「辅助工具」分类标注、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /harness/,
    bodyMustMatch: [/★265,247/, /fossy\.dev/, /ecc\.tools/, /\$19\/席\/月/],
  },
  {
    slug: "deepseek-reasonix",
    name: "DeepSeek-Reasonix",
    type: "app",
    category: "companion-tools",
    summary: "DeepSeek 原生终端编码 Agent，为长会话前缀缓存稳定性设计。",
    tags: ["社区出品", "开源", "MIT", "终端 Agent", "编码 Agent", "DeepSeek"],
    officialUrl: "https://reasonix.io",
    sourceUrl: "https://github.com/esengine/DeepSeek-Reasonix",
    installGuide: "npm i -g reasonix",
    configText: undefined,
    updatedAt: "2026-09-23",
    imageAlt: "DeepSeek-Reasonix 精选卡片：官网 OG 主标语区白底面板配统一版式，左侧 APP 徽章与「终端编码 Agent」定位标注、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /前缀缓存/,
    bodyMustMatch: [/并非 DeepSeek 官方/, /reasonix\.io/, /★35,676/],
  },
  {
    slug: "book-to-skill",
    name: "book-to-skill",
    type: "skill",
    category: "development",
    summary: "一键把技术书 PDF 转成 Claude Code 技能，边工作边查阅。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "技术书", "PDF 转换", "编码工作流"],
    officialUrl: "https://github.com/virgiliojr94/book-to-skill",
    sourceUrl: "https://github.com/virgiliojr94/book-to-skill",
    installGuide: "npx skills add virgiliojr94/book-to-skill",
    configText: undefined,
    updatedAt: "2026-09-23",
    imageAlt: "book-to-skill 精选卡片：官方仓库 banner（Booklin 形象与书页方块主视觉）配统一版式，左侧 SKILL 徽章与「技术书转技能」定位标注、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /技术书/,
    bodyMustMatch: [/Claude Code/, /★31,981/, /个人项目/],
  },
];

describe("RUYI-168 每日精选入库（3 条新增）", () => {
  const slugs = expected.map((item) => item.slug);

  it("seed 顺序与批准顺序一致，且条目唯一", () => {
    const batch = resourceSeeds.filter((item) => slugs.includes(item.slug));
    expect(batch.map((item) => item.slug)).toEqual(slugs);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const item of expected) {
    describe(item.slug, () => {
      const seed = resourceSeeds.find((entry) => entry.slug === item.slug);
      const profile = getResourceProfile(item.slug);

      it("seed 基础字段与批准口径一致", () => {
        expect(seed).toBeDefined();
        expect(seed?.name).toBe(item.name);
        expect(seed?.type).toBe(item.type);
        expect(seed?.category).toBe(item.category);
        expect(seed?.summary).toBe(item.summary);
        expect(seed?.tags).toEqual(item.tags);
        expect(seed?.officialUrl).toBe(item.officialUrl);
        expect(seed?.sourceUrl).toBe(item.sourceUrl);
        expect(seed?.installGuide).toBe(item.installGuide);
        expect(seed?.configText).toBe(item.configText);
        expect(seed?.updatedAt).toBe(item.updatedAt);
      });

      it("分类属于合法枚举", () => {
        const categorySeed = categorySeeds[item.type as keyof typeof categorySeeds];
        expect(categorySeed?.some((entry) => entry[1] === item.category)).toBe(true);
      });

      it("详情正文与 profile 一致且覆盖关键事实", () => {
        expect(profile.overview.join("")).toBe(seed?.description);
        expect(seed?.description).toMatch(item.descriptionMustMatch);
        for (const pattern of item.bodyMustMatch) {
          expect(profile.overview.join("")).toMatch(pattern);
        }
        expect(profile.highlights.length).toBeGreaterThanOrEqual(3);
        expect(profile.bestFor.length).toBeGreaterThan(10);
      });

      it("编辑卡片图片与来源口径正确", () => {
        expect(profile.image).toBe(`/media/${item.slug}.png`);
        expect(profile.imageAlt).toBe(item.imageAlt);
        expect(profile.imageCredit).toBe(item.imageCredit);
        expect(profile.imageSource).toBeUndefined();
        expect(fs.existsSync(path.join(root, "public", "media", `${item.slug}.png`))).toBe(true);
      });
    });
  }
});

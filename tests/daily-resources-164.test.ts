import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-164 本批 6 条资源（Owner 2026-09-22 批准：taste-skill、world-monitor、appllama-skills、ai-data-extractor、orcareplay、gap-trap），字段口径以已验文案与编辑卡片映射为准；taste-skill 字段于 2026-09-24 按 RUYI-168 期 Owner 终审裁决替换更新（RUYI-168 新增 3 条断言在 daily-resources-168）。 */
const expected = [
  {
    slug: "taste-skill",
    name: "Taste Skill",
    type: "skill",
    category: "creative-design",
    summary: "给 AI 装「品味」，抑制模板化平庸输出。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "设计品味", "写作品味", "反 slop", "AI 味"],
    officialUrl: "https://github.com/Leonxlnx/taste-skill",
    sourceUrl: "https://github.com/Leonxlnx/taste-skill",
    installGuide: "npx skills add https://github.com/Leonxlnx/taste-skill",
    configText: undefined,
    updatedAt: "2026-09-23",
    imageAlt: "Taste Skill 精选卡片：官方渠道视觉配统一版式，左侧 SKILL 徽章与「创意与设计」分类标注、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /「AI 味」/,
    bodyMustMatch: [/Humanizer/, /tasteskill\.dev/, /Kimi（Moonshot AI）/, /按项目调校/],
  },
  {
    slug: "world-monitor",
    name: "World Monitor",
    type: "app",
    category: "others",
    summary: "实时全球情报仪表盘：AI 新闻聚合、地缘监测、基础设施追踪一屏呈现。",
    tags: ["社区出品", "开源", "AGPL-3.0", "情报聚合", "地缘监测", "基础设施追踪", "仪表盘"],
    officialUrl: "https://github.com/koala73/worldmonitor",
    sourceUrl: "https://github.com/koala73/worldmonitor",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "World Monitor 精选卡片：官方世界变体仪表盘实景配统一版式，左侧 APP 徽章、一句话价值与 AGPL-3.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /地缘监测/,
    bodyMustMatch: [/AGPL-3\.0/, /worldmonitor\.app/, /v2\.10\.0/, /简体中文/],
  },
  {
    slug: "appllama-skills",
    name: "Appllama Skills",
    type: "skill",
    category: "development",
    summary: "对照头部畅销应用研究出的 agent 技能集，让 agent 真正会做移动 App。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "移动应用", "App 构建", "畅销应用研究"],
    officialUrl: "https://github.com/Appllama/appllama-skills",
    sourceUrl: "https://github.com/Appllama/appllama-skills",
    installGuide: "npx skills@latest add appllama/appllama-skills",
    configText: undefined,
    imageAlt: "Appllama Skills 精选卡片：官方 OG 羊驼标识「Discover the designs that win.」配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /畅销应用/,
    bodyMustMatch: [/活跃度偏弱/, /appllama\.io/, /版权边界/],
  },
  {
    slug: "ai-data-extractor",
    name: "AI Data Extractor",
    type: "app",
    category: "companion-tools",
    summary: "一键提取 Claude Code、Cursor、Windsurf、Aider、Cline/Roo 等 AI 编码工具的聊天历史。",
    tags: ["社区出品", "开源", "MIT", "会话历史", "数据提取", "Claude Code", "Cursor", "隐私"],
    officialUrl: "https://github.com/kruzovic7/ai-data-extractor",
    sourceUrl: "https://github.com/kruzovic7/ai-data-extractor",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "AI Data Extractor 精选卡片：GitHub 官方 Social Preview 渲染配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /Claude Code/,
    bodyMustMatch: [/Windsurf/, /保管责任在用户/, /Cline\/Roo/],
  },
  {
    slug: "orcareplay",
    name: "OrcaReplay",
    type: "app",
    category: "others",
    summary: "给 agent「时间旅行」：录制、回放、分叉、调试任意模型驱动的 agent 运行。",
    tags: ["社区出品", "开源", "Apache-2.0", "agent 调试", "录制回放", "时间旅行", "agent 工程"],
    officialUrl: "https://github.com/Continuum-AI-Corp/OrcaReplay",
    sourceUrl: "https://github.com/Continuum-AI-Corp/OrcaReplay",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "OrcaReplay 精选卡片：官方运行图谱卡片与 Logo 徽标配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /时间旅行/,
    bodyMustMatch: [/OrcaRouter\.ai/, /脱敏/, /不同团队、不同产品/, /Apache-2\.0/],
  },
  {
    slug: "gap-trap",
    name: "Gap Trap",
    type: "skill",
    category: "development",
    summary: "把 vibe coding 变成高质量代码：仓库内规则与门控让 AI 代码保持正确。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "质量门控", "vibe coding", "代码质量"],
    officialUrl: "https://github.com/pliablepixels/gap-trap",
    sourceUrl: "https://github.com/pliablepixels/gap-trap",
    installGuide: "npx skills add pliablepixels/gap-trap",
    configText: undefined,
    imageAlt: "Gap Trap 精选卡片：官方「网兜接代码块」Logo 配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /门控/,
    bodyMustMatch: [/vibe coding/, /pliablepixels\.github\.io\/gap-trap/, /社区尚小/, /按团队规范调整/],
  },
];

describe("RUYI-164 每日精选入库（6 条）", () => {
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
        expect(seed?.updatedAt).toBe(item.updatedAt ?? "2026-09-21");
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

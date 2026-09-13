import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { seedDatabase } from "@/db";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { upSql } from "@/db/schema";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-137 本批 4 条资源，字段口径以 Owner 批准后的文案与原创插图映射为准。 */
const expected = [
  {
    slug: "superpowers",
    name: "Superpowers",
    type: "skill",
    category: "development",
    summary: "给编码 Agent 装上一整套「资深工程师工作法」的开源技能框架：头脑风暴、任务拆解、TDD 与子代理双阶段审查全流程强制执行。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "TDD", "工作流", "Claude Code", "Codex", "Cursor"],
    officialUrl: "https://github.com/obra/superpowers",
    sourceUrl: "https://github.com/obra/superpowers",
    installGuide: "/plugin install superpowers@claude-plugins-official",
    imageAlt: "Superpowers 原创插图：brainstorming、writing-plans、executing-plans 技能卡片汇入技能链工作流窗口，test-driven-development 执行中并显示 RED→GREEN→REFACTOR 循环",
    descriptionMustMatch: /SUPERPOWERS_DISABLE_TELEMETRY/,
    bodyMustMatch: [/定价未公开/, /主要面向编码场景/],
  },
  {
    slug: "i-have-adhd",
    name: "i-have-adhd",
    type: "skill",
    category: "development",
    summary: "用 10 条输出规则改造编码 Agent 的回答方式：结论先行、动作先行、列表不超 5 项、零客套。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "输出质量", "结论先行", "Claude Code", "Codex"],
    officialUrl: "https://github.com/ayghri/i-have-adhd",
    sourceUrl: "https://github.com/ayghri/i-have-adhd",
    installGuide: "Install the i-have-adhd skill/plugin from https://github.com/ayghri/i-have-adhd, refer to the repo's AGENTS.md for instructions.",
    imageAlt: "i-have-adhd 原创插图：同一问题的 Before 长篇大论与 After 动作先行双栏对比，编号步骤以具体下一步收尾",
    descriptionMustMatch: /无独立验证/,
    bodyMustMatch: [/主观体验类主张/, /按需取用/],
  },
  {
    slug: "mathmodelagent",
    name: "MathModelAgent",
    type: "app",
    category: "others",
    summary: "面向数学建模竞赛的多智能体系统：建模手、代码手、论文手分工协作，端到端产出已排版的完整论文。",
    tags: ["社区出品", "代码公开", "多智能体", "数学建模", "论文生成", "Typst", "自部署", "Docker"],
    officialUrl: "https://mathmodel.top",
    sourceUrl: "https://github.com/jihe520/MathModelAgent",
    installGuide: "npx skills add jihe520/MathModelAgent --all",
    imageAlt: "MathModelAgent 原创插图：赛题输入经建模手、代码手、论文手流水线产出 res.pdf，9 步自动验收逐项通过并自动匹配赛事模板",
    descriptionMustMatch: /请勿商业用途/,
    bodyMustMatch: [/学术诚信风险/, /实验迭代阶段/, /定价未公示/],
  },
  {
    slug: "pascal-editor",
    name: "Pascal Editor",
    type: "app",
    category: "others",
    summary: "开源本地优先的 3D 建筑编辑器：浏览器即用，内置 MCP 服务让 AI Agent 直接查询和修改 3D 场景。",
    tags: ["社区出品", "开源", "MIT", "3D 建模", "建筑", "MCP", "本地优先", "WebGPU"],
    officialUrl: "https://editor.pascal.app",
    sourceUrl: "https://github.com/pascalorg/editor",
    installGuide: "npx @pascal-app/cli editor",
    imageAlt: "Pascal Editor 原创插图：楼层爆炸视图与 AI Agent 面板并置，展示 pascal mcp connect、本地连接免账号与官方技能 pascal-3d、furniture-fit",
    descriptionMustMatch: /AI credits/,
    bodyMustMatch: [/受众较窄/, /一个活跃 Agent 客户端/, /未在 README 列明/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-137）", () => {
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
        expect(seed!.updatedAt).toBe("2026-09-13");
        expect(seed!.configText).toBeUndefined();

        const categories = categorySeeds[item.type as keyof typeof categorySeeds] as ReadonlyArray<readonly string[]>;
        expect(categories.some((category) => category[1] === item.category)).toBe(true);
      });

      it("description 由前两段 overview 合并且保留关键风险", () => {
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

      it("使用逐项原创插图映射与固定图注", () => {
        expect(profile!.image).toBe(`/media/${item.slug}.png`);
        expect(profile!.imageAlt).toBe(item.imageAlt);
        expect(profile!.imageCredit).toBe("插图：AIHub 原创设计");
        expect(profile!.imageSource).toBeUndefined();
        expect(fs.existsSync(path.join(root, "public", profile!.image))).toBe(true);
      });
    });
  }

  it("4 个 slug 与插图均唯一，且保持批准顺序", () => {
    const slugs = expected.map((item) => item.slug);
    const seeded = resourceSeeds.filter((resource) => slugs.includes(resource.slug as (typeof slugs)[number]));
    expect(seeded.map((resource) => resource.slug)).toEqual(slugs);

    const images = expected.map((item) => getResourceProfile(item.slug)?.image);
    expect(new Set(images).size).toBe(expected.length);

    const existingImages = resourceSeeds
      .filter((resource) => !slugs.includes(resource.slug as (typeof slugs)[number]))
      .map((resource) => getResourceProfile(resource.slug)?.image);
    for (const image of images) expect(existingImages).not.toContain(image);

    expect(new Set(resourceSeeds.map((resource) => resource.slug)).size).toBe(resourceSeeds.length);
  });

  it("将本批日期写入初始建库与旧库补种的动态资源记录", () => {
    const databasePath = path.join(root, "data", "daily-resources-137-updated-at.db");
    for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${databasePath}${suffix}`, { force: true });

    const db = new DatabaseSync(databasePath);
    try {
      db.exec(upSql);
      const expectedSlugs = expected.map((item) => item.slug);
      const readDates = () => db.prepare(`SELECT slug, updated_at FROM resources
        WHERE slug IN (${expectedSlugs.map(() => "?").join(", ")}) ORDER BY slug`).all(...expectedSlugs) as Array<{ slug: string; updated_at: string }>;

      seedDatabase(db);
      expect(readDates()).toEqual(expectedSlugs.slice().sort().map((slug) => ({ slug, updated_at: "2026-09-13" })));

      db.exec("DELETE FROM resources");
      seedDatabase(db);
      expect(readDates()).toEqual(expectedSlugs.slice().sort().map((slug) => ({ slug, updated_at: "2026-09-13" })));
    } finally {
      db.close();
      for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${databasePath}${suffix}`, { force: true });
    }
  });
});

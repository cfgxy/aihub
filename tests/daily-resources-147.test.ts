import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-147 本批 6 条资源（Owner 2026-09-16 批准：OpenClaw、pi、text-to-cad、Graphify、serena、OpenResearch），字段口径以批准后的文案与官方视觉卡片映射为准。 */
const expected = [
  {
    slug: "openclaw",
    name: "OpenClaw",
    type: "app",
    category: "others",
    summary: "「真正替你干活」的开源个人 AI 助理：20+ 聊天渠道接入、全平台原生应用，状态、记忆与凭据留在本地硬件。",
    tags: ["社区出品", "开源", "MIT", "APP", "个人 AI 助理", "全平台", "本地优先", "Claude", "Codex"],
    officialUrl: "https://openclaw.ai",
    sourceUrl: "https://github.com/openclaw/openclaw",
    installGuide: "npm install -g openclaw@latest --allow-scripts=openclaw",
    configText: undefined,
    imageAlt: "OpenClaw 精选卡片：官方龙虾品牌横幅配深色版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /MIT 许可证开源/,
    bodyMustMatch: [/系统级权限授予/, /ClawHub/, /open issues 约 7,403/],
  },
  {
    slug: "pi",
    name: "pi",
    type: "app",
    category: "companion-tools",
    summary: "统一 LLM API、agent 运行时、TUI 与编码 agent CLI 的 TypeScript 工具箱，可单独取用或自由组合。",
    tags: ["社区出品", "开源", "MIT", "APP", "Agent 工具链", "CLI", "TypeScript", "多供应商 LLM"],
    officialUrl: "https://pi.dev",
    sourceUrl: "https://github.com/earendil-works/pi",
    installGuide: "npm install -g @earendil-works/pi-coding-agent",
    configText: undefined,
    imageAlt: "pi 精选卡片：官网 OG 主视觉配深色版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /pi-agent-core/,
    bodyMustMatch: [/Docker/, /Hugging Face/, /API 凭据/],
  },
  {
    slug: "text-to-cad",
    name: "text-to-cad",
    type: "skill",
    category: "engineering-manufacturing",
    summary: "给 AI 编码 agent 的 CAD/CAE/CAM 技能库：文字或图片生成可制造 CAD 模型，覆盖出图、切片到打印下发。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "CAD", "CAE", "CAM", "机器人", "3D 打印"],
    officialUrl: "https://www.texttocad.dev",
    sourceUrl: "https://github.com/earthtojake/text-to-cad",
    installGuide: "npx skills add earthtojake/text-to-cad",
    configText: undefined,
    imageAlt: "text-to-cad 精选卡片：官网 CAD 技能齿轮主视觉配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /CAD, CAE and CAM/,
    bodyMustMatch: [/DfAM/, /Bambu Labs/, /专业校核/],
  },
  {
    slug: "graphify",
    name: "Graphify",
    type: "app",
    category: "companion-tools",
    summary: "把代码库、文档、SQL schema 与 PDF 转成可溯源查询的知识图谱：无嵌入、无向量库，本地确定性 AST 解析。",
    tags: ["社区出品", "开源", "Apache-2.0", "MIT", "APP", "知识图谱", "代码库理解", "本地优先", "MCP"],
    officialUrl: "https://www.graphify.com",
    sourceUrl: "https://github.com/Graphify-Labs/graphify",
    installGuide: "pip install graphifyy\ngraphify install",
    configText: undefined,
    imageAlt: "Graphify 精选卡片：官方 Demo 知识图谱截图配深色版式，左侧 APP 徽章、一句话价值与 Apache-2.0 + MIT 双许可",
    descriptionMustMatch: /EXTRACTED/,
    bodyMustMatch: [/tree-sitter/, /官方宣称/, /Apache-2\.0 与 MIT 双许可/],
  },
  {
    slug: "serena",
    name: "serena",
    type: "mcp",
    category: "development-code",
    summary: "为编码 agent 提供 IDE 级符号语义能力的 MCP 工具包：语义检索与符号级编辑，40+ 语言 LSP。",
    tags: ["社区出品", "开源", "GPL-3.0-or-later", "MCP", "语义检索", "代码编辑", "LSP", "Claude Code", "Codex"],
    officialUrl: "https://oraios.github.io/serena/",
    sourceUrl: "https://github.com/oraios/serena",
    installGuide: "uv tool install -p 3.13 serena-agent\nserena init",
    configText: undefined,
    imageAlt: "serena 精选卡片：官方架构图配深色版式，左侧 MCP 徽章、一句话价值与 GPL-3.0+（SolidLSP 为 MIT）许可",
    descriptionMustMatch: /SolidLSP 组件 MIT/,
    bodyMustMatch: [/GPL-3\.0-or-later/, /JetBrains 插件为付费/, /版本控制/],
  },
  {
    slug: "openresearch",
    name: "OpenResearch",
    type: "app",
    category: "others",
    summary: "把编码 agent 变成研究 agent：local-first 研究工作区，git 实验树让每次实验可复现、可追溯。",
    tags: ["社区出品", "开源", "MIT", "APP", "研究智能体", "实验管理", "本地优先", "Claude Code", "Codex"],
    officialUrl: "https://openresearch.sh",
    sourceUrl: "https://github.com/alphaXiv/OpenResearch",
    installGuide: "curl -LsSf https://openresearch.sh/install.sh | sh",
    configText: undefined,
    imageAlt: "OpenResearch 精选卡片：官网首页实景配深色版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /Autoresearch/,
    bodyMustMatch: [/git worktree/, /Slurm/, /人工复核/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-147）", () => {
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
        expect(seed!.updatedAt).toBe("2026-09-18");
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

      it("使用官方视觉卡片映射与固定图注", () => {
        expect(profile!.image).toBe(`/media/${item.slug}.png`);
        expect(profile!.imageAlt).toBe(item.imageAlt);
        expect(profile!.imageCredit).toBe("卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）");
        expect(profile!.imageSource).toBeUndefined();
        expect(fs.existsSync(path.join(root, "public", profile!.image))).toBe(true);
      });
    });
  }

  it("6 个 slug 与插图均唯一，且保持批准顺序", () => {
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

  it("RUYI-147 新增分类「工程与制造」挂载在 skill 类型下", () => {
    const category = categorySeeds.skill.find((item) => item[1] === "engineering-manufacturing");
    expect(category, "skill 类目缺少 engineering-manufacturing").toBeDefined();
    expect(category![0]).toBe("工程与制造");
  });
});

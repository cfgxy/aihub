import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-188 本批 10 条资源（Owner 2026-09-25 批准：deepseek-harness、impeccable、cli-anything、codebase-memory-mcp、claude-code-templates、strands-harness-sdk、teamai-cli、substrate、treg、panwatch），字段口径以已验文案与编辑卡片映射为准。 */
const expected = [
  {
    slug: "deepseek-harness",
    name: "DeepSeek Harness",
    type: "app",
    category: "official-apps",
    summary: "DeepSeek 官方插件化智能体运行时：Everything is a Plugin，建仓约 6 周即现象级开源。",
    tags: ["官方出品", "开源", "MIT", "智能体运行时", "插件化", "Agent"],
    officialUrl: "https://deepseek.com/harness",
    sourceUrl: "https://github.com/deepseek-ai/deepseek-harness",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "DeepSeek Harness 精选卡片：GitHub 官方 Social Preview（含官方鲸鱼标）配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /Everything is a Plugin/,
    bodyMustMatch: [/235,055/, /插件化智能体运行时/, /锁定版本/],
  },
  {
    slug: "impeccable",
    name: "Impeccable",
    type: "skill",
    category: "creative-design",
    summary: "提升编程 agent 前端设计质量的设计语言：24 命令、61 条检测规则。",
    tags: ["社区出品", "开源", "Apache-2.0", "SKILL", "前端设计", "设计语言", "检测规则"],
    officialUrl: "https://impeccable.style",
    sourceUrl: "https://github.com/pbakaus/impeccable",
    installGuide: "npx impeccable install",
    configText: undefined,
    imageAlt: "Impeccable 精选卡片：官方 OG 词标与标语配统一版式，左侧 SKILL 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /设计语言/,
    bodyMustMatch: [/24 个命令/, /61 条检测规则/, /反 slop 清单/],
  },
  {
    slug: "cli-anything",
    name: "CLI-Anything",
    type: "app",
    category: "companion-tools",
    summary: "让任意软件通过 CLI 对 AI agent 可用，附 CLI-Hub 包管理器与生成器。",
    tags: ["社区出品", "开源", "Apache-2.0", "CLI 化", "自动化", "HKUDS", "软件 Agent 化"],
    officialUrl: "https://clianything.cc",
    sourceUrl: "https://github.com/HKUDS/CLI-Anything",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "CLI-Anything 精选卡片：官方吉祥物主视觉配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /CLI-Hub/,
    bodyMustMatch: [/HKUDS/, /截屏点按/, /安全边界/],
  },
  {
    slug: "codebase-memory-mcp",
    name: "Codebase Memory MCP",
    type: "mcp",
    category: "development-code",
    summary: "把代码库索引为持久知识图谱的高性能代码智能 MCP 服务器，覆盖 158 种语言。",
    tags: ["社区出品", "开源", "MIT", "MCP", "代码智能", "知识图谱", "代码检索"],
    officialUrl: "https://deusdata.github.io/codebase-memory-mcp",
    sourceUrl: "https://github.com/DeusData/codebase-memory-mcp",
    installGuide: "npm install -g codebase-memory-mcp@latest",
    configText: `{
  "mcpServers": {
    "codebase-memory-mcp": {
      "command": "/path/to/codebase-memory-mcp",
      "args": []
    }
  }
}`,
    imageAlt: "Codebase Memory MCP 精选卡片：官方知识图谱界面图配统一版式，左侧 MCP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /知识图谱/,
    bodyMustMatch: [/158 种/, /serena/, /索引一次、持久复用/],
  },
  {
    slug: "claude-code-templates",
    name: "Claude Code Templates",
    type: "app",
    category: "others",
    summary: "一键配置与监控 Claude Code 的 CLI 模板库：100+ 智能体、命令、hooks 与 MCP 集成。",
    tags: ["社区出品", "开源", "MIT", "Claude Code", "模板库", "工作流配置", "hooks"],
    officialUrl: "https://aitmpl.com",
    sourceUrl: "https://github.com/davila7/claude-code-templates",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Claude Code Templates 精选卡片：官方品牌图配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /模板库/,
    bodyMustMatch: [/hooks 与 MCP 集成/, /与 Anthropic 无隶属关系/, /社区模板质量参差/],
  },
  {
    slug: "strands-harness-sdk",
    name: "Strands Harness SDK",
    type: "app",
    category: "others",
    summary: "生产级 agent 开发 SDK：Python/TypeScript 双语言、任意模型、任意云。",
    tags: ["社区出品", "开源", "Apache-2.0", "Agent SDK", "Python", "TypeScript", "跨云"],
    officialUrl: "https://strandsagents.com",
    sourceUrl: "https://github.com/strands-agents/harness-sdk",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Strands Harness SDK 精选卡片：官方 OG 图配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /任意模型、任意云/,
    bodyMustMatch: [/Python 与 TypeScript/, /WeKnora/, /验证性试点/],
  },
  {
    slug: "teamai-cli",
    name: "teamai-cli",
    type: "skill",
    category: "enterprise-collaboration",
    summary: "腾讯开源：把团队 Prompt/Skill/规则/上下文纳入 Git 管理与评审的 CLI。",
    tags: ["社区出品", "开源", "自定义许可", "SKILL", "团队协作", "Git 管理", "AI 资产"],
    officialUrl: "https://github.com/Tencent/teamai-cli",
    sourceUrl: "https://github.com/Tencent/teamai-cli",
    installGuide: "npm install -g teamai-cli",
    configText: undefined,
    imageAlt: "teamai-cli 精选卡片：GitHub 官方 Social Preview（含腾讯官方标）配统一版式，左侧 SKILL 徽章、一句话价值与自定义许可标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /AI 协作资产/,
    bodyMustMatch: [/自定义条款/, /LICENSE 实文不符/, /WeKnora 同为腾讯出品/],
  },
  {
    slug: "substrate",
    name: "Substrate",
    type: "app",
    category: "others",
    summary: "默认安全的 agent 沙箱执行运行时：microVM/gVisor 沙箱、亚秒级恢复。",
    tags: ["社区出品", "开源", "Apache-2.0", "沙箱", "Agent 基础设施", "microVM", "安全隔离"],
    officialUrl: "https://github.com/agent-substrate/substrate",
    sourceUrl: "https://github.com/agent-substrate/substrate",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Substrate 精选卡片：官方 Logo 配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /沙箱/,
    bodyMustMatch: [/microVM 与 gVisor/, /亚秒级恢复/, /非关键链路/],
  },
  {
    slug: "treg",
    name: "Treg",
    type: "app",
    category: "companion-tools",
    summary: "「工具版 OpenRouter」：一个 base URL 调用 60+ 供应商 3000+ 端点，按次计费、可自托管。",
    tags: ["社区出品", "开源", "自定义许可", "工具聚合", "API 网关", "自托管", "OpenRouter"],
    officialUrl: "https://treg.to",
    sourceUrl: "https://github.com/superdesigndev/treg",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Treg 精选卡片：官方 Hero 图配统一版式，左侧 APP 徽章、一句话价值与自定义许可标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /OpenRouter/,
    bodyMustMatch: [/60\+ 供应商/, /3000\+ 端点/, /自托管免费/],
  },
  {
    slug: "panwatch",
    name: "PanWatch（盯盘侠）",
    type: "app",
    category: "others",
    summary: "自托管 AI 盯盘助手：A股/港股/美股实时监控 + TradingAgents 多 agent 决策。",
    tags: ["社区出品", "开源", "MIT", "金融工具", "盯盘", "自托管", "多 agent"],
    officialUrl: "https://github.com/TNT-Likely/PanWatch",
    sourceUrl: "https://github.com/TNT-Likely/PanWatch",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "PanWatch（盯盘侠）精选卡片：官方产品截图配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /盯盘/,
    bodyMustMatch: [/TradingAgents/, /RUYI-144/, /不构成投资建议/],
  },
];

describe("RUYI-188 每日精选入库（10 条）", () => {
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
        expect(seed?.updatedAt).toBe("2026-09-25");
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

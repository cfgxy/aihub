import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-202 本批 10 条资源（Owner 2026-09-26 07:31 批准「全部收录」：kimi-code、archify、agentgateway、wigolo、openspec、omniroute、opencut、opencreator、nasiko、skills），字段口径以已验收文案（评论 01a0daf3）与编辑卡片映射为准。 */
const expected = [
  {
    slug: "kimi-code",
    name: "Kimi Code CLI",
    type: "app",
    category: "official-apps",
    summary: "月之暗面官方开源的终端编码 Agent：单二进制零 Node 安装，v2.0 附桌面版。",
    tags: ["官方出品", "开源", "MIT", "编码智能体", "CLI", "桌面版", "MCP 配置"],
    officialUrl: "https://github.com/MoonshotAI/kimi-code",
    sourceUrl: "https://github.com/MoonshotAI/kimi-code",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Kimi Code CLI 精选卡片：官方仓库演示截图配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /MoonshotAI/,
    bodyMustMatch: [/kimi-cli 已归档/, /视频输入/, /\/mcp-config/],
  },
  {
    slug: "archify",
    name: "Archify",
    type: "skill",
    category: "development",
    summary: "让编码 Agent 画出的架构图可验证：typed JSON IR 经确定性编译，9 项校验 fail-closed。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "架构图", "可验证出图", "质量门禁"],
    officialUrl: "https://github.com/tt-a1i/archify",
    sourceUrl: "https://github.com/tt-a1i/archify",
    installGuide: "npx skills add tt-a1i/archify -g",
    configText: undefined,
    imageAlt: "Archify 精选卡片：官方文档架构图配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /可验证/,
    bodyMustMatch: [/typed JSON IR/, /9 项校验/, /HyperFrames/],
  },
  {
    slug: "agentgateway",
    name: "AgentGateway",
    type: "mcp",
    category: "cloud-infrastructure",
    summary: "Agent 与 MCP 双代理网关：为 agent 到模型/MCP 流量提供统一鉴权与策略管理。",
    tags: ["社区出品", "开源", "Apache-2.0", "MCP", "Agent 网关", "统一鉴权", "策略管理"],
    officialUrl: "https://github.com/agentgateway/agentgateway",
    sourceUrl: "https://github.com/agentgateway/agentgateway",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "AgentGateway 精选卡片：官网 OG 图配统一版式，左侧 MCP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /双代理网关/,
    bodyMustMatch: [/2025-03/, /Open MCP Gateway/, /空白补位/],
  },
  {
    slug: "wigolo",
    name: "Wigolo",
    type: "mcp",
    category: "search-web",
    summary: "本地优先的网络研究 MCP：search/fetch/crawl/research 四合一，零 API key。",
    tags: ["社区出品", "开源", "自定义许可", "MCP", "网络研究", "本地优先", "零 API key"],
    officialUrl: "https://github.com/KnockOutEZ/wigolo",
    sourceUrl: "https://github.com/KnockOutEZ/wigolo",
    installGuide: "npx wigolo init",
    configText: `{
  "mcpServers": {
    "wigolo": {
      "command": "npx",
      "args": ["-y", "wigolo"]
    }
  }
}`,
    imageAlt: "Wigolo 精选卡片：官方站点社交图配统一版式，左侧 MCP 徽章、一句话价值与未知许可标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /本地优先/,
    bodyMustMatch: [/四类能力集于一体/, /Firecrawl Skill/, /自定义条款/],
  },
  {
    slug: "openspec",
    name: "OpenSpec",
    type: "app",
    category: "others",
    summary: "面向 AI 编码助手的规格驱动开发（SDD）工作流工具，在库该类目第一条。",
    tags: ["社区出品", "开源", "MIT", "规格驱动开发", "SDD", "开发工作流"],
    officialUrl: "https://github.com/Fission-AI/OpenSpec",
    sourceUrl: "https://github.com/Fission-AI/OpenSpec",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "OpenSpec 精选卡片：GitHub 官方 Social Preview 配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /规格驱动开发/,
    bodyMustMatch: [/SDD/, /2025-08/, /第一个条目/],
  },
  {
    slug: "omniroute",
    name: "OmniRoute",
    type: "app",
    category: "companion-tools",
    summary: "MIT 开源模型网关：单端点聚合多供应商（自述 359 家/1200+ 模型），统一切换管理。",
    tags: ["社区出品", "开源", "MIT", "模型网关", "多供应商", "单端点聚合", "OpenAI 兼容"],
    officialUrl: "https://github.com/diegosouzapw/OmniRoute",
    sourceUrl: "https://github.com/diegosouzapw/OmniRoute",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "OmniRoute 精选卡片：官方仓库界面截图配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /模型网关/,
    bodyMustMatch: [/359 家供应商/, /未逐一核实/, /CCSwitch/],
  },
  {
    slug: "opencut",
    name: "OpenCut",
    type: "app",
    category: "others",
    summary: "开源视频编辑器，定位 CapCut 开源替代；本期应用类星数最高（★90,662）。",
    tags: ["社区出品", "开源", "MIT", "视频编辑", "CapCut 替代", "开源编辑器"],
    officialUrl: "https://github.com/OpenCut-app/OpenCut",
    sourceUrl: "https://github.com/OpenCut-app/OpenCut",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "OpenCut 精选卡片：官网 OG 图配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /CapCut/,
    bodyMustMatch: [/90,662/, /jianying-headless/, /功能成熟度为未知项/],
  },
  {
    slug: "opencreator",
    name: "OpenCreator",
    type: "app",
    category: "others",
    summary: "KrillinAI 更名转型之作：面向创作者的开源 AI 工作台（自述 powered by Codex）。",
    tags: ["社区出品", "开源", "Apache-2.0", "创作工作台", "AI 工作台", "重大转型"],
    officialUrl: "https://github.com/krillinai/OpenCreator",
    sourceUrl: "https://github.com/krillinai/OpenCreator",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "OpenCreator 精选卡片：官方产品首页截图配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /更名转型/,
    bodyMustMatch: [/Formerly KrillinAI/, /powered by Codex/, /成熟度为未知项/],
  },
  {
    slug: "nasiko",
    name: "Nasiko",
    type: "app",
    category: "others",
    summary: "AI Agent 的开发者控制面（Developer Control Plane），面向多 Agent 管理场景。",
    tags: ["社区出品", "开源", "自定义许可", "Agent 控制面", "多 Agent 管理", "开发团队"],
    officialUrl: "https://github.com/Nasiko-Labs/nasiko",
    sourceUrl: "https://github.com/Nasiko-Labs/nasiko",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Nasiko 精选卡片：官方仪表盘截图配统一版式，左侧 APP 徽章、一句话价值与未知许可标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /控制面/,
    bodyMustMatch: [/Developer Control Plane/, /09-14/, /自定义条款/],
  },
  {
    slug: "skills",
    name: "Skills（Matt Pocock）",
    type: "skill",
    category: "development",
    summary: "TypeScript 知名教育者 Matt Pocock 开源的个人 .agents 工程技能集（全期星数最高）。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "工程技能集", "TypeScript", "技能目录"],
    officialUrl: "https://github.com/mattpocock/skills",
    sourceUrl: "https://github.com/mattpocock/skills",
    installGuide: "npx skills@latest add mattpocock/skills",
    configText: undefined,
    imageAlt: "Skills 精选卡片：官方推广图配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /Matt Pocock/,
    bodyMustMatch: [/.agents/, /269,586/, /Superpowers/],
  },
];

describe("RUYI-202 每日精选入库（10 条）", () => {
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
        expect(seed?.updatedAt).toBe("2026-09-26");
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

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-166 本批 10 条资源（Owner 2026-09-22「全部收录」批准），字段口径以已验文案与编辑卡片映射为准。 */
const expected = [
  {
    slug: "zcode",
    name: "ZCode",
    type: "app",
    category: "official-apps",
    summary: "Z.ai 官方开源 AI 编程工作台，桌面应用+浏览器双形态，覆盖本地与云端编程代理场景。",
    tags: ["官方出品", "开源", "Apache-2.0", "AI 编程", "编程工作台", "Coding Agent", "GLM"],
    officialUrl: "https://github.com/zai-org/ZCode",
    sourceUrl: "https://github.com/zai-org/ZCode",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "ZCode 精选卡片：官方 OG 主视觉（产品界面实景）配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /编程代理/,
    bodyMustMatch: [/5,426/, /Codex、Claude/, /CCSwitch/, /成熟度未知/],
  },
  {
    slug: "cua",
    name: "Cua",
    type: "app",
    category: "others",
    summary: "给 AI 代理「可用的电脑」：computer-use 2.0 驱动、跨 OS 虚拟机机队与评测基准。",
    tags: ["社区出品", "开源", "MIT", "Computer Use", "Agent 基础设施", "虚拟机机队", "评测基准"],
    officialUrl: "https://cua.ai",
    sourceUrl: "https://github.com/trycua/cua",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Cua 精选卡片：官方黑白品牌图标配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /computer-use/,
    bodyMustMatch: [/25,597/, /Trending 日榜第 2/, /computer-use-mcp/, /权限边界/],
  },
  {
    slug: "claude-financial-services",
    name: "Claude for Financial Services",
    type: "skill",
    category: "enterprise-collaboration",
    summary: "Anthropic 官方金融工作流参考库：投行、行研、PE、财富管理 agents+skills。",
    tags: ["官方出品", "开源", "Apache-2.0", "SKILL", "金融", "投行", "财富管理", "工作流"],
    officialUrl: "https://github.com/anthropics/financial-services",
    sourceUrl: "https://github.com/anthropics/financial-services",
    installGuide: "作为 Claude Cowork 插件安装，或通过 Claude Managed Agents API 部署（官方 README 两种接入方式）。",
    configText: undefined,
    imageAlt: "Claude for Financial Services 精选卡片：GitHub 官方 Social Preview 配统一版式，左侧 SKILL 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /金融工作流/,
    bodyMustMatch: [/Cowork/, /Managed Agents API/, /非投资建议/, /35,715/],
  },
  {
    slug: "agent-native",
    name: "Agent-Native",
    type: "app",
    category: "others",
    summary: "构建代理式应用（agentic apps）的开源框架，把应用改造为代理可调用形态。",
    tags: ["社区出品", "Agent 基础设施", "agentic apps", "应用框架", "Builder.io", "免费"],
    officialUrl: "https://www.agent-native.com",
    sourceUrl: "https://github.com/BuilderIO/agent-native",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Agent-Native 精选卡片：官方黑白 OG 主视觉配统一版式，左侧 APP 徽章、一句话价值与免费定价标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /agentic apps/,
    bodyMustMatch: [/Builder\.io/, /agent-ready/, /许可证未声明/, /5,750/],
  },
  {
    slug: "autoclip",
    name: "AutoClip",
    type: "app",
    category: "others",
    summary: "把长视频自动切成值得分享的高光片段的桌面二创工具。",
    tags: ["社区出品", "开源", "MIT", "AI 视频剪辑", "高光切片", "桌面端", "二创"],
    officialUrl: "https://zhouxiaoka.github.io/autoclip_intro/",
    sourceUrl: "https://github.com/zhouxiaoka/autoclip",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "AutoClip 精选卡片：官方 OG 主视觉（含官方 slogan「长视频的高光，自动剪出来」）配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /高光片段/,
    bodyMustMatch: [/播客/, /anything2explainer/, /版权由用户自查/, /8,122/],
  },
  {
    slug: "geo-sleuth",
    name: "geo-sleuth",
    type: "skill",
    category: "data-analysis",
    summary: "定位照片拍摄地并展示推理过程的 OSINT Agent Skill。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "OSINT", "地理定位", "照片取证"],
    officialUrl: "https://github.com/Oldcircle/geo-sleuth",
    sourceUrl: "https://github.com/Oldcircle/geo-sleuth",
    installGuide: "npx skills add Oldcircle/geo-sleuth",
    configText: undefined,
    imageAlt: "geo-sleuth 精选卡片：GitHub 官方 Social Preview 配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /OSINT/,
    bodyMustMatch: [/233 星/, /09-21 仍有推送/, /隐私/, /合规使用/],
  },
  {
    slug: "guizang-product-video-skill",
    name: "guizang-product-video-skill",
    type: "skill",
    category: "creative-design",
    summary: "复用真实产品组件与设计语言，用代码产出软件更新宣传片。",
    tags: ["社区出品", "开源", "AGPL-3.0", "SKILL", "产品视频", "宣传片", "归藏"],
    officialUrl: "https://github.com/op7418/guizang-product-video-skill",
    sourceUrl: "https://github.com/op7418/guizang-product-video-skill",
    installGuide: "npx skills add https://github.com/op7418/guizang-product-video-skill --skill guizang-product-video-skill",
    configText: undefined,
    imageAlt: "guizang-product-video-skill 精选卡片：GitHub 官方 Social Preview 配统一版式，左侧 SKILL 徽章、一句话价值与 AGPL-3.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /复用真实产品/,
    bodyMustMatch: [/op7418/, /Codex/, /AGPL-3\.0/, /video-shotcraft/],
  },
  {
    slug: "post-production-skill",
    name: "post-production-skill",
    type: "skill",
    category: "creative-design",
    summary: "把创意素材改写为电影级视频提示词：VFX、转场、三维 UI、动态镜头。",
    tags: ["社区出品", "SKILL", "视频提示词", "VFX", "三维 UI", "Seedance 2.5", "免费"],
    officialUrl: "https://github.com/huangbai-AI/post-production-skill",
    sourceUrl: "https://github.com/huangbai-AI/post-production-skill",
    installGuide: "mkdir -p ~/.codex/skills && cp -R post-production-skill ~/.codex/skills/sd-2-5-retro-vfx",
    configText: undefined,
    imageAlt: "post-production-skill 精选卡片：GitHub 官方 Social Preview 配统一版式，左侧 SKILL 徽章、一句话价值与免费定价标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /提示词/,
    bodyMustMatch: [/Seedance 2\.5/, /VFX/, /许可证未声明/, /231 星/],
  },
  {
    slug: "clipmivoai-tools",
    name: "ClipmivoAI Tools",
    type: "mcp",
    category: "ai-knowledge",
    summary: "同一视频生成 API 的 REST/CLI/本地 MCP/Agent Skill 四合一客户端。",
    tags: ["社区出品", "MCP", "商业 API", "视频生成", "CLI", "Agent Skill", "REST API"],
    officialUrl: "https://clipmivoai.com",
    sourceUrl: "https://github.com/BarneyD66/clipmivo-tools",
    installGuide: "npm install -g https://github.com/BarneyD66/clipmivo-tools/releases/download/v0.1.1/clipmivo-mcp-0.1.8.tgz",
    configText: "clipmivo-mcp",
    imageAlt: "ClipmivoAI Tools 精选卡片：官方品牌分享图配统一版式，左侧 MCP 徽章、一句话价值与商业 API 定价标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /四种客户端接入形态/,
    bodyMustMatch: [/REST API/, /OpenAPI/, /账号余额计费/, /142 星/],
  },
  {
    slug: "open-glean",
    name: "Open Glean",
    type: "app",
    category: "others",
    summary: "基于 Hydra DB 的开源自托管企业知识问答，回答带来源引用。",
    tags: ["社区出品", "开源", "Apache-2.0", "企业知识", "自托管", "知识问答", "Glean 替代"],
    officialUrl: "https://hydradb.com",
    sourceUrl: "https://github.com/hydra-db/open-glean",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Open Glean 精选卡片：官方 OG 主视觉配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /企业知识问答/,
    bodyMustMatch: [/Hydra DB/, /Glean/, /557 星/, /稳定性未知/],
  },
];

describe("RUYI-166 每日精选入库（10 条）", () => {
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
        if (item.configText === undefined) {
          expect(seed?.configText).toBeUndefined();
        } else {
          expect(seed?.configText).toContain('"clipmivo-mcp"');
          expect(seed?.configText).toContain("CLIPMIVO_API_KEY");
          expect(seed?.configText).toContain("CLIPMIVO_FILES_DIR");
        }
        expect(seed?.updatedAt).toBe("2026-09-22");
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

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-162 本批 6 条资源（Owner 2026-09-22 批准收录：agent-skills、WeKnora、jianying-headless、Easel、huashu-report、Blitz Strike），字段口径以批准后的文案与编辑卡片映射为准。 */
const expected = [
  {
    slug: "agent-skills",
    name: "agent-skills",
    type: "skill",
    category: "development",
    summary: "生产级 AI 编码 agent 工程技能集：全生命周期命令、专家评审 persona 与跨 agent 可移植。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "工程技能", "代码评审", "测试驱动", "Addy Osmani"],
    officialUrl: "https://github.com/addyosmani/agent-skills",
    sourceUrl: "https://github.com/addyosmani/agent-skills",
    installGuide: "npx skills add addyosmani/agent-skills",
    configText: undefined,
    imageAlt: "agent-skills 精选卡片：Addy Osmani 官方网站视觉配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    descriptionMustMatch: /96,882 星/,
    bodyMustMatch: [/反合理化表/, /验证不可协商/, /Hyrum's Law/],
  },
  {
    slug: "weknora",
    name: "WeKnora",
    type: "app",
    category: "others",
    summary: "腾讯开源 LLM 知识平台：文档转可检索 RAG、ReAct 自主推理 agent、自维护 Wiki 知识库。",
    tags: ["官方出品", "开源", "MIT", "APP", "知识库", "RAG", "企业搜索", "腾讯"],
    officialUrl: "https://github.com/Tencent/WeKnora",
    sourceUrl: "https://github.com/Tencent/WeKnora",
    installGuide: "git clone https://github.com/Tencent/WeKnora.git && cd WeKnora && cp .env.example .env && docker compose pull && docker compose up -d",
    configText: undefined,
    imageAlt: "WeKnora 精选卡片：官方仓库架构图配深色版式，左侧 APP 徽章、一句话价值与「自定义许可证 · 细则未知」标注",
    descriptionMustMatch: /27,364 星/,
    bodyMustMatch: [/ReAct Agent/, /Tencent 附加条款/, /内网/],
  },
  {
    slug: "jianying-headless",
    name: "jianying-headless",
    type: "skill",
    category: "creative-design",
    summary: "面向剪映专业版（macOS）的本地自动化：结构化计划生成可编辑草稿、隔离编辑、原生引擎导出 MP4。",
    tags: ["社区出品", "私有源预览", "非商业许可", "SKILL", "剪映", "视频创作", "macOS", "AI 剪辑"],
    officialUrl: "https://github.com/mcncarl/jianying-headless",
    sourceUrl: "https://github.com/mcncarl/jianying-headless",
    installGuide: "git clone https://github.com/mcncarl/jianying-headless.git && cd jianying-headless && python3 tools/build_native_codec.py",
    configText: undefined,
    imageAlt: "jianying-headless 精选卡片：官方 Social Preview 配深色版式，左侧 SKILL 徽章、一句话价值与「许可证未知 · 私有源预览」标注",
    descriptionMustMatch: /1,481 星/,
    bodyMustMatch: [/11\.5\.0/, /非商业使用许可/, /不读取账号数据/],
  },
  {
    slug: "easel",
    name: "Easel",
    type: "app",
    category: "others",
    summary: "浙大 REAL 实验室开源社媒内容工作台：发现、策划、创作、发布、归因五层闭环，画像驱动多平台适配。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "社交媒体", "内容创作", "多平台发布", "浙大 REAL"],
    officialUrl: "https://github.com/ZJU-REAL/Easel",
    sourceUrl: "https://github.com/ZJU-REAL/Easel",
    installGuide: "git clone https://github.com/ZJU-REAL/Easel.git && cd Easel && bash setup.sh",
    configText: undefined,
    imageAlt: "Easel 精选卡片：官方仓库暗色品牌视觉配深色版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    descriptionMustMatch: /1,238 星/,
    bodyMustMatch: [/六维画像/, /Apache-2\.0/, /账号风控/],
  },
  {
    slug: "huashu-report",
    name: "huashu-report",
    type: "skill",
    category: "docs-office",
    summary: "机构级研究报告 Agent Skill：规范从 42 份顶级机构报告反向提炼，四角色流水线产出行业报告与白皮书。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "研究报告", "白皮书", "数据可视化", "行业分析"],
    officialUrl: "https://github.com/alchaincyf/huashu-report",
    sourceUrl: "https://github.com/alchaincyf/huashu-report",
    installGuide: "git clone https://github.com/alchaincyf/huashu-report ~/.claude/skills/huashu-report",
    configText: undefined,
    imageAlt: "huashu-report 精选卡片：官方 Social Preview 配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    descriptionMustMatch: /42 份顶级机构报告/,
    bodyMustMatch: [/四角色/, /chart\.py/, /中文语境行文习惯需自行校对/],
  },
  {
    slug: "blitzstrike",
    name: "Blitz Strike",
    type: "mcp",
    category: "development-code",
    summary: "把结构化渗透测试方法论打包为 MCP 服务器：侦察枚举、可达性追踪与实测验证三层流程，仅限授权测试。",
    tags: ["社区出品", "开源", "MIT", "MCP", "安全测试", "渗透测试", "授权评估", "Red Team"],
    officialUrl: "https://github.com/shinthink/blitzstrike",
    sourceUrl: "https://github.com/shinthink/blitzstrike",
    installGuide: "npx -y blitzstrike install",
    configText: `{
  "mcpServers": {
    "blitzstrike": {
      "command": "blitzstrike",
      "args": ["serve", "--mcp"]
    }
  }
}`,
    imageAlt: "Blitz Strike 精选卡片：官方仓库 Banner 配深色版式，左侧 MCP 徽章、仅限授权测试用途风险标注与 MIT 许可证标注",
    descriptionMustMatch: /637 星/,
    bodyMustMatch: [/scope_check/, /CVSS v3\.1/, /仅限授权测试用途/, /未经独立验证/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-162）", () => {
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
        expect(seed!.updatedAt).toBe("2026-09-22");
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
});

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-156 本批 4 条资源（Owner 2026-09-18 批准：HyperFrames、Humanizer、OpenMAIC、Context Mode），字段口径以批准后的文案与官方视觉卡片映射为准。 */
const expected = [
  {
    slug: "hyperframes",
    name: "HyperFrames",
    type: "app",
    category: "companion-tools",
    summary: "HeyGen 官方开源的视频渲染框架：用 HTML 让 AI agent 直接渲染成确定性 MP4 视频。",
    tags: ["官方出品", "开源", "Apache-2.0", "APP", "视频渲染", "HTML", "AI Agent", "HeyGen"],
    officialUrl: "https://hyperframes.heygen.com",
    sourceUrl: "https://github.com/heygen-com/hyperframes",
    installGuide: "npx hyperframes init my-video",
    configText: undefined,
    imageAlt: "HyperFrames 精选卡片：官方仓库 Social Preview 配深色版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证",
    descriptionMustMatch: /Write HTML\. Render video\. Built for agents\./,
    bodyMustMatch: [/FFmpeg/, /确定性/, /托管云渲染的额度与收费方式：未知/],
  },
  {
    slug: "humanizer",
    name: "Humanizer",
    type: "skill",
    category: "docs-office",
    summary: "把「AI 味」文本改写成自然人事表达的 agent 技能：25 类痕迹模式化标记与改写，只改表达不改事实。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "写作去痕", "声线匹配", "Markdown", "多端安装"],
    officialUrl: "https://github.com/blader/humanizer",
    sourceUrl: "https://github.com/blader/humanizer",
    installGuide: "npx skills add blader/humanizer --global",
    configText: undefined,
    imageAlt: "Humanizer 精选卡片：官方仓库 Social Preview 配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /without changing what it says/,
    bodyMustMatch: [/Signs of AI writing/, /声线匹配/, /中文文本改写效果未知/],
  },
  {
    slug: "openmaic",
    name: "OpenMAIC",
    type: "app",
    category: "others",
    summary: "清华大学 MAIC 团队开源的一键沉浸式多智能体课堂：主题或文档进，含幻灯片、测验与 PBL 的完整课堂出。",
    tags: ["社区出品", "开源", "MIT", "APP", "多智能体", "AI 教育", "课堂生成", "清华 MAIC"],
    officialUrl: "https://open.maic.chat",
    sourceUrl: "https://github.com/THU-MAIC/OpenMAIC",
    installGuide: "git clone https://github.com/THU-MAIC/OpenMAIC.git && cd OpenMAIC && pnpm install",
    configText: undefined,
    imageAlt: "OpenMAIC 精选卡片：官方品牌 Banner 视觉区配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /Open Multi-Agent Interactive Classroom/,
    bodyMustMatch: [/v1\.0\.0/, /AGPL-3\.0/, /额度与限制：未知/],
  },
  {
    slug: "context-mode",
    name: "Context Mode",
    type: "app",
    category: "companion-tools",
    summary: "为 AI 编码 agent 做上下文窗口优化的 MCP 服务器：沙箱化工具输出、会话记忆续跑，只把结果带进上下文。",
    tags: ["社区出品", "开源", "ELv2", "APP", "上下文优化", "MCP", "会话记忆", "Claude Code"],
    officialUrl: "https://context-mode.com",
    sourceUrl: "https://github.com/mksglu/context-mode",
    installGuide: "claude mcp add context-mode -- npx -y context-mode",
    configText: undefined,
    imageAlt: "Context Mode 精选卡片：官方 OG 主视觉配深色版式，左侧 APP 徽章、一句话价值与 ELv2 许可证",
    descriptionMustMatch: /沙箱化工具输出/,
    bodyMustMatch: [/Elastic License 2\.0/, /官方口径，未实测/, /收费模式：未知/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-156）", () => {
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
  });
});

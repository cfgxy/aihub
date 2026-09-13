import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile, resourceProfiles } from "@/lib/resource-profiles";

const seed = resourceSeeds.find((resource) => resource.slug === "ai-research-skills");

describe("AI Research Skills 条目入库（RUYI-111）", () => {
  it("以 skill 类型进入新分类「AI 研究工作流」", () => {
    expect(seed, "种子目录缺少 ai-research-skills").toBeDefined();
    expect(seed!.name).toBe("AI Research Skills");
    expect(seed!.type).toBe("skill");
    expect(seed!.category).toBe("ai-research-workflow");

    const category = categorySeeds.skill.find((item) => item[1] === "ai-research-workflow");
    expect(category, "skill 类目缺少 ai-research-workflow").toBeDefined();
    expect(category![0]).toBe("AI 研究工作流");
  });

  it("展示名采用官方产品名，不使用混合大小写的仓库标识", () => {
    const published = [seed!.name, seed!.summary, seed!.description, ...seed!.tags].join(" ");
    expect(published).not.toContain("AI-research-SKILLs");
    expect(published).not.toContain("AI-Research-SKILLs");
  });

  it("官方入口与来源链接指向已核验的公开地址", () => {
    expect(seed!.officialUrl).toBe("https://www.orchestra-research.com/ai-research-skills");
    expect(seed!.sourceUrl).toBe("https://github.com/Orchestra-Research/AI-research-SKILLs");
  });

  it("提供 skill 详情页消费的官方安装命令", () => {
    expect(seed!.installGuide).toBe("npx @orchestra-research/ai-research-skills");
  });

  it("公开正文采用官方仓库口径的技能数并保留风险提示", () => {
    const profile = getResourceProfile("ai-research-skills");
    expect(profile, "缺少详情正文").toBeDefined();
    expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
    expect(profile!.highlights.length).toBeGreaterThanOrEqual(3);
    expect(profile!.bestFor.length).toBeGreaterThan(10);

    const body = `${profile!.overview.join(" ")} ${profile!.highlights.join(" ")} ${profile!.bestFor}`;
    expect(body, "正文缺少技能与分类口径").toMatch(/98 个研究技能|98 个技能/);
    expect(body, "正文缺少 23 分类口径").toContain("23 个");
    expect(body, "正文缺少许可证口径").toContain("MIT");
    expect(body, "正文缺少风险提示").toMatch(/许可证|安装行为/);
    expect(body, "正文缺少采集日期").toContain("2026年09月09日");
    expect(body, "正文缺少以官方仓库为准的稳定提示").toMatch(/GitHub 仓库最新说明为准/);
  });

  it("公开正文不出现官网旧口径数字与纠错过程", () => {
    const profile = getResourceProfile("ai-research-skills")!;
    const published = [
      seed!.name, seed!.summary, seed!.description, ...seed!.tags,
      ...profile.overview, ...profile.highlights, profile.bestFor, profile.imageAlt, profile.featureImageAlt!,
    ].join(" ");
    for (const stale of ["86 个", "86个", "22 分类", "22 个分类", "旧口径"]) {
      expect(published, `公开正文出现已定稿禁止的旧口径：${stale}`).not.toContain(stale);
    }
  });

  it("不写入未经核实的动态数字与未知项", () => {
    const profile = getResourceProfile("ai-research-skills")!;
    const published = [
      seed!.name, seed!.summary, seed!.description, ...seed!.tags,
      ...profile.overview, ...profile.highlights, profile.bestFor, profile.imageAlt,
    ].join(" ");
    for (const leak of ["12,435", "stars", "待确认", "候选卡", "内部口径"]) {
      expect(published, `公开正文出现不应写入的内容：${leak}`).not.toContain(leak);
    }
  });

  it("配置原创 Hero 与可选 Feature 插图，且不生成外部来源假外链", () => {
    const profile = getResourceProfile("ai-research-skills")!;
    expect(profile.image).toBe("/media/ai-research-skills-hero.png");
    expect(profile.featureImage).toBe("/media/ai-research-skills-feature.png");
    expect(profile.featureImageAlt!.length).toBeGreaterThan(5);
    expect(profile.imageCredit).toBe("插图：AIHub 原创设计");
    expect(profile.imageSource, "原创插图不得声明外部来源").toBeUndefined();

    for (const file of [profile.image, profile.featureImage!]) {
      expect(fs.existsSync(path.join(process.cwd(), "public", file)), `缺少媒体文件 ${file}`).toBe(true);
    }
  });

  it("原创插图保留可编辑 SVG 源文件，移动核验图不进入生产媒体", () => {
    for (const source of ["ai-research-skills-hero.svg", "ai-research-skills-feature.svg"]) {
      expect(fs.existsSync(path.join(process.cwd(), "docs/design/media-src", source)), `缺少源文件 ${source}`).toBe(true);
    }
    const media = fs.readdirSync(path.join(process.cwd(), "public/media"));
    expect(media.filter((file) => file.includes("mobile-check"))).toEqual([]);
  });
});

/** 使用原创插图（imageCredit）而非外部来源图注的条目；RUYI-127 新增十条资源，RUYI-137 新增四条资源。 */
const originalArtSlugs = [
  "ai-research-skills", "gmail-creator-pro", "papergraph-mcp", "computer-use-mcp",
  "anything2explainer", "short-video-generator-ai", "tokentab", "bang-motion",
  "hermes-agent", "ponytail", "voicestudio", "video-use", "atlas",
  "patent-disclosure-skill", "firecrawl-skill", "sie", "loadster-mcp", "agentphone-mcp",
  "superpowers", "i-have-adhd", "mathmodelagent", "pascal-editor",
];
/** 其中同时配置 Feature 图位（双图）的条目。 */
const featureArtSlugs = ["ai-research-skills", "gmail-creator-pro"];

describe("既有资源的图注与图位行为不回归", () => {
  it("其余资源仍使用外部来源图注，且不出现原创图注字段", () => {
    for (const [slug, profile] of Object.entries(resourceProfiles)) {
      if (originalArtSlugs.includes(slug)) continue;
      expect(profile.imageSource, `${slug} 丢失外部来源`).toMatch(/^https:\/\//);
      expect(profile.imageCredit, `${slug} 不应有原创图注`).toBeUndefined();
    }
  });

  it("原创插图条目一律用原创图注，不声明外部图片来源", () => {
    for (const slug of originalArtSlugs) {
      const profile = resourceProfiles[slug];
      expect(profile, `${slug} 缺少详情正文`).toBeDefined();
      expect(profile.imageCredit, `${slug} 缺少原创图注`).toBe("插图：AIHub 原创设计");
      expect(profile.imageSource, `${slug} 不得声明外部来源`).toBeUndefined();
    }
  });

  it("Feature 图位仅双图原创插图条目配置，其他资源不产生空图位", () => {
    const withFeature = Object.entries(resourceProfiles)
      .filter(([, profile]) => profile.featureImage)
      .map(([slug]) => slug);
    expect(withFeature.sort()).toEqual([...featureArtSlugs].sort());
  });

  it("每个 profile 的图注要么有外部来源要么有原创说明，不留空图注", () => {
    for (const [slug, profile] of Object.entries(resourceProfiles)) {
      expect(Boolean(profile.imageSource || profile.imageCredit), `${slug} 图注为空`).toBe(true);
    }
  });
});

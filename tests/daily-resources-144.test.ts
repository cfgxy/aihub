import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-144 本批 4 条资源，字段口径以 Owner 批准后的文案与官方视觉卡片映射为准。 */
const expected = [
  {
    slug: "mirofish",
    name: "MiroFish",
    type: "app",
    category: "others",
    summary: "开源群体智能预测引擎：把「预测」变成多智能体社会仿真——用种子信息构建并行数字世界，让数千个智能体交互演化后输出预测结论。",
    tags: ["社区出品", "开源", "AGPL-3.0", "APP", "群体智能", "社会仿真", "预测", "OASIS"],
    officialUrl: "https://mirofish.ai",
    sourceUrl: "https://github.com/666ghj/MiroFish",
    imageAlt: "MiroFish 精选卡片：官方五阶段工作流示意配深色版式，左侧 APP 徽章、一句话价值与 AGPL-3.0 许可证",
    descriptionMustMatch: /ReportAgent/,
    bodyMustMatch: [/OASIS/, /上帝视角/, /不可作为投资或重大决策依据/],
  },
  {
    slug: "yue",
    name: "YuE（YuE2）",
    type: "app",
    category: "others",
    summary: "先写「乐谱规划」再渲染成歌的开源音乐生成模型——旋律与和弦显式可编辑，支持零样本翻唱与对话式改歌。",
    tags: ["社区出品", "开源", "Apache-2.0", "CC BY-NC 4.0", "APP", "音乐生成", "零样本翻唱", "Agent 编辑"],
    officialUrl: "https://map-yue2.github.io/",
    sourceUrl: "https://github.com/multimodal-art-projection/YuE",
    imageAlt: "YuE 精选卡片：官方「乐」符标识与生成流水线示意配深色版式，左侧 APP 徽章、一句话价值与双许可证",
    descriptionMustMatch: /symbolic plan/,
    bodyMustMatch: [/SheetSage2/, /CC BY-NC 4\.0/, /未经独立验证/],
  },
  {
    slug: "flowsint",
    name: "flowsint",
    type: "app",
    category: "others",
    summary: "开源 OSINT 图谱调查平台——关系图谱 + 自动化情报丰富器，让实体关系调查可视化、可扩展，且数据全程留在本机。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "OSINT", "图谱分析", "调查", "自托管"],
    officialUrl: "https://flowsint.io",
    sourceUrl: "https://github.com/reconurge/flowsint",
    imageAlt: "flowsint 精选卡片：图谱实体与丰富器示意配深色版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证",
    descriptionMustMatch: /Maigret/,
    bodyMustMatch: [/ETHICS\.md/, /Neo4j/, /数据合规使用责任在使用方/],
  },
  {
    slug: "tradingagents",
    name: "TradingAgents",
    type: "app",
    category: "others",
    summary: "模拟真实交易公司分工的多智能体 LLM 框架——分析师、多空研究员、交易员、风控层层辩论，输出研究向交易分析（输出不可作投资依据）。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "多智能体", "金融分析", "LangGraph", "研究向"],
    officialUrl: "https://github.com/TauricResearch/TradingAgents",
    sourceUrl: "https://github.com/TauricResearch/TradingAgents",
    imageAlt: "TradingAgents 精选卡片：多智能体角色链示意与合规警示条配深色版式，左侧 APP 徽章、一句话价值与研究用途定位",
    descriptionMustMatch: /LangGraph/,
    bodyMustMatch: [/输出不可作投资依据/, /arXiv:2412\.20138/, /模拟交易所/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-144）", () => {
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
        expect(seed!.installGuide).toBeUndefined();
        expect(seed!.updatedAt).toBe("2026-09-15");

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
  });
});

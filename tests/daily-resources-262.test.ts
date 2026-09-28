import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-262 本批 3 条资源（Owner 2026-09-29 02:42 批准「1 7 8 收录」：报批清单 #1 jevgrep、#7 System One Connector、#8 OpenChatX，顺序同批准序号），字段口径以已验收文案（评论 01a0e95e）与编辑卡片映射为准。 */
const expected = [
  {
    slug: "jevgrep",
    name: "jevgrep",
    type: "app",
    category: "companion-tools",
    summary: "用自然语言问「这段功能在哪」，给 coding agent 返回相关文件与源码摘录的语义代码搜索 CLI。",
    tags: ["社区出品", "开源", "MIT", "语义代码搜索", "coding agent", "CLI"],
    officialUrl: "https://github.com/dzhng/jevgrep",
    sourceUrl: "https://github.com/dzhng/jevgrep",
    installGuide: "npm install -g @dzhng/jevgrep",
    configText: undefined,
    imageAlt: "jevgrep 精选卡片：官方仓库封面配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /语义代码搜索/,
    bodyMustMatch: [/1262★/, /8\/10/, /fallback/],
  },
  {
    slug: "system-one-connector",
    name: "System One Connector",
    type: "mcp",
    category: "development-code",
    summary: "给 agent 一个「快思考」出口：向 Jev/CLM 等 System One 模型求带概率的结构化判断，结果可直接写进 if 语句。",
    tags: ["社区出品", "开源", "MIT", "MCP", "结构化判断", "低延迟", "Go"],
    officialUrl: "https://github.com/itsmostafa/system-one-connector",
    sourceUrl: "https://github.com/itsmostafa/system-one-connector",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "System One Connector 精选卡片：官方 Logo 配统一版式，左侧 MCP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /结构化判断/,
    bodyMustMatch: [/329★/, /500 条 records/, /evaluate setup mcp/],
  },
  {
    slug: "openchatx-mcp",
    name: "OpenChatX",
    type: "mcp",
    category: "development-code",
    summary: "用 OpenAI 官方 MCP 通道把 ChatGPT 变成本地 agent runtime：文件/shell、电脑控制、MCP 聚合、子代理。",
    tags: ["社区出品", "开源", "MIT", "MCP", "ChatGPT", "本地 agent runtime", "Secure Tunnel"],
    officialUrl: "https://github.com/XiaoPuOuO/openchatx-mcp",
    sourceUrl: "https://github.com/XiaoPuOuO/openchatx-mcp",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "OpenChatX 精选卡片：官方文档截图配统一版式，左侧 MCP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /local agent runtime/,
    bodyMustMatch: [/194★/, /Secure MCP Tunnel/, /Node\.js 22\.18\+/],
  },
];

describe("RUYI-262 每日精选入库（3 条）", () => {
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
        expect(seed?.updatedAt).toBe("2026-09-29");
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

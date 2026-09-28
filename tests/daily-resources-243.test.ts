import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-243 本批 5 条资源（Owner 2026-09-28 08:07 批准「收录」：agent-desktop、browserskill、mobile mcp、buzz、ai-memory，顺序同批复原文），字段口径以已验收文案（评论 01a0e560）与编辑卡片映射为准；agent-desktop 定位以收口勘误（评论 01a0e564）为准。 */
const expected = [
  {
    slug: "agent-desktop",
    name: "agent-desktop",
    type: "app",
    category: "companion-tools",
    summary: "给任意 AI Agent 的桌面计算机操作能力：经系统无障碍树稳定操作真实应用（早期项目）。",
    tags: ["社区出品", "开源", "Apache-2.0", "computer use", "无障碍树", "桌面自动化", "早期项目"],
    officialUrl: "https://github.com/lahfir/agent-desktop",
    sourceUrl: "https://github.com/lahfir/agent-desktop",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "agent-desktop 精选卡片：官方 Banner 配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /无障碍树/,
    bodyMustMatch: [/★1,682/, /78–96%/, /computer-use/],
  },
  {
    slug: "browserskill",
    name: "BrowserSkill",
    type: "skill",
    category: "development",
    summary: "腾讯开源真实浏览器自动化技能：CLI+扩展双形态，让编码 Agent 直接操作用户真实浏览器做验证与操作。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "浏览器自动化", "真实登录态", "腾讯开源"],
    officialUrl: "https://github.com/Tencent/BrowserSkill",
    sourceUrl: "https://github.com/Tencent/BrowserSkill",
    installGuide: "curl -fsSL https://raw.githubusercontent.com/Tencent/BrowserSkill/main/install.sh | sh",
    configText: undefined,
    imageAlt: "BrowserSkill 精选卡片：官方 Banner 配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /真实登录态/,
    bodyMustMatch: [/bsk CLI/, /Chromium 125\+/, /Firecrawl/],
  },
  {
    slug: "mobile-mcp",
    name: "Mobile MCP",
    type: "mcp",
    category: "development-code",
    summary: "把 iOS/Android 真机与模拟器操作经 MCP 暴露给 Agent，实现移动端自动导航与验证。",
    tags: ["社区出品", "开源", "Apache-2.0", "MCP", "移动自动化", "iOS", "Android"],
    officialUrl: "https://github.com/mobile-next/mobile-mcp",
    sourceUrl: "https://github.com/mobile-next/mobile-mcp",
    installGuide: undefined,
    configText: `{
  "mcpServers": {
    "mobile-mcp": {
      "command": "npx",
      "args": ["-y", "@mobilenext/mobile-mcp@latest"]
    }
  }
}`,
    imageAlt: "Mobile MCP 精选卡片：官方 Banner 配统一版式，左侧 MCP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /移动自动化/,
    bodyMustMatch: [/@mobilenext\/mobile-mcp/, /Xcode 命令行工具/, /Mobile Next Cloud/],
  },
  {
    slug: "buzz",
    name: "Buzz",
    type: "app",
    category: "official-apps",
    summary: "Block 开源的「hive mind」人机共享工作区：基于 Nostr 开放中继，人与多个 Agent 在同一空间协作。",
    tags: ["官方出品", "开源", "Apache-2.0", "人机协作", "Nostr", "自托管", "审计日志"],
    officialUrl: "https://github.com/block/buzz",
    sourceUrl: "https://github.com/block/buzz",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Buzz 精选卡片：官方品牌视觉配统一版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /Nostr/,
    bodyMustMatch: [/★34,995/, /SmartScreen/, /Railway/],
  },
  {
    slug: "ai-memory",
    name: "ai-memory",
    type: "app",
    category: "companion-tools",
    summary: "跨厂商 Agent 记忆交接工具：让 Claude Code、Codex 等不同 CLI Agent 之间交接工作上下文。",
    tags: ["社区出品", "开源", "MIT", "Agent 记忆", "跨 Agent 交接", "Markdown wiki", "自托管"],
    officialUrl: "https://github.com/akitaonrails/ai-memory",
    sourceUrl: "https://github.com/akitaonrails/ai-memory",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "ai-memory 精选卡片：官方 Logo 配统一版式，左侧 APP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /Markdown wiki/,
    bodyMustMatch: [/★8,484/, /零 LLM 调用/, /Hindsight/],
  },
];

describe("RUYI-243 每日精选入库（5 条）", () => {
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
        expect(seed?.updatedAt).toBe("2026-09-28");
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

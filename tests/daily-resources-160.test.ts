import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-160 本批 5 条资源（Owner 2026-09-19 批准：gongwen-gbt9704-skill、pcb-skill、motion-web、skillbox、Jev Review），字段口径以批准后的文案与编辑卡片映射为准。 */
const expected = [
  {
    slug: "gongwen-gbt9704-skill",
    name: "gongwen-gbt9704-skill",
    type: "skill",
    category: "docs-office",
    summary: "按国标 GB/T 9704-2012 生成可直接交付的公文 DOCX：版心/文号/页码/红头套打，可生成、可检查。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "公文排版", "GB/T 9704", "DOCX", "红头套打"],
    officialUrl: "https://github.com/mizzlelover/gongwen-gbt9704-skill",
    sourceUrl: "https://github.com/mizzlelover/gongwen-gbt9704-skill",
    installGuide: "git clone https://github.com/mizzlelover/gongwen-gbt9704-skill.git",
    configText: undefined,
    imageAlt: "gongwen-gbt9704-skill 精选卡片：官方 2.0 更新插图「预印红头纸套打」裁切配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /GB\/T 9704-2012/,
    bodyMustMatch: [/18 份 DOCX/, /--org/, /涉密/],
  },
  {
    slug: "pcb-skill",
    name: "pcb-skill",
    type: "skill",
    category: "engineering-manufacturing",
    summary: "agent 驱动 EasyEDA Pro 的 PCB 全流程技能：从硬件想法到可下单打样，全流程门控校验。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "PCB", "EasyEDA", "硬件设计", "门控校验"],
    officialUrl: "https://github.com/daishuge/pcb-skill",
    sourceUrl: "https://github.com/daishuge/pcb-skill",
    installGuide: "git clone https://github.com/daishuge/pcb-skill.git && cd pcb-skill && mkdir -p ~/.claude/skills/pcb && cp -R skills/pcb/. scripts setup ~/.claude/skills/pcb/",
    configText: undefined,
    imageAlt: "pcb-skill 精选卡片：原创全流程示意图（概念到下单止于支付页，依据官方 README 绘制）配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（原创示意图，依据官方 README 绘制）",
    descriptionMustMatch: /docs\/case-study\.md/,
    bodyMustMatch: [/门控/, /止步于支付页/, /setup\/README\.md/],
  },
  {
    slug: "motion-web",
    name: "motion-web",
    type: "skill",
    category: "creative-design",
    summary: "「动效即材质」的前端动效技能：物理阻尼求解器 + 7 大案例自动化 Headless 验证。",
    tags: ["社区出品", "开源", "CC BY-NC 4.0", "SKILL", "前端动效", "Three.js", "物理阻尼", "Headless 验证"],
    officialUrl: "https://github.com/feitangyuan/motion-web",
    sourceUrl: "https://github.com/feitangyuan/motion-web",
    installGuide: "git clone https://github.com/feitangyuan/motion-web.git ~/.claude/skills/motion-web",
    configText: undefined,
    imageAlt: "motion-web 精选卡片：官方案例「String Clock」实景配统一版式，左侧 SKILL 徽章、一句话价值与 CC BY-NC 4.0 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /Cases 7\/7 PASS/,
    bodyMustMatch: [/CC BY-NC 4\.0/, /SIL Open Font License/, /Headless/],
  },
  {
    slug: "skillbox",
    name: "skillbox",
    type: "skill",
    category: "development",
    summary: "自托管、可版本化的 AI agent 技能库：MCP 接口、scoped clients 按客户端授权。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "技能管理", "自托管", "版本化", "MCP"],
    officialUrl: "https://github.com/kitze/skillbox",
    sourceUrl: "https://github.com/kitze/skillbox",
    installGuide: "git clone https://github.com/kitze/skillbox.git && cd skillbox && bash scripts/skillbox.sh setup && bash scripts/skillbox.sh start",
    configText: undefined,
    imageAlt: "skillbox 精选卡片：官方 Landing OG 主视觉配统一版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    descriptionMustMatch: /AES-256-GCM/,
    bodyMustMatch: [/SKILLBOX_ADMIN_TOKEN/, /Docker Compose/, /成熟度未知/],
  },
  {
    slug: "jev-review",
    name: "Jev Review",
    type: "mcp",
    category: "development-code",
    summary: "编码 agent 的持续软件质量审查 MCP：本地优先、无托管后端、stdio 接入。",
    tags: ["社区出品", "开源", "MIT", "MCP", "代码质量", "持续审查", "本地优先", "Jev"],
    officialUrl: "https://github.com/NiazMorshed2007/jev-review",
    sourceUrl: "https://github.com/NiazMorshed2007/jev-review",
    installGuide: "npx plugins add NiazMorshed2007/jev-review --target claude-code",
    configText: `{
  "mcpServers": {
    "jev-review": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/jev-review/dist/server.js"],
      "env": {
        "JEV_API_KEY": "\${env:JEV_API_KEY}"
      }
    }
  }
}`,
    imageAlt: "Jev Review 精选卡片：原创持续审查维度示意图（依据官方 README 绘制）配统一版式，左侧 MCP 徽章、一句话价值与 MIT 许可证标注",
    imageCredit: "卡片：AIHub 编辑制作（原创示意图，依据官方 README 绘制）",
    descriptionMustMatch: /Your API key stays on your machine/,
    bodyMustMatch: [/Correctness/, /Node\.js 20\+/, /System One/, /调用费用未知/],
  },
] as const;

describe("每日 AI 新资源入库（RUYI-160）", () => {
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
        expect(seed!.updatedAt).toBe("2026-09-19");
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

      it("使用编辑卡片映射与固定图注", () => {
        expect(profile!.image).toBe(`/media/${item.slug}.png`);
        expect(profile!.imageAlt).toBe(item.imageAlt);
        expect(profile!.imageCredit).toBe(item.imageCredit);
        expect(profile!.imageSource).toBeUndefined();
        expect(fs.existsSync(path.join(root, "public", profile!.image))).toBe(true);
      });
    });
  }

  it("5 个 slug 与插图均唯一，且保持批准顺序", () => {
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

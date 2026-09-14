import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { seedDatabase } from "@/db";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { upSql } from "@/db/schema";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-142 本批 10 条资源，字段口径以 Owner 批准后的文案与官方视觉卡片映射为准。 */
const expected = [
  {
    slug: "scroll-craft",
    name: "scroll-craft",
    type: "skill",
    category: "creative-design",
    summary: "给编码 Agent 一套滚动驱动高端网页的设计标准：8 种互斥页面语法、指纹闸门防自我重复与逐滚动位置自动自检。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "网页设计", "滚动叙事", "设计规范", "Claude Code", "Codex"],
    officialUrl: "https://github.com/nateherkai/scroll-craft",
    sourceUrl: "https://github.com/nateherkai/scroll-craft",
    installGuide: "/plugin marketplace add nateherkai/scroll-craft\n/plugin install nateherk-design",
    configText: undefined,
    imageAlt: "scroll-craft 精选卡片：官方范例站点实景配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /仅在 Windows/,
    bodyMustMatch: [/KIE_AI_API_KEY/, /8 种互斥/, /指纹闸门/],
  },
  {
    slug: "chat-on-steroids",
    name: "Chat On Steroids",
    type: "app",
    category: "companion-tools",
    summary: "让网页版 ChatGPT 会话直接读写本地文件、跑终端、多 worker 协作的桌面工作台，权限以批准文件夹为边界。",
    tags: ["社区出品", "开源", "MIT", "APP", "ChatGPT", "MCP", "桌面工作台", "多 Agent", "本地自动化"],
    officialUrl: "https://github.com/totec448-spec/chat-on-steroids",
    sourceUrl: "https://github.com/totec448-spec/chat-on-steroids",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "Chat On Steroids 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /apply_patch/,
    bodyMustMatch: [/SHA256SUMS/, /OpenAI 服务条款/, /fail-closed/],
  },
  {
    slug: "voicemem",
    name: "VoiceMem",
    type: "app",
    category: "others",
    summary: "面向实时语音 Agent 的长期记忆系统：「流式双脑」架构在对话进行中完成记忆提取，附 arXiv 报告与开源模型、数据集。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "语音", "Agent 记忆", "多模态", "流式"],
    officialUrl: "https://xzf-thu.github.io/VoiceMem/",
    sourceUrl: "https://github.com/xzf-thu/VoiceMem",
    installGuide: "pip install voicemem",
    configText: undefined,
    imageAlt: "VoiceMem 精选卡片：官方「流式双脑」架构图配深色版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证",
    descriptionMustMatch: /arXiv:2608.26005/,
    bodyMustMatch: [/官方自报/, /LoCoMo 91\.2%/, /未经独立复核/],
  },
  {
    slug: "agent-memory",
    name: "agent-memory",
    type: "app",
    category: "others",
    summary: "本地优先的 Agent 长期记忆运行时：Markdown 为唯一事实源、索引随时可删可重建、零 API key、跨宿主共享同一记忆库。",
    tags: ["社区出品", "开源", "MIT", "APP", "Agent 记忆", "本地优先", "Markdown", "Claude Code", "Codex"],
    officialUrl: "https://github.com/tigerless-labs/agent-memory",
    sourceUrl: "https://github.com/tigerless-labs/agent-memory",
    installGuide: undefined,
    configText: undefined,
    imageAlt: "agent-memory 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /零知识损失/,
    bodyMustMatch: [/跨宿主/, /PyPI 尚无发布/, /okf-agent-memory/],
  },
  {
    slug: "headcount",
    name: "headcount",
    type: "skill",
    category: "development",
    summary: "把 Claude Code 组织成一家公司：16 个部门 172 项技能按需安装，Security 与 Legal 部门的阻塞性发现不可被推翻。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "Agent 组织", "Claude Code", "插件化", "治理"],
    officialUrl: "https://cbrock84.github.io/headcount/",
    sourceUrl: "https://github.com/cbrock84/headcount",
    installGuide: "/plugin marketplace add cbrock84/headcount\n/plugin install security@headcount",
    configText: undefined,
    imageAlt: "headcount 精选卡片：官方 org chart 页面实景配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /department:skill/,
    bodyMustMatch: [/reviewer-class/, /16 个部门/, /口径不一致/],
  },
  {
    slug: "doop",
    name: "doop",
    type: "app",
    category: "others",
    summary: "开源版 Paper.design：人与 AI Agent 在同一多人画布实时共创设计，内置 MCP server 与 Doop Agent，一条命令自托管。",
    tags: ["社区出品", "开源", "AGPL-3.0", "APP", "设计画布", "MCP", "实时协作", "自托管"],
    officialUrl: "https://doop.design",
    sourceUrl: "https://github.com/kgoedecke/doop",
    installGuide: "git clone https://github.com/kgoedecke/doop && cd doop\ndocker compose up",
    configText: undefined,
    imageAlt: "doop 精选卡片：官方 OG 主视觉配深色版式，左侧 APP 徽章、一句话价值与 AGPL-3.0 许可证",
    descriptionMustMatch: /AGPL-3\.0/,
    bodyMustMatch: [/Doop Agent/, /内嵌 Postgres/, /限流或封号/],
  },
  {
    slug: "open-seo-mcp-skills",
    name: "Open SEO MCP Skills",
    type: "skill",
    category: "data-analysis",
    summary: "跑在自家 GSC/GA4 真实数据上的开源 SEO·GEO 技能包：8 项技能覆盖审计、关键词、排名、竞品差距与 AI 可见度。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "SEO", "GEO", "Search Console", "GA4", "DataForSEO"],
    officialUrl: "https://www.get-ryze.ai/how-to-connect-claude-to-google-meta-ads-mcp",
    sourceUrl: "https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills",
    installGuide: "claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp\nclaude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills\nclaude plugin install open-seo-mcp-skills@ryze",
    configText: undefined,
    imageAlt: "Open SEO MCP Skills 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /Ryze 连接器/,
    bodyMustMatch: [/DataForSEO/, /8 项技能/, /可持续性未知/],
  },
  {
    slug: "lemmalog",
    name: "Lemmalog",
    type: "mcp",
    category: "ai-knowledge",
    summary: "把 Agent 记忆做成可证明、可溯源的 Datalog 演绎数据库：why() 证明树、双时态事实与增量维护，MCP 即插即用。",
    tags: ["社区出品", "开源", "MIT", "MCP", "Agent 记忆", "Datalog", "知识推理", "Rust"],
    officialUrl: "https://github.com/JordyZomer/lemmalog",
    sourceUrl: "https://github.com/JordyZomer/lemmalog",
    installGuide: "git clone https://github.com/JordyZomer/lemmalog && cd lemmalog\ncargo build --release --features mcp\nclaude mcp add lemmalog -- $(pwd)/target/release/lemmalog-mcp",
    configText: undefined,
    imageAlt: "Lemmalog 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 MCP 徽章、一句话价值与 MIT 许可证",
    descriptionMustMatch: /why\(\)/,
    bodyMustMatch: [/provenance/, /Datalog/, /官方自报/],
  },
  {
    slug: "openreality",
    name: "Open Reality",
    type: "mcp",
    category: "database-data",
    summary: "手机视频转 AI 可查询的持久 3D 场景：41 个 MCP 工具支持测量、路径规划，可导出 LeRobot/GR00T 风格机器人训练数据。",
    tags: ["社区出品", "开源", "BSD-2-Clause", "MCP", "3D", "空间数据", "机器人", "VGGT-SLAM"],
    officialUrl: "https://open-reality.io/mcp",
    sourceUrl: "https://github.com/reality-opened/openreality",
    installGuide: "claude mcp add openreality -- npx -y openreality-mcp serve",
    configText: "{\n  \"mcpServers\": {\n    \"openreality\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"openreality-mcp\", \"serve\"]\n    }\n  }\n}",
    imageAlt: "Open Reality 精选卡片：官方品牌 Hero 视觉配深色版式，左侧 MCP 徽章、一句话价值与 BSD-2-Clause 许可证",
    descriptionMustMatch: /41 个 MCP 工具/,
    bodyMustMatch: [/VGGT-SLAM/, /CC BY-NC 4\.0/, /LeRobot\/GR00T/],
  },
  {
    slug: "shim-mcp",
    name: "Shim MCP",
    type: "mcp",
    category: "office-collaboration",
    summary: "把 WordPress 站点变成 MCP server 的官方目录插件：56 项能力、无中继无账号，本地 stdio 与远程 HTTP 双传输。",
    tags: ["社区出品", "开源", "GPL-2.0-or-later", "MCP", "WordPress", "CMS", "Abilities API"],
    officialUrl: "https://wordpress.org/plugins/shim-mcp/",
    sourceUrl: "https://github.com/justadityaraj/shim-mcp",
    installGuide: "git clone https://github.com/justadityaraj/shim-mcp.git wp-content/plugins/shim-mcp\nwp plugin activate shim-mcp\nclaude mcp add shim -- wp shim-mcp serve --user=admin --path=/full/path/to/wordpress",
    configText: undefined,
    imageAlt: "Shim MCP 精选卡片：WordPress.org 官方插件图标配深色版式，左侧 MCP 徽章、一句话价值与 GPL-2.0 许可证",
    descriptionMustMatch: /56 项能力/,
    bodyMustMatch: [/Abilities API/, /wp shim-mcp serve/, /逐对象权限复查/],
  }
] as const;

describe("每日 AI 新资源入库（RUYI-142）", () => {
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
        expect(seed!.updatedAt).toBe("2026-09-14");
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

  it("10 个 slug 与插图均唯一，且保持批准顺序", () => {
    const slugs = expected.map((item) => item.slug);
    const seeded = resourceSeeds.filter((resource) => slugs.includes(resource.slug as (typeof slugs)[number]));
    expect(seeded.map((resource) => resource.slug)).toEqual(slugs);

    const images = expected.map((item) => getResourceProfile(item.slug)?.image);
    expect(new Set(images).size).toBe(expected.length);

    const existingImages = resourceSeeds
      .filter((resource) => !slugs.includes(resource.slug as (typeof slugs)[number]))
      .map((resource) => getResourceProfile(resource.slug)?.image);
    for (const image of images) expect(existingImages).not.toContain(image);

    expect(new Set(resourceSeeds.map((resource) => resource.slug)).size).toBe(resourceSeeds.length);
  });

  it("将本批日期写入初始建库与旧库补种的动态资源记录", () => {
    const databasePath = path.join(root, "data", "daily-resources-142-updated-at.db");
    for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${databasePath}${suffix}`, { force: true });

    const db = new DatabaseSync(databasePath);
    try {
      db.exec(upSql);
      const expectedSlugs = expected.map((item) => item.slug);
      const readDates = () => db.prepare(`SELECT slug, updated_at FROM resources
        WHERE slug IN (${expectedSlugs.map(() => "?").join(", ")}) ORDER BY slug`).all(...expectedSlugs) as Array<{ slug: string; updated_at: string }>;

      seedDatabase(db);
      expect(readDates()).toEqual(expectedSlugs.slice().sort().map((slug) => ({ slug, updated_at: "2026-09-14" })));

      db.exec("DELETE FROM resources");
      seedDatabase(db);
      expect(readDates()).toEqual(expectedSlugs.slice().sort().map((slug) => ({ slug, updated_at: "2026-09-14" })));
    } finally {
      db.close();
      for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${databasePath}${suffix}`, { force: true });
    }
  });
});

import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { seedDatabase } from "@/db";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { upSql } from "@/db/schema";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();

/** RUYI-127 本批 10 条资源，字段口径以 Owner 批准后的文案与原创插图映射为准。 */
const expected = [
  {
    slug: "hermes-agent",
    name: "Hermes Agent",
    type: "app",
    category: "official-apps",
    summary: "Nous Research 官方推出的开源自托管个人 AI 智能体，内置「从经验中创建技能」的自学习闭环、跨会话记忆与多平台消息网关。",
    tags: ["官方出品", "开源", "MIT", "自托管", "个人智能体", "Telegram", "Discord", "Slack", "技能自学习"],
    officialUrl: "https://hermes-agent.nousresearch.com",
    sourceUrl: "https://github.com/NousResearch/hermes-agent",
    installGuide: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash",
    imageAlt: "Hermes Agent 原创插图：多平台消息经抽象网关汇入自托管智能体核心，完成的任务经验沉淀为技能并进入本地记忆",
    descriptionMustMatch: /Token 与消息权限/,
    bodyMustMatch: [/仿冒风险/, /未逐版本复核/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "ponytail",
    name: "Ponytail",
    type: "skill",
    category: "development",
    summary: "让编码 Agent 按「房间里最懒的资深工程师」的 YAGNI 决策阶梯行事的开源技能，抑制过度设计。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "YAGNI", "Claude Code", "Codex", "编码规范"],
    officialUrl: "https://github.com/DietrichGebert/ponytail",
    sourceUrl: "https://github.com/DietrichGebert/ponytail",
    installGuide: `/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail`,
    imageAlt: "Ponytail 原创插图：决策小球沿 7 级 YAGNI 阶梯逐级下行，最终抵达「最小实现」代码卡",
    descriptionMustMatch: /作者侧报告/,
    bodyMustMatch: [/未经独立复核/, /未必适配所有团队规范/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "voicestudio",
    name: "VoiceStudio",
    type: "app",
    category: "others",
    summary: "全本地运行的开源语音工作室：语音克隆、声音设计、配音、转写、听写与有声书制作，本地工作流无需账号与 API Key。",
    tags: ["社区出品", "开源", "AGPL-3.0", "本地运行", "语音克隆", "配音", "转写", "有声书", "Windows", "macOS", "Linux"],
    officialUrl: "https://voicestudio.sh",
    sourceUrl: "https://github.com/debpalash/VoiceStudio",
    installGuide: "git clone https://github.com/debpalash/VoiceStudio.git && cd VoiceStudio && bun install && bun run desktop",
    imageAlt: "VoiceStudio 原创插图：本地语音工作台的三轨波形与麦克风输入，右下角为本地离线标识",
    descriptionMustMatch: /CC-BY-NC/,
    bodyMustMatch: [/声音肖像权利/, /各语言实际覆盖度未逐一验证/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "video-use",
    name: "video-use",
    type: "skill",
    category: "creative-design",
    summary: "browser-use 官方团队的视频剪辑 Agent 技能：素材放进文件夹、与编码 Agent 对话，产出剪辑成片 final.mp4。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "视频剪辑", "Claude Code", "Codex", "ffmpeg", "字幕"],
    officialUrl: "https://github.com/browser-use/video-use",
    sourceUrl: "https://github.com/browser-use/video-use",
    installGuide: `git clone https://github.com/browser-use/video-use ~/Developer/video-use
ln -sfn ~/Developer/video-use ~/.claude/skills/video-use
cd ~/Developer/video-use && uv sync && brew install ffmpeg && cp .env.example .env`,
    imageAlt: "video-use 原创插图：素材文件夹经转写、剪辑决策、渲染、自检四步流水线产出 final.mp4",
    descriptionMustMatch: /ELEVENLABS_API_KEY/,
    bodyMustMatch: [/云依赖与费用/, /自有或已授权内容/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "atlas",
    name: "Atlas",
    type: "app",
    category: "companion-tools",
    summary: "面向并行编码 Agent 的「源码管理」桌面应用：每次 Agent 运行生成 checkpoint，commit 与会话、提示词、推理双向关联。",
    tags: ["社区出品", "开源", "MIT", "源码管理", "Agent 会话", "checkpoint", "macOS", "Rust"],
    officialUrl: "https://www.tryatlas.cc/",
    sourceUrl: "https://github.com/pacifio/atlas",
    installGuide: undefined,
    imageAlt: "Atlas 原创插图：时间线上的会话 checkpoint 锚点与提交节点双向关联，左上为桌面窗口",
    descriptionMustMatch: /Linux\/Windows 未经官方测试/,
    bodyMustMatch: [/成熟度待观察/, /写入时清除密钥.*README 自述/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "patent-disclosure-skill",
    name: "patent-disclosure-skill",
    type: "skill",
    category: "docs-office",
    summary: "中国专利全流程中文技能包：从项目材料挖掘专利点、查新检索、脱敏，到生成发明/实用新型/外观交底书，附解读、检索与政策简报共 8 个子技能。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "专利", "交底书", "查新", "中文支持"],
    officialUrl: "https://github.com/handsomestWei/patent-disclosure-skill",
    sourceUrl: "https://github.com/handsomestWei/patent-disclosure-skill",
    installGuide: `mkdir -p .claude/skills && git clone https://github.com/handsomestWei/patent-disclosure-skill .claude/skills/patent-disclosure-skill
python -m pip install -r .claude/skills/patent-disclosure-skill/requirements.txt`,
    imageAlt: "patent-disclosure-skill 原创插图：交底书文稿配合检索放大镜与带编号引线的部件附图",
    descriptionMustMatch: /专利代理师复核/,
    bodyMustMatch: [/公开数据库覆盖度/, /未见法律免责声明/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "firecrawl-skill",
    name: "Firecrawl Skill",
    type: "skill",
    category: "automation-integration",
    summary: "Firecrawl 官方 Agent 技能与 CLI：为支持 Skills 协议的 Agent 提供网页抓取、搜索、爬取、结构化提取与站点监控能力。",
    tags: ["官方出品", "SKILL", "CLI", "网页抓取", "结构化提取", "Firecrawl", "Claude Code", "Codex", "按量付费"],
    officialUrl: "https://github.com/firecrawl/cli",
    sourceUrl: "https://github.com/firecrawl/cli",
    installGuide: `npm install -g firecrawl-cli
npx skills add firecrawl/skills`,
    imageAlt: "Firecrawl Skill 原创插图：网页内容经漏斗抽取为结构化键值数据",
    descriptionMustMatch: /许可证未知/,
    bodyMustMatch: [/robots 与版权要求/, /云服务需 API Key/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "sie",
    name: "SIE",
    type: "app",
    category: "companion-tools",
    summary: "面向 Agent 工作负载的开源共享推理服务器：嵌入、重排、OCR、结构化抽取统一为 OpenAI 兼容端点。",
    tags: ["社区出品", "开源", "Apache-2.0", "推理服务", "Embeddings", "Rerank", "OCR", "OpenAI 兼容", "自托管"],
    officialUrl: "https://superlinked.com/docs/",
    sourceUrl: "https://github.com/superlinked/sie",
    installGuide: `pip install "sie-server[local]" && sie-server serve`,
    imageAlt: "SIE 原创插图：多类模型节点汇入统一的 OpenAI 兼容端点，再分发到多个 Agent",
    descriptionMustMatch: /SIE_TELEMETRY_DISABLED=1/,
    bodyMustMatch: [/默认开启匿名遥测/, /本站不作推荐/],
    configServerKey: undefined,
    configType: undefined,
    configUrl: undefined,
  },
  {
    slug: "loadster-mcp",
    name: "Loadster MCP",
    type: "mcp",
    category: "cloud-infrastructure",
    summary: "Loadster 官方 MCP 服务器：让 Agent 编写与试放压测脚本、管理场景与数据集、读取报告，对接 Loadster 云端压测与合成监控。",
    tags: ["官方出品", "MCP", "压测", "合成监控", "Streamable HTTP", "商业服务", "Playwright"],
    officialUrl: "https://loadster.com",
    sourceUrl: "https://github.com/loadster/loadster-mcp",
    installGuide: `/plugin marketplace add loadster/loadster-mcp
/plugin install loadster@loadster
claude mcp add --transport http loadster https://api.loadster.com/mcp`,
    imageAlt: "Loadster MCP 原创插图：Agent 经权限边界与云端压测平台双向通信，产出仪表与柱状报告",
    descriptionMustMatch: /不能启动\/停止完整压测/,
    bodyMustMatch: [/自有或已获授权的目标/, /MCP 服务端闭源/],
    configServerKey: "loadster",
    configType: "http",
    configUrl: "https://api.loadster.com/mcp",
  },
  {
    slug: "agentphone-mcp",
    name: "AgentPhone MCP",
    type: "mcp",
    category: "office-collaboration",
    summary: "给 AI Agent 真实电话号码、短信与语音通话能力的 MCP 服务器：购号、收发短信、AI 外呼与呼入 webhook 一体。",
    tags: ["社区出品", "开源", "MIT", "MCP", "语音通话", "短信", "电话号码", "Streamable HTTP"],
    officialUrl: "https://agentphone.ai",
    sourceUrl: "https://github.com/AgentPhone-AI/agentphone-mcp",
    installGuide: "npx -y agentphone-mcp",
    imageAlt: "AgentPhone MCP 原创插图：抽象手机与短信线程、语音通话波弧及工具集点阵，全部内容占位化",
    descriptionMustMatch: /定价未知/,
    bodyMustMatch: [/骚扰\/滥用合规风险/, /录音披露/, /热度未知/],
    configServerKey: "agentphone",
    configType: "streamable-http",
    configUrl: "https://mcp.agentphone.ai/mcp",
  },
] as const;

describe("每日 AI 新资源入库（RUYI-127）", () => {
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
        expect(seed!.updatedAt).toBe("2026-09-12");

        const categories = categorySeeds[item.type as keyof typeof categorySeeds] as ReadonlyArray<readonly string[]>;
        expect(categories.some((category) => category[1] === item.category)).toBe(true);
      });

      it("description 由前两段 overview 合并且保留关键风险", () => {
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

      it("使用逐项原创插图映射与固定图注", () => {
        expect(profile!.image).toBe(`/media/${item.slug}.png`);
        expect(profile!.imageAlt).toBe(item.imageAlt);
        expect(profile!.imageCredit).toBe("插图：AIHub 原创设计");
        expect(profile!.imageSource).toBeUndefined();
        expect(fs.existsSync(path.join(root, "public", profile!.image))).toBe(true);
      });

      it("MCP 配置与资源类型匹配", () => {
        if (!item.configServerKey) {
          expect(seed!.configText).toBeUndefined();
          return;
        }

        expect(seed!.configText).toBeTruthy();
        const config = JSON.parse(seed!.configText!) as {
          mcpServers: Record<string, { type: string; url: string; headers?: { Authorization?: string } }>;
        };
        expect(Object.keys(config.mcpServers)).toEqual([item.configServerKey]);
        expect(config.mcpServers[item.configServerKey].type).toBe(item.configType);
        expect(config.mcpServers[item.configServerKey].url).toBe(item.configUrl);

        if (item.slug === "agentphone-mcp") {
          expect(config.mcpServers.agentphone.headers?.Authorization).toBe("Bearer YOUR_API_KEY");
          expect(seed!.configText!.match(/YOUR_API_KEY/g)).toHaveLength(1);
        } else {
          expect(seed!.configText).not.toContain("YOUR_API_KEY");
        }
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
    const databasePath = path.join(root, "data", "daily-resources-127-updated-at.db");
    for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${databasePath}${suffix}`, { force: true });

    const db = new DatabaseSync(databasePath);
    try {
      db.exec(upSql);
      const expectedSlugs = expected.map((item) => item.slug);
      const readDates = () => db.prepare(`SELECT slug, updated_at FROM resources
        WHERE slug IN (${expectedSlugs.map(() => "?").join(", ")}) ORDER BY slug`).all(...expectedSlugs) as Array<{ slug: string; updated_at: string }>;

      seedDatabase(db);
      expect(readDates()).toEqual(expectedSlugs.slice().sort().map((slug) => ({ slug, updated_at: "2026-09-12" })));

      db.exec("DELETE FROM resources");
      seedDatabase(db);
      expect(readDates()).toEqual(expectedSlugs.slice().sort().map((slug) => ({ slug, updated_at: "2026-09-12" })));
    } finally {
      db.close();
      for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${databasePath}${suffix}`, { force: true });
    }
  });
});

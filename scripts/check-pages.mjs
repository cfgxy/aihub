import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "dist-pages");
const required = [
  "index.html",
  "404.html",
  ".nojekyll",
  "SOURCES.txt",
  "assets/pages.css",
  "r/doubao/index.html",
  "r/codex-plus-plus/index.html",
  "r/ai-toolbox/index.html",
  "r/ai-research-skills/index.html",
  "r/gmail-creator-pro/index.html",
  "media/doubao-cover.png",
  "media/claude.jpg",
  "media/workbuddy.png",
  "media/ccswitch.png",
  "media/ai-toolbox.png",
  "media/ai-research-skills-hero.png",
  "media/ai-research-skills-feature.png",
  "media/gmail-creator-pro-hero.png",
  "media/gmail-creator-pro-feature.png",
  "r/papergraph-mcp/index.html",
  "r/computer-use-mcp/index.html",
  "media/papergraph-mcp.png",
  "media/computer-use-mcp.png",
  "r/anything2explainer/index.html",
  "r/short-video-generator-ai/index.html",
  "r/tokentab/index.html",
  "r/bang-motion/index.html",
  "media/anything2explainer.png",
  "media/short-video-generator-ai.png",
  "media/tokentab.png",
  "media/bang-motion.png",
  "r/openclaw/index.html",
  "r/pi/index.html",
  "r/text-to-cad/index.html",
  "r/graphify/index.html",
  "r/serena/index.html",
  "r/openresearch/index.html",
  "media/openclaw.png",
  "media/pi.png",
  "media/text-to-cad.png",
  "media/graphify.png",
  "media/serena.png",
  "media/openresearch.png",
  "r/hyperframes/index.html",
  "r/humanizer/index.html",
  "r/openmaic/index.html",
  "r/context-mode/index.html",
  "media/hyperframes.png",
  "media/humanizer.png",
  "media/openmaic.png",
  "media/context-mode.png",
  "r/gongwen-gbt9704-skill/index.html",
  "r/pcb-skill/index.html",
  "r/motion-web/index.html",
  "r/skillbox/index.html",
  "r/jev-review/index.html",
  "media/gongwen-gbt9704-skill.png",
  "media/pcb-skill.png",
  "media/motion-web.png",
  "media/skillbox.png",
  "media/jev-review.png",
  "r/agent-skills/index.html",
  "r/weknora/index.html",
  "r/jianying-headless/index.html",
  "r/easel/index.html",
  "r/huashu-report/index.html",
  "r/blitzstrike/index.html",
  "media/agent-skills.png",
  "media/weknora.png",
  "media/jianying-headless.png",
  "media/easel.png",
  "media/huashu-report.png",
  "media/blitzstrike.png",
  "r/taste-skill/index.html",
  "media/taste-skill.png",
  "r/world-monitor/index.html",
  "media/world-monitor.png",
  "r/appllama-skills/index.html",
  "media/appllama-skills.png",
  "r/ai-data-extractor/index.html",
  "media/ai-data-extractor.png",
  "r/orcareplay/index.html",
  "media/orcareplay.png",
  "r/gap-trap/index.html",
  "media/gap-trap.png",
  "r/zcode/index.html",
  "media/zcode.png",
  "r/cua/index.html",
  "media/cua.png",
  "r/claude-financial-services/index.html",
  "media/claude-financial-services.png",
  "r/agent-native/index.html",
  "media/agent-native.png",
  "r/autoclip/index.html",
  "media/autoclip.png",
  "r/geo-sleuth/index.html",
  "media/geo-sleuth.png",
  "r/guizang-product-video-skill/index.html",
  "media/guizang-product-video-skill.png",
  "r/post-production-skill/index.html",
  "media/post-production-skill.png",
  "r/clipmivoai-tools/index.html",
  "media/clipmivoai-tools.png",
  "r/open-glean/index.html",
  "media/open-glean.png",
  "r/ecc/index.html",
  "r/deepseek-reasonix/index.html",
  "r/book-to-skill/index.html",
  "media/ecc.png",
  "media/deepseek-reasonix.png",
  "media/book-to-skill.png",
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Pages 产物缺失：${file}`);
  }
}

// 交付包必须自证来源：SOURCES.txt 记录完整 40 位 Git SHA，脱离文件名与外部记录也可追溯。
const sources = fs.readFileSync(path.join(root, "SOURCES.txt"), "utf8");
const sourceSha = sources.match(/^source_git_sha: ([0-9a-f]{40})$/m);
if (!sourceSha) throw new Error("SOURCES.txt 缺少完整 40 位 source_git_sha");
for (const key of ["source_repository:", "source_branch:", "built_at:", "generator:"]) {
  if (!sources.includes(key)) throw new Error(`SOURCES.txt 缺少字段：${key}`);
}
if (sources.includes("-dirty")) throw new Error("SOURCES.txt 记录的来源工作区不干净，产物不可追溯");

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const value of ["豆包", "Codex++", "Claude", "WorkBuddy", "Multica", "CCSwitch", "AI Toolbox", "AI Research Skills", "Gmail Creator Pro", "data-resource", "search-input"]) {
  if (!home.includes(value)) throw new Error(`首页缺少：${value}`);
}

// RUYI-120：分类筛选靠 card.hidden 生效，样式表必须让 [hidden] 压过 .resource-card 的 display，
// 否则属性设了卡片仍然渲染，分类切换在页面上看不出任何变化。
const pagesCss = fs.readFileSync(path.join(root, "assets/pages.css"), "utf8");
if (!/\[hidden\]\{display:none!important\}/.test(pagesCss)) {
  throw new Error("pages.css 缺少 [hidden] 隐藏规则，分类与搜索筛选不会生效");
}
if (!home.includes("data-section-count")) throw new Error("首页分类计数缺少 data-section-count 挂点");

// 详情页数量以首页实际渲染的资源卡片为准，新增条目时无需同步改这里的硬编码数字。
const cardCount = home.match(/<a class="resource-card"/g).length;
const details = fs.readdirSync(path.join(root, "r"));
if (details.length !== cardCount) throw new Error(`详情页数量错误：${details.length}，首页卡片 ${cardCount}`);

const workBuddy = fs.readFileSync(path.join(root, "r/workbuddy/index.html"), "utf8");
for (const value of ["detail-visual", "核心能力", "适合谁", "www.workbuddy.ai"]) {
  if (!workBuddy.includes(value)) throw new Error(`详情页缺少完整内容：${value}`);
}

const aiToolbox = fs.readFileSync(path.join(root, "r/ai-toolbox/index.html"), "utf8");
for (const value of ["detail-visual", "核心能力", "适合谁", "ai-toolbox.co", "media/ai-toolbox.png"]) {
  if (!aiToolbox.includes(value)) throw new Error(`AI Toolbox 详情页缺少完整内容：${value}`);
}
if (aiToolbox.includes("3.0")) throw new Error("AI Toolbox 详情页出现无官方依据的版本号 3.0");

const research = fs.readFileSync(path.join(root, "r/ai-research-skills/index.html"), "utf8");
for (const value of ["detail-visual", "detail-feature", "核心能力", "media/ai-research-skills-hero.png", "media/ai-research-skills-feature.png", "插图：AIHub 原创设计"]) {
  if (!research.includes(value)) throw new Error(`AI Research Skills 详情页缺少完整内容：${value}`);
}
// 原创插图不得生成「官方页面 / 来源仓库」这类不存在的外部图片来源。
if (research.includes("图片来源：")) throw new Error("原创插图详情页出现外部图片来源图注");
// SKILL 的核心获取路径是复制官方安装命令，静态版必须与动态版同口径。
for (const value of ["npx @orchestra-research/ai-research-skills", "copy-section", "安装说明", "data-copy=\"install-guide\"", "id=\"install-guide\""]) {
  if (!research.includes(value)) throw new Error(`AI Research Skills 详情页缺少安装命令复制块：${value}`);
}
// 已定稿禁止公开的官网旧口径数字与纠错过程。
for (const stale of ["86 个", "86个", "22 分类", "22 个分类", "旧口径"]) {
  if (research.includes(stale)) throw new Error(`详情页出现已定稿禁止的旧口径：${stale}`);
}
for (const value of ["98 个", "23 个", "2026年09月09日", "GitHub 仓库最新说明为准"]) {
  if (!research.includes(value)) throw new Error(`详情页缺少已定稿口径：${value}`);
}
// 应用类资源没有安装命令，不得因此产生空复制块。
const doubao = fs.readFileSync(path.join(root, "r/doubao/index.html"), "utf8");
if (doubao.includes("copy-section")) throw new Error("应用类详情页出现不应存在的复制块");
const gmail = fs.readFileSync(path.join(root, "r/gmail-creator-pro/index.html"), "utf8");
for (const value of [
  "detail-visual", "detail-feature", "核心能力", "media/gmail-creator-pro-hero.png",
  "media/gmail-creator-pro-feature.png", "插图：AIHub 原创设计", "查看来源仓库",
  "专有许可", "可能违反 Google", "收录不代表推荐",
]) {
  if (!gmail.includes(value)) throw new Error(`Gmail Creator Pro 详情页缺少完整内容：${value}`);
}
// 高风险条目不得出现操作性指导、安装入口或站点背书。
for (const banned of ["copy-section", "前往官方下载", "明令禁止", "npx ", "git clone", "5sim"]) {
  if (gmail.includes(banned)) throw new Error(`Gmail Creator Pro 详情页出现禁止内容：${banned}`);
}
if (gmail.includes("图片来源：")) throw new Error("Gmail Creator Pro 原创插图出现外部图片来源图注");

// RUYI-124：两条 MCP 详情页必须同时给出官方 README 口径的配置 JSON 与安装命令，并保留权限/依赖口径。
const mcpEntries = [
  {
    slug: "papergraph-mcp",
    server: "&quot;papergraph&quot;",
    install: "uvx --from git+https://github.com/lotchuazzz-crypto/papergraph-mcp.git@v0.10.0 papergraph-mcp",
    mustInclude: ["arXiv", "SQLite", "MIT"],
  },
  {
    slug: "computer-use-mcp",
    server: "&quot;computer-use&quot;",
    install: "npx -y @zavora-ai/computer-use-mcp",
    mustInclude: ["权限", "profile", "回环地址"],
  },
  {
    slug: "loadster-mcp",
    server: "&quot;loadster&quot;",
    install: "/plugin install loadster@loadster",
    mustInclude: ["不能启动/停止完整压测", "已获授权的目标", "Fuel"],
  },
  {
    slug: "agentphone-mcp",
    server: "&quot;agentphone&quot;",
    install: "npx -y agentphone-mcp",
    mustInclude: ["定价未知", "录音披露", "热度未知"],
  },
];
for (const entry of mcpEntries) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "插图：AIHub 原创设计",
    "MCP 配置", "安装命令", entry.server, entry.install,
    'data-copy="mcp-config"', 'data-copy="install-guide"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 原创插图出现外部图片来源图注`);
  if (html.includes("请在管理页补充")) throw new Error(`${entry.slug} 出现面向管理员的占位配置文案`);
}
// 未录入配置的既有 MCP 不得因此产生空配置块。
const x64dbg = fs.readFileSync(path.join(root, "r/x64dbg-mcp-server/index.html"), "utf8");
if (x64dbg.includes("MCP 配置")) throw new Error("x64dbg-mcp-server 出现不应存在的 MCP 配置块");

// RUYI-125：本批 4 条为原创插图的 SKILL / 应用条目，必须保留许可、版权与自述限定，并与资源类型匹配获取入口。
const dailyEntries125 = [
  {
    slug: "anything2explainer",
    install: "ln -s &quot;$PWD/anything2explainer&quot; ~/.claude/skills/anything2explainer",
    mustInclude: ["PolyForm", "非商业", "Remotion", "1280×720"],
  },
  {
    slug: "short-video-generator-ai",
    install: null,
    mustInclude: ["版权", "已获授权", "faster-whisper", "9:16"],
  },
  {
    slug: "tokentab",
    install: null,
    mustInclude: ["自述", "费率表", "Claude Code", "MIT"],
  },
  {
    slug: "bang-motion",
    install: "/plugin install bang-motion@bang-motion",
    mustInclude: ["GSAP", "2026年09月06日", "MIT", "index.html"],
  },
];
for (const entry of dailyEntries125) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "插图：AIHub 原创设计",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 原创插图出现外部图片来源图注`);
  if (html.includes("MCP 配置")) throw new Error(`${entry.slug} 非 MCP 条目出现 MCP 配置块`);
  // 应用类没有官方安装命令，不得产生空复制块；SKILL 必须给出 README 原文命令。
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-142：本批 4 条应用 / 3 条 SKILL / 3 条 MCP 使用官方视觉合成的编辑卡片，须保留事实边界及对应获取入口。
const dailyEntries142 = [
  { slug: "scroll-craft", install: "/plugin install nateherk-design", mustInclude: ["仅在 Windows", "KIE_AI_API_KEY", "8 种互斥", "指纹闸门"] },
  { slug: "chat-on-steroids", install: null, mustInclude: ["apply_patch", "SHA256SUMS", "OpenAI 服务条款", "fail-closed"] },
  { slug: "voicemem", install: null, mustInclude: ["arXiv:2608.26005", "官方自报", "LoCoMo 91.2%", "未经独立复核"] },
  { slug: "agent-memory", install: null, mustInclude: ["零知识损失", "跨宿主", "PyPI 尚无发布", "okf-agent-memory"] },
  { slug: "headcount", install: "/plugin install security@headcount", mustInclude: ["department:skill", "reviewer-class", "16 个部门", "口径不一致"] },
  { slug: "doop", install: null, mustInclude: ["AGPL-3.0", "Doop Agent", "内嵌 Postgres", "限流或封号"] },
  { slug: "open-seo-mcp-skills", install: "claude plugin install open-seo-mcp-skills@ryze", mustInclude: ["Ryze 连接器", "DataForSEO", "8 项技能", "可持续性未知"] },
  { slug: "lemmalog", install: "claude mcp add lemmalog", mustInclude: ["why()", "provenance", "Datalog", "官方自报"] },
  { slug: "openreality", install: "claude mcp add openreality", mustInclude: ["41 个 MCP 工具", "VGGT-SLAM", "CC BY-NC 4.0", "LeRobot/GR00T"] },
  { slug: "shim-mcp", install: "wp shim-mcp serve", mustInclude: ["56 项能力", "Abilities API", "wp shim-mcp serve", "逐对象权限复查"] },
];
const mcpWithConfig142 = ["openreality"];
for (const entry of dailyEntries142) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig142.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  } else if (html.includes("MCP 配置")) {
    throw new Error(`${entry.slug} 出现不应存在的 MCP 配置块`);
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-147：本批 4 条应用 / 1 条 SKILL / 1 条 MCP 使用官方视觉合成的编辑卡片，须保留事实边界及对应获取入口。
const dailyEntries147 = [
  { slug: "openclaw", install: null, mustInclude: ["MIT", "20+ 渠道", "系统级权限授予", "ClawHub"] },
  { slug: "pi", install: null, mustInclude: ["pi-agent-core", "Docker", "Hugging Face", "API 凭据"] },
  { slug: "text-to-cad", install: "npx skills add earthtojake/text-to-cad", mustInclude: ["STEP", "DfAM", "Bambu Labs", "专业校核"] },
  { slug: "graphify", install: null, mustInclude: ["EXTRACTED", "tree-sitter", "官方宣称", "Apache-2.0 与 MIT 双许可"] },
  { slug: "serena", install: "uv tool install -p 3.13 serena-agent", mustInclude: ["GPL-3.0-or-later", "SolidLSP", "JetBrains 插件为付费", "版本控制"] },
  { slug: "openresearch", install: null, mustInclude: ["Autoresearch", "git worktree", "Slurm", "人工复核"] },
];
const mcpWithConfig147 = [];
for (const entry of dailyEntries147) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig147.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  } else if (html.includes("MCP 配置")) {
    throw new Error(`${entry.slug} 出现不应存在的 MCP 配置块`);
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-156：本批 3 条应用 / 1 条 SKILL 使用官方视觉合成的编辑卡片，须保留事实边界及对应获取入口。
const dailyEntries156 = [
  { slug: "hyperframes", install: null, mustInclude: ["Apache-2.0", "FFmpeg", "确定性", "HeyGen"] },
  { slug: "humanizer", install: "npx skills add blader/humanizer --global", mustInclude: ["MIT", "25 类", "声线匹配", "中文文本改写效果未知"] },
  { slug: "openmaic", install: null, mustInclude: ["MIT", "多智能体", "PBL", "AGPL-3.0"] },
  { slug: "context-mode", install: null, mustInclude: ["ELv2", "Elastic License 2.0", "官方口径", "沙箱"] },
];
const mcpWithConfig156 = [];
for (const entry of dailyEntries156) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig156.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  } else if (html.includes("MCP 配置")) {
    throw new Error(`${entry.slug} 出现不应存在的 MCP 配置块`);
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-160：本批 4 条 SKILL 与 1 条 MCP（含配置块）使用编辑卡片，其中 2 张为原创示意图，须保留事实边界及对应获取入口。
const dailyEntries160 = [
  { slug: "gongwen-gbt9704-skill", install: "git clone https://github.com/mizzlelover/gongwen-gbt9704-skill.git", mustInclude: ["GB/T 9704", "--org", "涉密", "MIT"] },
  { slug: "pcb-skill", install: "git clone https://github.com/daishuge/pcb-skill.git &amp;&amp; cd pcb-skill &amp;&amp; mkdir -p ~/.claude/skills/pcb &amp;&amp; cp -R skills/pcb/. scripts setup ~/.claude/skills/pcb/", mustInclude: ["EasyEDA Pro", "门控", "止步于支付页", "setup/README.md"] },
  { slug: "motion-web", install: "git clone https://github.com/feitangyuan/motion-web.git ~/.claude/skills/motion-web", mustInclude: ["Cases 7/7 PASS", "CC BY-NC 4.0", "SIL Open Font License", "Headless"] },
  { slug: "skillbox", install: "git clone https://github.com/kitze/skillbox.git &amp;&amp; cd skillbox &amp;&amp; bash scripts/skillbox.sh setup &amp;&amp; bash scripts/skillbox.sh start", mustInclude: ["AES-256-GCM", "SKILLBOX_ADMIN_TOKEN", "Docker Compose", "成熟度未知"] },
  { slug: "jev-review", install: "npx plugins add NiazMorshed2007/jev-review --target claude-code", mustInclude: ["Correctness", "Node.js 20+", "System One", "本地优先"] },
];
const mcpWithConfig160 = ["jev-review"];
for (const entry of dailyEntries160) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig160.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  } else if (html.includes("MCP 配置")) {
    throw new Error(`${entry.slug} 出现不应存在的 MCP 配置块`);
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-162：本批 2 条 APP、3 条 SKILL 与 1 条 MCP（含配置块）使用编辑卡片，须保留事实边界及对应获取入口。
const dailyEntries162 = [
  { slug: "agent-skills", install: "npx skills add addyosmani/agent-skills", mustInclude: ["96,882", "反合理化表", "验证不可协商", "Hyrum"] },
  { slug: "weknora", install: null, mustInclude: ["27,364", "ReAct Agent", "Tencent 附加条款", "内网"] },
  { slug: "jianying-headless", install: "git clone https://github.com/mcncarl/jianying-headless.git &amp;&amp; cd jianying-headless &amp;&amp; python3 tools/build_native_codec.py", mustInclude: ["1,481", "11.5.0", "Apple Silicon", "非商业使用许可"] },
  { slug: "easel", install: null, mustInclude: ["1,238", "六维画像", "Apache-2.0", "账号风控"] },
  { slug: "huashu-report", install: "git clone https://github.com/alchaincyf/huashu-report ~/.claude/skills/huashu-report", mustInclude: ["409", "42 份", "四角色", "中文语境行文习惯需自行校对"] },
  { slug: "blitzstrike", install: "npx -y blitzstrike install", mustInclude: ["637", "scope_check", "CVSS v3.1", "仅限授权测试"] },
];
const mcpWithConfig162 = ["blitzstrike"];
for (const entry of dailyEntries162) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig162.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  } else if (html.includes("MCP 配置")) {
    throw new Error(`${entry.slug} 出现不应存在的 MCP 配置块`);
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-164：本批 3 条 SKILL 与 3 条 APP 使用编辑卡片，须保留事实边界及对应获取入口。
const dailyEntries164 = [
  { slug: "taste-skill", install: "npx skills add https://github.com/Leonxlnx/taste-skill", mustInclude: ["反 slop", "设计品味", "Kimi（Moonshot AI）", "MIT"] },
  { slug: "world-monitor", install: null, mustInclude: ["地缘监测", "基础设施追踪", "AGPL-3.0", "worldmonitor.app"] },
  { slug: "appllama-skills", install: "npx skills@latest add appllama/appllama-skills", mustInclude: ["畅销应用", "活跃度偏弱", "appllama.io", "MIT"] },
  { slug: "ai-data-extractor", install: null, mustInclude: ["Claude Code", "Windsurf", "保管责任在用户", "MIT"] },
  { slug: "orcareplay", install: null, mustInclude: ["回放", "分叉", "脱敏", "Apache-2.0"] },
  { slug: "gap-trap", install: "npx skills add pliablepixels/gap-trap", mustInclude: ["门控", "vibe coding", "pliablepixels.github.io/gap-trap", "MIT"] },
];
const mcpWithConfig164 = [];
for (const entry of dailyEntries164) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig164.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-166：本批 5 条 APP、4 条 SKILL 与 1 条 MCP 使用编辑卡片，须保留事实边界及对应获取入口。
const dailyEntries166 = [
  { slug: "zcode", install: null, mustInclude: ["5,426", "CCSwitch", "成熟度未知"] },
  { slug: "cua", install: null, mustInclude: ["25,597", "权限边界"] },
  { slug: "claude-financial-services", install: "作为 Claude Cowork 插件安装，或通过 Claude Managed Agents API 部署（官方 README 两种接入方式）。", mustInclude: ["Cowork", "非投资建议"] },
  { slug: "agent-native", install: null, mustInclude: ["Builder.io", "许可证未声明"] },
  { slug: "autoclip", install: null, mustInclude: ["anything2explainer", "版权由用户自查"] },
  { slug: "geo-sleuth", install: "npx skills add Oldcircle/geo-sleuth", mustInclude: ["233 星", "合规使用"] },
  { slug: "guizang-product-video-skill", install: "npx skills add https://github.com/op7418/guizang-product-video-skill --skill guizang-product-video-skill", mustInclude: ["AGPL-3.0", "video-shotcraft"] },
  { slug: "post-production-skill", install: "mkdir -p ~/.codex/skills &amp;&amp; cp -R post-production-skill ~/.codex/skills/sd-2-5-retro-vfx", mustInclude: ["Seedance 2.5", "许可证未声明"] },
  { slug: "clipmivoai-tools", install: "npm install -g https://github.com/BarneyD66/clipmivo-tools/releases/download/v0.1.1/clipmivo-mcp-0.1.8.tgz", mustInclude: ["OpenAPI", "账号余额计费"] },
  { slug: "open-glean", install: null, mustInclude: ["Hydra DB", "稳定性未知"] },
];
const mcpWithConfig166 = ["clipmivoai-tools"];
for (const entry of dailyEntries166) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig166.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-127：本批 8 条应用/SKILL 与 2 条 MCP 共用原创主图，须保留事实边界及对应获取入口。
const dailyEntries127 = [
  { slug: "hermes-agent", install: null, mustInclude: ["Nous Research", "Token 与消息权限", "仿冒风险"] },
  { slug: "ponytail", install: "/plugin install ponytail@ponytail", mustInclude: ["YAGNI", "作者侧报告", "未经独立复核"] },
  { slug: "voicestudio", install: null, mustInclude: ["CC-BY-NC", "声音肖像权利", "AGPL-3.0"] },
  { slug: "video-use", install: "cd ~/Developer/video-use &amp;&amp; uv sync", mustInclude: ["ElevenLabs", "API Key", "已授权内容"] },
  { slug: "atlas", install: null, mustInclude: [".atlas/sessions.db", "成熟度待观察", "macOS"] },
  { slug: "patent-disclosure-skill", install: "python -m pip install -r .claude/skills/patent-disclosure-skill/requirements.txt", mustInclude: ["专利代理师复核", "公开数据库覆盖度", "MIT"] },
  { slug: "firecrawl-skill", install: "npx skills add firecrawl/skills", mustInclude: ["许可证未知", "robots", "API Key"] },
  { slug: "sie", install: null, mustInclude: ["匿名遥测", "SIE_TELEMETRY_DISABLED=1", "GPU"] },
];

// RUYI-137：本批 2 条 SKILL 与 2 条应用共用原创主图，须保留事实边界及对应获取入口。
const dailyEntries137 = [
  { slug: "superpowers", install: "/plugin install superpowers@claude-plugins-official", mustInclude: ["285,712★", "SUPERPOWERS_DISABLE_TELEMETRY", "RED-GREEN-REFACTOR"] },
  { slug: "i-have-adhd", install: "Install the i-have-adhd skill/plugin from https://github.com/ayghri/i-have-adhd, refer to the repo&#39;s AGENTS.md for instructions.", mustInclude: ["10 条输出规则", "No ADHD diagnosis needed", "43,206★"] },
  { slug: "mathmodelagent", install: null, mustInclude: ["请勿商业用途", "学术诚信风险", "17 套竞赛论文模板"] },
  { slug: "pascal-editor", install: null, mustInclude: ["pascal mcp connect", "AI credits", "IFC"] },
];
for (const entry of dailyEntries137) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "插图：AIHub 原创设计",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 原创插图出现外部图片来源图注`);
  if (html.includes("MCP 配置")) throw new Error(`${entry.slug} 非 MCP 条目出现 MCP 配置块`);
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

for (const entry of dailyEntries127) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "插图：AIHub 原创设计",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 原创插图出现外部图片来源图注`);
  if (html.includes("MCP 配置")) throw new Error(`${entry.slug} 非 MCP 条目出现 MCP 配置块`);
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// RUYI-168：本批 2 条 APP 与 1 条 SKILL 使用编辑卡片（taste-skill 为在库条目替换更新，口径沿用 dailyEntries164）。
// APP 详情页模板不渲染安装复制块（安装命令保留在 seed installGuide 与正文），install 置 null 走无复制块断言。
const dailyEntries168 = [
  { slug: "ecc", install: null, mustInclude: ["harness", "★265,247", "ecc.tools", "$19/席/月", "MIT"] },
  { slug: "deepseek-reasonix", install: null, mustInclude: ["并非 DeepSeek 官方", "reasonix.io", "★35,676", "MIT"] },
  { slug: "book-to-skill", install: "npx skills add virgiliojr94/book-to-skill", mustInclude: ["技术书", "★31,981", "个人项目", "MIT"] },
];
const mcpWithConfig168 = [];
for (const entry of dailyEntries168) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
  if (!fs.existsSync(path.join(root, "media", `${entry.slug}.png`))) {
    throw new Error(`${entry.slug} 缺少静态主图`);
  }
  for (const value of [
    "detail-visual", "核心能力", "适合谁", `media/${entry.slug}.png`, "卡片：AIHub 编辑制作",
    'rel="noopener nofollow"', ...entry.mustInclude,
  ]) {
    if (!html.includes(value)) throw new Error(`${entry.slug} 详情页缺少完整内容：${value}`);
  }
  if (html.includes("图片来源：")) throw new Error(`${entry.slug} 卡片条目出现外部图片来源图注`);
  if (mcpWithConfig168.includes(entry.slug)) {
    if (!html.includes("MCP 配置") || !html.includes('data-copy="mcp-config"')) {
      throw new Error(`${entry.slug} 详情页缺少 MCP 配置块`);
    }
  }
  if (entry.install) {
    if (!html.includes(entry.install)) throw new Error(`${entry.slug} 详情页缺少官方安装命令`);
    if (!html.includes('data-copy="install-guide"')) throw new Error(`${entry.slug} 详情页缺少安装命令复制块`);
  } else if (html.includes("copy-section")) {
    throw new Error(`${entry.slug} 应用类详情页出现不应存在的复制块`);
  }
}

// Feature 图位是双图原创插图条目专属，其余详情页不得因此出现空图位。
const featureArtSlugs = ["ai-research-skills", "gmail-creator-pro"];
// 原创插图条目用 imageCredit 图注，不得生成外部图片来源。
const originalArtSlugs = [
  ...featureArtSlugs,
  ...mcpEntries.map((entry) => entry.slug),
  ...dailyEntries125.map((entry) => entry.slug),
  ...dailyEntries127.map((entry) => entry.slug),
  ...dailyEntries137.map((entry) => entry.slug),
  ...dailyEntries142.map((entry) => entry.slug),
  ...dailyEntries147.map((entry) => entry.slug),
  ...dailyEntries156.map((entry) => entry.slug),
  ...dailyEntries160.map((entry) => entry.slug),
  ...dailyEntries162.map((entry) => entry.slug),
  ...dailyEntries164.map((entry) => entry.slug),
  ...dailyEntries166.map((entry) => entry.slug),
  ...dailyEntries168.map((entry) => entry.slug),
];
for (const slug of fs.readdirSync(path.join(root, "r")).filter((name) => !featureArtSlugs.includes(name))) {
  const html = fs.readFileSync(path.join(root, "r", slug, "index.html"), "utf8");
  if (html.includes("detail-feature")) throw new Error(`${slug} 出现不应存在的 Feature 图位`);
  if (!originalArtSlugs.includes(slug) && !html.includes("图片来源：")) {
    throw new Error(`${slug} 丢失外部图片来源图注`);
  }
}
if (/<img src="[^"]*"[^>]*>/.test(research) === false) throw new Error("AI Research Skills 详情页图片标签缺失");
if (research.includes('src="../../"') || research.includes('alt=""')) throw new Error("AI Research Skills 详情页存在空图位或空替代文本");

console.log(`PASS GitHub Pages 产物结构、${cardCount} 个种子、详情图片与完整正文校验`);

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
];
for (const entry of mcpEntries) {
  const html = fs.readFileSync(path.join(root, "r", entry.slug, "index.html"), "utf8");
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

// Feature 图位是双图原创插图条目专属，其余详情页不得因此出现空图位。
const featureArtSlugs = ["ai-research-skills", "gmail-creator-pro"];
// 原创插图条目用 imageCredit 图注，不得生成外部图片来源。
const originalArtSlugs = [
  ...featureArtSlugs,
  ...mcpEntries.map((entry) => entry.slug),
  ...dailyEntries125.map((entry) => entry.slug),
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

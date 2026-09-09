import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "dist-pages");
const required = [
  "index.html",
  "404.html",
  ".nojekyll",
  "assets/pages.css",
  "r/doubao/index.html",
  "r/codex-plus-plus/index.html",
  "r/ai-toolbox/index.html",
  "r/ai-research-skills/index.html",
  "media/doubao-cover.png",
  "media/claude.jpg",
  "media/workbuddy.png",
  "media/ccswitch.png",
  "media/ai-toolbox.png",
  "media/ai-research-skills-hero.png",
  "media/ai-research-skills-feature.png",
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Pages 产物缺失：${file}`);
  }
}

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const value of ["豆包", "Codex++", "Claude", "WorkBuddy", "Multica", "CCSwitch", "AI Toolbox", "AI Research Skills", "data-resource", "search-input"]) {
  if (!home.includes(value)) throw new Error(`首页缺少：${value}`);
}

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
// Feature 图位是本条资源专属，其余详情页不得因此出现空图位。
for (const slug of fs.readdirSync(path.join(root, "r")).filter((name) => name !== "ai-research-skills")) {
  const html = fs.readFileSync(path.join(root, "r", slug, "index.html"), "utf8");
  if (html.includes("detail-feature")) throw new Error(`${slug} 出现不应存在的 Feature 图位`);
  if (!html.includes("图片来源：")) throw new Error(`${slug} 丢失外部图片来源图注`);
}
if (/<img src="[^"]*"[^>]*>/.test(research) === false) throw new Error("AI Research Skills 详情页图片标签缺失");
if (research.includes('src="../../"') || research.includes('alt=""')) throw new Error("AI Research Skills 详情页存在空图位或空替代文本");

console.log(`PASS GitHub Pages 产物结构、${cardCount} 个种子、详情图片与完整正文校验`);

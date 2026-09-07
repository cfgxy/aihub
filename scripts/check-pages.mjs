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
  "media/doubao-cover.png",
  "media/claude.jpg",
  "media/workbuddy.png",
  "media/ccswitch.png",
  "media/ai-toolbox.png",
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Pages 产物缺失：${file}`);
  }
}

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const value of ["豆包", "Codex++", "Claude", "WorkBuddy", "Multica", "CCSwitch", "AI Toolbox", "data-resource", "search-input"]) {
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

console.log(`PASS GitHub Pages 产物结构、${cardCount} 个种子、详情图片与完整正文校验`);

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
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Pages 产物缺失：${file}`);
  }
}

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const value of ["豆包", "Codex++", "Claude", "WorkBuddy", "Multica", "CCSwitch", "data-resource", "search-input"]) {
  if (!home.includes(value)) throw new Error(`首页缺少：${value}`);
}

const details = fs.readdirSync(path.join(root, "r"));
if (details.length !== 7) throw new Error(`详情页数量错误：${details.length}`);

console.log("PASS GitHub Pages 产物结构、7 个种子与详情页校验");

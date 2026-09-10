import fs from "node:fs";
import { chromium } from "playwright-core";

const executablePath = [
  "/home/guxy/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
  "/home/guxy/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find(fs.existsSync);
if (!executablePath) throw new Error("未找到 Chromium 可执行文件");

const dynamicBase = process.env.AIHUB_URL || "http://127.0.0.1:4310";
const pagesBase = process.env.PAGES_URL || "http://127.0.0.1:4321/aihub/";
const browser = await chromium.launch({ executablePath, headless: true, args: ["--disable-gpu"] });

/** RUYI-124 两条 MCP 的验收终点：配置与安装命令都能复制，插图与原创图注正确。 */
const entries = [
  {
    slug: "papergraph-mcp",
    name: "PaperGraph MCP",
    install: "uvx --from git+https://github.com/lotchuazzz-crypto/papergraph-mcp.git@v0.10.0 papergraph-mcp",
    configKeyword: '"papergraph"',
  },
  {
    slug: "computer-use-mcp",
    name: "computer-use-mcp",
    install: "npx -y @zavora-ai/computer-use-mcp",
    configKeyword: '"computer-use"',
  },
];

async function checkDetail(page, url, label, entry, shot) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "核心能力" }).waitFor();

  const metrics = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  if (metrics.scroll > metrics.width + 1) throw new Error(`${label} ${entry.slug} 横向溢出：${metrics.scroll} > ${metrics.width}`);

  const loaded = await page.locator(".detail-visual img").evaluate((image) => image.complete && image.naturalWidth > 0);
  if (!loaded) throw new Error(`${label} ${entry.slug} 插图未加载`);
  const caption = (await page.locator(".detail-visual figcaption").innerText()).trim();
  if (caption !== "插图：AIHub 原创设计") throw new Error(`${label} ${entry.slug} 图注错误：${caption}`);

  const blocks = page.locator(".copy-section");
  if (await blocks.count() !== 2) throw new Error(`${label} ${entry.slug} 复制块数量错误：${await blocks.count()}`);
  const labels = await page.locator(".copy-heading span").allInnerTexts();
  if (labels.join("|") !== "MCP 配置|安装命令") throw new Error(`${label} ${entry.slug} 复制块顺序错误：${labels}`);

  const config = (await blocks.nth(0).locator("code").innerText()).trim();
  if (!config.includes(entry.configKeyword)) throw new Error(`${label} ${entry.slug} 配置缺少服务名：${entry.configKeyword}`);
  JSON.parse(config);
  const install = (await blocks.nth(1).locator("code").innerText()).trim();
  if (install !== entry.install) throw new Error(`${label} ${entry.slug} 安装命令错误：${install}`);

  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  for (const [index, expected] of [[0, config], [1, entry.install]]) {
    await blocks.nth(index).getByRole("button", { name: "复制" }).click();
    await page.waitForFunction((i) => document.querySelectorAll(".copy-section button")[i].textContent.includes("已复制"), index);
    const clipboard = (await page.evaluate(() => navigator.clipboard.readText())).trim();
    if (clipboard !== expected) throw new Error(`${label} ${entry.slug} 第 ${index + 1} 块复制内容错误`);
  }

  const body = await page.locator("body").innerText();
  if (body.includes("请在管理页补充")) throw new Error(`${label} ${entry.slug} 出现管理员占位文案`);
  if (body.includes("图片来源")) throw new Error(`${label} ${entry.slug} 原创插图出现外部来源图注`);

  const rel = await page.locator(".primary-link").first().getAttribute("rel");
  const target = await page.locator(".primary-link").first().getAttribute("target");
  if (target !== "_blank" || !rel.includes("noopener") || !rel.includes("nofollow")) {
    throw new Error(`${label} ${entry.slug} 外链属性错误：target=${target} rel=${rel}`);
  }

  if (shot) await page.screenshot({ path: shot, fullPage: true });
  console.log(`PASS ${label} ${entry.name} 详情页配置/命令复制、插图与外链`);
}

/** 未录入配置的既有 MCP 不得出现空配置块。 */
async function checkNoConfigBlock(page, url, label) {
  await page.goto(url, { waitUntil: "networkidle" });
  const labels = await page.locator(".copy-heading span").allInnerTexts();
  if (labels.includes("MCP 配置")) throw new Error(`${label} x64dbg-mcp-server 出现不应存在的 MCP 配置块`);
  const body = await page.locator("body").innerText();
  if (body.includes("请在管理页补充")) throw new Error(`${label} x64dbg-mcp-server 出现管理员占位文案`);
  console.log(`PASS ${label} 未配置 MCP 无空配置块`);
}

const shotDir = process.env.SHOT_DIR;
try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  for (const entry of entries) {
    await checkDetail(desktop, `${dynamicBase}/r/${entry.slug}`, "动态版", entry, shotDir && `${shotDir}/${entry.slug}-dynamic.png`);
    await checkDetail(desktop, `${pagesBase}r/${entry.slug}/`, "Pages 版", entry, shotDir && `${shotDir}/${entry.slug}-pages.png`);
    await checkDetail(mobile, `${pagesBase}r/${entry.slug}/`, "Pages 移动版", entry, shotDir && `${shotDir}/${entry.slug}-pages-mobile.png`);
  }
  await checkNoConfigBlock(desktop, `${dynamicBase}/r/x64dbg-mcp-server`, "动态版");
  await checkNoConfigBlock(desktop, `${pagesBase}r/x64dbg-mcp-server/`, "Pages 版");

  // 目录与分类筛选：两条新资源在 MCP 区块及各自分类下可达。
  for (const [url, label] of [[dynamicBase, "动态版"], [pagesBase, "Pages 版"]]) {
    await desktop.goto(url, { waitUntil: "networkidle" });
    for (const entry of entries) {
      // 动态版与静态版的卡片挂点不同，统一按详情页链接判定收录。
      await desktop.locator(`a[href$="${entry.slug}"], a[href$="${entry.slug}/"]`).first().waitFor();
    }
    console.log(`PASS ${label} 首页收录两条新 MCP`);
  }

  await desktop.goto(`${dynamicBase}/t/mcp/c/ai-knowledge`, { waitUntil: "networkidle" });
  await desktop.getByRole("link", { name: /PaperGraph MCP/ }).first().waitFor();
  await desktop.goto(`${dynamicBase}/t/mcp/c/development-code`, { waitUntil: "networkidle" });
  await desktop.getByRole("link", { name: /computer-use-mcp/ }).first().waitFor();
  console.log("PASS 动态版分类列表页可达");

  console.log("PASS RUYI-124 两条 MCP 详情、复制块、插图与目录可达性");
} finally {
  await browser.close();
}

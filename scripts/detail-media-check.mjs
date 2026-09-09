import fs from "node:fs";
import { chromium } from "playwright-core";

const executablePath = [
  "/home/guxy/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
  "/home/guxy/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find(fs.existsSync);
if (!executablePath) throw new Error("未找到 Chromium 可执行文件");

const dynamicBase = process.env.AIHUB_URL || "http://127.0.0.1:4310";
const pagesBase = process.env.PAGES_URL || "http://127.0.0.1:4320/aihub/";
const browser = await chromium.launch({ executablePath, headless: true, args: ["--disable-gpu"] });

async function assertNoOverflow(page, label) {
  const metrics = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  if (metrics.scroll > metrics.width + 1) throw new Error(`${label} 横向溢出：${metrics.scroll} > ${metrics.width}`);
}

async function checkDetail(page, url, label, shot) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "核心能力" }).waitFor();
  await assertNoOverflow(page, label);

  for (const selector of [".detail-visual img", ".detail-feature img"]) {
    const ok = await page.locator(selector).evaluate((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0);
    if (!ok) throw new Error(`${label} ${selector} 未加载`);
  }
  const caption = await page.locator(".detail-visual figcaption").innerText();
  if (caption.trim() !== "插图：AIHub 原创设计") throw new Error(`${label} Hero 图注错误：${caption}`);
  if (caption.includes("图片来源")) throw new Error(`${label} 原创插图出现外部来源图注`);

  // Feature 必须落在「核心能力」标题之前。
  const order = await page.evaluate(() => {
    const feature = document.querySelector(".detail-feature");
    const heading = [...document.querySelectorAll("h3")].find((node) => node.textContent.trim() === "核心能力");
    return feature.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING ? "before" : "after";
  });
  if (order !== "before") throw new Error(`${label} Feature 图未落在「核心能力」标题前`);

  if (shot) await page.screenshot({ path: shot, fullPage: true });
  console.log(`PASS ${label}`);
}

async function checkNoFeature(page, url, label) {
  await page.goto(url, { waitUntil: "networkidle" });
  if (await page.locator(".detail-feature").count()) throw new Error(`${label} 出现不应存在的 Feature 图位`);
  const caption = await page.locator(".detail-visual figcaption").innerText();
  if (!caption.includes("图片来源")) throw new Error(`${label} 外部来源图注回归`);
  console.log(`PASS ${label} 图注与图位未回归`);
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await checkDetail(desktop, `${dynamicBase}/r/ai-research-skills`, "动态版详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/dynamic-desktop.png` : undefined);
  await checkNoFeature(desktop, `${dynamicBase}/r/claude`, "动态版既有资源");

  // 新分类导航可达。
  await desktop.goto(`${dynamicBase}/t/skill/c/ai-research-workflow`, { waitUntil: "networkidle" });
  await desktop.getByRole("link", { name: /AI Research Skills/ }).first().waitFor();
  console.log("PASS 动态版新分类列表页可达");

  // SKILL 安装命令复制块。
  await desktop.goto(`${dynamicBase}/r/ai-research-skills`, { waitUntil: "networkidle" });
  const install = await desktop.locator(".copy-block, pre, code").filter({ hasText: "npx @orchestra-research/ai-research-skills" }).count();
  if (!install) throw new Error("详情页缺少官方安装命令复制块");
  console.log("PASS 动态版安装命令复制块");

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  await checkDetail(mobile, `${dynamicBase}/r/ai-research-skills`, "动态版移动详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/dynamic-mobile.png` : undefined);

  const pages = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await checkDetail(pages, `${pagesBase}r/ai-research-skills/`, "Pages 详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/pages-desktop.png` : undefined);
  await checkNoFeature(pages, `${pagesBase}r/claude/`, "Pages 既有资源");

  const pagesMobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  await checkDetail(pagesMobile, `${pagesBase}r/ai-research-skills/`, "Pages 移动详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/pages-mobile.png` : undefined);

  console.log("PASS RUYI-111 详情页原创图注、Feature 图位、既有行为不回归");
} finally {
  await browser.close();
}

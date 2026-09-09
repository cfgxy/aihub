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

const INSTALL_COMMAND = "npx @orchestra-research/ai-research-skills";

/** SKILL 的核心获取路径：安装命令必须可见，且复制按钮真的把命令写进剪贴板。 */
async function checkInstall(page, url, label) {
  await page.goto(url, { waitUntil: "networkidle" });
  const block = page.locator(".copy-section").filter({ hasText: INSTALL_COMMAND });
  if (!(await block.count())) throw new Error(`${label} 详情页缺少官方安装命令复制块`);
  const text = (await block.locator("code").first().innerText()).trim();
  if (text !== INSTALL_COMMAND) throw new Error(`${label} 安装命令文本错误：${text}`);

  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await block.getByRole("button", { name: "复制" }).click();
  await page.waitForFunction(() => document.querySelector(".copy-section button").textContent.includes("已复制"));
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  if (clipboard.trim() !== INSTALL_COMMAND) throw new Error(`${label} 复制内容错误：${clipboard}`);
  console.log(`PASS ${label}安装命令复制块与复制行为`);
}

/** 高风险条目：CTA 必须中性，且详情页不得出现安装复制块。 */
async function checkGmail(page, url, label) {
  await page.goto(url, { waitUntil: "networkidle" });
  const cta = (await page.locator(".primary-link").first().innerText()).trim();
  if (!cta.startsWith("查看来源仓库")) throw new Error(`${label} Gmail Creator Pro CTA 错误：${cta}`);
  if (await page.locator(".copy-section").count()) throw new Error(`${label} 高风险条目出现安装复制块`);
  const body = await page.locator("body").innerText();
  for (const banned of ["前往官方下载", "明令禁止", "npx "]) {
    if (body.includes(banned)) throw new Error(`${label} Gmail Creator Pro 出现禁止内容：${banned}`);
  }
  console.log(`PASS ${label} Gmail Creator Pro CTA 与内容边界`);
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await checkDetail(desktop, `${dynamicBase}/r/ai-research-skills`, "动态版详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/dynamic-desktop.png` : undefined);
  await checkNoFeature(desktop, `${dynamicBase}/r/claude`, "动态版既有资源");

  // 新分类导航可达。
  await desktop.goto(`${dynamicBase}/t/skill/c/ai-research-workflow`, { waitUntil: "networkidle" });
  await desktop.getByRole("link", { name: /AI Research Skills/ }).first().waitFor();
  console.log("PASS 动态版新分类列表页可达");

  await checkInstall(desktop, `${dynamicBase}/r/ai-research-skills`, "动态版");

  await checkDetail(desktop, `${dynamicBase}/r/gmail-creator-pro`, "动态版 Gmail 详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/gmail-dynamic-desktop.png` : undefined);
  await checkGmail(desktop, `${dynamicBase}/r/gmail-creator-pro`, "动态版");

  // 新增 app 分类「其他」导航可达。
  await desktop.goto(`${dynamicBase}/t/app/c/others`, { waitUntil: "networkidle" });
  await desktop.getByRole("link", { name: /Gmail Creator Pro/ }).first().waitFor();
  console.log("PASS 动态版「其他」分类列表页可达");

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  await checkDetail(mobile, `${dynamicBase}/r/ai-research-skills`, "动态版移动详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/dynamic-mobile.png` : undefined);

  const pages = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await checkDetail(pages, `${pagesBase}r/ai-research-skills/`, "Pages 详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/pages-desktop.png` : undefined);
  await checkInstall(pages, `${pagesBase}r/ai-research-skills/`, "Pages 版");
  await checkNoFeature(pages, `${pagesBase}r/claude/`, "Pages 既有资源");
  await checkDetail(pages, `${pagesBase}r/gmail-creator-pro/`, "Pages Gmail 详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/gmail-pages-desktop.png` : undefined);
  await checkGmail(pages, `${pagesBase}r/gmail-creator-pro/`, "Pages 版");

  // 应用类资源没有安装命令，两版都不得因此出现空复制块。
  for (const [url, label] of [[`${dynamicBase}/r/doubao`, "动态版"], [`${pagesBase}r/doubao/`, "Pages 版"]]) {
    await pages.goto(url, { waitUntil: "networkidle" });
    if (await pages.locator(".copy-section").count()) throw new Error(`${label} 应用详情页出现不应存在的复制块`);
  }
  console.log("PASS 应用类详情页无空复制块");

  const pagesMobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  await checkDetail(pagesMobile, `${pagesBase}r/ai-research-skills/`, "Pages 移动详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/pages-mobile.png` : undefined);
  await checkDetail(pagesMobile, `${pagesBase}r/gmail-creator-pro/`, "Pages Gmail 移动详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/gmail-pages-mobile.png` : undefined);
  await checkDetail(mobile, `${dynamicBase}/r/gmail-creator-pro`, "动态版 Gmail 移动详情", process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/gmail-dynamic-mobile.png` : undefined);

  console.log("PASS RUYI-111 详情页原创图注、Feature 图位、既有行为不回归");
} finally {
  await browser.close();
}

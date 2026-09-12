import fs from "node:fs";
import { chromium } from "playwright-core";

const executablePath = [
  "/home/guxy/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
  "/home/guxy/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find(fs.existsSync);
if (!executablePath) throw new Error("未找到 Chromium 可执行文件");

const dynamicBase = process.env.AIHUB_URL || "http://127.0.0.1:4310";
const pagesBase = process.env.PAGES_URL || "http://127.0.0.1:4321/aihub/";
const entries = [
  {
    slug: "video-use",
    installGuide: `git clone https://github.com/browser-use/video-use ~/Developer/video-use
ln -sfn ~/Developer/video-use ~/.claude/skills/video-use
cd ~/Developer/video-use && uv sync && brew install ffmpeg && cp .env.example .env`,
  },
  {
    slug: "patent-disclosure-skill",
    installGuide: `mkdir -p .claude/skills && git clone https://github.com/handsomestWei/patent-disclosure-skill .claude/skills/patent-disclosure-skill
python -m pip install -r .claude/skills/patent-disclosure-skill/requirements.txt`,
  },
];

async function checkSkill(page, url, label, entry) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "核心能力" }).waitFor();

  const metrics = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  if (metrics.scroll > metrics.width + 1) throw new Error(`${label} ${entry.slug} 横向溢出：${metrics.scroll} > ${metrics.width}`);

  const image = page.locator(".detail-visual img");
  if (!await image.evaluate((element) => element.complete && element.naturalWidth > 0 && element.naturalHeight > 0)) {
    throw new Error(`${label} ${entry.slug} 原创主图未加载`);
  }
  const caption = (await page.locator(".detail-visual figcaption").innerText()).trim();
  if (caption !== "插图：AIHub 原创设计") throw new Error(`${label} ${entry.slug} 图注错误：${caption}`);

  const install = page.locator(".copy-section").filter({ hasText: "安装说明" });
  if (await install.count() !== 1) throw new Error(`${label} ${entry.slug} 安装说明复制块数量错误`);
  const text = (await install.locator("code").innerText()).trim();
  if (text !== entry.installGuide) throw new Error(`${label} ${entry.slug} 安装命令文本错误：${text}`);

  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await install.getByRole("button", { name: "复制" }).click();
  await page.waitForFunction(() => document.querySelector(".copy-section button")?.textContent?.includes("已复制"));
  const clipboard = (await page.evaluate(() => navigator.clipboard.readText())).trim();
  if (clipboard !== entry.installGuide) throw new Error(`${label} ${entry.slug} 安装命令复制内容错误`);

  const link = page.locator(".primary-link").first();
  if (await link.getAttribute("target") !== "_blank" || !(await link.getAttribute("rel"))?.includes("noopener") || !(await link.getAttribute("rel"))?.includes("nofollow")) {
    throw new Error(`${label} ${entry.slug} 外链属性错误`);
  }
  console.log(`PASS ${label} ${entry.slug} 安装说明复制、主图与外链`);
}

const browser = await chromium.launch({ executablePath, headless: true, args: ["--disable-gpu"] });
try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const entry of entries) {
    await checkSkill(desktop, `${dynamicBase}/r/${entry.slug}`, "动态版", entry);
    await checkSkill(desktop, `${pagesBase}r/${entry.slug}/`, "Pages 版", entry);
  }
  console.log("PASS RUYI-127 SKILL 安装说明复制与详情主图验收");
} finally {
  await browser.close();
}

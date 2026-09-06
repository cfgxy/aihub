import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const project = process.cwd();
const envText = fs.readFileSync(path.join(project, ".env.local"), "utf8");
const adminPassword = envText.match(/^ADMIN_PASSWORD=(.+)$/m)?.[1];
if (!adminPassword) throw new Error(".env.local 缺少 ADMIN_PASSWORD");

const executablePath = [
  "/home/guxy/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
  "/home/guxy/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
  "/home/guxy/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome",
  "/home/guxy/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
].find(fs.existsSync);
if (!executablePath) throw new Error("未找到 Chromium 可执行文件");

const base = process.env.AIHUB_URL || "http://127.0.0.1:4310";
const browser = await chromium.launch({ executablePath, headless: true, args: ["--disable-gpu"] });

async function assertNoOverflow(page, label) {
  const metrics = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  if (metrics.scroll > metrics.width + 1) throw new Error(`${label} 横向溢出：${metrics.scroll} > ${metrics.width}`);
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(base, { waitUntil: "networkidle" });
  await desktop.getByRole("heading", { name: "找到真正好用的 AI 资源" }).waitFor();
  await assertNoOverflow(desktop, "桌面首页");
  const search = desktop.getByLabel("搜索资源").last();
  await search.fill("豆包");
  await search.press("Enter");
  await desktop.getByRole("heading", { name: /“豆包” 的搜索结果/ }).waitFor();
  await desktop.getByRole("link", { name: /豆包/ }).click();
  const external = desktop.getByRole("link", { name: /前往官方下载/ });
  if ((await external.getAttribute("rel")) !== "noopener nofollow") throw new Error("外链 rel 不符合要求");

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  await mobile.goto(base, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "移动首页");
  await mobile.goto(`${base}/r/claude`, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "移动详情页");

  const admin = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await admin.goto(`${base}/admin/login`);
  await admin.getByLabel("管理口令").fill(adminPassword);
  await Promise.all([admin.waitForURL(`${base}/admin`), admin.getByRole("button", { name: "登录" }).click()]);
  await admin.getByRole("heading", { name: "资源条目" }).waitFor();
  await admin.goto(`${base}/admin?new=1`);
  await admin.getByLabel("名称 *").fill("浏览器验收 SKILL");
  await admin.getByLabel("Slug *").fill("browser-check-skill");
  await admin.getByLabel("资源类型 *").selectOption({ label: "SKILL" });
  await admin.getByLabel("主分类 *").selectOption({ label: "编程开发" });
  await admin.getByLabel("一句话简介 *").fill("仅用于本地浏览器验收，完成后自动清理。");
  await admin.getByLabel("官方 URL *").fill("https://example.com/skill");
  await admin.getByLabel("来源 URL").fill("https://example.com/skill/source");
  await admin.getByLabel("安装说明 / 命令").fill("cp -r browser-check ~/.claude/skills/");
  await admin.getByLabel("状态").selectOption("published");
  await Promise.all([admin.waitForURL(/saved=1/), admin.getByRole("button", { name: "保存条目" }).click()]);
  await admin.goto(`${base}/r/browser-check-skill`);
  await admin.getByText("安装说明").waitFor();
  await admin.getByRole("button", { name: "复制" }).click();
  await admin.getByText("已复制 ✓").waitFor();
  await admin.goto(`${base}/admin`);
  const row = admin.getByRole("row").filter({ hasText: "浏览器验收 SKILL" });
  admin.once("dialog", (dialog) => dialog.accept());
  await Promise.all([admin.waitForURL(/deleted=1/), row.getByRole("button", { name: "删除" }).click()]);
  if (await admin.getByText("浏览器验收 SKILL").count()) throw new Error("临时验收条目清理失败");
  console.log("PASS 浏览器桌面布局、移动布局、搜索、详情、外链、管理登录、CRUD、SKILL 获取与清理");
} finally {
  await browser.close();
}

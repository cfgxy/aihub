import fs from "node:fs";
import { chromium } from "playwright-core";

const executablePath = [
  "/home/guxy/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
  "/home/guxy/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find(fs.existsSync);
if (!executablePath) throw new Error("未找到 Chromium 可执行文件");

const base = process.env.PAGES_URL || "http://127.0.0.1:4320/aihub/";
const browser = await chromium.launch({ executablePath, headless: true, args: ["--disable-gpu"] });

async function assertNoOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  if (metrics.scroll > metrics.width + 1) throw new Error(`${label} 横向溢出：${metrics.scroll} > ${metrics.width}`);
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(base, { waitUntil: "networkidle" });
  await desktop.getByRole("heading", { name: "找到真正好用的 AI 资源" }).waitFor();
  await assertNoOverflow(desktop, "Pages 桌面首页");
  const appSection = desktop.locator('[data-type-section="app"]');
  // RUYI-120：分类筛选必须真正改变渲染结果，只断言 hidden 属性会漏掉「属性已设但仍然显示」的样式回归。
  const visibleCards = () => appSection.locator("[data-resource]").evaluateAll(
    (cards) => cards.filter((card) => card.offsetParent !== null).length,
  );
  const sectionCount = () => appSection.locator(".section-heading small").innerText();
  const totalApps = await visibleCards();
  if (await sectionCount() !== `${totalApps} 项`) throw new Error(`Pages 初始分类计数错误：${await sectionCount()}`);
  for (const [category, expected] of [["官方应用", 4], ["辅助工具", 6], ["其他", 1]]) {
    await appSection.getByRole("button", { name: category }).click();
    const active = await appSection.locator("[data-category-filter].active").allInnerTexts();
    if (active.length !== 1 || active[0] !== category) throw new Error(`Pages 分类选中态错误：${active.join("/")}`);
    const shown = await visibleCards();
    if (shown !== expected) throw new Error(`Pages 分类「${category}」可见卡片错误：${shown}，期望 ${expected}`);
    if (await sectionCount() !== `${expected} 项`) throw new Error(`Pages 分类「${category}」计数错误：${await sectionCount()}`);
  }
  await appSection.getByRole("button", { name: "全部" }).click();
  if (await visibleCards() !== totalApps) throw new Error("Pages「全部」未恢复完整列表");
  if (await sectionCount() !== `${totalApps} 项`) throw new Error(`Pages「全部」计数未恢复：${await sectionCount()}`);

  await appSection.getByRole("button", { name: "辅助工具" }).click();
  await desktop.getByLabel("搜索资源").fill("Codex");
  // 分类筛选按 section 生效，断言只看被筛选的应用区，避免其他类型命中同一关键词时误判。
  const combinedResults = await visibleCards();
  if (combinedResults !== 1) throw new Error(`Pages 组合筛选结果错误：${combinedResults}`);
  await appSection.getByRole("button", { name: "全部" }).click();
  await desktop.getByLabel("搜索资源").fill("豆包");
  const searchResults = await desktop.locator("[data-resource]").evaluateAll(
    (cards) => cards.filter((card) => card.offsetParent !== null).length,
  );
  if (searchResults !== 1) throw new Error(`Pages 搜索过滤结果错误：${searchResults}`);
  await desktop.getByRole("link", { name: /豆包/ }).click();
  await desktop.waitForURL(/\/aihub\/r\/doubao\/$/);
  await desktop.getByRole("heading", { name: "核心能力" }).waitFor();
  const visualLoaded = await desktop.locator(".detail-visual img").evaluate((image) => image.complete && image.naturalWidth > 0);
  if (!visualLoaded) throw new Error("Pages 详情图片未加载");
  const external = desktop.getByRole("link", { name: /前往官方下载/ });
  if ((await external.getAttribute("rel")) !== "noopener nofollow") throw new Error("Pages 外链 rel 不符合要求");

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  await mobile.goto(base, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "Pages 移动首页");
  await mobile.goto(`${base}r/claude/`, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "Pages 移动详情页");

  console.log("PASS Pages 子路径、桌面/移动布局、搜索、详情跳转与外链属性");
} finally {
  await browser.close();
}

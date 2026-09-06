const base = process.env.AIHUB_URL || "http://127.0.0.1:4310";
const checks = [
  ["首页", "/", "AI 工具集市"],
  ["搜索命中", "/search?q=%E8%B1%86%E5%8C%85", "豆包"],
  ["应用列表", "/t/app", "辅助工具"],
  ["详情", "/r/claude", "前往官方下载"],
  ["管理登录", "/admin/login", "管理后台"],
];
for (const [name, pathname, expected] of checks) {
  const response = await fetch(`${base}${pathname}`, { redirect: "manual" });
  const body = await response.text();
  if (response.status !== 200 || !body.includes(expected)) throw new Error(`${name}失败：HTTP ${response.status}，缺少 ${expected}`);
  console.log(`PASS ${name} ${pathname}`);
}

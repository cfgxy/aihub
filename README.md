# AI 工具集市

RUYI-71 的本地可运行 MVP：使用 Next.js App Router 与 SQLite 构建 AI 应用、SKILL、MCP 资源目录，包含响应式公开站、搜索与筛选、详情获取动作，以及口令保护的管理 CRUD。

## 本地运行

```bash
cp .env.example .env.local
# 修改 .env.local 中的 ADMIN_PASSWORD
npm install
npm run db:setup
npm run dev
```

默认地址：`http://127.0.0.1:4310`；管理入口：`/admin/login`。

## 验证

```bash
npm test
npm run build
npm run start
npm run probe
npm run test:browser
npm run build:pages
npm run check:pages
npm run test:detail-media
```

`test:detail-media` 同时验证动态版与 Pages 版详情页的插图加载、原创图注、可选 Feature 图位落位以及既有资源图注不回归，需先启动 `npm run start` 与本地 Pages 静态服务（默认 `http://127.0.0.1:4320/aihub/`，可用 `PAGES_URL` 覆盖）；设置 `SHOT_DIR` 时额外输出整页截图。

`test:browser` 使用本机 Playwright Chromium，验证桌面与移动布局、搜索、详情、外链、管理登录、CRUD 和 SKILL 复制动作，并清理临时验收数据。

## GitHub Pages

公开地址：<https://cfgxy.github.io/aihub/>

`main` 分支每次 push 都会触发 `.github/workflows/deploy-pages.yml`，从 `src/db/seed-data.ts` 生成静态公开站并自动发布到 GitHub Pages。本地 SQLite 管理后台不进入 Pages；更新线上条目时修改种子数据并提交即可。

## 数据与安全

- 数据库默认位于 `data/aihub.db`，首次访问或 `db:setup` 时自动创建并写入 7 个批准种子。
- 管理口令只读取 `.env.local`，不会进入 Git、页面或日志。
- 站内只提供官方来源链接、安装说明或配置复制，不托管任何安装包。
- `npm run db:rollback` 会删除本地全部表，仅用于明确需要的本地重置。

# AIHub 精选素材包 · RUYI-147（2026-09-16 批准 6 条）

设计：黄小云。交付物为 6 张统一规格美化卡片（1200×630 PNG，`cards/`）+ 全部原始素材（`raw/`）+ 可复现生成脚本（`gen_cards.py`）。版式沿用 09-14 期（RUYI-142）已验收标准；卡片文案（名称、类型、一句话价值、License、Stars、域名）全部取自本期报批评论（2026-09-16 02:22）事实基线，未新增事实。

## 通用使用边界（适用于全部素材）

1. **禁止第三方热链**：一切图片入库时必须本地化到 AIHub Pages 产物（AIHub 项目规范），不得直接外链 GitHub / 各官网图床。
2. **识别性引用**：全部视觉素材版权归各产品方所有，仅用于目录站的编辑精选收录场景（识别与介绍该产品），须随附官方链接；不得用于商业宣传物料或暗示背书。
3. **星数时效**：卡片与 Social Preview 中的 GitHub Stars 均为 2026-09-16 快照值（与本期报批基线一致；采集当日 GitHub API 实时值已略涨，如 39.0 万→389,844，卡面一律采用基线快照数），入库文案如引用星数须重新采集或标注快照日期。
4. **未做事实性修改**：原始素材仅做裁剪、缩放、排版合成，未修改产品界面内容；OpenResearch 为官网首屏浏览器实景截图（无头 Chromium，1440×1000，未改动页面内容）。
5. **raw/ 中的未用素材**（各仓库备用 Social Preview、OpenClaw 官网 OG、Graphify 品牌卡与官网 OG、serena 官方 logo、各 README 文本快照）作为备选与事实证据一并交付，入库时可按需取用。

## 逐条素材来源（采集日期均为 2026-09-16）

| # | 资源 | 卡片使用素材 | 来源 | 使用边界备注 |
|---|---|---|---|---|
| 1 | OpenClaw | 官方品牌横幅（龙虾吉祥物 + 官方标语，深色） | GitHub 仓库 `openclaw/openclaw` docs/assets/openclaw-banner-dark.png | 官方品牌物料；「EXFOLIATE! EXFOLIATE!」为官方横幅原文案 |
| 2 | pi | 官网 OG 主视觉（pi 字标 + 官方标语） | `pi.dev/social.png`（官方 README 引用 pi.dev 域名） | 官方品牌图，含官方标语「There are many agent harnesses, but this one is yours.」 |
| 3 | text-to-cad | 官网主视觉（CAD SKILLS 齿轮渲染图） | `texttocad.dev/social-preview-gear.png` | 官方 OG 图（1200×630），展示 CAD 技能生成定位 |
| 4 | Graphify | 官方 Demo 截图：代码库知识图谱可视化 + 文件侧栏 | GitHub 仓库 `Graphify-Labs/graphify`（v8 tag）docs/graph-hero.png | 官方仓库 Demo 资产，直观呈现「可查询知识库」形态 |
| 5 | serena | 官方架构图（AI Client ↔ MCP Server ↔ Language Intelligence/SolidLSP） | GitHub 仓库 `oraios/serena` resources/serena-block-diagram.svg | 官方矢量架构图，原样嵌入（白底 contain）；与 VoiceMem 期同类用法 |
| 6 | OpenResearch | 官网首页实景（Autoresearch on your machine + 实验面板） | `openresearch.sh` 首屏截图（无头 Chromium，2026-09-16） | 官方站点实景截图；复现命令：`headless_shell --screenshot --window-size=1440,1000 https://openresearch.sh`，截图中「复制代码」为站点自带中文 UI |

## 设计阶段补充核实（含 2026-09-18 收口裁定更新）

- **OpenClaw 许可证（2026-09-18 更正为 MIT）**：初版按报批基线标「自定义（细节未知）」；经仓库 LICENSE 文件（「MIT License, Copyright (c) 2026 OpenClaw Foundation」）与 README License 章节核实为 **MIT**（白小巡收口裁定，本设计同日独立复核一致）。卡面已改标「MIT」。
- **Graphify 许可证（2026-09-18 更正为双许可）**：经 v8 根目录核实同时存在 LICENSE（Apache 2.0）与 LICENSE-MIT（MIT）两个文件（白小巡收口裁定，本设计同日独立复核一致）。卡面已改标「Apache-2.0 + MIT 双许可」。
- **serena 许可证（口径经收口确认）**：报批基线为「许可证自定义（细节未知）」。经官方 README 徽章与 LICENSE 文件核实为**按组件许可：SolidLSP 为 MIT，Serena 应用主体为 GPL-3.0-or-later**。卡面标注「GPL-3.0+（SolidLSP 为 MIT）」，收口复核确认口径正确、维持不变。
- **版式微调（2026-09-18）**：底部 meta 行启用 flex 换行（仅 serena、graphify 两卡），消除 serena 快照日期被右侧白底架构图边缘遮挡的问题；graphify 许可证文字加长后同源风险一并预防。其余 4 卡版式与初版完全一致。
- **OpenResearch 官网**：GitHub API homepage 字段为 `openresearch.sh`（属报批基线证据源「GitHub API 仓库数据」范围），卡面域名采用 openresearch.sh；pi 无官网字段，卡面域名沿用基线官方链接 github.com/earendil-works/pi。
- 主题色取自各产品官方视觉：OpenClaw 红 #E04030、pi 蓝 #6C9BD2、text-to-cad 紫 #A78BFA、Graphify 绿 #21A05B、serena 橙 #DFA050、OpenResearch 绯红 #A22C3C。

## 复现方式

`gen_cards.py` 内含每条资源的文案、主题色与嵌入素材配置；修改后以无头 Chromium 逐张渲染 1200×630 PNG（`python3 gen_cards.py [slug...]`）。卡面一句话价值与基线报批评论逐字一致；Stars 为 2026-09-16 快照值。

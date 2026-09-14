# AIHub 精选素材包 · RUYI-142（2026-09-14 批准 10 条）

设计：黄小云。交付物为 10 张统一规格美化卡片（1200×630 PNG，`cards/`）+ 全部原始素材（`raw/`）+ 可复现生成脚本（`gen_cards.py`）。

## 通用使用边界（适用于全部素材）

1. **禁止第三方热链**：一切图片入库时必须本地化到 AIHub Pages 产物（AIHub 项目规范），不得直接外链 GitHub / WordPress.org / 各官网图床。
2. **识别性引用**：全部视觉素材版权归各产品方所有，仅用于目录站的编辑精选收录场景（识别与介绍该产品），须随附官方链接；不得用于商业宣传物料或暗示背书。
3. **星数时效**：卡片与 Social Preview 中的 GitHub Stars 均为 2026-09-14 快照值（与本期报批评论一致），入库文案如引用星数须重新采集或标注快照日期。
4. **未做事实性修改**：原始素材仅做裁剪、缩放、排版合成，未修改产品界面内容；各产品的真实界面以官方渠道为准。
5. **raw/ 中的未用素材**（doop_banner/canvas/agent_live、vm_image_all、各仓库备用 Social Preview、README 文本）作为备选与事实证据一并交付，入库时可按需取用。

## 逐条素材来源

| # | 资源 | 卡片使用素材 | 来源（采集 2026-09-14） | 使用边界备注 |
|---|---|---|---|---|
| 1 | scroll-craft | 官方范例站点「AI Government Summary」实景（media/ais.webp） | GitHub 仓库 `nateherkai/scroll-craft` media/ 目录（Contents API） | 范例站为 scroll-craft 官方产出，用于展示效果；图注已标明「范例站点」 |
| 2 | Chat On Steroids | GitHub Social Preview | `opengraph.githubassets.com/1/totec448-spec/chat-on-steroids` | GitHub 自动生成的官方仓库卡，含快照统计 |
| 3 | VoiceMem | 「流式双脑」架构图（fig-architecture.webp） | 项目主页 `xzf-thu.github.io/VoiceMem/images/` | 学术架构图，出处为项目 arXiv 技术报告（arXiv:2608.26005），入库文案引用时保留出处 |
| 4 | agent-memory | GitHub Social Preview | `opengraph.githubassets.com/1/tigerless-labs/agent-memory` | 同 #2 |
| 5 | headcount | 官方 org chart 页面顶部实景（org-chart-light.png 裁剪） | 仓库 `cbrock84/headcount` docs/assets/（Contents API），裁剪为 headcount_hero.png | 页面标题与 16 部门/172 技能统计为官方数字 |
| 6 | doop | 官方 OG 主视觉（og.png） | `doop.design/og.png` | 产品方自制品牌图，含官方 slogan「Design with AI agents.」 |
| 7 | Open SEO MCP Skills | GitHub Social Preview | `opengraph.githubassets.com/1/Ryze-AI-Adgent/open-seo-mcp-skills` | 同 #2 |
| 8 | Lemmalog | GitHub Social Preview | `opengraph.githubassets.com/1/JordyZomer/lemmalog` | 同 #2；卡面含作者头像（repo 官方 avatar） |
| 9 | Open Reality | 官方品牌 Hero（hero.svg 渲染 + 裁去源文件底部空白） | 仓库 `reality-opened/openreality` docs/assets/hero.svg（Contents API） | SVG 官方矢量渲染为 PNG；深绿金配色即官方品牌色 |
| 10 | Shim MCP | WordPress.org 官方插件图标（icon-256x256.png） | `ps.w.org/shim-mcp/assets/icon-256x256.png` | WordPress 官方插件目录资产，随插件分发 |

## 复现方式

`gen_cards.py` 内含每条资源的文案、主题色（取自各产品官方视觉）与嵌入素材配置；修改后以 headless Chromium 逐张渲染 1200×630 PNG。卡片左侧文案（一句话价值、License、Stars）均取自本期报批评论的事实基线，未新增事实。

# AIHub 精选素材包 · RUYI-156（2026-09-18 批准 4 条）

设计：黄小云。交付物为 4 张统一规格美化卡片（1200×630 PNG，`cards/`）+ 全部原始素材（`raw/`）+ 可复现生成脚本（`gen_cards.py`）。规格沿用 RUYI-142 已验收标准。

## 通用使用边界（适用于全部素材）

1. **禁止第三方热链**：一切图片入库时必须本地化到 AIHub Pages 产物（AIHub 项目规范），不得直接外链 GitHub / opengraph.githubassets.com / context-mode.com 等外部图床。
2. **识别性引用**：全部视觉素材版权归各产品方所有，仅用于目录站的编辑精选收录场景（识别与介绍该产品），须随附官方链接；不得用于商业宣传物料或暗示背书。
3. **星数时效**：卡面 GitHub Stars 均为 2026-09-17 快照值（与本期报批评论一致），已在卡面标注「快照」日期；Social Preview 图内嵌的星数（如 HyperFrames「51k」）为 GitHub 生成预览时点的取整显示，卡面权威数字以左侧 meta 行为准。入库文案如引用星数须重新采集或标注快照日期。
4. **未做事实性修改**：原始素材仅做缩放与排版合成，未修改产品视觉内容；各产品真实界面以官方渠道为准。
5. **raw/ 中的未用素材**（HyperFrames 官方 logo SVG 与 demo 动图、OpenMAIC 横版 logo 与备用 Social Preview、Context Mode 备用 Social Preview、各 README 文本）作为备选与事实证据一并交付，入库时可按需取用。

## 逐条素材来源（采集 2026-09-18）

| 卡片 | 卡片使用素材 | 来源 | 使用边界备注 |
|---|---|---|---|
| HyperFrames | 官方仓库 Social Preview | `opengraph.githubassets.com/1/heygen-com/hyperframes` | GitHub 自动生成的官方仓库卡，含官方 slogan「Write HTML. Render video. Built for agents.」与快照统计 |
| Humanizer | 官方仓库 Social Preview | `opengraph.githubassets.com/1/blader/humanizer` | GitHub 自动生成官方仓库卡；右侧为作者头像（repo 官方展示位），图注已注明 |
| OpenMAIC | 官方品牌 Banner | 仓库 `THU-MAIC/OpenMAIC` assets/banner.png（raw.githubusercontent.com，main 分支） | 产品方自制品牌图（含 logo 与「Generative Learning in Multi-Agent Interactive Classroom」标语）；视觉区底色 #D4DBFF 取自 Banner 本身底色，无缝衔接 |
| Context Mode | 官方 OG 主视觉 | `context-mode.com/og/master.png`（官网 og:image） | 产品方自制品牌图，含官方 slogan 与统计位；卡面域名行仍用报批基线的官方仓库链接 |

## 设计说明（给入库与后续维护）

1. **主题色来源**：HyperFrames #00D4FF（取自官方 logo 渐变的青色位）、OpenMAIC #6A62C7（取自官方 Banner 紫色）、Context Mode #1A56DB（取自官方 OG 品牌蓝）；Humanizer 官方无品牌色，#F59E0B 为设计假设的暖琥珀色（呼应「人味写作」），无官方对应关系。
2. **License 标注**：Context Mode 卡面标「ELv2（自定义）」——GitHub API 标记 NOASSERTION（与报批基线一致），仓库 LICENSE 文件实为 Elastic License 2.0（`raw.githubusercontent.com/mksglu/context-mode/main/LICENSE`，采集 2026-09-18）；如需更保守可改回「自定义许可」后重跑脚本。
3. **图片本地化清单（入库时）**：4 张 `cards/*.png` 即 Pages 用图；`raw/` 仅存档备查，不入 Pages 产物。

## 复现方式

`gen_cards.py` 内含每条资源的文案、主题色与嵌入素材配置；卡面文字（一句话价值、License、Stars 快照值）均取自本期报批评论与分工评论（2026-09-18）的事实基线，未新增事实。以 headless Chromium 逐张渲染 1200×630 PNG：

```bash
python3 gen_cards.py            # 全部 4 张
python3 gen_cards.py openmaic   # 单张重渲
```

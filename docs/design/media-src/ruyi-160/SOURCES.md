# AIHub 精选素材包 · RUYI-160（2026-09-19 批准 5 条）

设计：黄小云。交付物为 5 张统一规格美化卡片（1200×630 PNG，`cards/`）+ 全部原始素材（`raw/`）+ 可复现生成脚本（`gen_cards.py`）。入库时本包整体落位仓库 `docs/design/media-src/ruyi-160/`，卡片 PNG 复制为 `public/media/<slug>.png`（沿用往期入库方式，由白小巡按入库 SOP 执行）。

本期 5 条：gongwen-gbt9704-skill、pcb-skill、motion-web、skillbox、Jev Review（Owner 批准评论 `01a0b77a`，2026-09-19 10:24）。卡片左侧文案（一句话价值、License、Stars）均取自本期报批评论（`01a0b5c2`，2026-09-19 02:23）的事实基线，未新增事实；星数统一标注 2026-09-19 快照。

## 通用使用边界（适用于全部素材）

1. **禁止第三方热链**：一切图片入库时必须本地化到 AIHub Pages 产物（AIHub 项目规范），不得直接外链 GitHub / 各官网图床。
2. **识别性引用**：全部官方视觉素材版权归各产品方所有，仅用于目录站的编辑精选收录场景（识别与介绍该产品），须随附官方链接；不得用于商业宣传物料或暗示背书。
3. **星数时效**：卡片中的 GitHub Stars 均为 2026-09-19 快照值（与本期报批评论一致），入库文案如引用星数须重新采集或标注快照日期。
4. **未做事实性修改**：官方素材仅做裁剪、缩放、排版合成，未修改产品界面内容；各产品的真实界面以官方渠道为准。
5. **原创示意图声明**：pcb-skill 与 Jev Review 的仓库无任何图片素材，卡片视觉为黄小云原创绘制（SVG/HTML），内容严格取自官方 README 事实（流程节点、评审维度），卡面图注已标明「原创示意图…非官方素材/非真实运行输出」；详情页若复用，`imageCredit` 应写「原创插图」而非 `imageSource` 外链。
6. **raw/ 中的未用素材**（gongwen 01-头图、motion-web ink-crowd 案例图、skillbox hero.webp、5 张 GitHub Social Preview）作为备选与来源证据一并交付，入库时可按需取用。

## 逐条素材来源

| # | 资源 | 卡片使用素材 | 来源（采集 2026-09-19） | 使用边界备注 |
|---|---|---|---|---|
| 1 | gongwen-gbt9704-skill | 官方 2.0 更新插图「预印红头纸套打」右裁（仅裁剪，保留打印机+红头纸） | 仓库 `mizzlelover/gongwen-gbt9704-skill` `marketing/x-major-update-images/02-预印红头纸套打.png`（raw.githubusercontent.com，main 分支） | 官方自制的更新说明插图，直接对应报批事实「红头套打」；裁掉的是插图大字标题区，未修改产品内容 |
| 2 | pcb-skill | 原创流程示意图：概念→原理图→选料→布局→布线→验证→下单（含「全流程门控校验」「止于支付页·付款需人工确认」注记） | 黄小云原创 SVG，节点与注记取自官方 README 与报批评论事实基线 | 非官方素材，卡面已标注；「止于支付页、付款需人工确认」为报批基线原文事实 |
| 3 | motion-web | 官方案例「String Clock」页面实景（无刚性指针物理阻尼时钟） | 仓库 `feitangyuan/motion-web` `assets/cases/string-clock.png`（raw.githubusercontent.com，main 分支） | 案例为官方产出（README 标注 Cases 7/7 PASS）；未用备选 ink-crowd 案例图同存 raw/ |
| 4 | skillbox | 官方 Landing OG 主视觉（发光箱体与技能卡） | 仓库 `kitze/skillbox` `landing/assets/og.jpg`（raw.githubusercontent.com，main 分支） | 官方品牌图；备选 hero.webp 同存 raw/ |
| 5 | Jev Review | 原创终端示意图：`jev_review` 工具与 Correctness/Complexity/Changeability/Modularity/Tests/Security 维度 chips（含「…」省略项） | 黄小云原创 HTML/SVG，维度与「API key 留在本机·无托管后端」取自官方 README | 非官方素材、非真实运行输出，卡面已标注；仓库 Demo 为视频（user-attachments），静态卡无法使用 |

## 复现方式

`gen_cards.py` 内含每条资源的文案、主题色与嵌入素材配置；修改后以 headless Chromium 逐张渲染 1200×630 PNG（`--headless --screenshot --window-size=1200,630`）。模板与版式沿用 RUYI-142/156 已验收规格，新增参数：`license_label`（motion-web 用「许可协议」）、`name_size`（gongwen 长名缩小字号）、`visual_html`（两张原创示意图内嵌）。

## 入库对接说明（给白小巡）

- 卡片 PNG → `public/media/<slug>.png`：`gongwen-gbt9704-skill.png`、`pcb-skill.png`、`motion-web.png`、`skillbox.png`、`jev-review.png`。
- resource-profiles 建议：#1/#3/#4 的 `imageSource` 分别指向各官方仓库/插图所在仓库；#2/#5 为原创插图，用 `imageCredit`「原创插图（黄小云绘制）」，不填外链 `imageSource`。
- motion-web 详情页定价/开源信息必须保留「CC BY-NC 4.0，禁止商用」口径（报批事实基线要求）。
- 全部原始素材采集于 2026-09-19（main 分支当日状态）；入库时如距采集超过数日，建议按入库 SOP 重新核对仓库默认分支未变更。

## SHA256（卡片 PNG）

见同目录 `SHA256SUMS.txt`；素材包整体 zip 的 SHA256 在本期交付评论中给出。

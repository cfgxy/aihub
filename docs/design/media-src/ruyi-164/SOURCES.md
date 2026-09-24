# RUYI-164 设计素材包 · 来源记录与使用边界

- 期数：AIHub 每日 AI 新资源精选（2026-09-21 期），Owner 批准 6 项（评论 `01a0c98a`，2026-09-22 22:35）。
- 交付内容：6 张 1200×630 精选卡片（`cards/`，PNG 原生分辨率无放大）+ 官方原始素材（`raw/`）+ 来源证据快照（`evidence/`）+ 可复现脚本（`gen_cards.py`）+ 本文件 + 全包 SHA256 清单（`SHA256SUMS.txt`）。
- 采集时间：2026-09-22 22:40–23:10（Asia/Shanghai，下称「本次采集」）。星数等数字以 RUYI-164 报批事实基线为准（2026-09-21 GitHub 快照值），卡片已标注快照日期。
- 本期无原创示意图：6 张卡片主视觉全部取自官方渠道，因此无「非官方素材/非真实运行输出」声明项；卡片上的版式文字（类型徽章、License、Stars 等）为设计排版，非产品运行输出。

## 一、卡片主视觉来源（上卡素材）

| 卡片 | 素材文件 | 来源 URL | 许可证 | 上卡方式 |
|---|---|---|---|---|
| Taste Skill | `official_tasteskill_og-image.jpg` | https://www.tasteskill.dev/og-image.jpg （官网 OG 图） | 站点版权归 Taste Skill 方所有 | 居中裁切（词标与标语完整） |
| World Monitor | `official_worldmonitor_world-variant.png` | https://raw.githubusercontent.com/koala73/worldmonitor/HEAD/.github/pr-assets/world-variant.png （仓库官方截图） | 仓库 AGPL-3.0 | 裁切仪表盘实景 |
| Appllama Skills | `official_appllama_og.png` | https://appllama.io/og.png （官网 OG 图） | 站点版权归 Appllama 方所有 | 居中裁切 |
| AI Data Extractor | `gh_social_kruzovic7_ai-data-extractor.png` | https://opengraph.githubassets.com/1/kruzovic7/ai-data-extractor （GitHub 官方 Social Preview 渲染） | GitHub 官方对仓库的渲染图 | 等比完整呈现 |
| OrcaReplay | `official_orcareplay_graph-card.png` + `official_orcareplay_logo.png`（右上角徽标） | https://raw.githubusercontent.com/Continuum-AI-Corp/OrcaReplay/HEAD/docs/graph-card.png ；https://raw.githubusercontent.com/Continuum-AI-Corp/OrcaReplay/HEAD/ORCAREPLAYLOGO.png （仓库官方文件） | 仓库 Apache-2.0（trace spec 为 CC BY 4.0，见其 README 徽章） | 裁切运行图谱卡片 + Logo 徽标 |
| Gap Trap | `official_gaptrap_logo_assets.png` | https://raw.githubusercontent.com/pliablepixels/gap-trap/HEAD/assets/gap-trap.png （仓库官方 Logo） | 仓库 MIT | 等比完整呈现 |

## 二、备选素材（已采集、未上卡，供入库时替换选用）

| 文件 | 来源 URL | 说明 |
|---|---|---|
| `official_worldmonitor_pro-landing.png` | https://raw.githubusercontent.com/koala73/worldmonitor/HEAD/.github/pr-assets/pro-landing.png | 官方 landing（Noise→Signal 主视觉） |
| `official_worldmonitor_screenshot-add-panel.png` | https://raw.githubusercontent.com/koala73/worldmonitor/HEAD/.github/screenshots/add-panel-block.png | 官方功能截图 |
| `official_orcareplay_viewer-timeline.png` | https://raw.githubusercontent.com/Continuum-AI-Corp/OrcaReplay/HEAD/docs/viewer-timeline.png | 官方 Viewer 时间线截图 |
| `official_orcareplay_chain-card.png` / `_compare-card.png` / `_sync-card.png` | 同仓库 `docs/` 目录 | 官方运行卡片系列 |
| `official_appllama_logo-light.png` | https://public.appllama.io/appllama-logo-light.png | 官方横版 Logo |
| `official_gaptrap_logo_docs.png` | https://raw.githubusercontent.com/pliablepixels/gap-trap/HEAD/docs/gap-trap.png | 官方 Logo（docs 版本） |
| `gh_social_*.png`（其余 5 张） | https://opengraph.githubassets.com/1/<owner>/<repo> | GitHub 官方 Social Preview 渲染 |

## 三、来源证据快照（`evidence/`）

- 6 个项目 README 原文：`readme_<owner>_<repo>.md`（raw.githubusercontent.com，HEAD 引用，本次采集）。
- 5 个官网 HTML 快照：`site_<domain>.html`（tasteskill.dev / worldmonitor.app / appllama.io / orcarouter.ai / pliablepixels.github.io/gap-trap，本次采集）。
- 事实基线一律以 RUYI-164 报批评论（2026-09-21 02:21，白小巡）与 Owner 批准评论（2026-09-22 22:35）为准；本包不新增基线之外的产品事实。

## 四、使用边界（入库与后续使用必读）

1. **禁止第三方热链**：全部图片入库时必须本地化到 AIHub Pages 产物，不得外链 GitHub / opengraph.githubassets.com / 各官网图床。
2. **识别性引用**：视觉素材版权归各产品方所有，仅限目录收录介绍场景，须随附官方链接；不做商业宣传用途。`official_appllama_logo-light.png` 与 OrcaReplay Logo 为注册品牌视觉，仅作身份标识使用，不得变形、变色或用于暗示背书。
3. **识别性引用边界（Taste Skill 专项）**：其 README 含 Kimi（Moonshot AI）赞助位（moonshot.cn CDN 图），本期素材**未采集、未使用**该赞助位；后续引用该仓库素材时应继续避让第三方赞助内容。
4. **快照时效**：卡片上的 Stars 为 2026-09-21 快照值；GitHub Social Preview 内嵌统计为渲染当日值。入库文案引用星数须重新采集或标注快照日期。
5. **素材改动范围**：上卡素材仅做裁切、缩放与排版合成，未修改产品界面内容；采集当日各官网与仓库均访问有效。
6. **AGPL 提示（World Monitor）**：其视觉素材随仓库以 AGPL-3.0 提供，目录展示属识别性引用；如后续需要在 AIHub 代码中集成其代码，须另行评估 AGPL 传染性（详见文案侧风险项）。

## 五、复现方式

```bash
cd ruyi164_design_assets   # 本目录
python3 gen_cards.py       # 依赖 Pillow（≥10），读 raw/ 生成 cards/ 全部 6 张
sha256sum -c SHA256SUMS.txt
```

字体依赖：Noto Sans CJK（Black/Bold/Medium/Regular，系统包 google-noto-cjk）与 Montserrat（julietaula-montserrat）。脚本内置 SC 字面自动选择与中文行头禁则、孤行回退。

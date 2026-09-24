# AIHub 每日 AI 新资源精选（2026-09-20 期）设计素材包 · 来源与使用边界

- 交付人：黄小云（设计）
- 交付物：6 张 1200×630 PNG 编辑卡片（`cards/`）+ 原始素材（`raw/`）+ 可复现生成脚本（`gen_cards.py`）
- 规格沿用：RUYI-142（2026-09-14 期）Owner 已验收标准；统一深色版式（类型徽章 + 产品名 + 官方域名 + 一句话价值 + License 与快照星数 + 真实产品视觉与来源图注 + 底部「AIHub 编辑精选」条）
- 事实口径：全部文字字段取自本单报批评论（2026-09-20 02:13，白小巡）及其 **2026-09-20 快照值**；卡面星数一律标注「2026-09-20 快照」。本包不新增报批评论之外的产品事实。

## 一、素材清单与来源

| 卡片 | 素材文件（raw/） | 来源（官方渠道） | 采集日期 | 内容 |
|---|---|---|---|---|
| agent-skills | addys-agent-skills.jpg | https://addyosmani.com/assets/images/addys-agent-skills.jpg （作者 Addy Osmani 官方网站） | 2026-09-22 | 官方「Agent Skills」主视觉与流程徽章 |
| WeKnora | weknora_architecture.png（卡面采用） | https://github.com/Tencent/WeKnora → docs/images/architecture.png（官方仓库） | 2026-09-22 | 官方架构图 v0.8.0 |
| WeKnora | weknora_logo.png / weknora_qa.png（备选未用） | 同上 docs/images/logo.png、qa.png | 2026-09-22 | 官方 logo / 产品截图 |
| jianying-headless | og_jianying-headless.png | https://opengraph.githubassets.com/1/mcncarl/jianying-headless （GitHub 官方 Social Preview 服务） | 2026-09-22 | 仓库官方社交预览卡 |
| Easel | easel_brand_dark.png（卡面采用） | https://github.com/ZJU-REAL/Easel → assets/readme/brand-dark.png（官方仓库，README dark 模式指定版本） | 2026-09-22 | 官方品牌视觉（dark 版） |
| Easel | easel_brand.png（备选未用） | 同上 assets/readme/brand.png | 2026-09-22 | 官方品牌视觉（light 版） |
| huashu-report | og_huashu-report.png | https://opengraph.githubassets.com/1/alchaincyf/huashu-report | 2026-09-22 | 仓库官方社交预览卡 |
| Blitz Strike | blitzstrike_banner.webp | https://github.com/shinthink/blitzstrike → .github/assets/banner.webp（官方仓库） | 2026-09-22 | 官方 banner |

另：`raw/` 内 6 份 README 为采集当日从 raw.githubusercontent.com 拉取的存档，用于素材溯源核对，非卡面素材。仓库无官方图片的条目（jianying-headless、huashu-report）按 RUYI-142 先例采用 GitHub 官方 Social Preview。

## 二、主题色来源

每卡主题色取自该产品官方视觉的高饱和主色簇（PIL 统计，方法见 gen_cards.py 注释）：
agent-skills `#DC4242`（官方流程徽章红）、WeKnora `#5B9BD5`（官方架构图蓝色系，适配深色底微调）、jianying-headless `#2FB0D8`（官方 Social Preview 青色系）、Easel `#8B6FD8`（官方 brand-dark 紫色系）、Blitz Strike `#E8A33D`（官方 banner 金色系）。
例外：huashu-report 官方视觉为黑白摄影无高饱和主色，采用中性金 `#C9A227` 适配深色版式（设计决策，非官方色）。

## 三、使用边界

1. **禁止第三方热链**：全部图片入库时必须本地化为 AIHub Pages 产物文件，不得外链 GitHub / addyosmani.com / opengraph.githubassets.com 等任何外部图床。
2. **识别性引用**：视觉素材版权归各产品方及 GitHub 相应权利人所有；仅限目录收录介绍场景（配官方链接），不做商业宣传用途。
3. **快照口径**：卡面 License 与星数为 **2026-09-20 快照值**（本单报批基线），非实时数据；嵌入的两张 GitHub Social Preview（jianying-headless、huashu-report）为 GitHub 服务自动生成图，图内统计数字为 **2026-09-22 采集时点**，可能与基线快照不同，属图内固定像素，引用星数一律以卡面文字为准。
4. **素材加工**：仅做缩放、裁切与排版合成，未修改产品界面内容、未拼接虚构画面；Blitz Strike 卡面按防护视角附加「仅限授权测试用途」标识，风险表述不淡化。
5. **复现方式**：在包根目录执行 `python3 gen_cards.py`（依赖 Python3 + Pillow；Chromium 路径按环境修改脚本顶部 `CHROME`）；脚本渲染 HTML 至 `html/` 并截图至 `cards/`，逐张校验 1200×630。
6. 采集当日（2026-09-22）各来源均访问有效；仓库 tip 对应报批基线记录的 09-18/09-19 push 状态。

# RUYI-168 设计素材包 · 来源记录与使用边界

- 期数：AIHub 每日 AI 新资源精选（2026-09-23 期），Owner 批准 4 项（评论 `01a0d31f`，2026-09-24 19:14，cfgxy），设计范围为 #1 ECC、#2 Taste-Skill、#3 DeepSeek-Reasonix、#4 book-to-skill。
- 交付内容：3 张 1200×630 精选卡片（`cards/`，PNG 原生分辨率无放大）+ 官方原始素材（`raw/`）+ 来源证据快照（`evidence/`）+ 可复现脚本（`gen_cards.py`）+ 本文件 + 全包 SHA256 清单（`SHA256SUMS.txt`）。
- 采集时间：2026-09-24 19:05–19:32（Asia/Shanghai，下称「本次采集」）。星数一律取 RUYI-168 报批事实基线（GitHub API 2026-09-23 快照值），卡片已标注「快照 2026-09-23」。
- 卡片版式沿用 RUYI-164 确立的深色统一版式（左栏徽章/产品名/官方域名/一句话价值/License+Stars，右栏官方真实视觉+来源图注，底部期数条），未引入新设计语言。
- 本期无原创示意图：3 张卡片主视觉全部取自官方渠道；卡片上的版式文字（类型徽章、License、Stars、快照日期）为设计排版，非产品运行输出。

## Taste-Skill 专项说明（重要：已在库，未重复产出）

核验发现 #2 Taste-Skill 已于 RUYI-164 批次入库：PR #14（commit `3634684`，2026-09-24 12:31 合并 main，AIHub 检出 SHA `09cd4419`）包含：

- `src/db/seed-data.ts` L692：`name: "Taste Skill", slug: "taste-skill", type: "skill", category: "creative-design"`，officialUrl 与本期基线一致（github.com/Leonxlnx/taste-skill）；
- `src/lib/resource-profiles.ts` L991：详情图 `/media/taste-skill.png` 与正文；
- `public/media/taste-skill.png`：1200×630，SHA256 `7b1ac042318cfba421883fbbc0ef8ffa74d58a6d191375212a369e8e59696591`，与 RUYI-164 素材包 `cards/01_taste-skill.png` 完全一致。

时序说明：白小巡去重基线取自 09-23 在库快照（SHA `41b02eea`，59 条），RUYI-164 于 09-24 12:31 合并，早于 Owner 本期批准（09-24 19:14）约 6.7 小时。设计侧据此**未重复产出 Taste-Skill 卡片**，收录呈现直接复用在库卡片即可；请收口核验并与 Owner 终审确认处理方式（按「已在库」合并处理，或如需重制卡面，可基于 RUYI-164 素材包出 v2，本包不再自行扩产）。

## 一、卡片主视觉来源（上卡素材）

| 卡片 | 素材文件 | 来源 URL | 许可证 | 上卡方式 |
|---|---|---|---|---|
| ECC | `official_ecc_og.png` | https://ecc.tools/og.png?v=3f55054986bd （官网 OG 图，meta 标注 1200×630） | 站点版权归 ECC 方所有 | 预裁剪保留上部 68%（裁除 OG 内嵌的按钮、安装命令、工具栏与旧星数统计条），取水墨花卉主视觉 |
| DeepSeek-Reasonix | `official_reasonix_og.png` | https://reasonix.io/og.png （官网 OG 图，meta 标注 1200×630） | 站点版权归 Reasonix 方所有 | 裁除顶部导航栏后完整呈现主标语区（contain 白底面板） |
| book-to-skill | `official_booktoskill_banner.webp` | https://raw.githubusercontent.com/virgiliojr94/book-to-skill/HEAD/docs/assets/banner.webp （仓库官方 banner） | 仓库 MIT | 裁切 Booklin 形象与「书页→方块阵列」主视觉 |

## 二、备选素材（已采集、未上卡，供入库时替换选用）

| 文件 | 来源 URL | 说明 |
|---|---|---|
| `official_ecc_hero.png` | https://raw.githubusercontent.com/affaan-m/ECC/HEAD/assets/hero.png | 仓库官方 hero 图（2400×1350，与 OG 同套视觉） |
| `official_reasonix_logo.svg` | https://raw.githubusercontent.com/esengine/DeepSeek-Reasonix/HEAD/docs/logo-ghost-wave-effect.svg | 仓库官方 Logo（矢量） |
| `gh_social_affaan-m_ECC.png` 等 3 张 | https://opengraph.githubassets.com/1/<owner>/<repo> | GitHub 官方 Social Preview 渲染（内嵌渲染当日星数，替换选用时注意与快照标注的一致性） |

## 三、来源证据快照（`evidence/`）

- 3 个项目 README 原文：`readme_affaan-m_ECC.md`、`readme_esengine_DeepSeek-Reasonix.md`、`readme_virgiliojr94_book-to-skill.md`（raw.githubusercontent.com，HEAD 引用，本次采集）。
- 2 个官网 HTML 快照：`site_ecc.tools.html`、`site_reasonix.io.html`（本次采集）。book-to-skill 无独立官网，事实以仓库 README 为准，与基线一致。
- 事实基线一律以 RUYI-168 报批评论（2026-09-23 02:16，白小巡）与 Owner 批准评论（2026-09-24 19:14，cfgxy）为准；本包不新增基线之外的产品事实。卡片一句话价值为基线原文。

## 四、使用边界（入库与后续使用必读）

1. **禁止第三方热链**：全部图片入库时必须本地化到 AIHub Pages 产物（`public/media/`），不得外链 ecc.tools / reasonix.io / raw.githubusercontent.com / opengraph.githubassets.com。
2. **识别性引用**：视觉素材版权归各产品方所有，仅限目录收录介绍场景，须随附官方链接；不做商业宣传用途，不得变形、变色或用于暗示背书。
3. **DeepSeek 商标提示（Reasonix 专项）**：DeepSeek-Reasonix 为第三方项目、非 DeepSeek 官方（基线风险项）。卡片主视觉为 reasonix.io 官方 OG 截取，其中「DeepSeek」字样系该项目自身表述；入库文案与图注不得表述为 DeepSeek 官方产品。
4. **ECC OG 内嵌数据裁除**：ecc.tools OG 图下部内嵌旧星数统计（257,250，渲染当日值），上卡时已整条裁除，避免与快照 chip（★265,247，09-23 快照）冲突；后续如换用 hero 图同样注意。
5. **快照时效**：卡片 Stars 为 2026-09-23 快照值；入库文案引用星数须沿用基线口径并标注快照日期。
6. **素材改动范围**：上卡素材仅做裁切、缩放与排版合成，未修改产品界面内容；采集当日 ecc.tools、reasonix.io 与三个仓库均访问有效。

## 五、卡片规格（收口抽查口径）

- 尺寸/格式：1200×630，PNG（RGB），原生分辨率无放大。
- 版式：左栏（x=64，宽 492）类型徽章 + 分类、产品名（Black 54/46px 自适应）、官方域名（Montserrat SemiBold，accent 色）、一句话价值（Medium 25px，行头禁则+开括号行尾禁则）、分隔线 + License/★Stars/快照日期 chips；右栏 544×452 圆角 18px 官方视觉 + 底部来源图注渐变条；底部 accent 分隔线 + 「AIHub 编辑精选 · 每日 AI 新资源（2026-09-23 期）」+ FEATURED · AIHUB。
- 主色：ECC 暖玫瑰（226,168,148，取自官网按钮 #C29F9C 提亮）；DeepSeek-Reasonix 蓝（77,141,245，取自官网按钮 #226FD2 提亮）；book-to-skill 紫（154,96,250，取自 banner 底色 #5D27BD 提亮）。
- 字体：Noto Sans CJK SC（Black/Bold/Medium/Regular）+ Montserrat（SemiBold），与 RUYI-164 一致。
- 建议入库命名：`public/media/ecc.png`、`public/media/deepseek-reasonix.png`、`public/media/book-to-skill.png`（最终 slug 以入库 SOP 与 seed-data 为准）。

## 六、复现方式

```bash
cd ruyi168_design_assets   # 本目录
python3 gen_cards.py       # 依赖 Pillow（≥10），读 raw/ 生成 cards/ 全部 3 张
sha256sum -c SHA256SUMS.txt
```

字体依赖：Noto Sans CJK（系统包 google-noto-cjk）与 Montserrat（julietaula-montserrat）。

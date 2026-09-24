# RUYI-168 替换卡片素材包 v2（Taste-Skill / ECC）

交付范围：Owner 终审（2026-09-24，评论 `01a0d3fb` 线程所引裁决）裁定 Taste-Skill、ECC 替换文案和图片；本包为该两张 1200×630 卡片图的替换重制交付。版式与规格标准不变（继承 RUYI-164 深色统一版式）。

## 一、替换背景与理由

- **Taste-Skill**：本期报批资源经查与在库资源重复——RUYI-164 期已收录（PR #14，commit `3634684`，2026-09-24 12:31 合并；seed-data `taste-skill`，`/media/taste-skill.png`）。本卡按本期报批基线文案重制，供终审定稿使用。
- **ECC**：v1 卡采用官方 OG 花卉图局部裁剪，产品辨识度不足。v2 改用官方首屏 Hero 图（2400×1350），画面承载产品定位语、副题与兼容工具（Claude Code/Codex/Cursor/OpenCode/Gemini/Zed/Copilot），并规避了 Hero 底部内嵌统计条（409 CATALOG / 7 HARNESSES / ECC 2.0α 等自报数字已全部裁出画面，与卡面 GitHub 快照星数无冲突）。

## 二、事实口径

- 星数、License、一句话价值均取自 RUYI-168 报批事实基线（GitHub 快照 2026-09-23），未新增基线外事实：
  - Taste Skill：SKILL / MIT / ★89,268 / tasteskill.dev / 「给 AI 装「品味」，抑制模板化平庸输出」
  - ECC：APP / MIT / ★265,247 / ecc.tools / 「给编码 Agent 做性能优化的 harness 系统（技能、本能、记忆、安全一体）」
- **分类词口径**：徽章旁分类按基线分类名——Taste-Skill「创意与设计」（在库 `creative-design` 映射）、ECC「辅助工具」（报批单分类）。白小巡收口时提出的口径问题（定位短语 vs 分类名）终审未裁决前，本包按分类名执行；若终审判定用定位短语、或谢小婷定稿文案与基线不同，改 `gen_cards.py` ITEMS 对应一行重跑脚本即可（分钟级）。

## 三、素材来源与使用边界

| 文件 | 来源 | 采集 | 使用边界 |
| --- | --- | --- | --- |
| raw/official_tasteskill_og-image.jpg | tasteskill.dev 官方 OG 图（首页 `og:image` 指向 `/og-image.jpg`，1200×630） | 2026-09-24 | 仅 AIHub 目录站精选卡片及配套展示使用；本地化入库，不做第三方热链；不改官方视觉元素 |
| raw/official_ecc_hero.png | ecc.tools 官网首屏 Hero 图（2400×1350） | 2026-09-24（本期 v1 包同文件复制） | 同上；卡片仅取局部（眉标/标语/副题/RUNS ACROSS 区），不呈现内嵌统计条 |

- Taste-Skill OG 图与 RUYI-164 期素材**字节级一致**（SHA256 `81eac73e…c5592`）——官方艺术图未改版，本包以今日重新采集为准并记录同源事实；两期卡面视觉将保持一致，属预期。
- 证据快照见 `evidence/`（tasteskill.dev 首页 HTML、Leonxlnx/taste-skill README、ecc.tools 首页 HTML、affaan-m/ECC README）。ECC 两项证据复用本期 v1 包 `evidence/` 同文件。

## 四、卡面构成与裁剪参数（可定位、可复现）

- 生成脚本：`python3 gen_cards.py`（输出 `cards/01_taste-skill.png`、`cards/02_ecc.png`，1200×630 PNG RGB，原生分辨率无放大）。
- 版式：深色统一版式（bg 11,14,20）；左栏类型徽章/分类、产品名、官方域名、一句话价值、分隔线 + License/★Stars/快照 chips（快照 2026-09-23）；右栏 544×452 圆角面板官方视觉 + 底部来源图注渐变条；底部条「AIHub 编辑精选 · 每日 AI 新资源（2026-09-23 期）」。
- Taste-Skill：OG 图 1200×630 直接 `fill`（fx=.07, fy=.5），与 RUYI-164 期同参数。
- ECC：Hero 图 `precrop=(0, 0.111, 0.4167, 0.7037)` 后 `fill`（fx=0）——即源图 x 0–1000 / y 150–950 窗口，实测避开内嵌 footer（y≥1260）与右列区（x≥1108），脚本内含中文行头/行尾禁则断行。
- 强调色：Taste-Skill 暖金 (201,162,107)（与在库卡一致）；ECC 暖陶 (226,168,148)（官方品牌橙陶色系）。

## 五、校验

清单见 `SHA256SUMS.txt`（`sha256sum -c SHA256SUMS.txt` 验证）。交付物以卡片 PNG 与本包为准；PR 前不动仓库（等终审与合并指令）。

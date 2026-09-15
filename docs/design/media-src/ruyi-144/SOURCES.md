# RUYI-144 设计素材来源与使用边界（2026-09-15 交付，2026-09-15 Owner 终审整体通过）

本期 4 条：mirofish、yue、flowsint、tradingagents。卡片由黄小云交付（SVG 源 + 1200×600 PNG），本目录为归档。

## 来源与主色依据

| slug | 主色 | 主色依据 |
|---|---|---|
| mirofish | 蓝 #4FA3D8 | 官方 logo（仓库 static/image/MiroFish_logo.jpeg）像素采样，深蓝系亮化衍生 |
| yue | 品红 #F472B6 | 设计假定：官方 logo 为单色「乐」符圆标（assets/logo.png），README/项目页无品牌色值 |
| flowsint | 橙红 #F35822 | 官方组织头像（github.com/reconurge.png）像素采样 |
| tradingagents | 青绿 #14C290 | 官方 logo（assets/TauricResearch.png）像素采样 |

logo 均于 2026-09-15 从官方仓库 / 组织头像直接下载采样；四个 slug 已核对 main `src/db/seed-data.ts` 无冲突。

## 使用边界

- 禁止第三方热链：卡片为自绘本地化 SVG/PNG；入库 PNG 落 `public/media/<slug>.png`，SVG 源与本记录落本目录。
- 版权边界：卡面右侧为功能示意图而非官方截图；各产品名称与标识版权归产品方所有，仅用于目录站编辑精选的识别性引用，须随附官方链接，不得用于商业宣传物料或暗示背书。
- YuE 许可区分：代码 Apache-2.0，模型权重 CC BY-NC 4.0（非商用），卡面已注明，详情文案保留该区分。
- 卡面未放星数：避免 GitHub 快照过期后卡片失真。
- 可复现：四张卡由生成脚本产出（交付工作副本 gen_cards_144.py，随 Issue RUYI-144 留档），改字改色重跑即可复现。

## MiroFish 卡面两处与报批基线的有意偏差（Owner 终审已整体通过）

1. 基线中「多智能体共识输出预测结论」的「共识」一词官方 README 无对应术语，卡面改用 README 原文五阶段工作流表述。
2. 官方宣传语「预测万物」属宣传口径，未上卡面。

## 走查记录（2026-09-15，黄小云）

四卡尺寸统一 1200×600；徽章胶囊加宽修正文字溢出并复检；图内命令/组件名逐项对照官方 README 无虚构；flowsint 图谱节点与注释重叠已修正复检；四卡主色互不冲突、与既往交付色板不混淆；无第三方热链、无星数快照依赖、无未证实数据上卡。

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AIHub 每日 AI 新资源精选（2026-09-20 期）编辑卡片生成脚本
规格沿用 RUYI-142（2026-09-14 期）已验收标准：1200×630 PNG，统一深色版式。
工艺：HTML/CSS 排版 → headless Chromium 截图（字体走系统 fontconfig，Noto Sans CJK SC）。

用法：把本脚本放在设计包根目录（含 raw/ 与 cards/），执行 python3 gen_cards.py
依赖：Python3 + PIL（校验）、Chromium（路径见 CHROME，可按环境修改）
事实口径：全部字段取自本单报批评论（2026-09-20 02:13，白小巡）及其 2026-09-20 快照值；
卡面星数一律标注「2026-09-20 快照」。
"""
import os, subprocess, sys
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(BASE, "raw")
CARDS = os.path.join(BASE, "cards")
HTML = os.path.join(BASE, "html")
CHROME = os.path.expanduser(
    "~/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome")

# 类型徽章色（全期统一）：SKILL 紫 / APP 蓝 / MCP 绿
TYPE_COLOR = {"SKILL": "#A78BFA", "APP": "#60A5FA", "MCP": "#34D399"}

# 主题色取自各产品官方视觉（提取方法：高饱和色簇统计，见 SOURCES.md）；
# huashu-report 官方视觉无高饱和主色，采用中性金适配深色版式（设计决策，已记录）。
ITEMS = [
    dict(key="agent-skills", typ="SKILL", name="agent-skills", name_size=54,
         domain="github.com/addyosmani/agent-skills",
         value="生产级 AI 编码 agent 工程技能集<br>（Addy Osmani 维护）",
         lic="MIT", stars="96,882", accent="#DC4242",
         visual="addys-agent-skills.jpg", visual_bg="#FFFFFF",
         caption="视觉来源：Addy Osmani 官方网站 addyosmani.com（2026-09-22 采集）"),
    dict(key="weknora", typ="APP", name="WeKnora", name_size=54,
         domain="github.com/Tencent/WeKnora",
         value="腾讯开源 LLM 知识平台：文档转可检索 RAG、<br>自主推理 agent、自维护 Wiki",
         lic="自定义许可证 · 细则未知", stars="27,364", accent="#5B9BD5",
         visual="weknora_architecture.png", visual_bg="#FFFFFF",
         caption="视觉来源：WeKnora 官方仓库 docs/images（2026-09-22 采集）"),
    dict(key="jianying-headless", typ="SKILL", name="jianying-headless", name_size=46,
         domain="github.com/mcncarl/jianying-headless",
         value="无界面驱动剪映：原生草稿、隔离编辑与导出，供 agent 直接调用",
         lic="许可证未知 · 私有源预览", stars="1,481", accent="#2FB0D8",
         visual="og_jianying-headless.png", visual_bg="#FFFFFF",
         caption="视觉来源：GitHub 官方 Social Preview（2026-09-22 采集）"),
    dict(key="easel", typ="APP", name="Easel", name_size=54,
         domain="github.com/ZJU-REAL/Easel",
         value="浙大团队开源社媒 agent：<br>发现趋势、创作内容、多平台发布",
         lic="Apache-2.0", stars="1,238", accent="#8B6FD8",
         visual="easel_brand_dark.png", visual_bg="#06070B",
         caption="视觉来源：Easel 官方仓库 assets/readme（dark 版，2026-09-22 采集）"),
    dict(key="huashu-report", typ="SKILL", name="huashu-report", name_size=50,
         domain="github.com/alchaincyf/huashu-report",
         value="机构级研究报告技能：规范从 42 份顶级机构报告反向提炼",
         lic="MIT", stars="409", accent="#C9A227",
         visual="og_huashu-report.png", visual_bg="#FFFFFF",
         caption="视觉来源：GitHub 官方 Social Preview（2026-09-22 采集）"),
    dict(key="blitzstrike", typ="MCP", name="Blitz Strike", name_size=54,
         domain="github.com/shinthink/blitzstrike",
         value="通用 MCP 渗透测试工具箱：<br>结构化侦察、攻击与报告方法论",
         lic="MIT", stars="637", accent="#E8A33D",
         visual="blitzstrike_banner.webp", visual_bg="#06070B",
         caption="视觉来源：Blitz Strike 官方仓库 .github/assets（2026-09-22 采集）",
         risk="仅限授权测试用途"),
]

TPL = """<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;position:relative;
  background:#0B0F15;font-family:"Noto Sans CJK SC",sans-serif;color:#E6EDF3}
.glow{position:absolute;right:-140px;top:-160px;width:820px;height:640px;
  background:radial-gradient(closest-side, @accent@2E, transparent 70%)}
.left{position:absolute;left:64px;top:66px;width:544px}
.badges{display:flex;gap:10px;align-items:center}
.chip{display:inline-block;padding:5px 14px;border-radius:7px;font-size:15px;
  font-weight:700;letter-spacing:2px;color:@accent@}
.chip.type{background:@accent@1F;border:1px solid @accent@66}
.chip.risk{border:1px solid #F0B24A88;color:#F0B24A;letter-spacing:1px;
  font-size:13px;padding:5px 10px;font-weight:500}
.name{margin-top:22px;font-weight:900;font-size:@name_size@px;line-height:1.12;
  color:#F4F8FC;letter-spacing:.5px}
.domain{margin-top:12px;font-family:"Source Code Pro","DejaVu Sans Mono",monospace;
  font-size:18px;color:@accent@}
.value{margin-top:24px;font-size:25px;font-weight:500;line-height:1.56;
  color:#DDE6EF;max-width:544px}
.meta{margin-top:30px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.lic{padding:5px 13px;border-radius:7px;border:1px solid @accent@77;
  color:@accent@;font-size:15px;font-weight:700}
.stars{font-size:19px;font-weight:700;color:#F5C96B}
.stars b{color:#F0B24A;font-weight:400}
.snap{font-size:14px;color:#7E8CA0}
.right{position:absolute;right:56px;top:0;width:500px;height:574px;
  display:flex;flex-direction:column;justify-content:center}
.visual{border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.10);
  box-shadow:0 18px 50px rgba(0,0,0,.55);line-height:0}
.visual img{width:100%;height:auto;display:block}
.caption{margin-top:11px;font-size:13px;color:#8494A6;text-align:center}
.footer{position:absolute;left:0;bottom:0;width:100%;height:54px;
  display:flex;align-items:center;justify-content:space-between;padding:0 64px;
  border-top:1px solid @accent@59;
  background:linear-gradient(90deg,@accent@24,transparent 55%)}
.fbrand{font-size:17px;font-weight:700;color:@accent@}
.fmeta{font-size:14px;color:#7E8CA0}
</style></head><body>
<div class="glow"></div>
<div class="left">
  <div class="badges"><span class="chip type">@typ@</span>@risk_chip@</div>
  <div class="name">@name@</div>
  <div class="domain">@domain@</div>
  <div class="value">@value@</div>
  <div class="meta"><span class="lic">@lic@</span>
    <span class="stars"><b>★</b> @stars@</span><span class="snap">2026-09-20 快照</span></div>
</div>
<div class="right">
  <div class="visual" style="background:@visual_bg@"><img src="raw/@visual@"></div>
  <div class="caption">@caption@</div>
</div>
<div class="footer"><span class="fbrand">AIHub 编辑精选</span>
  <span class="fmeta">每日 AI 新资源精选 · 2026-09-20 期</span></div>
</body></html>"""


def render():
    os.makedirs(CARDS, exist_ok=True)
    os.makedirs(HTML, exist_ok=True)
    ok = []
    for it in ITEMS:
        html = TPL
        reps = dict(accent=it["accent"], typ=it["typ"],
            risk_chip=('<span class="chip risk">{}</span>'.format(it["risk"])
                if it.get("risk") else ""),
            name=it["name"], name_size=str(it["name_size"]),
            domain=it["domain"], value=it["value"], lic=it["lic"],
            stars=it["stars"], visual_bg=it["visual_bg"],
            visual=it["visual"], caption=it["caption"])
        for k, v in reps.items():
            html = html.replace("@" + k + "@", v)
        hp = os.path.join(HTML, it["key"] + ".html")
        # HTML 写入 html/ 子目录，素材相对路径按其位置计算
        html = html.replace('src="raw/', 'src="%s/' % os.path.relpath(
            RAW, os.path.dirname(hp)))
        with open(hp, "w", encoding="utf-8") as f:
            f.write(html)
        out = os.path.join(CARDS, it["key"] + ".png")
        cmd = [CHROME, "--headless", "--no-sandbox", "--disable-gpu",
               "--hide-scrollbars", "--force-device-scale-factor=1",
               "--window-size=1200,630", "--virtual-time-budget=4000",
               "--screenshot=" + out, "file://" + hp]
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if not os.path.exists(out):
            print("FAIL", it["key"], r.stderr[-400:]); sys.exit(1)
        w, h = Image.open(out).size
        assert (w, h) == (1200, 630), (it["key"], w, h)
        ok.append((it["key"], w, h))
        print("OK", it["key"], w, h)


if __name__ == "__main__":
    render()

#!/usr/bin/env python3
# AIHub 精选卡片生成：1200x630，深色底，嵌入真实产品视觉
# RUYI-156（2026-09-18 批准 4 条）；模板与版式沿用 RUYI-142 已验收规格
import subprocess, pathlib, sys

ROOT = pathlib.Path(__file__).parent
RAW = ROOT / "raw"
OUT = ROOT / "cards"
OUT.mkdir(exist_ok=True)
CHROME = sorted(pathlib.Path.home().glob(".cache/ms-playwright/chromium-*/chrome-linux/chrome"), key=lambda p: p.name)[-1]

SNAPSHOT = "2026-09-17"   # 星数快照日期（与本期报批评论一致）
ISSUE_DATE = "2026-09-18"  # 本期批准/交付日期（页脚）

# 视觉素材模式：cover=填满裁切（深色图），contain=浅色底完整展示（浅色图）
# visbg 可显式指定视觉区底色（默认白），用于与素材底色无缝衔接
PRODUCTS = [
    dict(slug="hyperframes", name="HyperFrames", type="APP", color="#00D4FF",
         tagline="用 HTML 让 AI agent 直接渲染成视频的开源框架（HeyGen 官方）",
         license="Apache-2.0", stars="50,643", domain="github.com/heygen-com/hyperframes",
         visual=("gh_heygen-com_hyperframes.png", "contain", None,
                 "官方仓库 Social Preview（GitHub 自动生成）")),
    dict(slug="humanizer", name="Humanizer", type="SKILL", color="#F59E0B",
         tagline="去除文本 AI 写作痕迹、读起来像人写的技能",
         license="MIT", stars="49,093", domain="github.com/blader/humanizer",
         visual=("gh_blader_humanizer.png", "contain", None,
                 "官方仓库 Social Preview（GitHub 自动生成，右侧为作者头像）")),
    dict(slug="openmaic", name="OpenMAIC", type="APP", color="#6A62C7",
         tagline="清华团队开源的一键沉浸式多智能体课堂（v1.0.0）",
         license="MIT", stars="37,362", domain="github.com/THU-MAIC/OpenMAIC",
         visual=("banner_thu-maic_openmaic.png", "contain", "#D4DBFF",
                 "官方品牌 Banner（仓库 assets/banner.png）")),
    dict(slug="context-mode", name="Context Mode", type="APP", color="#1A56DB",
         tagline="为 AI 编码 agent 做上下文窗口优化：沙箱化工具输出、会话记忆",
         license="ELv2（自定义）", stars="23,205", domain="github.com/mksglu/context-mode",
         visual=("og_context-mode.png", "contain", None,
                 "官方 OG 主视觉（context-mode.com）")),
]

TYPE_LABEL = {"SKILL": "SKILL", "APP": "APP", "MCP": "MCP"}

TPL = """<!doctype html>
<html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ width:1200px; height:630px; background:#0B0E14; color:#fff;
       font-family:'Noto Sans CJK SC','Noto Sans CJK','WenQuanYi Micro Hei',sans-serif;
       overflow:hidden; position:relative; }}
.glow {{ position:absolute; width:760px; height:760px; right:-220px; top:-320px;
        background:radial-gradient(circle, {color}26 0%, transparent 62%); }}
.glow2 {{ position:absolute; width:520px; height:520px; left:-180px; bottom:-260px;
         background:radial-gradient(circle, {color}1A 0%, transparent 60%); }}
.wrap {{ position:relative; display:flex; height:472px; padding:56px 56px 0 56px; gap:44px; }}
.left {{ width:420px; flex:none; display:flex; flex-direction:column; }}
.badge {{ display:inline-flex; align-self:flex-start; align-items:center; gap:8px;
         border:1.5px solid {color}; color:{color}; font-size:17px; font-weight:700;
         letter-spacing:2px; padding:5px 14px; border-radius:999px; }}
.badge::before {{ content:''; width:7px; height:7px; border-radius:50%; background:{color}; }}
h1 {{ font-size:46px; line-height:1.15; font-weight:800; margin-top:22px; letter-spacing:.2px; }}
.domain {{ font-size:17px; color:#8B93A7; margin-top:10px; font-weight:500; }}
.tagline {{ font-size:21.5px; line-height:1.62; color:#C9D0DE; margin-top:26px; font-weight:400; }}
.meta {{ margin-top:auto; display:flex; gap:18px; font-size:14.5px; color:#8B93A7; white-space:nowrap; }}
.meta b {{ color:#E6EAF2; font-weight:600; }}
.meta small {{ font-size:11.5px; }}
.right {{ flex:1; position:relative; }}
.vis {{ position:absolute; inset:0; border-radius:18px; overflow:hidden;
       border:1px solid #ffffff1F; background:{visbg}; display:flex; align-items:center; justify-content:center; }}
.vis img.cover {{ width:100%; height:100%; object-fit:cover; }}
.vis img.cover-low {{ width:100%; height:100%; object-fit:cover; object-position:center 72%; }}
.vis img.contain {{ max-width:100%; max-height:100%; object-fit:contain; padding:18px; }}
.vis img.contain-dark {{ max-width:100%; max-height:100%; object-fit:contain; padding:24px; }}
.vis img.icon {{ width:210px; height:210px; border-radius:44px; box-shadow:0 24px 70px {color}59; }}
.cap {{ position:absolute; right:0; bottom:-30px; font-size:13.5px; color:#6B7280; text-align:right; }}
.foot {{ position:absolute; left:56px; right:56px; bottom:0; height:66px;
        border-top:1px solid #ffffff14; display:flex; align-items:center; justify-content:space-between; }}
.foot .brand {{ font-size:17px; font-weight:700; letter-spacing:.5px; }}
.foot .brand span {{ color:{color}; }}
.foot .note {{ font-size:14px; color:#6B7280; }}
</style></head><body>
<div class="glow"></div><div class="glow2"></div>
<div class="wrap">
  <div class="left">
    <span class="badge">{typ}</span>
    <h1>{name}</h1>
    <div class="domain">{domain}</div>
    <div class="tagline">{tagline}</div>
    <div class="meta"><span>开源协议 <b>{license}</b></span><span>GitHub Stars <b>{stars}</b><span style="font-size:12px">（{snapshot} 快照）</span></span></div>
  </div>
  <div class="right">
    <div class="vis">{imgtag}</div>
    <div class="cap">{cap}</div>
  </div>
</div>
<div class="foot">
  <div class="brand">AIHub <span>·</span> 编辑精选</div>
  <div class="note">AI 工具 · 应用 · SKILL · MCP 目录 ｜ {issue_date}</div>
</div>
</body></html>"""


def build(p):
    fname, mode, visbg, cap = p["visual"]
    f = RAW / fname
    if not f.exists():
        return False, f"missing {fname}"
    cls = {"cover": "cover", "cover-low": "cover-low", "contain": "contain",
           "contain-dark": "contain-dark", "icon": "icon"}[mode]
    visbg = visbg or {"contain": "#FFFFFF", "cover": "#101521", "cover-low": "#101521",
                      "contain-dark": "#0E2419", "icon": "#161B27"}[mode]
    imgtag = f'<img class="{cls}" src="file://{f}">'
    html = TPL.format(color=p["color"], typ=TYPE_LABEL[p["type"]], name=p["name"],
                      domain=p["domain"], tagline=p["tagline"], license=p["license"],
                      stars=p["stars"], imgtag=imgtag, cap=cap, visbg=visbg,
                      snapshot=SNAPSHOT, issue_date=ISSUE_DATE)
    hp = OUT / f"{p['slug']}.html"
    hp.write_text(html, encoding="utf-8")
    png = OUT / f"{p['slug']}.png"
    r = subprocess.run([str(CHROME), "--headless", "--disable-gpu", "--no-sandbox",
                        "--screenshot=" + str(png), "--window-size=1200,630",
                        "--hide-scrollbars", str(hp)], capture_output=True, text=True, timeout=60)
    ok = png.exists() and png.stat().st_size > 20000
    return ok, f"{png.name} {png.stat().st_size if png.exists() else 0}B"


if __name__ == "__main__":
    only = set(sys.argv[1:])
    results = []
    for p in PRODUCTS:
        if only and p["slug"] not in only:
            continue
        ok, msg = build(p)
        results.append(("OK " if ok else "FAIL ") + msg)
    print("\n".join(results))

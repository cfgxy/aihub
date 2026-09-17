#!/usr/bin/env python3
# AIHub 精选卡片生成（RUYI-147 期，2026-09-16 批准 6 条）：1200x630，深色底，嵌入真实产品视觉
# 版式沿用 09-14 期（RUYI-142）已验收模板；卡片文案（名称/类型/一句话价值/License/Stars）取自本期报批评论事实基线
import pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).parent
RAW = ROOT / "raw"
OUT = ROOT / "cards"
OUT.mkdir(exist_ok=True)
CHROME = sorted(pathlib.Path.home().glob(".cache/ms-playwright/chromium_headless_shell-*/chrome-linux/headless_shell"), key=lambda p: p.name)[-1]
SNAP = "2026-09-16"

# 视觉素材模式：cover=填满裁切（深色图），contain=白卡完整展示（浅色图），
# contain-dark=深底完整展示（深色图），cover-pos=按 object-position 取景裁切
PRODUCTS = [
    dict(slug="openclaw", name="OpenClaw", type="APP", color="#E04030",
         tagline="「真正替你干活」的开源个人 AI 助理，跨 OS/平台执行真实任务",
         license="自定义", license_note="（细节未知）", stars="389,766", domain="openclaw.ai",
         visual=("openclaw_banner_dark.png", "contain-dark", "#050507", "官方品牌横幅（仓库 docs/assets/openclaw-banner-dark.png）")),
    dict(slug="pi", name="pi", type="APP", color="#6C9BD2",
         tagline="统一 LLM API、agent 循环、TUI 与编码 agent CLI 的轻量工具箱",
         license="MIT", license_note="", stars="105,582", domain="github.com/earendil-works/pi",
         visual=("og_pi.png", "contain-dark", "#101020", "官网 OG 主视觉（pi.dev/social.png）")),
    dict(slug="text-to-cad", name="text-to-cad", type="SKILL", color="#A78BFA",
         tagline="面向 agent 的 CAD/CAE/CAM 技能库，从文字到可制造模型",
         license="MIT", license_note="", stars="15,875", domain="texttocad.dev",
         visual=("og_texttocad.png", "contain-dark", "#0F0E17", "官网主视觉（texttocad.dev）")),
    dict(slug="graphify", name="Graphify", type="APP", color="#21A05B",
         tagline="把代码库、文档、SQL schema、PDF 转成可查询知识库",
         license="Apache-2.0", license_note="", stars="116,988", domain="graphify.com",
         visual=("graphify_hero.png", "cover", "#101521", "官方 Demo：代码库知识图谱可视化（仓库 docs/graph-hero.png）")),
    dict(slug="serena", name="serena", type="MCP", color="#DFA050",
         tagline="为编码 agent 提供语义级代码检索与编辑能力",
         license="GPL-3.0+", license_note="（SolidLSP 为 MIT）", stars="29,399", domain="oraios.github.io/serena",
         visual=("serena_block_diagram.svg", "contain", "#FFFFFF", "官方架构图（仓库 resources/serena-block-diagram.svg）")),
    dict(slug="openresearch", name="OpenResearch", type="APP", color="#A22C3C",
         tagline="把编码 agent 变成研究 agent，自动检索与产出研究材料",
         license="MIT", license_note="", stars="3,164", domain="openresearch.sh",
         visual=("or_site_shot.png", "cover-pos", "#FFFFFF", "官网 openresearch.sh 首页实景（2026-09-16 采集）", "74% 42%")),
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
.vis img.cover-pos {{ width:100%; height:100%; object-fit:cover; object-position:{opos}; }}
.vis img.contain {{ max-width:100%; max-height:100%; object-fit:contain; padding:18px; }}
.vis img.contain-dark {{ max-width:100%; max-height:100%; object-fit:contain; padding:24px; }}
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
    <div class="meta"><span>开源协议 <b>{license}</b>{license_note}</span><span>GitHub Stars <b>{stars}</b><span style="font-size:12px">（{snap} 快照）</span></span></div>
  </div>
  <div class="right">
    <div class="vis">{imgtag}</div>
    <div class="cap">{cap}</div>
  </div>
</div>
<div class="foot">
  <div class="brand">AIHub <span>·</span> 编辑精选</div>
  <div class="note">AI 工具 · 应用 · SKILL · MCP 目录 ｜ {snap}</div>
</div>
</body></html>"""


def build(p):
    fname, mode, visbg, cap = p["visual"][:4]
    opos = p["visual"][4] if len(p["visual"]) > 4 else "center"
    f = RAW / fname
    if not f.exists():
        return False, f"missing {fname}"
    cls = {"cover": "cover", "cover-pos": "cover-pos", "contain": "contain",
           "contain-dark": "contain-dark"}[mode]
    imgtag = f'<img class="{cls}" src="file://{f}">'
    html = TPL.format(color=p["color"], typ=TYPE_LABEL[p["type"]], name=p["name"],
                      domain=p["domain"], tagline=p["tagline"], license=p["license"],
                      license_note=p.get("license_note", ""), stars=p["stars"],
                      snap=SNAP, imgtag=imgtag, cap=cap, visbg=visbg, opos=opos)
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

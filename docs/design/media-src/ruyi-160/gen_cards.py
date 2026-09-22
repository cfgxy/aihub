#!/usr/bin/env python3
# AIHub 精选卡片生成：1200x630，深色底，嵌入真实产品视觉
# RUYI-160（2026-09-19 批准 5 条）；模板与版式沿用 RUYI-142/156 已验收规格
# 新增：license_label / name_size / meta_size 参数、cover-right 裁切模式、
#       visual_html 覆盖（pcb-skill / Jev Review 仓库无图片素材，改用原创示意图）
import subprocess, pathlib, sys

ROOT = pathlib.Path(__file__).parent
RAW = ROOT / "raw"
OUT = ROOT / "cards"
OUT.mkdir(exist_ok=True)
CHROME = sorted(pathlib.Path.home().glob(".cache/ms-playwright/chromium-*/chrome-linux/chrome"), key=lambda p: p.name)[-1]

SNAPSHOT = "2026-09-19"   # 星数快照日期（与本期报批评论一致）
ISSUE_DATE = "2026-09-19"  # 本期批准/交付日期（页脚）

# 视觉素材模式：cover=填满裁切（深色图），cover-right=填满裁切靠右（横幅取局部），
# contain=浅色底完整展示（浅色图）；visual_html=原创示意图直接内嵌
PRODUCTS = [
    dict(slug="gongwen-gbt9704-skill", name="gongwen-gbt9704-skill", type="SKILL", color="#D64545",
         tagline="按国标 GB/T 9704-2012 生成可直接交付的公文 DOCX（版心 / 文号 / 页码 / 红头套打）",
         license="MIT", stars="675", domain="github.com/mizzlelover/gongwen-gbt9704-skill",
         name_size=36,
         visual=("gw_02-redhead-crop.png", "contain", "#F8F4F0",
                 "官方 2.0 更新插图「预印红头纸套打」裁切（仓库 marketing/）")),
    dict(slug="pcb-skill", name="pcb-skill", type="SKILL", color="#10B981",
         tagline="从硬件想法到可下单打样的 PCB：agent 驱动 EasyEDA Pro 全流程，含门控校验与实测案例库",
         license="MIT", stars="132", domain="github.com/daishuge/pcb-skill",
         visual_html="""
         <svg viewBox="0 0 560 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
           <rect x="14" y="14" width="532" height="372" rx="20" fill="#0D241B" stroke="#10B981" stroke-width="2"/>
           <!-- 铜箔走线与过孔 -->
           <g stroke="#10B981" stroke-opacity=".38" stroke-width="2.5" fill="none">
             <path d="M40 80 H150 q14 0 14 14 V150"/><path d="M520 80 H420 q-14 0 -14 14 V132"/>
             <path d="M40 330 H120 q14 0 14 -14 V262"/><path d="M520 330 H452 q-14 0 -14 -14 V274"/>
             <path d="M280 30 V52"/><path d="M280 370 V348"/>
           </g>
           <g fill="#10B981" fill-opacity=".55">
             <circle cx="40" cy="80" r="4"/><circle cx="520" cy="80" r="4"/><circle cx="40" cy="330" r="4"/>
             <circle cx="520" cy="330" r="4"/><circle cx="280" cy="30" r="4"/><circle cx="280" cy="370" r="4"/>
           </g>
           <!-- 流程节点：概念→原理图→选料→布局→布线→验证→下单 -->
           <g font-family="'Noto Sans CJK SC','WenQuanYi Micro Hei',sans-serif" text-anchor="middle">
             <g font-size="15.5" font-weight="600">
               <rect x="58"  y="98"  width="92" height="44" rx="10" fill="#10B98114" stroke="#10B981" stroke-width="1.6"/><text x="104"  y="126" fill="#D9F5E8">概念</text>
               <rect x="182" y="98"  width="92" height="44" rx="10" fill="#10B98114" stroke="#10B981" stroke-width="1.6"/><text x="228"  y="126" fill="#D9F5E8">原理图</text>
               <rect x="306" y="98"  width="92" height="44" rx="10" fill="#10B98114" stroke="#10B981" stroke-width="1.6"/><text x="352"  y="126" fill="#D9F5E8">选料</text>
               <rect x="430" y="98"  width="92" height="44" rx="10" fill="#10B98114" stroke="#10B981" stroke-width="1.6"/><text x="476"  y="126" fill="#D9F5E8">布局</text>
               <rect x="58"  y="242" width="92" height="44" rx="10" fill="#10B98114" stroke="#10B981" stroke-width="1.6"/><text x="104"  y="270" fill="#D9F5E8">布线</text>
               <rect x="182" y="242" width="92" height="44" rx="10" fill="#10B98114" stroke="#10B981" stroke-width="1.6"/><text x="228"  y="270" fill="#D9F5E8">验证</text>
               <rect x="306" y="242" width="92" height="44" rx="10" fill="#10B98126" stroke="#10B981" stroke-width="1.6" stroke-dasharray="5 4"/><text x="352"  y="270" fill="#D9F5E8">下单</text>
             </g>
             <g stroke="#10B981" stroke-width="1.8" fill="#10B981">
               <path d="M150 120 h28 m-7 -5 l7 5 l-7 5" fill="none"/>
               <path d="M274 120 h28 m-7 -5 l7 5 l-7 5" fill="none"/>
               <path d="M398 120 h28 m-7 -5 l7 5 l-7 5" fill="none"/>
               <path d="M476 142 v76 l-230 0 m-7 -5 l0 0" fill="none" opacity="0"/>
               <path d="M476 142 v60 q0 12 -12 12 H116 q-12 0 -12 12 v12" fill="none"/>
               <path d="M150 264 h28 m-7 -5 l7 5 l-7 5" fill="none"/>
               <path d="M274 264 h28 m-7 -5 l7 5 l-7 5" fill="none"/>
             </g>
             <text x="352" y="316" font-size="13" fill="#8BBFA9">止于支付页 · 付款需人工确认</text>
             <text x="104" y="316" font-size="13" fill="#8BBFA9">全流程门控校验</text>
           </g>
         </svg>
         """,
         cap="原创示意图：概念→原理图→选料→布局→布线→验证→下单（依据官方 README，非官方素材）"),
    dict(slug="motion-web", name="motion-web", type="SKILL", color="#E14B5F",
         tagline="「动效即材质」：带物理阻尼求解器与自动化 Headless 验证的前端动效技能，7 案例全过",
         license="CC BY-NC 4.0（禁商用）", license_label="许可协议", meta_size=14,
         stars="372", domain="github.com/feitangyuan/motion-web",
         visual=("mw_case_string-clock.png", "contain", "#ECECEC",
                 "官方案例「String Clock」实景：无刚性指针的物理阻尼时钟（仓库 assets/cases/）")),
    dict(slug="skillbox", name="skillbox", type="SKILL", color="#A3E635",
         tagline="自托管、可版本化的 AI agent 技能库：MCP 接口、按客户端授权",
         license="MIT", stars="154", domain="github.com/kitze/skillbox",
         visual=("sb_og.jpg", "cover", "#0D120C",
                 "官方 Landing OG 主视觉（仓库 landing/assets/og.jpg）")),
    dict(slug="jev-review", name="Jev Review", type="MCP", color="#8B5CF6",
         tagline="编码 agent 的持续软件质量审查 MCP：本地优先、无托管后端、stdio 接入",
         license="MIT", stars="113", domain="github.com/NiazMorshed2007/jev-review",
         visual_html="""
         <div style="width:100%;height:100%;background:#12101F;display:flex;flex-direction:column;padding:26px 28px;">
           <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
             <span style="width:11px;height:11px;border-radius:50%;background:#FF5F57;"></span>
             <span style="width:11px;height:11px;border-radius:50%;background:#FEBC2E;"></span>
             <span style="width:11px;height:11px;border-radius:50%;background:#28C840;"></span>
             <span style="margin-left:10px;font-size:14.5px;color:#8B93A7;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;">jev-review · local MCP（stdio）</span>
           </div>
           <div style="font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:16.5px;color:#C9D0DE;margin-bottom:16px;">&gt; jev_review<span style="color:#8B5CF6;">_</span></div>
           <div style="display:flex;flex-wrap:wrap;gap:10px;">
             <span style="border:1.4px solid #8B5CF6;color:#D6CCF7;border-radius:999px;padding:6px 15px;font-size:14.5px;">Correctness</span>
             <span style="border:1.4px solid #8B5CF6;color:#D6CCF7;border-radius:999px;padding:6px 15px;font-size:14.5px;">Complexity</span>
             <span style="border:1.4px solid #8B5CF6;color:#D6CCF7;border-radius:999px;padding:6px 15px;font-size:14.5px;">Changeability</span>
             <span style="border:1.4px solid #8B5CF6;color:#D6CCF7;border-radius:999px;padding:6px 15px;font-size:14.5px;">Modularity</span>
             <span style="border:1.4px solid #8B5CF6;color:#D6CCF7;border-radius:999px;padding:6px 15px;font-size:14.5px;">Tests</span>
             <span style="border:1.4px solid #8B5CF6;color:#D6CCF7;border-radius:999px;padding:6px 15px;font-size:14.5px;">Security</span>
             <span style="border:1.4px solid #8B5CF655;color:#9A8FBF;border-radius:999px;padding:6px 15px;font-size:14.5px;">…</span>
           </div>
           <div style="margin-top:auto;font-size:13.5px;color:#8B93A7;line-height:1.6;">API key 留在本机 · 无托管后端 · 评分维度取自官方 README</div>
         </div>
         """,
         cap="原创示意图：jev_review 评审维度（依据官方 README，非真实运行输出）"),
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
h1 {{ font-size:{name_size}px; line-height:1.15; font-weight:800; margin-top:22px; letter-spacing:.2px; }}
.domain {{ font-size:17px; color:#8B93A7; margin-top:10px; font-weight:500; }}
.tagline {{ font-size:21.5px; line-height:1.62; color:#C9D0DE; margin-top:26px; font-weight:400; }}
.meta {{ margin-top:auto; display:flex; gap:18px; font-size:{meta_size}px; color:#8B93A7; white-space:nowrap; }}
.meta b {{ color:#E6EAF2; font-weight:600; }}
.meta small {{ font-size:11.5px; }}
.right {{ flex:1; position:relative; }}
.vis {{ position:absolute; inset:0; border-radius:18px; overflow:hidden;
       border:1px solid #ffffff1F; background:{visbg}; display:flex; align-items:center; justify-content:center; }}
.vis img.cover {{ width:100%; height:100%; object-fit:cover; }}
.vis img.cover-right {{ width:100%; height:100%; object-fit:cover; object-position:92% center; }}
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
    <div class="meta"><span>{license_label} <b>{license}</b></span><span>GitHub Stars <b>{stars}</b><span style="font-size:12px">（{snapshot} 快照）</span></span></div>
  </div>
  <div class="right">
    <div class="vis">{visinner}</div>
    <div class="cap">{cap}</div>
  </div>
</div>
<div class="foot">
  <div class="brand">AIHub <span>·</span> 编辑精选</div>
  <div class="note">AI 工具 · 应用 · SKILL · MCP 目录 ｜ {issue_date}</div>
</div>
</body></html>"""


def build(p):
    if "visual_html" in p:
        visinner = p["visual_html"]
        visbg = "#161B27"
        cap = p["cap"]
    else:
        fname, mode, visbg, cap = p["visual"]
        f = RAW / fname
        if not f.exists():
            return False, f"missing {fname}"
        cls = {"cover": "cover", "cover-right": "cover-right", "cover-low": "cover-low",
               "contain": "contain", "contain-dark": "contain-dark", "icon": "icon"}[mode]
        visinner = f'<img class="{cls}" src="file://{f}">'
    html = TPL.format(color=p["color"], typ=TYPE_LABEL[p["type"]], name=p["name"],
                      domain=p["domain"], tagline=p["tagline"],
                      license=p["license"], license_label=p.get("license_label", "开源协议"),
                      stars=p["stars"], visinner=visinner, cap=cap, visbg=visbg,
                      name_size=p.get("name_size", 46), meta_size=p.get("meta_size", 14.5),
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

#!/usr/bin/env python3
# AIHub 精选卡片生成：1200x630，深色底，嵌入真实产品视觉
import json, subprocess, pathlib, sys

ROOT = pathlib.Path(__file__).parent
RAW = ROOT / "raw"
OUT = ROOT / "cards"
OUT.mkdir(exist_ok=True)
CHROME = sorted(pathlib.Path.home().glob(".cache/ms-playwright/chromium-*/chrome-linux/chrome"), key=lambda p: p.name)[-1]

# 视觉素材模式：cover=填满裁切（深色图），contain=白卡完整展示（浅色图）
PRODUCTS = [
    dict(slug="scroll-craft", name="scroll-craft", type="SKILL", color="#3B82F6",
         tagline="给编码 agent 一套滚动驱动高端网页的设计标准、引擎与验证工具，附 10 个已验收范例站点",
         license="MIT", stars="2,394", domain="github.com/nateherkai/scroll-craft",
         visual=("scroll_ais.webp", "cover", "官方范例站点「AI Government Summary」实景（仓库 media/）")),
    dict(slug="chat-on-steroids", name="Chat On Steroids", type="APP", color="#10A37F",
         tagline="让 ChatGPT 会话直接读写本地文件、跑终端、多 worker 协作的桌面工作台",
         license="MIT", stars="2,172", domain="github.com/totec448-spec/chat-on-steroids",
         visual=("gh_totec448-spec_chat-on-steroids.png", "contain", "官方仓库 Social Preview（GitHub 自动生成）")),
    dict(slug="voicemem", name="VoiceMem", type="APP", color="#FFC81E",
         tagline="语音 agent 的长期记忆基础设施：「流式双脑」架构，附 arXiv 技术报告与开源模型",
         license="Apache-2.0", stars="1,530", domain="github.com/xzf-thu/VoiceMem",
         visual=("vm_fig_arch.webp", "contain", "官方「流式双脑」架构图（项目主页 fig-architecture）")),
    dict(slug="agent-memory", name="agent-memory", type="APP", color="#369EFF",
         tagline="以 Markdown 为唯一事实源的 agent 长期记忆运行时：零 API key、跨工具共享",
         license="MIT", stars="1,277", domain="github.com/tigerless-labs/agent-memory",
         visual=("gh_tigerless-labs_agent-memory.png", "contain", "官方仓库 Social Preview（GitHub 自动生成）")),
    dict(slug="headcount", name="headcount", type="SKILL", color="#D97757",
         tagline="把 Claude Code 组织成一家公司：16 部门、172 项技能、按需安装",
         license="MIT", stars="1,370", domain="github.com/cbrock84/headcount",
         visual=("headcount_hero.png", "contain", "官方交互式 org chart 页面实景（docs/assets/org-chart-light.png 顶部）")),
    dict(slug="doop", name="doop", type="APP", color="#5B7CFF",
         tagline="开源版 Paper.design：人与 AI agent 在同一画布实时共创设计",
         license="AGPL-3.0", stars="679", domain="doop.design",
         visual=("og_doop.png", "contain", "官方 OG 主视觉（doop.design/og.png）")),
    dict(slug="open-seo-mcp-skills", name="Open SEO MCP Skills", type="SKILL", color="#FF5708",
         tagline="跑在自家 GSC / GA4 真实数据上的开源 SEO·GEO 技能包",
         license="MIT", stars="821", domain="github.com/Ryze-AI-Adgent/open-seo-mcp-skills",
         visual=("gh_Ryze-AI-Adgent_open-seo-mcp-skills.png", "contain", "官方仓库 Social Preview（GitHub 自动生成）")),
    dict(slug="lemmalog", name="Lemmalog", type="MCP", color="#A78BFA",
         tagline="把 agent 记忆变成可证明、可溯源的 Datalog 演绎数据库",
         license="MIT", stars="307", domain="github.com/JordyZomer/lemmalog",
         visual=("gh_JordyZomer_lemmalog.png", "contain", "官方仓库 Social Preview（GitHub 自动生成）")),
    dict(slug="openreality", name="Open Reality", type="MCP", color="#D4A017",
         tagline="手机视频一键变 AI 可查询的 3D 场景：可测量、可导航、41 个 MCP 工具",
         license="BSD-2-Clause", stars="86", domain="open-reality.io/mcp",
         visual=("openreality_hero_render.png", "contain-dark", "官方品牌 Hero（仓库 docs/assets/hero.svg 渲染）")),
    dict(slug="shim-mcp", name="Shim MCP", type="MCP", color="#F26522",
         tagline="一个 WordPress 插件让任意站点变成 MCP server：56 项内容能力",
         license="GPL-2.0+", stars="46", domain="wordpress.org/plugins/shim-mcp",
         visual=("shim_icon.png", "icon", "WordPress.org 官方插件图标（ps.w.org）")),
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
    <div class="meta"><span>开源协议 <b>{license}</b></span><span>GitHub Stars <b>{stars}</b><span style="font-size:12px">（2026-09-14 快照）</span></span></div>
  </div>
  <div class="right">
    <div class="vis">{imgtag}</div>
    <div class="cap">{cap}</div>
  </div>
</div>
<div class="foot">
  <div class="brand">AIHub <span>·</span> 编辑精选</div>
  <div class="note">AI 工具 · 应用 · SKILL · MCP 目录 ｜ 2026-09-14</div>
</div>
</body></html>"""


def build(p):
    fname, mode, cap = p["visual"]
    f = RAW / fname
    if not f.exists():
        return False, f"missing {fname}"
    cls = {"cover": "cover", "cover-low": "cover-low", "contain": "contain",
           "contain-dark": "contain-dark", "icon": "icon"}[mode]
    visbg = {"contain": "#FFFFFF", "cover": "#101521", "cover-low": "#101521",
             "contain-dark": "#0E2419", "icon": "#161B27"}[mode]
    imgtag = f'<img class="{cls}" src="file://{f}">'
    html = TPL.format(color=p["color"], typ=TYPE_LABEL[p["type"]], name=p["name"],
                      domain=p["domain"], tagline=p["tagline"], license=p["license"],
                      stars=p["stars"], imgtag=imgtag, cap=cap, visbg=visbg)
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

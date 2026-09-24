#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RUYI-168 AIHub 每日精选 · 精选卡片生成脚本（1200×630）
输入: raw/ 下的官方渠道素材（来源与采集日期见 SOURCES.md）
输出: cards/*.png（3 张，原生分辨率，无放大）
设计体系: 沿用 RUYI-164 深色统一版式 —— 左侧类型徽章/产品名/官方域名/一句话价值/License+Stars；
右侧官方真实产品视觉 + 来源图注；底部「AIHub 编辑精选」条。本期新增 precrop 预裁剪：
ECC OG 图底部内嵌旧星数统计条（与快照 chip 冲突）须裁除；Reasonix OG 顶部导航栏裁除。
星数与一句话价值均取自 RUYI-168 报批事实基线（快照 2026-09-23），未新增事实。
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(BASE, 'raw')
OUT = os.path.join(BASE, 'cards')
os.makedirs(OUT, exist_ok=True)

W, H = 1200, 630
BG = (11, 14, 20)
INK = (230, 237, 243)
SUB = (139, 148, 158)
BODY = (201, 209, 217)

NOTO = '/usr/share/fonts/google-noto-cjk/NotoSansCJK-%s.ttc'
MONT = '/usr/share/fonts/julietaula-montserrat/Montserrat-%s.otf'


def noto_sc(weight, size):
    # 选出 ttc 中简体中文（SC）面的 index
    path = NOTO % weight
    for i in range(6):
        try:
            f = ImageFont.truetype(path, size, index=i)
            if 'SC' in f.getname()[0]:
                return f
        except Exception:
            break
    return ImageFont.truetype(path, size)


def font_cache(weight, path_cls):
    class C:
        def __call__(self, size):
            key = (path_cls, weight, size)
            if key not in _fc:
                _fc[key] = noto_sc(weight, size) if path_cls == 'n' else ImageFont.truetype(MONT % weight, size)
            return _fc[key]
    return C()


_fc = {}
F_BLACK = font_cache('Black', 'n')
F_BOLD = font_cache('Bold', 'n')
F_MED = font_cache('Medium', 'n')
F_REG = font_cache('Regular', 'n')
F_MONT_XB = font_cache('ExtraBold', 'm')
F_MONT_SB = font_cache('SemiBold', 'm')
F_MONT_MD = font_cache('Medium', 'm')


def tokenize(s):
    toks, buf, prev_cjk = [], '', False
    for ch in s:
        cjk = ord(ch) > 0x2E80
        if cjk or (prev_cjk and not ch.isalnum()):
            if buf:
                toks.append(buf)
            buf, prev_cjk = ch, cjk
        else:
            if len(buf) == 1 and buf in NO_LEAD:
                toks.append(buf)  # 标点独立成 token，禁则才能悬挂
                buf = ''
            buf += ch
            prev_cjk = False
    if buf:
        toks.append(buf)
    return toks


NO_LEAD = '、。」』）！？，'  # 行头禁则字符
NO_END = '（「『'  # 行尾禁则字符：开括号/引号不得悬于行尾


def wrap(draw, text, font, maxw):
    lines, line = [], ''
    for t in tokenize(text):
        cand = line + t
        if draw.textlength(cand, font=font) <= maxw or not line:
            line = cand
        else:
            while line and line[-1] in NO_END:  # 开括号随下一行下沉
                t = line[-1] + t
                line = line[:-1]
            if len(t) == 1 and t in NO_LEAD:
                lines.append(line + t)  # 标点悬挂行尾，禁止行头
                line = ''
            else:
                lines.append(line)
                line = t.lstrip()
    if line:
        lines.append(line)
    return lines


def mix(c, bg, a):
    return tuple(int(bg[i] + (c[i] - bg[i]) * a) for i in range(3))


def glow(img, cx, cy, r, color, alpha):
    g = Image.radial_gradient('L').resize((r * 2, r * 2))
    g = g.point(lambda p: int((255 - p) * alpha))
    layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
    tint = Image.new('RGBA', (r * 2, r * 2), color + (255,))
    tint.putalpha(g)
    layer.paste(tint, (int(cx - r), int(cy - r)), tint)
    img.alpha_composite(layer)


def precrop(im, box):
    # box 为 (left, top, right, bottom) 比例；用于裁除官方图内嵌统计条/导航栏等非主体区域
    w, h = im.size
    l, t, r, b = box
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def fill_crop(im, tw, th, fx=0.5, fy=0.5):
    tr = tw / th
    w, h = im.size
    if w / h > tr:
        nw, nh = int(h * tr), h
    else:
        nw, nh = w, int(w / tr)
    x, y = int((w - nw) * fx), int((h - nh) * fy)
    return im.crop((x, y, x + nw, y + nh)).resize((tw, th), Image.LANCZOS)


def contain(im, tw, th, panel_bg):
    im = im.convert('RGB')
    im.thumbnail((tw, th), Image.LANCZOS)
    panel = Image.new('RGB', (tw, th), panel_bg)
    panel.paste(im, ((tw - im.width) // 2, (th - im.height) // 2))
    return panel


def rounded_mask(w, h, r):
    m = Image.new('L', (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w - 1, h - 1), r, fill=255)
    return m


def chip(draw, x, y, text, font, dot=None, pad=14):
    tw = draw.textlength(text, font=font)
    extra = 16 if dot else 0
    hgt = 34
    draw.rounded_rectangle((x, y, x + tw + pad * 2 + extra, y + hgt), 17,
                           fill=mix((255, 255, 255), BG, 0.06), outline=(255, 255, 255, 26), width=1)
    cx = x + pad
    if dot:
        draw.ellipse((cx + 4, y + hgt // 2 - 4, cx + 12, y + hgt // 2 + 4), fill=dot)
        cx += extra
    draw.text((cx, y + 7), text, font=font, fill=INK)
    return x + tw + pad * 2 + extra


def card(item):
    acc = item['accent']
    img = Image.new('RGBA', (W, H), BG + (255,))
    glow(img, -80, -60, 560, acc, 0.16)
    glow(img, W + 60, H + 40, 640, acc, 0.10)
    d = ImageDraw.Draw(img)

    # ---- 左栏 ----
    lx, lw = 64, 492
    y = 66
    # 类型徽章 + 分类
    btxt = item['type']
    bf = F_MONT_SB(19)
    btw = d.textlength(btxt, font=bf)
    d.rounded_rectangle((lx, y, lx + btw + 30, y + 34), 17, fill=mix(acc, BG, 0.22),
                        outline=acc + (140,), width=1)
    d.text((lx + 15, y + 6), btxt, font=bf, fill=acc)
    d.text((lx + btw + 46, y + 7), item['cat'], font=F_MED(19), fill=SUB)
    y += 64

    # 产品名（自适应 / 两行）
    nf = F_BLACK(54)
    name = item['name']
    if d.textlength(name, font=nf) > lw:
        nf = F_BLACK(46)
    lines = wrap(d, name, nf, lw)
    for ln in lines:
        d.text((lx, y), ln, font=nf, fill=(255, 255, 255))
        y += int(nf.size * 1.22)
    y += 6

    # 官方域名/仓库
    df = F_MONT_SB(21)
    dom = item['domain']
    if d.textlength(dom, font=df) > lw:
        df = F_MONT_SB(17)
    d.text((lx, y), dom, font=df, fill=acc)
    y += int(df.size * 1.9)

    # 一句话价值（孤行回退：末行只剩 1–2 字时缩号重排）
    vf = F_MED(25)
    vlines = wrap(d, item['value'], vf, lw)
    while len(vlines) >= 2 and len(vlines[-1]) <= 2 and vf.size > 21:
        vf = F_MED(int(vf.size) - 2)
        vlines = wrap(d, item['value'], vf, lw)
    vy = y + 8
    for ln in vlines[:4]:
        d.text((lx, vy), ln, font=vf, fill=BODY)
        vy += 38

    # 分隔线 + chips
    d.line((lx, 512, lx + lw, 512), fill=(255, 255, 255, 22), width=1)
    cf = F_MED(16)
    cfx = F_MED(16)
    x = lx
    x = chip(d, x, 530, item['license'], cfx, dot=acc) + 12
    x = chip(d, x, 530, '★ ' + item['stars'], cf) + 12
    chip(d, x, 530, '快照 2026-09-23', cfx)

    # ---- 右栏视觉 ----
    px, py, pw, ph, rad = 592, 56, 544, 452, 18
    im = Image.open(os.path.join(RAW, item['img']))
    if item.get('precrop'):
        im = precrop(im, item['precrop'])
    if item['fit'] == 'contain':
        panel = contain(im, pw, ph, item.get('panel', (245, 246, 248)))
    else:
        panel = fill_crop(im.convert('RGB'), pw, ph, item.get('fx', .5), item.get('fy', .5))
    img.paste(panel, (px, py), rounded_mask(pw, ph, rad))
    d.rounded_rectangle((px, py, px + pw, py + ph), rad, outline=(255, 255, 255, 28), width=1)

    # 来源图注（面板内底部渐变条）
    strip_h = 40
    grad = Image.new('L', (1, strip_h))
    for i in range(strip_h):
        grad.putpixel((0, i), int(210 * (i / (strip_h - 1)) ** 1.5))
    grad = grad.resize((pw, strip_h))
    black = Image.new('RGBA', (pw, strip_h), (0, 0, 0, 255))
    black.putalpha(grad)
    img.paste(black, (px, py + ph - strip_h), black)
    d = ImageDraw.Draw(img)
    d.text((px + 16, py + ph - strip_h + 10), item['caption'], font=F_REG(15), fill=(235, 240, 245))

    # ---- 底部条 ----
    d.line((0, 578, W, 578), fill=acc + (120,), width=2)
    d.text((64, 592), 'AIHub 编辑精选 · 每日 AI 新资源（2026-09-23 期）', font=F_MED(17), fill=SUB)
    rt = 'FEATURED · AIHUB'
    rf = F_MONT_SB(15)
    d.text((W - 64 - d.textlength(rt, font=rf), 594), rt, font=rf, fill=mix(acc, BG, 0.75))

    img.convert('RGB').save(os.path.join(OUT, item['out']), 'PNG')
    print('written cards/' + item['out'])


ITEMS = [
    dict(out='01_ecc.png', type='APP', cat='Agent harness 优化', name='ECC',
         domain='ecc.tools', accent=(226, 168, 148),
         value='给编码 Agent 做性能优化的 harness 系统（技能、本能、记忆、安全一体）',
         license='MIT', stars='265,247', img='official_ecc_og.png',
         fit='fill', precrop=(0, 0, 1, 0.68), fx=.98,
         caption='视觉来源：ecc.tools 官方 OG 图 · 采集 2026-09-24'),
    dict(out='02_deepseek-reasonix.png', type='APP', cat='终端编码 Agent', name='DeepSeek-Reasonix',
         domain='reasonix.io', accent=(77, 141, 245),
         value='DeepSeek 原生终端编码 Agent，为长会话前缀缓存稳定性设计',
         license='MIT', stars='35,676', img='official_reasonix_og.png',
         fit='contain', panel=(248, 249, 251), precrop=(0.03, 0.11, 0.97, 0.95),
         caption='视觉来源：reasonix.io 官方 OG 图 · 采集 2026-09-24'),
    dict(out='03_book-to-skill.png', type='SKILL', cat='技术书转技能', name='book-to-skill',
         domain='github.com/virgiliojr94/book-to-skill', accent=(154, 96, 250),
         value='一键把技术书 PDF 转成 Claude Code 技能，边工作边查阅',
         license='MIT', stars='31,981', img='official_booktoskill_banner.webp',
         fit='fill', fx=.11,
         caption='视觉来源：官方仓库 banner（Booklin 形象）· 采集 2026-09-24'),
]

if __name__ == '__main__':
    for it in ITEMS:
        card(it)

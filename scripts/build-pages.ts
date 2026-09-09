import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { categorySeeds, resourceSeeds, typeSeeds } from "../src/db/seed-data";
import { getResourceProfile } from "../src/lib/resource-profiles";

const output = path.resolve(process.cwd(), "dist-pages");
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] || "aihub";
const basePath = process.env.PAGES_BASE_PATH || `/${repository}/`;

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, "assets"), { recursive: true });

const categories = typeSeeds.flatMap((type) =>
  categorySeeds[type.key as keyof typeof categorySeeds].map((category) => ({
    type: type.key,
    name: category[0],
    slug: category[1],
  })),
);

const resources = resourceSeeds.map((resource) => ({
  ...resource,
  typeName: typeSeeds.find((type) => type.key === resource.type)?.name || resource.type,
  categoryName: categories.find((category) => category.type === resource.type && category.slug === resource.category)?.name || resource.category,
}));

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]!);
}

function hostname(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "外部站点";
  }
}

function shell(title: string, content: string, relativeBase = "./", script = "") {
  const navigation = typeSeeds
    .map((type) => `<a href="${relativeBase}#type-${type.key}">${type.name}</a>`)
    .join("");

  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="精选 AI 应用、SKILL 与 MCP，直达官方来源和安装方式。"><title>${escapeHtml(title)} - AI 工具集市</title>
<link rel="stylesheet" href="${relativeBase}assets/pages.css"></head><body>
<header class="site-header"><div class="container header-inner"><a class="brand" href="${relativeBase}"><span class="brand-mark">✦</span>AI 工具集市</a><nav>${navigation}</nav><a class="search-jump" href="${relativeBase}#search">搜索</a></div></header>
<main>${content}</main>
<footer><div class="container footer-inner"><strong>AI 工具集市</strong><p>本站为第三方 AI 资源信息聚合目录。产品名称、Logo、商标仅用于识别性引用，版权归原作者及权利人所有。本站不托管、不重分发任何安装包；跳转外部站点后请遵循其服务条款与安全提示。</p></div></footer>
${script ? `<script>${script}</script>` : ""}</body></html>`;
}

function card(resource: (typeof resources)[number]) {
  const tags = resource.tags.slice(0, 2).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const haystack = escapeHtml(`${resource.name} ${resource.summary} ${resource.tags.join(" ")}`.toLowerCase());
  return `<a class="resource-card" href="r/${resource.slug}/" data-resource data-type="${resource.type}" data-category="${resource.category}" data-search="${haystack}">
<span class="letter-mark">${escapeHtml(resource.name.slice(0, 1).toUpperCase())}</span><span class="resource-copy"><span class="resource-title"><strong>${escapeHtml(resource.name)}</strong><span>${tags}</span></span>
<span class="summary">${escapeHtml(resource.summary)}</span><span class="meta">${resource.typeName} · ${resource.categoryName}</span></span></a>`;
}

const sections = typeSeeds.map((type) => {
  const typeResources = resources.filter((resource) => resource.type === type.key);
  const chips = categories.filter((category) => category.type === type.key)
    .map((category) => `<button type="button" data-category-filter="${category.slug}">${category.name}</button>`)
    .join("");
  const contents = typeResources.length
    ? typeResources.map(card).join("")
    : `<div class="empty">该类型收录整理中，敬请期待。</div>`;

  return `<section class="type-section" id="type-${type.key}" data-type-section="${type.key}"><div class="section-heading"><div><span>${escapeHtml(type.description)}</span><h2>${type.name} <small data-section-count>${typeResources.length} 项</small></h2></div></div>
<div class="chip-row"><button class="active" type="button" data-category-filter="">全部</button>${chips}</div><div class="resource-grid">${contents}</div></section>`;
}).join("");

const totalLabel = `${resources.length} 个精选条目`;

const homeScript = `
+const TOTAL_LABEL=${JSON.stringify(totalLabel)};
+const search=document.querySelector('#search-input');
+const count=document.querySelector('#result-count');
+function apply(){const q=search.value.trim().toLowerCase();let visible=0;document.querySelectorAll('[data-type-section]').forEach(section=>{const category=section.querySelector('[data-category-filter].active').dataset.categoryFilter;let sectionVisible=0;section.querySelectorAll('[data-resource]').forEach(card=>{const show=(!q||card.dataset.search.includes(q))&&(!category||card.dataset.category===category);card.hidden=!show;if(show){visible++;sectionVisible++}});const sectionCount=section.querySelector('[data-section-count]');if(sectionCount)sectionCount.textContent=sectionVisible+' 项'});count.textContent=(q?visible+' 项匹配':TOTAL_LABEL);document.querySelector('#no-results').hidden=visible>0||!q}
+search.addEventListener('input',apply);document.querySelector('#clear-search').addEventListener('click',()=>{search.value='';apply();search.focus()});
+document.querySelectorAll('[data-type-section]').forEach(section=>section.querySelectorAll('[data-category-filter]').forEach(button=>button.addEventListener('click',()=>{section.querySelectorAll('[data-category-filter]').forEach(item=>item.classList.toggle('active',item===button));apply()})));
+`.replace(/^\+/gm, "");

const home = shell("首页", `<section class="hero"><div class="container hero-inner"><span class="eyebrow">精选、可信、直达来源</span><h1>找到真正好用的 AI 资源</h1><p>收录应用、SKILL 与 MCP。少走弯路，直接抵达官方获取方式。</p>
<div class="search-box" id="search"><span>⌕</span><input id="search-input" aria-label="搜索资源" placeholder="搜索应用、SKILL、MCP…"><button type="button" id="clear-search">清除</button></div>
<div class="stats"><strong>3</strong> 类资源　<strong id="result-count">${totalLabel}</strong>　持续更新</div></div></section>
<div class="container type-tabs">${typeSeeds.map((type) => `<a href="#type-${type.key}">${type.name}</a>`).join("")}</div>
<div class="container sections"><div id="no-results" class="no-results" hidden>没有找到相关资源，请更换关键词。</div>${sections}</div>`, "./", homeScript);
fs.writeFileSync(path.join(output, "index.html"), home);

/** 静态页没有 React，复制按钮用一段内联脚本实现，语义与动态版 CopyBlock 一致。 */
const copyScript = `
+document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const code=document.getElementById(button.dataset.copy);const text=code.textContent;try{await navigator.clipboard.writeText(text)}catch(e){const range=document.createRange();range.selectNodeContents(code);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);document.execCommand('copy')}button.textContent='已复制 ✓';setTimeout(()=>{button.textContent='复制'},2000)}));
+`.replace(/^\+/gm, "");

/** SKILL / MCP 详情页的可复制安装说明，取种子的官方安装命令；与动态版 AcquisitionPanel 同口径。 */
function copyBlock(id: string, label: string, value: string) {
  return `<div class="copy-section"><div class="copy-heading"><span>${escapeHtml(label)}</span><button type="button" data-copy="${id}">复制</button></div><pre><code id="${id}">${escapeHtml(value)}</code></pre></div>`;
}

for (const resource of resources) {
  const target = resource.sourceUrl || resource.officialUrl;
  const profile = getResourceProfile(resource.slug);
  // 获取入口与动态站 src/components/acquisition-panel.tsx 同语义：
  // app 前往官网，skill 走来源包（缺来源时回退官网），mcp 指向文档且无来源时不渲染按钮。
  // profile.actionLabel 仅覆盖按钮文案，不改变上述跳转目标语义。
  const action = resource.type === "app"
    ? { label: profile?.actionLabel || "前往官方下载", href: resource.officialUrl }
    : resource.type === "skill"
      ? { label: profile?.actionLabel || "获取技能包", href: target }
      : resource.sourceUrl
        ? { label: profile?.actionLabel || "查看文档", href: resource.sourceUrl }
        : undefined;
  const link = action
    ? `<a class="primary-link" href="${escapeHtml(action.href)}" target="_blank" rel="noopener nofollow">${action.label} ↗</a>`
    : "";
  const install = resource.type === "skill"
    ? copyBlock("install-guide", "安装说明", resource.installGuide || "下载技能包，将完整目录放入 Agent 的 skills 目录后重新加载。")
    : resource.type === "mcp" && resource.installGuide
      ? copyBlock("install-guide", "安装命令", resource.installGuide)
      : "";
  const acquisition = `${link}${install}`;
  const overview = profile ? profile.overview.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("") : `<p>${escapeHtml(resource.description)}</p>`;
  const feature = profile?.featureImage
    ? `<figure class="detail-feature"><img src="../../${profile.featureImage.replace(/^\//, "")}" alt="${escapeHtml(profile.featureImageAlt || "")}"><figcaption>${escapeHtml(profile.imageCredit || "")}</figcaption></figure>`
    : "";
  const editorial = profile ? `${feature}<h3>核心能力</h3><ul class="feature-list">${profile.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}</ul><h3>适合谁</h3><p>${escapeHtml(profile.bestFor)}</p>` : "";
  const caption = profile?.imageSource
    ? `图片来源：<a href="${escapeHtml(profile.imageSource)}" target="_blank" rel="noopener nofollow">官方页面 / 来源仓库</a>`
    : escapeHtml(profile?.imageCredit || "");
  const visual = profile ? `<figure class="detail-visual"><img src="../../${profile.image.replace(/^\//, "")}" alt="${escapeHtml(profile.imageAlt)}"><figcaption>${caption}</figcaption></figure>` : "";
  const content = `<div class="container detail"><a class="back" href="../../">← 返回资源目录</a><header><span class="letter-mark large">${escapeHtml(resource.name.slice(0, 1))}</span><div><div class="detail-title"><h1>${escapeHtml(resource.name)}</h1>${resource.tags.slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div><p>${escapeHtml(resource.summary)}</p></div></header>${visual}
<div class="detail-grid"><div><section class="panel"><span class="eyebrow">获取资源</span>${acquisition}<p>将跳转至 ${hostname(target)}。本站不托管安装包，请遵循目标站点条款。</p><small>来源：${hostname(target)} · 信息以官方页面为准</small></section><section class="panel copy"><h2>资源简介</h2>${overview}${editorial}</section></div>
<aside class="panel"><h2>资源信息</h2><dl><dt>资源类型</dt><dd>${resource.typeName}</dd><dt>主分类</dt><dd>${resource.categoryName}</dd><dt>属性标签</dt><dd>${resource.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join(" ")}</dd></dl></aside></div></div>`;
  const directory = path.join(output, "r", resource.slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), shell(resource.name, content, "../../", install ? copyScript : ""));
}

fs.writeFileSync(path.join(output, "404.html"), shell("页面不存在", `<div class="container missing"><h1>页面不存在或资源已下架</h1><p><a class="primary-link" href="${basePath}">返回首页</a></p></div>`, basePath));
fs.writeFileSync(path.join(output, ".nojekyll"), "");
fs.copyFileSync(path.resolve(process.cwd(), "src/pages-static/pages.css"), path.join(output, "assets", "pages.css"));
fs.cpSync(path.resolve(process.cwd(), "public/media"), path.join(output, "media"), { recursive: true });

// 来源标识：让交付包脱离文件名与外部记录也能追溯到确切的构建来源提交。
const git = (args: string[]) => execFileSync("git", args, { encoding: "utf8" }).trim();
const dirty = git(["status", "--porcelain", "--untracked-files=no"]) ? "-dirty" : "";
const sources = [
  "# AIHub GitHub Pages 产物来源标识（由 scripts/build-pages.ts 自动生成，请勿手工编辑）",
  `source_repository: ${process.env.GITHUB_REPOSITORY || git(["remote", "get-url", "origin"])}`,
  `source_branch: ${git(["rev-parse", "--symbolic-full-name", "HEAD"])}`,
  `source_git_sha: ${git(["rev-parse", "HEAD"])}${dirty}`,
  `source_commit_time: ${git(["log", "-1", "--format=%cI"])}`,
  `built_at: ${new Date().toISOString()}`,
  "generator: scripts/build-pages.ts",
  `resource_count: ${resourceSeeds.length}`,
  "",
].join("\n");
fs.writeFileSync(path.join(output, "SOURCES.txt"), sources);
console.log(`GitHub Pages 静态站已生成：${output}`);

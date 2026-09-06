import Link from "next/link";
import type { Category, ResourceType } from "@/lib/types";
import { listCategories, listResources } from "@/lib/repository";
import { SiteShell } from "./site-shell";
import { ResourceCard } from "./resource-card";
import { EmptyState } from "./empty-state";

export function ResourceListPage({ type, category, activeTags = [] }: { type: ResourceType; category?: Category; activeTags?: string[] }) {
  const categories = listCategories(type.key);
  const all = listResources({ typeKey: type.key, categorySlug: category?.slug });
  const tags = [...new Set(all.flatMap((item) => item.tags))];
  const resources = listResources({ typeKey: type.key, categorySlug: category?.slug, tags: activeTags });
  function tagHref(tag: string) {
    const next = activeTags.includes(tag) ? activeTags.filter((item) => item !== tag) : [...activeTags, tag];
    const base = category ? `/t/${type.key}/c/${category.slug}` : `/t/${type.key}`;
    return next.length ? `${base}?tag=${encodeURIComponent(next.join(","))}` : base;
  }
  return <SiteShell><div className="container list-page">
    <div className="breadcrumbs"><Link href="/">首页</Link><span>/</span><Link href={`/t/${type.key}`}>{type.name}</Link>{category && <><span>/</span><b>{category.name}</b></>}</div>
    <div className="list-title"><span className={`type-orb accent-bg-${type.accent}`}>{type.name.slice(0, 1)}</span><div><span className="section-kicker">{category?.description || type.description}</span><h1>{category?.name || type.name} <small>{resources.length} 项</small></h1></div></div>
    <div className="filters"><div><strong>分类</strong><div className="chip-row"><Link className={!category ? "active" : ""} href={`/t/${type.key}`}>全部</Link>{categories.map((item) => <Link className={category?.id === item.id ? "active" : ""} key={item.id} href={`/t/${type.key}/c/${item.slug}`}>{item.name}</Link>)}</div></div>
      {tags.length > 0 && <div><strong>标签</strong><div className="chip-row">{tags.map((tag) => <Link className={activeTags.includes(tag) ? "active" : ""} aria-pressed={activeTags.includes(tag)} key={tag} href={tagHref(tag)}>{tag}</Link>)}</div></div>}</div>
    {resources.length ? <div className="resource-grid list-grid">{resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div>
      : <EmptyState title="该筛选条件下暂无资源" actionHref={`/t/${type.key}`} action="清除全部筛选" />}
  </div></SiteShell>;
}


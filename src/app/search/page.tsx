import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { ResourceCard } from "@/components/resource-card";
import { SearchBox } from "@/components/search-box";
import { SiteShell } from "@/components/site-shell";
import { listResources } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim() || "";
  const resources = listResources({ query });
  return <SiteShell><div className="container search-page">
    <div className="search-page-head"><span className="section-kicker">全站搜索</span><h1>{query ? `“${query}” 的搜索结果` : "搜索 AI 资源"} <small>{resources.length} 项</small></h1><SearchBox initial={query} /></div>
    {resources.length ? <><div className="resource-grid list-grid">{resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div><Link className="clear-link" href="/">清除关键词</Link></>
      : <EmptyState title={`没有找到“${query}”相关资源`} action="清除关键词" />}
  </div></SiteShell>;
}


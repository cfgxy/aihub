import Link from "next/link";
import { listCategories, listResources, listTypes } from "@/lib/repository";
import { ResourceCard } from "@/components/resource-card";
import { SearchBox } from "@/components/search-box";
import { SiteShell } from "@/components/site-shell";
import { ArrowIcon, SparkIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const types = listTypes();
  return <SiteShell>
    <section className="hero"><div className="hero-art" aria-hidden="true"><SparkIcon /></div><div className="container hero-inner">
      <span className="eyebrow">精选、可信、直达来源</span>
      <h1>找到真正好用的 AI 资源</h1>
      <p>收录应用、SKILL 与 MCP。少走弯路，直接抵达官方获取方式。</p>
      <SearchBox />
      <div className="hero-stats"><span><strong>{types.length}</strong> 类资源</span><span><strong>{listResources().length}</strong> 个精选条目</span><span>持续更新</span></div>
    </div></section>
    <div className="type-strip"><div className="container">{types.map((type) => <a key={type.key} href={`#type-${type.key}`}>{type.name}</a>)}</div></div>
    <div className="container home-sections">
      {types.map((type) => {
        const allResources = listResources({ typeKey: type.key });
        const resources = allResources.slice(0, 6);
        const categories = listCategories(type.key);
        return <section id={`type-${type.key}`} className={`type-section accent-${type.accent}`} key={type.key}>
          <div className="section-heading"><div><span className="section-kicker">{type.description}</span><h2>{type.name} <small>{allResources.length} 项</small></h2></div>
            <Link href={`/t/${type.key}`}>查看全部 <ArrowIcon /></Link></div>
          <div className="chip-row">{categories.map((category) => <Link key={category.id} href={`/t/${type.key}/c/${category.slug}`}>{category.name}</Link>)}</div>
          {resources.length ? <div className="resource-grid">{resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div>
            : <div className="inline-empty">该类型收录整理中，敬请期待。</div>}
        </section>;
      })}
    </div>
  </SiteShell>;
}

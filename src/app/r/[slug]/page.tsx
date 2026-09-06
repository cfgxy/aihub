import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AcquisitionPanel } from "@/components/acquisition-panel";
import { SiteShell } from "@/components/site-shell";
import { getResource } from "@/lib/repository";
import { getResourceProfile } from "@/lib/resource-profiles";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resource = getResource((await params).slug);
  return resource ? { title: resource.name, description: resource.summary } : { title: "资源不存在" };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const resource = getResource((await params).slug);
  if (!resource) notFound();
  const profile = getResourceProfile(resource.slug);
  return <SiteShell><div className="container detail-page">
    <div className="breadcrumbs"><Link href="/">首页</Link><span>/</span><Link href={`/t/${resource.typeKey}`}>{resource.typeName}</Link><span>/</span><b>{resource.name}</b></div>
    <header className={`detail-header accent-${resource.typeAccent}`}><span className="letter-mark detail-mark">{resource.name.slice(0, 1)}</span><div><div className="detail-name-row"><h1>{resource.name}</h1>{resource.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><p>{resource.summary}</p></div></header>
    {profile && <figure className="detail-visual"><img src={profile.image} alt={profile.imageAlt}/><figcaption>图片来源：<a href={profile.imageSource} target="_blank" rel="noopener nofollow">官方页面 / 来源仓库</a></figcaption></figure>}
    <div className="detail-layout"><div><AcquisitionPanel resource={resource}/><section className="detail-copy"><span className="section-kicker">资源简介</span><h2>关于 {resource.name}</h2>{profile ? profile.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>{resource.description || resource.summary}</p>}
      {profile && <><h3>核心能力</h3><ul className="feature-list">{profile.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><h3>适合谁</h3><p>{profile.bestFor}</p></>}</section></div>
      <aside><h2>资源信息</h2><dl><dt>资源类型</dt><dd>{resource.typeName}</dd><dt>主分类</dt><dd><Link href={`/t/${resource.typeKey}/c/${resource.categorySlug}`}>{resource.categoryName}</Link></dd><dt>属性标签</dt><dd className="aside-tags">{resource.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</dd><dt>更新时间</dt><dd>{resource.updatedAt.slice(0, 10)}</dd></dl></aside></div>
  </div></SiteShell>;
}


import Link from "next/link";
import type { Resource } from "@/lib/types";

export function ResourceCard({ resource }: { resource: Resource }) {
  return <Link href={`/r/${resource.slug}`} className={`resource-card accent-${resource.typeAccent}`}>
    <span className="letter-mark" aria-hidden="true">{resource.name.slice(0, 1).toUpperCase()}</span>
    <span className="resource-copy">
      <span className="resource-title-row"><strong>{resource.name}</strong><span className="tag">{resource.tags[0] || resource.categoryName}</span></span>
      <span className="resource-summary">{resource.summary}</span>
      <span className="resource-meta">{resource.typeName} · {resource.categoryName}</span>
    </span>
  </Link>;
}


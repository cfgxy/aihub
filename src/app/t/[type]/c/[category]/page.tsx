import { notFound } from "next/navigation";
import { ResourceListPage } from "@/components/resource-list-page";
import { listCategories, listTypes } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ type: string; category: string }>; searchParams: Promise<{ tag?: string }> }) {
  const { type, category } = await params;
  const current = listTypes().find((item) => item.key === type);
  const activeCategory = listCategories(type).find((item) => item.slug === category);
  if (!current || !activeCategory) notFound();
  const { tag } = await searchParams;
  return <ResourceListPage type={current} category={activeCategory} activeTags={tag ? tag.split(",").filter(Boolean) : []} />;
}


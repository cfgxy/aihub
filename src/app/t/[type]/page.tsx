import { notFound } from "next/navigation";
import { ResourceListPage } from "@/components/resource-list-page";
import { listTypes } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function TypePage({ params, searchParams }: { params: Promise<{ type: string }>; searchParams: Promise<{ tag?: string }> }) {
  const { type } = await params;
  const current = listTypes().find((item) => item.key === type);
  if (!current) notFound();
  const { tag } = await searchParams;
  return <ResourceListPage type={current} activeTags={tag ? tag.split(",").filter(Boolean) : []} />;
}


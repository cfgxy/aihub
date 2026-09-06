import Link from "next/link";
import { SearchIcon } from "./icons";

export function EmptyState({ title, actionHref = "/", action = "返回首页" }: { title: string; actionHref?: string; action?: string }) {
  return <div className="empty-state"><span className="empty-icon"><SearchIcon /></span><h2>{title}</h2><p>换个关键词，或继续浏览其他分类。</p><Link href={actionHref}>{action}</Link></div>;
}


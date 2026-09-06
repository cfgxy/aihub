import { EmptyState } from "@/components/empty-state";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() { return <SiteShell><div className="container not-found"><EmptyState title="页面不存在或资源已下架" /></div></SiteShell>; }


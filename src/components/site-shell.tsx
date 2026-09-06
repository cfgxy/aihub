import Link from "next/link";
import type { ReactNode } from "react";
import { disclaimer, siteName } from "@/lib/content";
import { listTypes } from "@/lib/repository";
import { SearchBox } from "./search-box";
import { SparkIcon } from "./icons";

export function SiteShell({ children }: { children: ReactNode }) {
  const types = listTypes();
  return <div className="site-shell">
    <header className="site-header"><div className="header-inner">
      <Link href="/" className="brand"><span className="brand-mark"><SparkIcon /></span>{siteName}</Link>
      <nav aria-label="资源类型">{types.map((type) => <Link key={type.key} href={`/t/${type.key}`}>{type.name}</Link>)}</nav>
      <SearchBox compact />
    </div></header>
    <main>{children}</main>
    <footer><div className="container footer-inner"><div className="footer-brand">{siteName}</div><p>{disclaimer}</p></div></footer>
  </div>;
}


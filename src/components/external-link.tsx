import type { ReactNode } from "react";
import { hostname } from "@/lib/content";
import { ExternalIcon } from "./icons";

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener nofollow" className={className}
    aria-label={`${typeof children === "string" ? children : "打开外部链接"}（在新窗口打开，${hostname(href)}）`}>
    {children}<ExternalIcon />
  </a>;
}


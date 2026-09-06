import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AI 工具集市", template: "%s - AI 工具集市" },
  description: "精选 AI 应用、SKILL 与 MCP，直达官方来源和安装方式。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}


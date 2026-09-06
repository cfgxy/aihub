import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { loginAction } from "../actions";

export const metadata: Metadata = { title: "管理登录", robots: { index: false, follow: false } };

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect("/admin");
  const error = (await searchParams).error;
  return <main className="admin-login"><form action={loginAction} className="admin-login-card"><div className="brand-mark">AI</div><h1>管理后台</h1><p>输入本机管理口令继续。</p><label>管理口令<input name="password" type="password" required autoFocus /></label>{error && <div className="form-error">口令错误，请重试。</div>}<button type="submit">登录</button><a href="/">返回公开站点</a></form></main>;
}


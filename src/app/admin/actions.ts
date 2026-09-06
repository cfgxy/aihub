"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, isAdmin, setAdminSession, verifyPassword } from "@/lib/auth";
import { deleteResource, saveResource, setResourceStatus } from "@/lib/repository";
import type { ResourceInput } from "@/lib/types";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!verifyPassword(password)) redirect("/admin/login?error=1");
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() { await clearAdminSession(); redirect("/admin/login"); }

function parseResource(formData: FormData): ResourceInput | null {
  const officialUrl = String(formData.get("officialUrl") || "").trim();
  try { new URL(officialUrl); } catch { return null; }
  return {
    name: String(formData.get("name") || "").trim(), slug: String(formData.get("slug") || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    typeId: Number(formData.get("typeId")), categoryId: Number(formData.get("categoryId")), summary: String(formData.get("summary") || "").trim(),
    description: String(formData.get("description") || "").trim(), tags: String(formData.get("tags") || "").split(",").map((item) => item.trim()).filter(Boolean),
    officialUrl, sourceUrl: String(formData.get("sourceUrl") || "").trim(), installGuide: String(formData.get("installGuide") || "").trim(),
    configText: String(formData.get("configText") || "").trim(), iconUrl: String(formData.get("iconUrl") || "").trim(),
    status: formData.get("status") === "published" ? "published" : "draft",
  };
}

export async function saveResourceAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const input = parseResource(formData);
  if (!input || !input.name || !input.slug || !input.summary || !input.typeId || !input.categoryId) redirect("/admin?error=required");
  try {
    saveResource(input, formData.get("id") ? Number(formData.get("id")) : undefined);
  } catch {
    redirect("/admin?error=conflict");
  }
  revalidatePath("/"); redirect("/admin?saved=1");
}

export async function toggleResourceAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  setResourceStatus(Number(formData.get("id")), formData.get("status") === "published" ? "published" : "draft");
  revalidatePath("/"); redirect("/admin?saved=1");
}

export async function deleteResourceAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  deleteResource(Number(formData.get("id"))); revalidatePath("/"); redirect("/admin?deleted=1");
}

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "aihub_admin";

function expectedToken() {
  const password = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(`aihub:${password}`).digest("hex");
}

export function verifyPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE)?.value || "";
  const expected = expectedToken();
  return token.length === expected.length && timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export async function setAdminSession() {
  (await cookies()).set(COOKIE, expectedToken(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE);
}


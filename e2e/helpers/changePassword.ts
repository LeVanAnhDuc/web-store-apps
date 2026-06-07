import type { APIRequestContext } from "@playwright/test";
import { request } from "@playwright/test";

const EMAIL = process.env.E2E_USER_EMAIL ?? "user@test.com";
const DEFAULT_PASSWORD = process.env.E2E_USER_PASSWORD ?? "User@123";
const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

async function tryLogin(
  ctx: APIRequestContext,
  password: string
): Promise<string | null> {
  const res = await ctx.post("/api/v1/auth/login", {
    data: { email: EMAIL, password }
  });
  if (!res.ok()) return null;
  const body = await res.json();
  return (body?.data?.accessToken as string) ?? null;
}

export async function ensureDefaultPassword(
  currentGuess: string
): Promise<void> {
  const ctx = await request.newContext({ baseURL: BASE_URL });
  try {
    if (await tryLogin(ctx, DEFAULT_PASSWORD)) return;
    const token = await tryLogin(ctx, currentGuess);
    if (!token)
      throw new Error(
        "ensureDefaultPassword: cannot login with either password"
      );
    const res = await ctx.patch("/api/v1/auth/change-password", {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        currentPassword: currentGuess,
        newPassword: DEFAULT_PASSWORD,
        confirmPassword: DEFAULT_PASSWORD
      }
    });
    if (!res.ok())
      throw new Error(`ensureDefaultPassword: revert failed (${res.status()})`);
  } finally {
    await ctx.dispose();
  }
}

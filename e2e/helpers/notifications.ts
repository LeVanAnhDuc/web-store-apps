import type { APIRequestContext } from "@playwright/test";
import { request } from "@playwright/test";

// Shared config for the notifications E2E suite. Mirrors the env-override
// pattern in helpers/changePassword.ts so the suite can target a different
// host/user without code changes.
export const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";
export const USER_EMAIL = process.env.E2E_USER_EMAIL ?? "user@test.com";
export const USER_PASSWORD = process.env.E2E_USER_PASSWORD ?? "User@123";

// Literal seed titles (BE seeder: server/src/database/seeders/data/notifications.ts).
// The first three seed rows are unread; we assert one verbatim to prove the FE
// renders the stored string, not an i18n key or enum.
export const SEED_UNREAD_TITLE = "Unusual sign-in detected";
// A seed row that is seeded as read (4th item), used for read-tab assertions.
export const SEED_READ_TITLE = "Password changed";

interface UnreadCountResponse {
  data?: { count?: number };
}

// Fetch the caller's unread count straight from the API, for delta assertions
// in the mutation tests (badge math is more robust as a delta than an absolute).
// Logs in via password to get a fresh bearer token (the page storageState's
// cookie is not directly reusable from a bare request context).
export async function fetchUnreadCount(): Promise<number> {
  const ctx: APIRequestContext = await request.newContext({
    baseURL: BASE_URL
  });
  try {
    const login = await ctx.post("/api/v1/auth/login", {
      data: { email: USER_EMAIL, password: USER_PASSWORD }
    });
    if (!login.ok()) {
      throw new Error(`fetchUnreadCount: login failed (${login.status()})`);
    }
    const body = (await login.json()) as { data?: { accessToken?: string } };
    const token = body?.data?.accessToken;
    if (!token)
      throw new Error("fetchUnreadCount: no access token in response");

    const res = await ctx.get("/api/v1/notifications/unread-count", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok()) {
      throw new Error(`fetchUnreadCount: request failed (${res.status()})`);
    }
    const json = (await res.json()) as UnreadCountResponse;
    return json?.data?.count ?? 0;
  } finally {
    await ctx.dispose();
  }
}

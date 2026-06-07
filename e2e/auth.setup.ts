import { test as setup, expect } from "@playwright/test";

const AUTH_FILE = "e2e/.auth/user.json";
const EMAIL = process.env.E2E_USER_EMAIL ?? "user@test.com";
const PASSWORD = process.env.E2E_USER_PASSWORD ?? "User@123";

setup("authenticate", async ({ page }) => {
  const res = await page.request.post("/api/v1/auth/login", {
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(res.ok()).toBeTruthy();

  const state = await page.context().storageState({ path: AUTH_FILE });
  // Fail loudly here if the refresh cookie wasn't captured — otherwise every
  // test would 401 after SessionGate's /token/refresh, far from the root cause.
  expect(state.cookies.some((c) => c.name === "refreshToken")).toBeTruthy();
});

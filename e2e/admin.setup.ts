import { test as setup, expect } from "@playwright/test";

const AUTH_FILE = "e2e/.auth/admin.json";
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? "admin@test.com";
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "Admin@123";

setup("authenticate admin", async ({ page }) => {
  const res = await page.request.post("/api/v1/auth/login", {
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(res.ok()).toBeTruthy();

  const state = await page.context().storageState({ path: AUTH_FILE });
  expect(state.cookies.some((c) => c.name === "refreshToken")).toBeTruthy();
});

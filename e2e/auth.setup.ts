import { test as setup, expect } from "@playwright/test";

const AUTH_FILE = "e2e/.auth/user.json";
const EMAIL = process.env.E2E_USER_EMAIL ?? "user@test.com";
const PASSWORD = process.env.E2E_USER_PASSWORD ?? "User@123";

setup("authenticate", async ({ page }) => {
  const res = await page.request.post("/api/v1/auth/login", {
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(res.ok()).toBeTruthy();
  await page.context().storageState({ path: AUTH_FILE });
});

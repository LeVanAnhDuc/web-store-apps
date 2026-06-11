import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Read-only admin feature. Runs under the chromium project with the admin
// storageState (auth.setup with E2E_USER_EMAIL=admin@test.com), same precondition
// as admin-users-list. auth.setup's admin login seeds at least one login_histories
// row, so the list is non-empty. No data is mutated — no revert needed.

const DETAIL_RE = /\/admin\/login-history\/[a-f0-9]{24}/;

const openFirstDetail = async (page: Page) => {
  await page.goto("/admin/login-history");
  const viewButton = page.getByRole("button", { name: /view|xem/i }).first();
  await expect(viewButton).toBeVisible();
  await viewButton.click();
  await page.waitForURL(DETAIL_RE);
};

test.describe("Admin Login History — list + detail", () => {
  test("admin opens the list, clicks View, and the detail page renders", async ({
    page
  }) => {
    await openFirstDetail(page);
    await expect(
      page.getByRole("heading", { name: /Login Attempt Detail/i })
    ).toBeVisible();
    await expect(page.getByText("IP Address", { exact: true })).toBeVisible();
  });

  test("deep-linking directly to a detail URL renders the record", async ({
    page
  }) => {
    await openFirstDetail(page);
    const url = page.url();
    await page.goto("/admin/login-history");
    await page.goto(url);
    await expect(
      page.getByRole("heading", { name: /Login Attempt Detail/i })
    ).toBeVisible();
  });

  test("the View action is a button with an accessible name", async ({
    page
  }) => {
    await page.goto("/admin/login-history");
    const viewButton = page.getByRole("button", { name: /view/i }).first();
    await expect(viewButton).toBeVisible();
  });

  test("an invalid id shows the not-found UI", async ({ page }) => {
    await page.goto("/admin/login-history/not-a-valid-id");
    await expect(
      page.getByText(/Login history record not found/i)
    ).toBeVisible();
  });

  test("a valid-but-missing id shows the not-found UI", async ({ page }) => {
    await page.goto("/admin/login-history/000000000000000000000000");
    await expect(
      page.getByText(/Login history record not found/i)
    ).toBeVisible();
  });

  test("a detail API failure shows the error UI", async ({ page }) => {
    await page.route("**/api/v1/admin/login-history/*", (route) =>
      route.fulfill({ status: 500, body: "{}" })
    );
    await page.goto("/admin/login-history/000000000000000000000000");
    await expect(
      page.getByText(/Could not load this login record/i)
    ).toBeVisible();
  });

  test("vi locale renders the translated action label and detail labels", async ({
    page
  }) => {
    await page.goto("/vi/admin/login-history");
    const viewButton = page.getByRole("button", { name: /xem/i }).first();
    await expect(viewButton).toBeVisible();
    await viewButton.click();
    await page.waitForURL(/\/vi\/admin\/login-history\/[a-f0-9]{24}/);
    await expect(page.getByText("Địa chỉ IP", { exact: true })).toBeVisible();
  });
});

test.describe("Admin Login History — auth", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("unauthenticated visit to a detail URL redirects to login", async ({
    page
  }) => {
    await page.goto("/admin/login-history/000000000000000000000000");
    await page.waitForURL(/\/login/);
    await expect(page).toHaveURL(/\/login/);
  });
});

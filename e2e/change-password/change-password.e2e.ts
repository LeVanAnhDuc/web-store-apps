import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { ensureDefaultPassword } from "../helpers/changePassword";

const DEFAULT_PASSWORD = process.env.E2E_USER_PASSWORD ?? "User@123";
const NEW_PASSWORD = "NewPass@123";

// The form renders visible labels ("Current Password", etc.) but the toggle
// button wrapper breaks shadcn's Slot id forwarding, so the <input> has no id
// for getByLabel to resolve. Select by the stable name attribute instead.
const currentPassword = (page: Page) =>
  page.locator('input[name="currentPassword"]');
const newPassword = (page: Page) => page.locator('input[name="newPassword"]');
const confirmPassword = (page: Page) =>
  page.locator('input[name="confirmPassword"]');

test.describe.configure({ mode: "serial" });

test.describe("Change Password — Account Settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/account-settings");
    await expect(
      page.getByRole("heading", { name: "Change Password" })
    ).toBeVisible();
  });

  test("blocks confirm mismatch on the client (no API call)", async ({
    page
  }) => {
    let patchCalled = false;
    page.on("request", (r) => {
      if (r.method() === "PATCH" && r.url().includes("/auth/change-password")) {
        patchCalled = true;
      }
    });
    await currentPassword(page).fill(DEFAULT_PASSWORD);
    await newPassword(page).fill(NEW_PASSWORD);
    await confirmPassword(page).fill("Different@123");
    await page.getByRole("button", { name: "Update Password" }).click();
    await expect(confirmPassword(page)).toHaveAttribute("aria-invalid", "true");
    expect(patchCalled).toBe(false);
  });

  test("shows inline error on wrong current password", async ({ page }) => {
    await currentPassword(page).fill("WrongPass@123");
    await newPassword(page).fill(NEW_PASSWORD);
    await confirmPassword(page).fill(NEW_PASSWORD);
    await page.getByRole("button", { name: "Update Password" }).click();
    await expect(currentPassword(page)).toHaveAttribute("aria-invalid", "true");
  });

  test("shows inline error when new equals current", async ({ page }) => {
    await currentPassword(page).fill(DEFAULT_PASSWORD);
    await newPassword(page).fill(DEFAULT_PASSWORD);
    await confirmPassword(page).fill(DEFAULT_PASSWORD);
    await page.getByRole("button", { name: "Update Password" }).click();
    await expect(newPassword(page)).toHaveAttribute("aria-invalid", "true");
  });

  test("happy path updates password and keeps the session", async ({
    page
  }) => {
    await currentPassword(page).fill(DEFAULT_PASSWORD);
    await newPassword(page).fill(NEW_PASSWORD);
    await confirmPassword(page).fill(NEW_PASSWORD);
    await page.getByRole("button", { name: "Update Password" }).click();
    await expect(page.getByText("Password updated successfully")).toBeVisible();
    await expect(page).toHaveURL(/\/account-settings/);
  });

  test.afterAll(async () => {
    await ensureDefaultPassword(NEW_PASSWORD);
  });
});

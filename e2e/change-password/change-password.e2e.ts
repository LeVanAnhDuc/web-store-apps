import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { ensureDefaultPassword } from "../helpers/changePassword";

const DEFAULT_PASSWORD = process.env.E2E_USER_PASSWORD ?? "User@123";
const NEW_PASSWORD = "NewPass@123";

// Labels are programmatically associated with their inputs (PasswordInput
// forwards the shadcn FormControl id to the <input>), so select by label.
const currentPassword = (page: Page) =>
  page.getByLabel("Current Password", { exact: true });
const newPassword = (page: Page) =>
  page.getByLabel("New Password", { exact: true });
const confirmPassword = (page: Page) =>
  page.getByLabel("Confirm New Password", { exact: true });

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

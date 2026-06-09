import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { restoreApp } from "../helpers/adminApps";

const TARGET_APP = { name: "blog", displayName: "Blog" };
const EDITED_DISPLAY_NAME = "Blog (edited e2e)";

const rowMenu = (page: Page, displayName: string) =>
  page
    .getByRole("row", { name: displayName })
    .getByRole("button", { name: "App actions" });

test.describe.configure({ mode: "serial" });

test.describe("Admin Apps — edit + hide/unhide", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/apps");
    await expect(
      page.getByRole("heading", { name: "App Registry" })
    ).toBeVisible();
  });

  test("edits an app's display name", async ({ page }) => {
    await rowMenu(page, TARGET_APP.displayName).click();
    await page.getByRole("menuitem", { name: "Edit" }).click();
    const displayName = page.getByRole("textbox", { name: "Display Name" });
    await expect(displayName).toBeVisible();
    await displayName.fill(EDITED_DISPLAY_NAME);
    await page.getByRole("button", { name: "Save Changes" }).click();
    await expect(page.getByText("App updated.")).toBeVisible();
    await expect(
      page.getByText(EDITED_DISPLAY_NAME, { exact: true })
    ).toBeVisible();
  });

  test("hides then unhides an app (status toggle)", async ({ page }) => {
    await rowMenu(page, EDITED_DISPLAY_NAME).click();
    await page.getByRole("menuitem", { name: "Hide" }).click();
    await page.getByRole("button", { name: "Hide App" }).click();
    await expect(page.getByText("App hidden.")).toBeVisible();
    const row = page.getByRole("row", { name: EDITED_DISPLAY_NAME });
    await expect(row.getByText("Paused")).toBeVisible();

    await rowMenu(page, EDITED_DISPLAY_NAME).click();
    await page.getByRole("menuitem", { name: "Unhide" }).click();
    await expect(page.getByText("App reactivated.")).toBeVisible();
    await expect(row.getByText("Active")).toBeVisible();
  });

  test.afterAll(async () => {
    await restoreApp(TARGET_APP.name, TARGET_APP.displayName, "active");
  });
});

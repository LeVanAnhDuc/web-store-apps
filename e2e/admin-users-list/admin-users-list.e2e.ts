import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Read-only feature: the admin user list. Filters and pagination are URL-driven
// (the table reads search/role/status/page from the query string), so we drive
// them via page.goto query params — more robust than operating the comboboxes.
// Uses the admin storageState (auth.setup runs with E2E_USER_EMAIL=admin@test.com).
// No data is mutated, so no revert is needed.

const ADMIN_EMAIL = "admin@test.com";
const USER_EMAIL = "user@test.com";
const INACTIVE_EMAIL = "inactive@test.com";

const gotoUsers = (page: Page, query = "") => page.goto(`/admin/users${query}`);

const cell = (page: Page, email: string) =>
  page.getByText(email, { exact: true });

test.describe("Admin Users List", () => {
  test("admin sees the user list populated from the API", async ({ page }) => {
    await gotoUsers(page);
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
    await expect(cell(page, USER_EMAIL)).toBeVisible();
  });

  test("role filter narrows the list to admins only", async ({ page }) => {
    await gotoUsers(page, "?role=admin");
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
    await expect(cell(page, USER_EMAIL)).toHaveCount(0);
  });

  test("search narrows the list by email", async ({ page }) => {
    await gotoUsers(page, "?search=inactive");
    await expect(cell(page, INACTIVE_EMAIL)).toBeVisible();
    await expect(cell(page, ADMIN_EMAIL)).toHaveCount(0);
  });

  test("status=locked surfaces deactivated accounts", async ({ page }) => {
    await gotoUsers(page, "?status=locked");
    await expect(cell(page, INACTIVE_EMAIL)).toBeVisible();
  });

  // The table wires the `page` query param to the API (it does not expose a
  // page-size control, so default limit=20 applies). With the seed (<20 users)
  // everything fits on page 1, so the pager UI (TablePagination) stays hidden by
  // design. We instead verify the page param genuinely flows to the API: page 2
  // of a single-page dataset comes back empty. Exercising the visible pager would
  // require >20 seeded users — see docs/specs/admin-users-list/e2e.md.
  test("page param is wired to the API (page 2 of a single-page dataset is empty)", async ({
    page
  }) => {
    await gotoUsers(page);
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();

    await gotoUsers(page, "?page=2");
    await expect(cell(page, ADMIN_EMAIL)).toHaveCount(0);
  });
});

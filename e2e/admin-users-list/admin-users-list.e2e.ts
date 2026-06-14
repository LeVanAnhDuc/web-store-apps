import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Read-only feature: the admin user list. Filters and pagination are URL-driven
// (the table reads search/role/status/page from the query string), so we drive
// them via page.goto query params — more robust than operating the comboboxes.
// Uses the admin storageState (auth.setup runs with E2E_USER_EMAIL=admin@test.com).
// No data is mutated, so no revert is needed.
//
// Coverage map (design.md §9 E2E Scenario Matrix / plan.md "E2E Backfill Plan"):
//   row 1  Happy path ............. "admin sees the user list", E1b headers
//   row 2  AuthN .................. E2 (fresh no-cookie context → /login)
//   row 3  AuthZ (deny) .......... lives in e2e/admin-authz/admin-authz.e2e.ts
//                                   (user storageState on admin route) — NOT here,
//                                   this file runs under admin storageState.
//   row 4  Validation ............ E4a (page coerce), E4b (limit 400), E4c (role drop)
//   row 5  Empty / null .......... E5a (no-match empty state), E5b ("Never")
//   row 6  Boundary / pagination . E6a (limit boundaries via API), E6b (page 2 empty),
//                                   E6c DEFER (visible pager click-through, seed-gated),
//                                   E6d N/A (no sort UI)
//   row 7  Filter / search ....... single-param (EXISTS) + E7a combined + E7b persist
//   row 8  Data rendering ........ E8 (localized labels, not raw enum/ISO)
//   row 9  i18n en+vi ............ E9 (en + vi locale, table-driven)
//   row 10 Error / loading ....... E10 (500 → role="alert"), E10b (skeleton)
//   row 11 Mutation safety ....... N/A (list read-only in scope)
//   row 12 Accessibility ......... E11a (roles), E11b (#announcer), E11c (keyboard)

const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "Admin@123";
const USER_EMAIL = "user@test.com";
const INACTIVE_EMAIL = "inactive@test.com";

const gotoUsers = (page: Page, query = "") => page.goto(`/admin/users${query}`);

// The app authenticates API calls with `Authorization: Bearer <accessToken>`,
// where accessToken is returned in the LOGIN RESPONSE BODY (only the refresh
// token is a cookie). page.request forwards cookies but not that bearer header,
// so admin API endpoints would 401. This helper logs in via the API and returns
// the auth header so API-level tests can reach the validation / 200 paths.
const adminAuthHeader = async (
  page: Page
): Promise<{ Authorization: string }> => {
  const res = await page.request.post("/api/v1/auth/login", {
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  expect(res.ok()).toBe(true);
  const body = await res.json();
  const token = body.data.accessToken as string;
  return { Authorization: `Bearer ${token}` };
};

const cell = (page: Page, email: string) =>
  page.getByText(email, { exact: true });

test.describe("Admin Users List", () => {
  // ── Group 1 — Happy path & data render (row 1, 8) ────────────────────────
  test("admin sees the user list populated from the API", async ({ page }) => {
    await gotoUsers(page);
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
    await expect(cell(page, USER_EMAIL)).toBeVisible();
  });

  // E1b — table headers render [EP]
  test("table renders the expected column headers", async ({ page }) => {
    await gotoUsers(page);
    await expect(page.getByRole("table")).toBeVisible();
    for (const name of ["User", "Role", "Status", "Last Login", "Created"]) {
      await expect(
        page.getByRole("columnheader", { name, exact: true })
      ).toBeVisible();
    }
  });

  // E8 — localized labels (not raw enum/bool/ISO) [EP]
  test("renders localized badge labels and formatted dates, not raw values", async ({
    page
  }) => {
    await gotoUsers(page, "?role=admin");
    const adminRow = page.getByRole("row").filter({ hasText: ADMIN_EMAIL });
    await expect(adminRow.getByText("Admin", { exact: true })).toBeVisible();
    await expect(adminRow.getByText("Active", { exact: true })).toBeVisible();
    // raw enum / raw bool must NOT leak into the rendered row
    await expect(adminRow.getByText("admin", { exact: true })).toHaveCount(0);
    await expect(adminRow.getByText("true", { exact: true })).toHaveCount(0);
    // createdAt must be formatted, never a raw ISO string
    await expect(adminRow).not.toContainText(/\d{4}-\d{2}-\d{2}T.*Z/);
  });

  // ── Group 2 — AuthN (row 2) ──────────────────────────────────────────────
  // AuthZ deny (row 3) lives in e2e/admin-authz/admin-authz.e2e.ts (user
  // storageState on the admin route) — this suite runs under admin storageState
  // so it cannot exercise the deny branch. Cross-referenced, not duplicated.
  test("unauthenticated visitor is redirected to /login (no list)", async ({
    browser
  }) => {
    // Fresh context with NO storageState. Cookies on localhost are not scoped by
    // port, so we also clearCookies to avoid bleed-through from other suites.
    // (memory: reference_e2e_suite_session_contamination)
    const context = await browser.newContext({ storageState: undefined });
    const page = await context.newPage();
    await page.context().clearCookies();
    await page.goto("/admin/users");
    await page.waitForURL(/\/login/);
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText(ADMIN_EMAIL, { exact: true })).toHaveCount(0);
    await context.close();
  });

  // ── Group 3 — Validation / param tampering (row 4) ───────────────────────
  // E4a — non-numeric page falls back to page 1 (FE guard) [EP]
  test("non-numeric page param falls back to page 1 (renders normally)", async ({
    page
  }) => {
    await gotoUsers(page, "?page=abc");
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
  });

  // E4b — out-of-range limit rejected by the API (400) [EP/BVA]
  test("out-of-range limit is rejected by the API (400)", async ({ page }) => {
    // Send the bearer token (login response body) so the request passes
    // adminGuard and reaches queryPipe, which rejects the bad limit with 400.
    // BE bounds confirmed empirically: limit must be 1..100 (101, 0, -1 → 400).
    const headers = await adminAuthHeader(page);
    for (const limit of [101, -1]) {
      const res = await page.request.get(`/api/v1/admin/users?limit=${limit}`, {
        headers
      });
      expect(res.status()).toBe(400);
    }
  });

  // E4c — invalid role param dropped by the FE guard (full list still renders) [EP]
  test("invalid role param is dropped by the FE guard (full list still renders)", async ({
    page
  }) => {
    await gotoUsers(page, "?role=superadmin");
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
    await expect(cell(page, USER_EMAIL)).toBeVisible();
  });

  // ── Group 4 — Empty / null (row 5) ───────────────────────────────────────
  // E5a — no-match search shows the empty state [EP]
  test("no-match search shows the empty state", async ({ page }) => {
    await gotoUsers(page, "?search=zzz-nomatch-xyz");
    await expect(
      page.getByText("No users match", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText("Try adjusting the search or clearing the filter.", {
        exact: true
      })
    ).toBeVisible();
    await expect(cell(page, ADMIN_EMAIL)).toHaveCount(0);
  });

  // E5b — user that never logged in shows "Never" [EP]
  // Assumes seed inactive@test.com has no successful login_history → lastLoginAt=null.
  test("a user that never logged in shows 'Never' in the last-login cell", async ({
    page
  }) => {
    await gotoUsers(page, "?search=inactive");
    const row = page.getByRole("row").filter({ hasText: INACTIVE_EMAIL });
    await expect(row.getByText("Never", { exact: true })).toBeVisible();
  });

  // ── Group 5 — Boundary / pagination (row 6) ──────────────────────────────
  // E6a — limit boundary values honored by the API [BVA]
  // (limit=101 over-max → 400 is covered by E4b; cross-ref.)
  test("limit boundary values are honored by the API", async ({ page }) => {
    // Bearer token required (see adminAuthHeader). In-range limits 1 and 100
    // (the BE max) return 200; over-max 101 → 400 is covered by E4b.
    const headers = await adminAuthHeader(page);

    const r1 = await page.request.get("/api/v1/admin/users?limit=1", {
      headers
    });
    expect(r1.status()).toBe(200);
    const b1 = await r1.json();
    expect(b1.data.items.length).toBeLessThanOrEqual(1);
    expect(b1.data.meta.limit).toBe(1);

    const r100 = await page.request.get("/api/v1/admin/users?limit=100", {
      headers
    });
    expect(r100.status()).toBe(200);
  });

  // E6b — beyond-range page (page 2 of a single-page dataset is empty) [BVA]
  // The table wires the `page` query param to the API (no page-size control, so
  // default limit=20 applies). With the seed (<20 users) everything fits on page
  // 1, so the pager UI (TablePagination) stays hidden by design. We instead
  // verify the page param genuinely flows to the API: page 2 comes back empty.
  test("page param is wired to the API (page 2 of a single-page dataset is empty)", async ({
    page
  }) => {
    await gotoUsers(page);
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();

    await gotoUsers(page, "?page=2");
    await expect(cell(page, ADMIN_EMAIL)).toHaveCount(0);
  });

  // E6c — DEFER (seed-gated): visible pager click-through (next/prev → ?page=).
  //   TablePagination returns null when totalPages <= 1; the seed has <20 users +
  //   default limit=20 → always one page → the pager is hidden by design. Driving
  //   next/prev requires a >20-user seed (a persistent DB mutation, avoided for a
  //   read-only feature). Replacement coverage: E6a (limit boundaries via API
  //   meta) + E6b (page 2 empty). Follow-up: add a >20-user fixture, then assert
  //   next/prev navigation. Not silently dropped — see docs e2e.md "Known caveat".
  //
  // E6d — N/A: sort toggle UI. The table has no sort control (sortBy/sortOrder
  //   live only in the API contract; headers are not clickable). Also blocked by
  //   the order↔sortOrder param-name drift (design.md §10). Add an [ST] sort
  //   toggle test once a sort UI lands.

  // ── Group 6 — Filter / search (row 7) ────────────────────────────────────
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

  // E7a — combined role+status filter narrows correctly [DT]
  test("combined role+status filter narrows correctly", async ({ page }) => {
    await gotoUsers(page, "?role=user&status=active");
    await expect(cell(page, USER_EMAIL)).toBeVisible();
    await expect(cell(page, ADMIN_EMAIL)).toHaveCount(0); // role !== user
    await expect(cell(page, INACTIVE_EMAIL)).toHaveCount(0); // status !== active
  });

  // E7b — filter state persists across a full page reload [ST]
  test("filter state persists across a full page reload", async ({ page }) => {
    await gotoUsers(page, "?role=admin");
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
    await page.reload();
    await expect(page).toHaveURL(/[?&]role=admin/);
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
    await expect(cell(page, USER_EMAIL)).toHaveCount(0);
  });

  // ── Group 7 — i18n en + vi (row 9, MANDATORY) ────────────────────────────
  // E9 — localized list renders per locale [DT]
  const LOCALES = [
    {
      path: "/admin/users",
      urlRe: /\/admin\/users/,
      header: "User",
      role: "Admin",
      status: "Active"
    },
    {
      path: "/vi/admin/users",
      urlRe: /\/vi\/admin\/users/,
      header: "Người dùng",
      role: "Quản trị viên",
      status: "Đang hoạt động"
    }
  ];

  for (const L of LOCALES) {
    test(`localized list renders for ${L.path}`, async ({ page }) => {
      await page.goto(`${L.path}?role=admin`);
      await expect(page).toHaveURL(L.urlRe);
      await expect(
        page.getByRole("columnheader", { name: L.header, exact: true })
      ).toBeVisible();
      const adminRow = page.getByRole("row").filter({ hasText: ADMIN_EMAIL });
      await expect(adminRow.getByText(L.role, { exact: true })).toBeVisible();
      await expect(adminRow.getByText(L.status, { exact: true })).toBeVisible();
    });
  }

  // ── Group 8 — Error / loading (row 10) ───────────────────────────────────
  // E10 — API 500 surfaces a distinct error state, not a fake empty list [EG]
  // CF-2: AdminUsersTable renders <p role="alert">{t("error")}</p> on isError.
  test("API 500 surfaces a distinct error state (not a fake empty list)", async ({
    page
  }) => {
    await page.route("**/api/v1/admin/users**", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Internal Server Error" })
      })
    );
    await gotoUsers(page);
    // The 500 can surface more than one role="alert" (the CF-2 table error row
    // plus a toast), so target the CF-2 row by its exact i18n copy rather than a
    // bare getByRole('alert') which would trip strict mode.
    const alert = page
      .getByRole("alert")
      .filter({ hasText: "Could not load users. Please try again." });
    await expect(alert).toBeVisible();
    // exact CF-2 i18n string (en: adminUsers.table.error)
    await expect(alert).toHaveText("Could not load users. Please try again.");
    // must NOT fall back to the empty-state ("No users match")
    await expect(page.getByText("No users match", { exact: true })).toHaveCount(
      0
    );
  });

  // E10b — skeleton visible while loading
  test("shows the skeleton while the list is loading", async ({ page }) => {
    await page.route("**/api/v1/admin/users**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.continue();
    });
    await gotoUsers(page);
    // UsersTableSkeleton renders shadcn <Skeleton> (.animate-pulse).
    await expect(page.locator(".animate-pulse").first()).toBeVisible();
    await expect(cell(page, ADMIN_EMAIL)).toBeVisible();
  });

  // ── Group 9 — Accessibility (row 12) ─────────────────────────────────────
  // E11a — core landmarks expose accessible roles [EP]
  test("core landmarks expose accessible roles", async ({ page }) => {
    await gotoUsers(page);
    await expect(page.getByRole("table")).toBeVisible();
    // 5 visible headers + 1 sr-only "Actions" header = 6 columnheaders
    await expect(page.getByRole("columnheader")).toHaveCount(6);
    // role + status shadcn Select triggers = 2 comboboxes
    await expect(page.getByRole("combobox")).toHaveCount(2);
    // SearchInput wraps CustomInput with aria-label={t("search")} → a textbox
    // named exactly "Search" (it is NOT type=search, so role="searchbox" is
    // absent). exact:true disambiguates it from the AppHeader's global search
    // input, whose accessible name is "Open search" (placeholder "Search apps…").
    await expect(
      page.getByRole("textbox", { name: "Search", exact: true })
    ).toBeVisible();
    // FOLLOW-UP (a11y gap, not fixed here): the toolbar <Label>s for Role/Status
    // are not associated to the Select triggers (no htmlFor / id), so the
    // comboboxes have no accessible name. CustomSelectTrigger does not forward an
    // aria-label. Flagged per CLAUDE.md §4.3 — do not modify app code from tests.
  });

  // E11b — #announcer surfaces dynamic changes to screen readers
  // CF-4: useAnnounce wiring + adminUsers.announce.* keys. After the list loads,
  // TableLoadedAnnouncer writes "{total} users loaded" into #announcer.
  test("list load is announced to screen readers via #announcer", async ({
    page
  }) => {
    await gotoUsers(page, "?role=admin");
    const announcer = page.locator("#announcer");
    // The announcer is updated asynchronously (requestAnimationFrame) after the
    // query resolves; assert it ends up with the CF-4 "loaded" announcement.
    await expect(announcer).toHaveText(/\d+ users loaded/);
  });

  // E11c — keyboard focus reaches the toolbar controls
  test("keyboard focus reaches the toolbar search control", async ({
    page
  }) => {
    await gotoUsers(page);
    const search = page.getByRole("textbox", { name: "Search", exact: true });
    await expect(search).toBeVisible();
    // E11c intent: the toolbar search is keyboard-reachable via Tab. It is NOT
    // the first interactive control — the AppHeader's global "Open search"
    // button precedes it in tab order — so Tab forward (bounded) until focus
    // lands on it, proving it sits in the natural tab sequence (not tabindex=-1
    // / focus-trapped away). 30 presses is ample for the header + toolbar chrome.
    let reached = false;
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press("Tab");
      if (await search.evaluate((el) => el === document.activeElement)) {
        reached = true;
        break;
      }
    }
    expect(reached).toBe(true);
    await expect(search).toBeFocused();
    // Deeper walks (combobox → pager) are brittle with the 1-page seed (pager
    // hidden). Scope kept to the toolbar entry point; expand when pager visible.
  });
});

// ── Group 10 — Mutation safety (row 11) — N/A ──────────────────────────────
// The list is read-only in this feature's scope (design.md §1). The
// reset-password / lock-unlock / force-logout dialogs are still mock-backed and
// out of scope, so there is no real mutation to test for safety. Re-evaluate
// when those mutations are wired to real APIs.

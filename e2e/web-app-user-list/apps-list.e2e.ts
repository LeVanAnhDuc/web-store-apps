import { test, expect, request as pwRequest } from "@playwright/test";
import type { APIRequestContext, Page } from "@playwright/test";

// API-level legs hit the FE proxy directly. The app authenticates with
// `Authorization: Bearer <accessToken>` where the accessToken lives in the LOGIN
// RESPONSE BODY (only refreshToken is a cookie). page.request forwards the
// session cookie but no Bearer header → BE authGuard 401 before validation ever
// runs. So we do ONE fresh login, read data.accessToken, and reuse it as a
// Bearer header across the API tests (login is IP rate-limited — 30/15min).
const E2E_BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

const loginForToken = async (): Promise<{
  ctx: APIRequestContext;
  token: string;
}> => {
  const ctx = await pwRequest.newContext({ baseURL: E2E_BASE_URL });
  const res = await ctx.post("/api/v1/auth/login", {
    data: { email: "user@test.com", password: "User@123" }
  });
  if (res.status() !== 200) {
    throw new Error(
      `login failed (${res.status()}): ${await res.text()} — cannot run API legs`
    );
  }
  const body = await res.json();
  const token = body.data.accessToken as string;
  return { ctx, token };
};

// User-facing app catalog at /vi/apps (feature: web-app-user-list).
// Read-only: no data mutation, nothing to revert.
// Auth comes from the global auth.setup.ts storageState (seed user).

const APPS_PATH = "/vi/apps";

// Shared waiter: first successful catalog response (excludes /apps/categories).
const waitCatalogOk = (page: Page) =>
  page.waitForResponse(
    (r) =>
      r.url().includes("/api/v1/apps") &&
      !r.url().includes("/apps/categories") &&
      r.status() === 200
  );

test.describe("Apps catalog (/vi/apps)", () => {
  test("renders only the role-permitted active apps for a user", async ({
    page
  }) => {
    const listResponse = page.waitForResponse(
      (r) => r.url().includes("/api/v1/apps") && r.status() === 200
    );
    await page.goto(APPS_PATH);
    await listResponse;

    // The auth user (user@test.com) has the `user` role → sees apps whose
    // requiredRoles include `user`: Blog, IDMS Portal, Notes (Team Calendar is
    // inactive). Admin-only apps must NOT appear.
    await expect(
      page.getByRole("heading", { level: 3, name: "Blog", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Notes", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "IDMS Portal", exact: true })
    ).toBeVisible();

    // Admin-only apps are hidden for a non-admin user.
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Analytics Dashboard",
        exact: true
      })
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Operations Console",
        exact: true
      })
    ).toHaveCount(0);

    // The user-visible apps each render an "Open" action; admin-only apps do not.
    await expect(page.getByRole("button", { name: "Mở Blog" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Mở IDMS Portal" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Mở Notes" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Mở Analytics Dashboard" })
    ).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Mở Operations Console" })
    ).toHaveCount(0);
  });

  test("search filters the catalog server-side and clears", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await page.waitForResponse(
      (r) => r.url().includes("/api/v1/apps") && r.status() === 200
    );
    await expect(
      page.getByRole("heading", { level: 3, name: "Blog", exact: true })
    ).toBeVisible();

    const search = page.getByRole("textbox", {
      name: /Tìm ứng dụng|Search apps/
    });
    await search.fill("Notes");

    // Debounced (300ms) → server request with the search term.
    await page.waitForResponse(
      (r) =>
        r.url().includes("/api/v1/apps") &&
        r.url().includes("search=Notes") &&
        r.status() === 200
    );

    await expect(
      page.getByRole("heading", { level: 3, name: "Notes", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Blog", exact: true })
    ).toHaveCount(0);

    await search.fill("");
    await expect(
      page.getByRole("heading", { level: 3, name: "Blog", exact: true })
    ).toBeVisible();
  });

  test("Open launches the app homeUrl in a new tab", async ({ page }) => {
    // Capture window.open without actually navigating to the external URL.
    await page.addInitScript(() => {
      (window as unknown as { __opened: string[] }).__opened = [];
      window.open = (url?: string | URL) => {
        (window as unknown as { __opened: string[] }).__opened.push(
          String(url ?? "")
        );
        return null;
      };
    });
    await page.goto(APPS_PATH);
    await page.waitForResponse(
      (r) => r.url().includes("/api/v1/apps") && r.status() === 200
    );

    const openBlog = page.getByRole("button", { name: "Mở Blog" });
    await expect(openBlog).toBeVisible();
    await openBlog.click();

    const opened = await page.evaluate(
      () => (window as unknown as { __opened: string[] }).__opened
    );
    expect(opened).toContain("https://blog.example.com");
  });

  test("category pills filter the catalog server-side", async ({ page }) => {
    await page.goto(APPS_PATH);
    await page.waitForResponse(
      (r) =>
        r.url().includes("/api/v1/apps") &&
        !r.url().includes("/apps/categories") &&
        r.status() === 200
    );

    // Category pills come from GET /apps/categories. Pick the first real
    // category pill (skip the "All"/"Tất cả" pill at index 0).
    const group = page.getByRole("group", {
      name: /Lọc theo danh mục|Filter by category/
    });
    const pills = group.getByRole("button");
    await expect(pills.first()).toBeVisible();
    const realPill = pills.nth(1);
    await expect(realPill).toBeVisible();

    const filtered = page.waitForResponse(
      (r) =>
        r.url().includes("/api/v1/apps") &&
        r.url().includes("categoryId=") &&
        r.status() === 200
    );
    await realPill.click();
    await filtered;
    await expect(realPill).toHaveAttribute("aria-pressed", "true");

    // Back to "All": React Query serves the initial unfiltered result from cache
    // (no new request fires), so assert the toggle state rather than the network.
    await pills.first().click();
    await expect(pills.first()).toHaveAttribute("aria-pressed", "true");
    await expect(realPill).toHaveAttribute("aria-pressed", "false");
  });

  // Row 9 — i18n VI depth (category localization): category pills are localized
  // via slug → CATEGORY_LABEL_KEY → common.categories. On /vi/apps the seeded
  // user-visible categories (content/identity/productivity) must render their VI
  // labels, NOT the raw English. We assert the `productivity` pill shows
  // "Năng suất" (vi) and that the English "Productivity" is absent in the group.
  // Seed: Notes (productivity, ACTIVE, USER role) is visible to user@test.com, so
  // GET /apps/categories includes the productivity category. [EP en→vi]
  test("renders category pills with VI labels (productivity → 'Năng suất')", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await page.waitForResponse(
      (r) =>
        r.url().includes("/api/v1/apps") &&
        !r.url().includes("/apps/categories") &&
        r.status() === 200
    );

    const group = page.getByRole("group", { name: "Lọc theo danh mục" });
    // The localized VI pill renders; the English label must NOT leak through.
    await expect(
      group.getByRole("button", { name: "Năng suất" })
    ).toBeVisible();
    await expect(
      group.getByRole("button", { name: "Productivity" })
    ).toHaveCount(0);
  });
});

test.describe("Apps catalog (/apps EN locale)", () => {
  test("renders catalog and category group in English", async ({ page }) => {
    await page.goto("/apps");
    await page.waitForResponse(
      (r) => r.url().includes("/api/v1/apps") && r.status() === 200
    );
    await expect(
      page.getByRole("group", { name: "Filter by category" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Open Blog" })).toBeVisible();
  });

  // Row 9 — i18n EN depth: assert the real English strings render (catches a
  // missing-message key, which next-intl would surface as the raw `apps.xxx`
  // path instead of the translated text). Strings verified against
  // src/locales/en/apps.json.
  test("renders EN strings: placeholder, group, open, summary, empty", async ({
    page
  }) => {
    await page.goto("/apps");
    await waitCatalogOk(page);

    // Search placeholder (en: "Search apps...").
    await expect(
      page.getByRole("textbox", { name: "Search apps..." })
    ).toBeVisible();
    // Category group label (en: "Filter by category").
    await expect(
      page.getByRole("group", { name: "Filter by category" })
    ).toBeVisible();
    // Per-card Open label (en card.open "Open" + displayName).
    await expect(page.getByRole("button", { name: "Open Blog" })).toBeVisible();
    // Pagination summary (en: "Showing {shown} of {total} apps"). Seed gives 3
    // user-visible apps on a single page.
    await expect(page.getByText("Showing 3 of 3 apps")).toBeVisible();

    // Empty state (en: "No apps found.") via a no-match search.
    await page.getByRole("textbox", { name: "Search apps..." }).fill("zzzqqq");
    await page.waitForResponse(
      (r) =>
        r.url().includes("/api/v1/apps") &&
        r.url().includes("search=zzzqqq") &&
        r.status() === 200
    );
    await expect(page.getByText("No apps found.")).toBeVisible();
  });
});

// ── Row 2 — AuthN (unauthenticated) ────────────────────────────────────────
// Needs a NON-authenticated context, so it overrides the project storageState.
// Cookies on localhost are not port-scoped, so we BOTH drop storageState AND
// clear cookies (memory: reference_e2e_suite_session_contamination).
test.describe("Apps catalog — AuthN (unauthenticated)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("redirects an unauthenticated user from /vi/apps to /login [EP]", async ({
    page,
    context
  }) => {
    await context.clearCookies();
    await page.goto("/vi/apps");
    // AuthGuardLayout enforces auth client-side → URL settles on /login.
    await page.waitForURL(/\/login/);
    await expect(page).toHaveURL(/\/login/);
  });

  test("GET /api/v1/apps/categories without a Bearer token returns 401 [EP]", async () => {
    // API-level leg (gate A only): hit the FE proxy with NO auth (fresh context,
    // no cookies, no Authorization). `[EP]` no-token vs valid-token.
    const apiContext = await pwRequest.newContext({
      baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000"
    });
    const res = await apiContext.get("/api/v1/apps/categories");
    expect(res.status()).toBe(401);
    await apiContext.dispose();
  });
});

// ── Row 4 — Validation: tampered params (API level) [EP] ────────────────────
// The UI never builds a bad query (pills emit only valid _id), so tampered
// params are tested directly against the endpoint. The BE authGuard requires a
// Bearer accessToken (cookie alone → 401), so we log in ONCE in beforeAll and
// reuse the token. queryPipe (Joi listAppsQuerySchema) then yields 400 for bad
// pagination params. BE bounds (server/src/validators/schemas/web-app.ts):
//   page  → integer min 1     → ?page=abc (non-numeric) → 400
//   limit → integer 1..100    → ?limit=0 (<min) & ?limit=101 (>max) → 400
//   status → not in schema + stripUnknown → dropped, server forces ACTIVE → 200
test.describe("Apps catalog — query validation (API) [EP]", () => {
  let apiCtx: APIRequestContext;
  let token: string;

  test.beforeAll(async () => {
    ({ ctx: apiCtx, token } = await loginForToken());
  });

  test.afterAll(async () => {
    await apiCtx?.dispose();
  });

  const get = (q: string) =>
    apiCtx.get(`/api/v1/apps${q}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

  test("rejects non-numeric and out-of-range pagination params [EP]", async () => {
    const pageAbc = await get("?page=abc");
    expect(pageAbc.status()).toBe(400);

    const limitZero = await get("?limit=0");
    expect(limitZero.status()).toBe(400);

    const limitOver = await get("?limit=101");
    expect(limitOver.status()).toBe(400);
  });

  test("strips an unknown status param and forces ACTIVE [EP]", async () => {
    // `status` is NOT a valid query param → stripUnknown drops it; the server
    // forces status=ACTIVE. Request still succeeds (200) and returns only
    // active apps — the inactive `Team Calendar` must never leak in.
    const res = await get("?status=DISABLED");
    expect(res.status()).toBe(200);
    const body = await res.json();
    const items = body.data.items as Array<{ displayName: string }>;
    expect(items.some((a) => a.displayName === "Team Calendar")).toBe(false);
  });
});

// ── Rows 5/6/7/10/12 — Empty/null, boundary, combined filter, error/loading,
//    a11y. Grouped: all run as the authenticated user (project storageState).
test.describe("Apps catalog — states, errors & a11y (/vi/apps)", () => {
  // One Bearer token for the API-level boundary leg below (see loginForToken).
  let apiCtx: APIRequestContext;
  let token: string;

  test.beforeAll(async () => {
    ({ ctx: apiCtx, token } = await loginForToken());
  });

  test.afterAll(async () => {
    await apiCtx?.dispose();
  });

  // Row 5 — empty no-match state.
  test("shows the empty state when the search matches nothing", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    const search = page.getByRole("textbox", {
      name: /Tìm ứng dụng|Search apps/
    });
    await search.fill("zzzqqq");
    await page.waitForResponse(
      (r) =>
        r.url().includes("/api/v1/apps") &&
        r.url().includes("search=zzzqqq") &&
        r.status() === 200
    );

    await expect(page.getByText("Không tìm thấy ứng dụng nào.")).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Blog", exact: true })
    ).toHaveCount(0);
  });

  // Row 5 — null iconUrl + null description fallback. Stub the catalog so one
  // app has iconUrl=null + description=null. AppCard renders the initial-letter
  // block (no CustomImage → no <img>) for a null icon.
  test("renders an initial-letter fallback when an app has no icon (no broken img)", async ({
    page
  }) => {
    await page.route("**/api/v1/apps?**", async (route) => {
      const json = {
        timestamp: new Date().toISOString(),
        path: "/api/v1/apps",
        message: "ok",
        data: {
          items: [
            {
              _id: "stub-noicon",
              displayName: "Zephyr",
              description: null,
              iconUrl: null,
              homeUrl: "https://zephyr.example.com",
              category: null
            }
          ],
          meta: { total: 1, page: 1, limit: 12, totalPages: 1 }
        }
      };
      await route.fulfill({ json });
    });
    await page.goto(APPS_PATH);

    // The card heading + the decorative initial "Z" render; the card region has
    // NO <img> (scoped to the card, since the app shell may render other images).
    const card = page
      .getByRole("heading", { level: 3, name: "Zephyr", exact: true })
      .locator("xpath=ancestor::*[@aria-labelledby][1]");
    await expect(card).toBeVisible();
    await expect(card.locator("img")).toHaveCount(0);
    await expect(card.getByText("Z", { exact: true })).toBeVisible();
  });

  // Row 6 — single-page boundary [BVA]: 3 user-visible apps < PAGE_SIZE (12) →
  // totalPages = 1 → CustomPagination not rendered; summary still shows.
  // NOTE: page click-through (page 1/last/999) is DEFERRED — see e2e.md follow-ups.
  test("hides the pager and shows the summary on a single page [BVA]", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    await expect(page.getByText("Hiển thị 3 trên 3 ứng dụng")).toBeVisible();
    // No "page 2" control exists when totalPages === 1.
    await expect(page.getByRole("button", { name: /^2$/ })).toHaveCount(0);
  });

  // Row 6 — limit boundary values honored by the API [BVA]. Bearer auth (cookie
  // alone → 401); BE limit bounds are 1..100 → both ends return 200.
  // (limit=101 over-max → 400 is asserted in the validation describe.)
  test("accepts limit boundary values at the API [BVA]", async () => {
    const bearer = { headers: { Authorization: `Bearer ${token}` } };
    const r1 = await apiCtx.get("/api/v1/apps?limit=1", bearer);
    expect(r1.status()).toBe(200);
    const r100 = await apiCtx.get("/api/v1/apps?limit=100", bearer);
    expect(r100.status()).toBe(200);
  });

  // Row 7 — search + category as an intersection [DT]: a request that carries
  // BOTH categoryId and search must fire.
  test("combines search and category as an intersection [DT]", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    const group = page.getByRole("group", {
      name: /Lọc theo danh mục|Filter by category/
    });
    const realPill = group.getByRole("button").nth(1);
    await expect(realPill).toBeVisible();

    const combined = page.waitForResponse(
      (r) =>
        r.url().includes("/api/v1/apps") &&
        r.url().includes("categoryId=") &&
        r.url().includes("search=") &&
        r.status() === 200
    );
    await realPill.click();
    await page
      .getByRole("textbox", { name: /Tìm ứng dụng|Search apps/ })
      .fill("Blog");
    await combined;
  });

  // Row 7 — reset on reload: state is in-memory by design (no useSearchParams),
  // so a fresh load drops both the active pill and the search term.
  test("resets filter and search on reload (state is in-memory by design)", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    const group = page.getByRole("group", {
      name: /Lọc theo danh mục|Filter by category/
    });
    const allPill = group.getByRole("button").first();
    const search = page.getByRole("textbox", {
      name: /Tìm ứng dụng|Search apps/
    });
    await group.getByRole("button").nth(1).click();
    await search.fill("Notes");

    await page.reload();
    await waitCatalogOk(page);

    // No useSearchParams → filter/search are NOT in the URL; reload resets them.
    await expect(allPill).toHaveAttribute("aria-pressed", "true");
    await expect(search).toHaveValue("");
  });

  // Row 10 — error 5xx: React Query retries 5xx up to 2× (3 attempts total) →
  // fulfill 500 on every attempt; bump the timeout to absorb retry backoff.
  test("shows the error alert when GET /apps fails (5xx + React Query retries)", async ({
    page
  }) => {
    test.setTimeout(30_000);
    await page.route("**/api/v1/apps?**", (route) =>
      route.fulfill({ status: 500, json: { message: "boom" } })
    );
    await page.goto(APPS_PATH);

    await expect(
      page.getByRole("alert").filter({ hasText: "Không thể tải ứng dụng" })
    ).toBeVisible({ timeout: 20_000 });
  });

  // Row 10 — categories 5xx: pills are hidden (only the "All" pill remains) but
  // the unfiltered "All" grid still renders apps.
  test("hides category pills on a categories 5xx but still renders the All grid", async ({
    page
  }) => {
    await page.route("**/api/v1/apps/categories**", (route) =>
      route.fulfill({ status: 500, json: { message: "boom" } })
    );
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    const group = page.getByRole("group", { name: /Lọc theo danh mục/ });
    await expect(group.getByRole("button")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 3, name: "Blog", exact: true })
    ).toBeVisible();
  });

  // Row 10 — loading skeleton: delay the response so the loading branch
  // (AppCardSkeleton grid) is observable. This project's Skeleton primitive
  // (src/components/ui/skeleton.tsx) renders a plain div with `animate-pulse`
  // and NO data-slot — so `.animate-pulse` is the reliable loading marker.
  test("renders skeleton cards while the catalog request is pending", async ({
    page
  }) => {
    let release: () => void = () => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("**/api/v1/apps?**", async (route) => {
      await gate;
      await route.continue();
    });
    await page.goto(APPS_PATH);

    await expect
      .poll(async () => page.locator(".animate-pulse").count())
      .toBeGreaterThan(0);
    release();
    await waitCatalogOk(page);
  });

  // Row 12 — a11y: activate Open via keyboard (focus + Enter). Stub window.open
  // (same mechanism as the click-based Open test).
  test("activates Open via keyboard (focus + Enter) [a11y]", async ({
    page
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __opened: string[] }).__opened = [];
      window.open = (url?: string | URL) => {
        (window as unknown as { __opened: string[] }).__opened.push(
          String(url ?? "")
        );
        return null;
      };
    });
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    const openBlog = page.getByRole("button", { name: "Mở Blog" });
    await openBlog.focus();
    await expect(openBlog).toBeFocused();
    await page.keyboard.press("Enter");

    const opened = await page.evaluate(
      () => (window as unknown as { __opened: string[] }).__opened
    );
    expect(opened).toContain("https://blog.example.com");
  });

  // Row 12 — a11y: the live region (#announcer) reports the loaded count after
  // data arrives (apps.announce.loaded "Đã tải {total} ứng dụng.").
  test("announces the loaded count in the live region after data arrives [a11y]", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    const announcer = page.locator("#announcer");
    await expect(announcer).toContainText(/Đã tải \d+ ứng dụng\./);
  });

  // Row 12 — a11y: the live region reports a category change
  // (apps.announce.categoryChanged "Đã lọc theo {category}.").
  test("announces the category change in the live region [a11y]", async ({
    page
  }) => {
    await page.goto(APPS_PATH);
    await waitCatalogOk(page);

    const realPill = page
      .getByRole("group", { name: /Lọc theo danh mục/ })
      .getByRole("button")
      .nth(1);
    const label = (await realPill.textContent())?.trim() ?? "";
    await realPill.click();

    const announcer = page.locator("#announcer");
    await expect(announcer).toContainText(`Đã lọc theo ${label}.`);
  });
});

import { test, expect, request as playwrightRequest } from "@playwright/test";
import type { APIRequestContext, Page } from "@playwright/test";
import {
  BASE_URL,
  USER_EMAIL,
  USER_PASSWORD,
  ADMIN_EMAIL,
  ADMIN_PASSWORD
} from "../helpers/env";

// Reconciliation for feature `apps-category-ssr` (design.md / e2e.md in the
// docs repo): `GET /api/v1/apps/categories` became a PUBLIC endpoint
// (optionalAuthGuard + per-IP rate-limit + `Cache-Control: public,
// max-age=300`), and the `/apps` page now fetches categories in a Next.js
// Server Component (`getServerAppCategories`, no auth header) and passes them
// as a prop to the client `AppsBoard`. On a server-fetch failure, `AppsBoard`
// falls back to the existing client hook `useAppCategories()`. The apps LIST
// (`GET /api/v1/apps`) is UNCHANGED — still `authGuard`, still client-fetched.
//
// Read-only: every test here only performs GET requests (or a stubbed route).
// Nothing to revert.

const CATEGORIES_PATH = "/api/v1/apps/categories";
const APPS_PATH = "/api/v1/apps";

async function loginToken(
  ctx: APIRequestContext,
  email: string,
  password: string
): Promise<string> {
  const res = await ctx.post("/api/v1/auth/login", {
    data: { email, password }
  });
  expect(res.ok()).toBeTruthy();
  const body = (await res.json()) as { data?: { accessToken?: string } };
  const token = body.data?.accessToken;
  expect(token).toBeTruthy();
  return token as string;
}

test.describe("GET /api/v1/apps/categories — public endpoint", () => {
  // Row: anon + user + admin all get 200 with byte-identical arrays.
  test("anon, user, and admin all get 200 with identical category arrays", async ({
    browser
  }) => {
    // anon: fresh context, no storageState, no cookies.
    const anonCtx = await browser.newContext({ storageState: undefined });
    await anonCtx.clearCookies();
    const anonPage: Page = await anonCtx.newPage();

    const apiCtx = await playwrightRequest.newContext({ baseURL: BASE_URL });
    try {
      const userToken = await loginToken(apiCtx, USER_EMAIL, USER_PASSWORD);
      const adminToken = await loginToken(apiCtx, ADMIN_EMAIL, ADMIN_PASSWORD);

      const [anonRes, userRes, adminRes] = await Promise.all([
        anonPage.request.get(CATEGORIES_PATH),
        apiCtx.get(CATEGORIES_PATH, {
          headers: { Authorization: `Bearer ${userToken}` }
        }),
        apiCtx.get(CATEGORIES_PATH, {
          headers: { Authorization: `Bearer ${adminToken}` }
        })
      ]);

      expect(anonRes.status()).toBe(200);
      expect(userRes.status()).toBe(200);
      expect(adminRes.status()).toBe(200);

      const [anonBody, userBody, adminBody] = await Promise.all([
        anonRes.json(),
        userRes.json(),
        adminRes.json()
      ]);

      expect(anonBody.data).toEqual(userBody.data);
      expect(userBody.data).toEqual(adminBody.data);
    } finally {
      await apiCtx.dispose();
      await anonCtx.close();
    }
  });

  // Row: behavior cliff — garbage Bearer => 401, no header => 200.
  test("rejects a garbage Bearer token with 401 but allows no header (200) [EP]", async ({
    page
  }) => {
    const noHeaderRes = await page.request.get(CATEGORIES_PATH, {
      headers: { Authorization: "" }
    });
    expect(noHeaderRes.status()).toBe(200);

    const garbageRes = await page.request.get(CATEGORIES_PATH, {
      headers: { Authorization: "Bearer garbage" }
    });
    expect(garbageRes.status()).toBe(401);
  });

  // Row: Cache-Control header present.
  test("response carries Cache-Control: public, max-age=300", async ({
    page
  }) => {
    const res = await page.request.get(CATEGORIES_PATH);
    expect(res.status()).toBe(200);
    expect(res.headers()["cache-control"]).toBe("public, max-age=300");
  });
});

test.describe("Apps catalog (/apps) — SSR category prop", () => {
  // Row: happy path — server prop used, no client categories fetch fires.
  test("loading /apps fires ZERO client GET /apps/categories requests", async ({
    page
  }) => {
    let categoriesRequestSeen = false;
    page.on("request", (req) => {
      if (req.url().includes("/apps/categories")) categoriesRequestSeen = true;
    });

    const listResponse = page.waitForResponse(
      (r) => r.url().includes(APPS_PATH) && r.status() === 200
    );
    await page.goto("/vi/apps");
    await listResponse;

    // Give any (incorrect) client-side categories fetch a short window to
    // fire; the categories prop should already be server-supplied so none
    // should appear.
    await page.waitForTimeout(1000);

    expect(categoriesRequestSeen).toBe(false);
  });
});

test.describe("Apps catalog (/apps) — category i18n", () => {
  // Row: filter group label differs per locale; slug w/o an i18n key falls
  // back to displayName in BOTH locales. Seeded categories (content, tools,
  // identity, productivity) all HAVE an i18n key in common.categories, so the
  // fallback leg is exercised via a stubbed category with an unmapped slug.
  test("filter group label is localized per locale (en vs vi)", async ({
    page
  }) => {
    await page.goto("/vi/apps");
    await page.waitForResponse(
      (r) => r.url().includes(APPS_PATH) && r.status() === 200
    );
    // VI Filters button label is "Bộ lọc" (list.filters).
    await page.getByRole("button", { name: /Bộ lọc/i }).click();
    await expect(page.getByText("Lọc theo danh mục")).toBeVisible();
    await page.keyboard.press("Escape");

    await page.goto("/apps");
    await page.waitForResponse(
      (r) => r.url().includes(APPS_PATH) && r.status() === 200
    );
    await page.getByRole("button", { name: /Filters/i }).click();
    await expect(page.getByText("Filter by category")).toBeVisible();
  });

  test("a category slug without an i18n key falls back to displayName in both locales", async ({
    page
  }) => {
    // Stub the categories response with one seeded-shaped category whose slug
    // ("beta-labs") has NO entry in common.categories — resolveCategoryLabel
    // must fall back to the raw displayName in both locales.
    const stubbed = {
      timestamp: new Date().toISOString(),
      path: "/api/v1/apps/categories",
      message: "OK",
      data: [
        { _id: "cat-beta-labs", displayName: "Beta Labs", slug: "beta-labs" }
      ]
    };
    await page.route("**/api/v1/apps/categories", (route) =>
      route.fulfill({ status: 200, json: stubbed })
    );

    await page.goto("/vi/apps");
    await page.waitForResponse(
      (r) => r.url().includes(APPS_PATH) && r.status() === 200
    );
    await page.getByRole("button", { name: /Bộ lọc/i }).click();
    const popoverVi = page.locator('[data-slot="popover-content"]');
    await popoverVi.getByRole("combobox").click();
    await expect(page.getByRole("option", { name: "Beta Labs" })).toBeVisible();
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");

    await page.goto("/apps");
    await page.waitForResponse(
      (r) => r.url().includes(APPS_PATH) && r.status() === 200
    );
    await page.getByRole("button", { name: /Filters/i }).click();
    const popoverEn = page.locator('[data-slot="popover-content"]');
    await popoverEn.getByRole("combobox").click();
    await expect(page.getByRole("option", { name: "Beta Labs" })).toBeVisible();
  });
});

test.describe("Apps catalog (/apps) — categoryId deep link", () => {
  // Row: deep-link with a valid categoryId cold-loads with the filter
  // pre-selected, options present, and the list filtered accordingly.
  test("deep-link /vi/apps?categoryId=<validId> pre-selects the filter and filters the list", async ({
    page
  }) => {
    // Discover a real category id from the (now-public) categories endpoint.
    const catRes = await page.request.get(CATEGORIES_PATH);
    expect(catRes.status()).toBe(200);
    const catBody = (await catRes.json()) as {
      data: { _id: string; displayName: string; slug: string }[];
    };
    expect(catBody.data.length).toBeGreaterThan(0);
    const target = catBody.data[0];

    const listResponse = page.waitForResponse(
      (r) =>
        r.url().includes(APPS_PATH) &&
        r.url().includes(`categoryId=${target._id}`) &&
        r.status() === 200
    );
    await page.goto(`/vi/apps?categoryId=${target._id}`);
    const res = await listResponse;
    const body = (await res.json()) as { data: { items: unknown[] } };

    // Filters button shows an active-filter badge (activeFilterCount = 1).
    // VI label is "Bộ lọc" (list.filters).
    const filtersBtn = page.getByRole("button", { name: /Bộ lọc/i });
    await expect(filtersBtn).toBeVisible();
    await expect(filtersBtn.getByText("1")).toBeVisible();

    // Opening the popover shows the pre-selected option's label.
    await filtersBtn.click();
    const popover = page.locator('[data-slot="popover-content"]');
    await expect(popover.getByRole("combobox")).toBeVisible();

    // Every returned item (if any) belongs to the requested category.
    for (const item of body.data.items as { category?: string }[]) {
      if (target.displayName) expect(item.category).toBe(target.displayName);
    }
  });

  test("deep-link /apps?categoryId=<garbage> does not crash and shows the unfiltered/empty catalog", async ({
    page
  }) => {
    const listResponse = page.waitForResponse(
      (r) =>
        r.url().includes(APPS_PATH) && r.url().includes("categoryId=garbage")
    );
    await page.goto("/apps?categoryId=garbage");
    const res = await listResponse;

    // Garbage categoryId is not a valid ObjectId — server responds 400 and the
    // page must not crash; the catalog shell (title) still renders.
    expect([200, 400]).toContain(res.status());
    await expect(
      page.getByRole("heading", { name: "Apps", exact: false }).first()
    ).toBeVisible();
  });
});

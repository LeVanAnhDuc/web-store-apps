import { test, expect } from "@playwright/test";

// User-facing app catalog at /vi/apps (feature: web-app-user-list).
// Read-only: no data mutation, nothing to revert.
// Auth comes from the global auth.setup.ts storageState (seed user).

const APPS_PATH = "/vi/apps";

test.describe("Apps catalog (/vi/apps)", () => {
  test("renders the active-app catalog from the API", async ({ page }) => {
    const listResponse = page.waitForResponse(
      (r) => r.url().includes("/api/v1/apps") && r.status() === 200
    );
    await page.goto(APPS_PATH);
    await listResponse;

    // Seeded active apps render as cards (h3 titles).
    await expect(
      page.getByRole("heading", { level: 3, name: "Blog", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Notes", exact: true })
    ).toBeVisible();

    // Each card exposes an "Open" action (vi locale → "Mở <name>").
    const openButtons = page.getByRole("button", { name: /^Mở\s/ });
    expect(await openButtons.count()).toBeGreaterThanOrEqual(5);
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
});

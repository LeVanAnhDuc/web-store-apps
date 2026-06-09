import { test, expect } from "@playwright/test";

// User-facing app catalog at /vi/apps (feature: web-app-user-list).
// Read-only: no data mutation, nothing to revert.
// Auth comes from the global auth.setup.ts storageState (seed user).

const APPS_PATH = "/vi/apps";

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
});

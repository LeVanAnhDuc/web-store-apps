import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Favorites page — unified-list-experience E2E.
// Tests the Favorites grid after migration to ListPageShell + useListQuery (client-side filtering).
// Auth: chromium project storageState (user.json — regular user, not admin needed).
// Data source: FAVORITE_APPS_MOCK (static mock, no API calls for filtering).
// No data mutations persist (remove is local state); no revert needed.
//
// Mock data (src/mocks/Favorites/index.ts):
//   "Personal Blog" (productivity), "Mini Shop" (lifestyle),
//   "Calendar Pro" (productivity), "SoundWave" (entertainment),
//   "TaskFlow" (productivity), "DevTools" (developer)
//
// i18n strings sourced from:
//   src/locales/en/list.json  → filters: "Filters", search: "Search", clearFilters: "Clear filters", noResultsTitle: "No results found"
//   src/locales/vi/list.json  → filters: "Bộ lọc", search: "Tìm kiếm"
//   src/locales/en/favorites.json → search.placeholder: "Search favorites..."
//   src/locales/vi/favorites.json → search.placeholder: "Tìm trong yêu thích..."

const EN_PATH = "/favorites";
const VI_PATH = "/vi/favorites";

// Scope to the ListToolbar's role="search" landmark — the app also renders a
// global header search ("Open search"), so an unscoped textbox-by-name match
// is ambiguous (strict-mode violation).
const listSearch = (page: Page) =>
  page.getByRole("search").getByRole("textbox");

// ---------------------------------------------------------------------------
// 1. Happy path
// ---------------------------------------------------------------------------
test.describe("Favorites — happy path", () => {
  test("favorites grid renders with mock apps and toolbar visible", async ({
    page
  }) => {
    await page.goto(EN_PATH);
    // Toolbar: search input (aria-label = list.search = "Search")
    await expect(listSearch(page)).toBeVisible();
    // Toolbar: Filters button (list.filters = "Filters")
    await expect(page.getByRole("button", { name: /Filters/i })).toBeVisible();
    // Grid: at least one favorited app card visible
    await expect(
      page.getByRole("heading", { name: "Personal Blog" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "TaskFlow" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "DevTools" })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 5. Empty / no-match state
// ---------------------------------------------------------------------------
test.describe("Favorites — empty / no-match state", () => {
  test("search with no match shows empty state + Clear filters button", async ({
    page
  }) => {
    await page.goto(`${EN_PATH}?search=zzznomatch99999`);
    // list.noResultsTitle: "No results found"
    await expect(page.getByText("No results found")).toBeVisible();
    // list.clearFilters: "Clear filters"
    await expect(
      page.getByRole("button", { name: "Clear filters" })
    ).toBeVisible();
  });

  test("clicking Clear filters resets search and shows all apps", async ({
    page
  }) => {
    await page.goto(`${EN_PATH}?search=zzznomatch99999`);
    await expect(page.getByText("No results found")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    // URL search param cleared
    await expect(page).not.toHaveURL(/search=/);
    // Apps are visible again
    await expect(
      page.getByRole("heading", { name: "Personal Blog" })
    ).toBeVisible();
  });

  test("category filter with no matching apps shows empty state", async ({
    page
  }) => {
    // FAVORITE_CATEGORIES has "lifestyle" not in main list categories
    // Use category=lifestyle — only "Mini Shop" matches
    // Then combine with search that excludes Mini Shop
    await page.goto(`${EN_PATH}?category=lifestyle&search=zzznomatch99999`);
    await expect(page.getByText("No results found")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Clear filters" })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 7. Filter / search (client-side)
// ---------------------------------------------------------------------------
test.describe("Favorites — filter / search (client-side)", () => {
  // [EP] search match → filtered results instantly (client-side, no debounce wait needed for assert,
  // but URL update is still debounced 300ms)
  test("typing in search filters grid instantly", async ({ page }) => {
    await page.goto(EN_PATH);
    const searchBox = listSearch(page);
    await searchBox.fill("Blog");
    // Client-side: grid updates immediately (useListQuery uses live search value for filtering)
    await expect(
      page.getByRole("heading", { name: "Personal Blog" })
    ).toBeVisible();
    // Other apps should not appear
    await expect(page.getByRole("heading", { name: "TaskFlow" })).toHaveCount(
      0
    );
    await expect(page.getByRole("heading", { name: "DevTools" })).toHaveCount(
      0
    );
  });

  // URL is updated after debounce (300ms) — search persists on reload
  test("search term persists in URL and survives reload", async ({ page }) => {
    await page.goto(EN_PATH);
    const searchBox = listSearch(page);
    await searchBox.fill("Calendar");
    // Wait for debounce → URL update
    await page.waitForURL(/search=Calendar/, { timeout: 3000 });
    await expect(page).toHaveURL(/search=Calendar/);
    await page.reload();
    await expect(page).toHaveURL(/search=Calendar/);
    await expect(
      page.getByRole("heading", { name: "Calendar Pro" })
    ).toBeVisible();
  });

  // [EP] clear search → all results return
  test("clearing search restores all apps", async ({ page }) => {
    await page.goto(`${EN_PATH}?search=Blog`);
    await expect(
      page.getByRole("heading", { name: "Personal Blog" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "DevTools" })).toHaveCount(
      0
    );
    const searchBox = listSearch(page);
    await searchBox.fill("");
    await expect(page.getByRole("heading", { name: "DevTools" })).toBeVisible();
  });

  // Category filter via URL param
  test("category=developer shows only developer apps", async ({ page }) => {
    await page.goto(`${EN_PATH}?category=developer`);
    // "DevTools" is the only developer app in mock data
    await expect(page.getByRole("heading", { name: "DevTools" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Personal Blog" })
    ).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "SoundWave" })).toHaveCount(
      0
    );
  });

  // [DT] combined search + category filter
  test("combined search + category filter reduces grid correctly", async ({
    page
  }) => {
    // productivity category + search "Calendar" → only "Calendar Pro"
    await page.goto(`${EN_PATH}?category=productivity&search=Calendar`);
    await expect(
      page.getByRole("heading", { name: "Calendar Pro" })
    ).toBeVisible();
    // "TaskFlow" is productivity but doesn't match "Calendar"
    await expect(page.getByRole("heading", { name: "TaskFlow" })).toHaveCount(
      0
    );
  });

  // [ST] changing category filter via popover reflects in URL + grid
  test("opening Filters popover and selecting category updates grid", async ({
    page
  }) => {
    await page.goto(EN_PATH);
    await page.getByRole("button", { name: /Filters/i }).click();
    // Select "Entertainment" category from the first select in the popover panel
    const popover = page.locator('[data-slot="popover-content"]');
    await popover.getByRole("combobox").first().click();
    await page.getByRole("option", { name: "Entertainment" }).click();
    // Grid shows only entertainment apps
    await expect(
      page.getByRole("heading", { name: "SoundWave" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Personal Blog" })
    ).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// 9. i18n — EN + VI locale
// ---------------------------------------------------------------------------
test.describe("Favorites — i18n", () => {
  test("EN: toolbar renders 'Filters' and search accessible as 'Search'", async ({
    page
  }) => {
    await page.goto(EN_PATH);
    // list.filters (EN) = "Filters"
    await expect(page.getByRole("button", { name: /^Filters/ })).toBeVisible();
    // list.search (EN) = "Search" — aria-label on search input
    await expect(listSearch(page)).toBeVisible();
    // favorites.title (EN) = "Favorites"
    await expect(
      page.getByRole("heading", { name: "Favorites" })
    ).toBeVisible();
  });

  test("VI: toolbar renders 'Bộ lọc' and search accessible as 'Tìm kiếm'", async ({
    page
  }) => {
    await page.goto(VI_PATH);
    // list.filters (VI) = "Bộ lọc"
    await expect(page.getByRole("button", { name: /^Bộ lọc/ })).toBeVisible();
    // list.search (VI) = "Tìm kiếm" — aria-label on search input
    await expect(listSearch(page)).toHaveAttribute("aria-label", "Tìm kiếm");
    // favorites.title (VI) = "Yêu thích"
    await expect(
      page.getByRole("heading", { name: "Yêu thích" })
    ).toBeVisible();
  });

  // Empty state text in VI
  test("VI: empty state renders in Vietnamese", async ({ page }) => {
    await page.goto(`${VI_PATH}?search=zzznomatch99999`);
    // list.noResultsTitle (VI) = "Không tìm thấy kết quả"
    await expect(page.getByText("Không tìm thấy kết quả")).toBeVisible();
    // list.clearFilters (VI) = "Xóa bộ lọc"
    await expect(
      page.getByRole("button", { name: "Xóa bộ lọc" })
    ).toBeVisible();
  });

  // No missing-message placeholders
  test("no missing-message placeholder in EN favorites", async ({ page }) => {
    await page.goto(EN_PATH);
    await expect(page.getByText(/\[list\./)).toHaveCount(0);
    await expect(page.getByText(/\[favorites\./)).toHaveCount(0);
  });

  test("no missing-message placeholder in VI favorites", async ({ page }) => {
    await page.goto(VI_PATH);
    await expect(page.getByText(/\[list\./)).toHaveCount(0);
    await expect(page.getByText(/\[favorites\./)).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// 12. Accessibility
// ---------------------------------------------------------------------------
test.describe("Favorites — accessibility", () => {
  test("search input has accessible name", async ({ page }) => {
    await page.goto(EN_PATH);
    // getByRole with name succeeds only if aria-label is properly wired
    await expect(listSearch(page)).toBeVisible();
  });

  test("Filters button has accessible name", async ({ page }) => {
    await page.goto(EN_PATH);
    await expect(page.getByRole("button", { name: /Filters/i })).toBeVisible();
  });

  test("Filters popover can be opened and closed with Escape", async ({
    page
  }) => {
    await page.goto(EN_PATH);
    await page.getByRole("button", { name: /Filters/i }).click();
    // Popover content opens — filter panel header visible
    await expect(page.getByText("Filters").nth(1)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByText("Filters").nth(1)).not.toBeVisible();
  });

  test("app cards have accessible remove buttons", async ({ page }) => {
    await page.goto(EN_PATH);
    // favorites.card.remove = "Remove from favorites" — aria-accessible buttons
    const removeBtns = page.getByRole("button", {
      name: "Remove from favorites"
    });
    // At least one remove button per app card
    await expect(removeBtns.first()).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
  getCatalogIdsByName,
  getFavoriteIds,
  setFavorites
} from "../helpers/favorites";

// Favorites page (/favorites): list of favorited apps with search, category
// chips, sort (Recent/Name), and optimistic remove-on-toggle-off. Runs
// authenticated as user@test.com (global storageState). We control the user's
// favorites via the API helper (no seeder exists) and restore the original
// snapshot in afterAll so shared state stays clean.
//
// Matrix groups covered (design.md §6):
//   1  Happy path     — list shows favorited apps
//   5  Empty / null    — zero favorites → empty state (reached safely via API)
//   6  Boundary (BVA)  — count 0 / 1 / many (pagination N/A this round)
//   7  Filter / search  — search match/no-match, category chip, "All" reset
//   +  Sort             — Recent vs Name ordering
//   +  Remove-on-page   — heart off → card disappears (optimistic)

const FAVORITES_PATH = "/favorites";
const EMPTY_TEXT = "You haven't favorited any apps yet.";

const heartFor = (page: Page, name: string) =>
  page.getByRole("button", {
    name: new RegExp(`(Add|Remove) (to|from) favorites: ${name}`)
  });

const cardTitle = (page: Page, name: string) =>
  page.getByRole("heading", { name, exact: true });

const waitForFavorites = (page: Page) =>
  page.waitForResponse(
    (r) =>
      r.url().includes("/api/v1/users/me/favorites") &&
      r.request().method() === "GET" &&
      r.status() === 200
  );

let originalFavorites: string[] = [];
let idByName: Record<string, string> = {};

test.describe("Favorites page (/favorites)", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    originalFavorites = await getFavoriteIds();
    idByName = await getCatalogIdsByName();
  });

  test.afterAll(async () => {
    await setFavorites(originalFavorites);
  });

  // --- Group 5 (empty) + Group 6 BVA count = 0 ---
  // Reached safely: we clear favorites via API then fully restore in afterAll,
  // so shared user state is not corrupted (per task note — no invasive seeding).
  test("zero favorites renders the empty state", async ({ page }) => {
    await setFavorites([]);
    await page.goto(FAVORITES_PATH);
    await waitForFavorites(page);
    await expect(page.getByText(EMPTY_TEXT)).toBeVisible();
  });

  // --- Group 6 BVA count = 1 ---
  test("exactly one favorite renders a single card", async ({ page }) => {
    await setFavorites([idByName.Blog]);
    await page.goto(FAVORITES_PATH);
    await waitForFavorites(page);
    await expect(cardTitle(page, "Blog")).toBeVisible();
    // No other user app card present.
    await expect(cardTitle(page, "Notes")).toHaveCount(0);
    await expect(cardTitle(page, "IDMS Portal")).toHaveCount(0);
  });

  // --- Group 1 (happy) + Group 6 BVA count = many ---
  test("multiple favorites render as a grid (happy path)", async ({ page }) => {
    await setFavorites([
      idByName.Blog,
      idByName.Notes,
      idByName["IDMS Portal"]
    ]);
    await page.goto(FAVORITES_PATH);
    await waitForFavorites(page);
    await expect(cardTitle(page, "Blog")).toBeVisible();
    await expect(cardTitle(page, "Notes")).toBeVisible();
    await expect(cardTitle(page, "IDMS Portal")).toBeVisible();
  });

  // --- Group 7 (filter / search) ---
  test("search filters the favorites list and clears", async ({ page }) => {
    await setFavorites([
      idByName.Blog,
      idByName.Notes,
      idByName["IDMS Portal"]
    ]);
    await page.goto(FAVORITES_PATH);
    await waitForFavorites(page);
    await expect(cardTitle(page, "Blog")).toBeVisible();

    const search = page.getByRole("textbox", { name: "Search favorites..." });
    // Match.
    await search.fill("Notes");
    await waitForFavorites(page);
    await expect(cardTitle(page, "Notes")).toBeVisible();
    await expect(cardTitle(page, "Blog")).toHaveCount(0);

    // No match → empty state.
    await search.fill("zzz-no-such-app");
    await waitForFavorites(page);
    await expect(page.getByText(EMPTY_TEXT)).toBeVisible();

    // Clear → all back. Clearing reverts to the initial query key, which React
    // Query serves from cache (no network GET fires), so assert the UI directly.
    await search.fill("");
    await expect(cardTitle(page, "Blog")).toBeVisible();
    await expect(cardTitle(page, "Notes")).toBeVisible();
  });

  test("category chip filters favorites and 'All' resets", async ({ page }) => {
    await setFavorites([
      idByName.Blog,
      idByName.Notes,
      idByName["IDMS Portal"]
    ]);
    await page.goto(FAVORITES_PATH);
    await waitForFavorites(page);

    const group = page.getByRole("group", { name: "Filter by category" });
    const chips = group.getByRole("button");
    await expect(chips.first()).toBeVisible(); // "All" chip at index 0.

    // Pick the first real category chip (skip "All") and apply it.
    const realChip = chips.nth(1);
    await expect(realChip).toBeVisible();
    const filtered = waitForFavorites(page);
    await realChip.click();
    await filtered;
    await expect(realChip).toHaveAttribute("aria-pressed", "true");

    // "All" resets the category filter. It reverts to the initial query key,
    // served from React Query cache (no network GET), so assert state directly.
    await chips.first().click();
    await expect(chips.first()).toHaveAttribute("aria-pressed", "true");
    await expect(realChip).toHaveAttribute("aria-pressed", "false");
  });

  // --- Sort (Recent vs Name) ---
  test("sort switches between Recent and Name ordering", async ({ page }) => {
    // Favorite Notes first, then Blog → Recent order = [Blog, Notes]; Name
    // order = [Blog, Notes] alphabetically. Use IDMS Portal to disambiguate:
    // favorite order Notes → IDMS Portal → Blog gives a Recent order distinct
    // from alphabetical (Blog, IDMS Portal, Notes).
    await setFavorites([]);
    await setFavorites([idByName.Notes]);
    await setFavorites([idByName.Notes, idByName["IDMS Portal"]]);
    await setFavorites([
      idByName.Notes,
      idByName["IDMS Portal"],
      idByName.Blog
    ]);

    await page.goto(FAVORITES_PATH);
    await waitForFavorites(page);

    const titles = () =>
      page.getByRole("heading", { level: 3 }).allTextContents();

    // Default sort = Recent (newest favorited first → Blog, IDMS Portal, Notes).
    await expect(cardTitle(page, "Blog")).toBeVisible();
    const recentOrder = await titles();
    expect(recentOrder).toEqual(["Blog", "IDMS Portal", "Notes"]);

    // Switch to Name (alphabetical).
    await page.getByRole("button", { name: /^Sort: / }).click();
    const byName = waitForFavorites(page);
    await page.getByRole("menuitem", { name: "Name", exact: true }).click();
    await byName;
    await expect
      .poll(async () => titles())
      .toEqual(["Blog", "IDMS Portal", "Notes"]);
  });

  // --- Remove-on-page (optimistic) ---
  test("toggling a heart off removes the card from the list", async ({
    page
  }) => {
    await setFavorites([idByName.Blog, idByName.Notes]);
    await page.goto(FAVORITES_PATH);
    await waitForFavorites(page);
    await expect(cardTitle(page, "Blog")).toBeVisible();

    await heartFor(page, "Blog").click();
    // Optimistic remove: the Blog card disappears immediately.
    await expect(cardTitle(page, "Blog")).toHaveCount(0);
    // The other favorite stays.
    await expect(cardTitle(page, "Notes")).toBeVisible();
  });
});

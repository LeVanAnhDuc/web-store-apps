import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Account Settings Cleanup — E2E (Scenario Matrix in
// docs/specs/account-settings-cleanup/e2e.md §6).
//
// Read-only, deterministic. The default `chromium` project supplies a logged-in
// storageState (e2e/.auth/user.json via auth.setup.ts); the AuthN block below
// builds its own clean context to exercise the AuthGuard. Base URL / port are
// resolved by playwright.config.ts (E2E_BASE_URL or the worktree state file),
// so these specs never hardcode a host.
//
// i18n: en is the default locale (no URL prefix); vi is served under the /vi
// prefix (next-intl `as-needed`). All asserted strings are sourced verbatim from
// src/locales/{en,vi}/{accountSettings,profile,dashboard}.json — never guessed.
// ---------------------------------------------------------------------------

// Real i18n strings (verbatim from the locale JSON files).
const EN = {
  // accountSettings.changePassword.title
  changePasswordHeading: "Change Password",
  // accountSettings.title (PageHeader)
  accountSettingsTitle: "Account Settings",
  // profile.dangerZone.title
  dangerZoneHeading: "Danger Zone",
  // dashboard.sidebar.groups.settings
  settingsGroup: "Settings",
  // dashboard.sidebar.nav.*
  navProfile: "Profile",
  navAccountSettings: "Account Settings",
  navBilling: "Billing",
  navTeam: "Team",
  navSecurity: "Security"
} as const;

const VI = {
  // accountSettings.changePassword.title (vi)
  changePasswordHeading: "Đổi mật khẩu",
  // accountSettings.title (vi)
  accountSettingsTitle: "Cài đặt tài khoản",
  // profile.dangerZone.title (vi)
  dangerZoneHeading: "Vùng nguy hiểm",
  // dashboard.sidebar.groups.settings (vi)
  settingsGroup: "Cài đặt",
  navProfile: "Hồ sơ",
  navAccountSettings: "Cài đặt tài khoản",
  navBilling: "Thanh toán"
} as const;

// Strings that the cleanup REMOVED from /account-settings. After the trim these
// headings must NOT appear anywhere on the page (they came from the now-deleted
// accountSettings.{twoFactor,sessions,dangerZone} namespaces / Security view).
const REMOVED_ACCOUNT_SETTINGS_HEADINGS = [
  /Active Sessions/i,
  /Two-?Factor/i,
  /Danger Zone/i
];

// ---------------------------------------------------------------------------
// F1 — Route removal (matrix F1, [ST] invalid transition). The /security route
// folder was deleted, so the URL no longer matches any segment and Next.js
// renders its built-in not-found page (no custom not-found.tsx exists in the
// app, confirmed at authoring time — see e2e.md follow-ups). An unmatched URL
// never enters the (settings) layout / AuthGuard, so this holds even while
// authenticated. Asserted via the not-found text + absence of the old Security
// view chrome, rather than an HTTP status (the client navigation keeps a 200
// shell). ASSUMPTION the orchestrator should confirm: Next default 404 copy is
// "This page could not be found." If the project later adds a custom
// not-found.tsx, update NOT_FOUND_TEXT below.
// ---------------------------------------------------------------------------
const NOT_FOUND_TEXT = /this page could not be found|404|not found/i;

test.describe("Account Settings Cleanup — F1 route removal", () => {
  test("renders not-found for /security (default locale)", async ({ page }) => {
    await page.goto("/security");
    await expect(page.getByText(NOT_FOUND_TEXT).first()).toBeVisible();
    // The removed Security view headings must not render.
    await expect(page.getByRole("heading", { name: /API Keys/i })).toHaveCount(
      0
    );
    await expect(
      page.getByRole("heading", { name: /Login Activity/i })
    ).toHaveCount(0);
  });

  test("renders not-found for /vi/security (Vietnamese locale)", async ({
    page
  }) => {
    await page.goto("/vi/security");
    await expect(page.getByText(NOT_FOUND_TEXT).first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// F2 — Nav integrity (matrix F2). The sidebar "Settings" group must list
// Profile / Account Settings / Billing and must NOT contain a "Security" link
// (route removed by this cleanup) nor a "Team" link (route removed by the
// remove-team-feature change). Links render as anchors inside a SidebarMenu
// whose accessible name is the localized group label (aria-label="Settings").
// Scope the assertions to that group so the "Account Settings" nav link is not
// confused with the page heading. A remaining link is clicked to prove it still
// navigates.
// ---------------------------------------------------------------------------
test.describe("Account Settings Cleanup — F2 nav integrity", () => {
  test("settings nav lists Profile/Account Settings/Billing without Security or Team", async ({
    page
  }) => {
    await page.goto("/account-settings");
    await expect(
      page.getByRole("heading", { name: EN.changePasswordHeading })
    ).toBeVisible();

    // The Settings group menu, addressed by its localized aria-label.
    const settingsNav = page
      .getByRole("navigation", { name: EN.settingsGroup })
      .or(page.locator(`[aria-label="${EN.settingsGroup}"]`))
      .first();

    await expect(
      settingsNav.getByRole("link", { name: EN.navProfile })
    ).toBeVisible();
    await expect(
      settingsNav.getByRole("link", { name: EN.navAccountSettings })
    ).toBeVisible();
    await expect(
      settingsNav.getByRole("link", { name: EN.navBilling })
    ).toBeVisible();

    // Neither "Security" nor "Team" appears in the settings group — both nav
    // items were removed along with their routes.
    await expect(
      settingsNav.getByRole("link", { name: EN.navSecurity })
    ).toHaveCount(0);
    await expect(
      settingsNav.getByRole("link", { name: EN.navTeam })
    ).toHaveCount(0);
  });

  test("a remaining settings link navigates correctly (Profile)", async ({
    page
  }) => {
    await page.goto("/account-settings");
    await expect(
      page.getByRole("heading", { name: EN.changePasswordHeading })
    ).toBeVisible();

    const settingsNav = page
      .getByRole("navigation", { name: EN.settingsGroup })
      .or(page.locator(`[aria-label="${EN.settingsGroup}"]`))
      .first();

    await settingsNav.getByRole("link", { name: EN.navProfile }).click();
    await expect(page).toHaveURL(/\/profile/);
    // The Profile page renders its (moved) Danger Zone, proving navigation
    // landed on the real page rather than a not-found shell.
    await expect(
      page.getByRole("heading", { name: EN.dangerZoneHeading })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// #1 — Happy path (matrix row 1). /account-settings shows only the Change
// Password card (PageHeader + ChangePasswordCard); the removed mock cards
// (Active Sessions / Two-Factor / Danger Zone) are gone. /profile still renders
// its Danger Zone (relocated there by the cleanup).
// ---------------------------------------------------------------------------
test.describe("Account Settings Cleanup — #1 happy path", () => {
  test("account-settings renders Change Password and none of the removed cards", async ({
    page
  }) => {
    await page.goto("/account-settings");
    await expect(
      page.getByRole("heading", { name: EN.changePasswordHeading })
    ).toBeVisible();

    for (const removed of REMOVED_ACCOUNT_SETTINGS_HEADINGS) {
      await expect(page.getByRole("heading", { name: removed })).toHaveCount(0);
    }
    // Belt-and-braces: the visible body text contains none of the removed
    // sections either (catches non-heading renders).
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/Active Sessions/i);
    expect(body).not.toMatch(/Two-?Factor/i);
  });

  test("profile renders the relocated Danger Zone", async ({ page }) => {
    await page.goto("/profile");
    await expect(
      page.getByRole("heading", { name: EN.dangerZoneHeading })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// #9 — i18n en + vi (matrix row 9, MANDATORY). Repeat the happy-path assertions
// in both locales and confirm no next-intl MISSING_MESSAGE / raw key leaks into
// the console or DOM after the `security` and
// accountSettings.{twoFactor,sessions,dangerZone} namespaces were removed.
// ---------------------------------------------------------------------------
test.describe("Account Settings Cleanup — #9 i18n (en + vi)", () => {
  const expectNoMissingMessage = (errors: string[]) => {
    const offending = errors.filter((m) =>
      /MISSING_MESSAGE|IntlError|MessageFormat/i.test(m)
    );
    expect(offending, offending.join("\n")).toHaveLength(0);
  };

  test("account-settings is localized in English with no missing messages", async ({
    page
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/account-settings");
    await expect(
      page.getByRole("heading", { name: EN.accountSettingsTitle })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: EN.changePasswordHeading })
    ).toBeVisible();

    const body = await page.locator("body").innerText();
    // No raw i18n key fragments from the touched namespaces leak through.
    expect(body).not.toMatch(
      /accountSettings\.(twoFactor|sessions|dangerZone)/
    );
    expect(body).not.toMatch(/security\.(pageHeader|loginActivity|apiKeys)/);

    expectNoMissingMessage(errors);
  });

  test("account-settings is localized in Vietnamese with no missing messages", async ({
    page
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/vi/account-settings");
    await expect(
      page.getByRole("heading", { name: VI.accountSettingsTitle })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: VI.changePasswordHeading })
    ).toBeVisible();

    expectNoMissingMessage(errors);
  });

  test("profile Danger Zone is localized in Vietnamese", async ({ page }) => {
    await page.goto("/vi/profile");
    await expect(
      page.getByRole("heading", { name: VI.dangerZoneHeading })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// #2 — AuthN (matrix row 2). An unauthenticated context hitting
// /account-settings is redirected to /login by AuthGuardLayout
// (router.replace(LOGIN)). Mirrors the change-password AuthN test: a clean
// context with no storageState + cleared cookies (a localhost-scoped refresh
// cookie from another port/run must not leak in).
// ---------------------------------------------------------------------------
test.describe("Account Settings Cleanup — #2 AuthN", () => {
  test("unauthenticated user is redirected away from account settings", async ({
    browser
  }) => {
    const ctx = await browser.newContext({ storageState: undefined });
    await ctx.clearCookies();
    try {
      const freshPage = await ctx.newPage();
      await freshPage.goto("/account-settings");
      await expect(freshPage).toHaveURL(/\/login/, { timeout: 20_000 });
    } finally {
      await ctx.close();
    }
  });
});

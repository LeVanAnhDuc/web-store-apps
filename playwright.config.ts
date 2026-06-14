import { defineConfig, devices } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

function resolveBaseUrl(): string {
  if (process.env.E2E_BASE_URL) return process.env.E2E_BASE_URL;
  const feature = path.basename(process.cwd());
  let dir = process.cwd();
  for (let i = 0; i < 6; i += 1) {
    const stateFile = path.join(dir, ".worktree-state.json");
    if (fs.existsSync(stateFile)) {
      try {
        const state = JSON.parse(fs.readFileSync(stateFile, "utf8")) as Record<
          string,
          { clientPort?: number }
        >;
        const port = state[feature]?.clientPort;
        if (port) return `http://localhost:${port}`;
      } catch {
        /* fall through to default */
      }
      break;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return "http://localhost:3000";
}

const BASE_URL = resolveBaseUrl();

export default defineConfig({
  testDir: "./e2e",
  testMatch: /.*\.e2e\.ts/,
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    { name: "admin-setup", testMatch: /admin\.setup\.ts/ },
    {
      name: "chromium",
      // Regular-user project. Ignore only the three admin-only suites (they run
      // under the `admin` project). `admin-authz/` is NOT in this list, so its
      // AuthZ denial tests run here as a logged-in NON-admin — exactly what they
      // need to verify.
      testIgnore: /(?:admin-apps|admin-users-list|admin-login-history)\//,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/user.json"
      },
      dependencies: ["setup"]
    },
    {
      name: "admin",
      // All admin-only suites run under the admin storageState.
      testMatch:
        /(?:admin-apps|admin-users-list|admin-login-history)\/.*\.e2e\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/admin.json"
      },
      dependencies: ["admin-setup"]
    }
  ]
});

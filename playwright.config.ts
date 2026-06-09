import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

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
      testIgnore: /admin-apps\//,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/user.json"
      },
      dependencies: ["setup"]
    },
    {
      name: "admin",
      testMatch: /admin-apps\/.*\.e2e\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/admin.json"
      },
      dependencies: ["admin-setup"]
    }
  ]
});

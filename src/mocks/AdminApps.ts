// types
import type {
  AdminAppCreateInput,
  AdminAppUpdateInput,
  AdminAppsQueryParams,
  WebApp,
  WebAppCategory
} from "@/types/AdminApps";

const MOCK_CATEGORIES: WebAppCategory[] = [
  { _id: "cat_content", name: "Content", slug: "content" },
  { _id: "cat_tools", name: "Internal Tools", slug: "tools" },
  { _id: "cat_identity", name: "Identity", slug: "identity" },
  { _id: "cat_productivity", name: "Productivity", slug: "productivity" }
];

const MOCK_APPS: WebApp[] = [
  {
    _id: "app_blog",
    name: "blog",
    displayName: "Blog",
    description: "Internal publishing platform for the constellation.",
    iconUrl: null,
    homeUrl: "https://blog.example.com",
    categoryId: "cat_content",
    status: "active",
    requiredRoles: ["user"],
    redirectUris: [
      "https://blog.example.com/auth/callback",
      "http://localhost:3001/auth/callback"
    ],
    clientId: "client_blog_8f3a",
    createdAt: "2026-03-12T09:24:00.000Z",
    updatedAt: "2026-05-18T14:02:00.000Z"
  },
  {
    _id: "app_dashboard",
    name: "analytics-dashboard",
    displayName: "Analytics Dashboard",
    description: "Org-wide metrics and dashboards.",
    iconUrl: null,
    homeUrl: "https://analytics.example.com",
    categoryId: "cat_tools",
    status: "active",
    requiredRoles: ["admin"],
    redirectUris: ["https://analytics.example.com/auth/callback"],
    clientId: "client_analytics_2b7d",
    createdAt: "2026-02-04T11:00:00.000Z",
    updatedAt: "2026-05-10T08:45:00.000Z"
  },
  {
    _id: "app_idms",
    name: "idms-portal",
    displayName: "IDMS Portal",
    description: "Identity Management System portal — this app.",
    iconUrl: null,
    homeUrl: "https://idms.example.com",
    categoryId: "cat_identity",
    status: "active",
    requiredRoles: ["user", "admin"],
    redirectUris: ["https://idms.example.com/auth/callback"],
    clientId: "client_idms_core",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-05-20T16:30:00.000Z"
  },
  {
    _id: "app_calendar",
    name: "team-calendar",
    displayName: "Team Calendar",
    description: "Shared calendar for booking and reminders.",
    iconUrl: null,
    homeUrl: "https://calendar.example.com",
    categoryId: "cat_productivity",
    status: "inactive",
    requiredRoles: ["user"],
    redirectUris: ["https://calendar.example.com/auth/callback"],
    clientId: "client_calendar_91ce",
    createdAt: "2026-04-22T10:15:00.000Z",
    updatedAt: "2026-04-25T13:20:00.000Z"
  },
  {
    _id: "app_notes",
    name: "notes",
    displayName: "Notes",
    description: "Personal and shared notes workspace.",
    iconUrl: null,
    homeUrl: "https://notes.example.com",
    categoryId: "cat_productivity",
    status: "active",
    requiredRoles: ["user"],
    redirectUris: ["https://notes.example.com/auth/callback"],
    clientId: "client_notes_44a9",
    createdAt: "2026-03-30T09:00:00.000Z",
    updatedAt: "2026-05-01T11:11:00.000Z"
  },
  {
    _id: "app_admin_console",
    name: "ops-console",
    displayName: "Operations Console",
    description: "Internal ops tooling — restricted to admin role.",
    iconUrl: null,
    homeUrl: "https://ops.example.com",
    categoryId: "cat_tools",
    status: "active",
    requiredRoles: ["admin"],
    redirectUris: ["https://ops.example.com/auth/callback"],
    clientId: "client_ops_5e21",
    createdAt: "2026-02-18T07:30:00.000Z",
    updatedAt: "2026-05-15T18:00:00.000Z"
  }
];

const SIMULATED_LATENCY_MS = 250;
const CLIENT_ID_RANDOM_RADIX = 36;
const CLIENT_ID_RANDOM_START = 2;
const CLIENT_ID_RANDOM_END = 8;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), SIMULATED_LATENCY_MS)
  );

const generateId = (prefix: string): string =>
  `${prefix}_${Date.now().toString(CLIENT_ID_RANDOM_RADIX)}`;

const generateClientId = (): string =>
  `client_${Math.random()
    .toString(CLIENT_ID_RANDOM_RADIX)
    .slice(CLIENT_ID_RANDOM_START, CLIENT_ID_RANDOM_END)}`;

const matches = (app: WebApp, params: AdminAppsQueryParams): boolean => {
  if (params.status && app.status !== params.status) return false;
  if (params.categoryId && app.categoryId !== params.categoryId) return false;
  if (params.search) {
    const q = params.search.toLowerCase();
    const hay =
      `${app.name} ${app.displayName} ${app.description ?? ""}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
};

export const getAdminApps = async (
  params: AdminAppsQueryParams = {}
): Promise<{ items: WebApp[] }> => {
  const items = MOCK_APPS.filter((app) => matches(app, params)).sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );
  return delay({ items });
};

export const getAdminAppCategories = async (): Promise<WebAppCategory[]> =>
  delay(MOCK_CATEGORIES);

export const createAdminApp = async (
  input: AdminAppCreateInput
): Promise<WebApp> => {
  const now = new Date().toISOString();
  const created: WebApp = {
    _id: generateId("app"),
    name: input.name,
    displayName: input.displayName,
    description: input.description || null,
    iconUrl: input.iconUrl || null,
    homeUrl: input.homeUrl,
    categoryId: input.categoryId,
    status: input.status,
    requiredRoles: input.requiredRoles,
    redirectUris: input.redirectUris,
    clientId: generateClientId(),
    createdAt: now,
    updatedAt: now
  };
  MOCK_APPS.push(created);
  return delay(created);
};

export const updateAdminApp = async (
  id: string,
  input: AdminAppUpdateInput
): Promise<WebApp> => {
  const idx = MOCK_APPS.findIndex((a) => a._id === id);
  if (idx === -1) throw new Error(`App ${id} not found`);
  const updated: WebApp = {
    ...MOCK_APPS[idx],
    ...input,
    description: input.description || null,
    iconUrl: input.iconUrl || null,
    updatedAt: new Date().toISOString()
  };
  MOCK_APPS[idx] = updated;
  return delay(updated);
};

export const deleteAdminApp = async (id: string): Promise<{ id: string }> => {
  const idx = MOCK_APPS.findIndex((a) => a._id === id);
  if (idx === -1) throw new Error(`App ${id} not found`);
  MOCK_APPS.splice(idx, 1);
  return delay({ id });
};

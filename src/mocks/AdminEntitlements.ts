// types
import type {
  Entitlement,
  EntitlementRow,
  EntitlementStatus,
  GrantEntitlementInput
} from "@/types/AdminEntitlements";
// requests
import { getAdminApps } from "@/requests/adminApps";
// others
import { MOCK_ADMIN_USERS } from "./AdminUsers";
import CONSTANTS from "@/constants";

const { GRANTED, NOT_GRANTED, INSUFFICIENT_ROLE } =
  CONSTANTS.ENTITLEMENT_STATUS;

const SIMULATED_LATENCY_MS = 250;
const ID_RANDOM_RADIX = 36;
const ID_RANDOM_START = 2;
const ID_RANDOM_END = 10;

const ADMIN_ACTOR_ID = "user_alice";

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), SIMULATED_LATENCY_MS)
  );

const generateId = (prefix: string): string =>
  `${prefix}_${Math.random()
    .toString(ID_RANDOM_RADIX)
    .slice(ID_RANDOM_START, ID_RANDOM_END)}`;

const seed = (
  userId: string,
  webAppId: string,
  grantedAt: string
): Entitlement => ({
  _id: generateId("ent"),
  userId,
  webAppId,
  grantedBy: ADMIN_ACTOR_ID,
  grantedAt,
  revokedAt: null
});

const MOCK_ENTITLEMENTS: Entitlement[] = [
  // Alice (admin) — all apps
  seed("user_alice", "app_blog", "2026-04-01T09:00:00.000Z"),
  seed("user_alice", "app_dashboard", "2026-04-01T09:00:00.000Z"),
  seed("user_alice", "app_idms", "2026-04-01T09:00:00.000Z"),
  seed("user_alice", "app_calendar", "2026-04-01T09:00:00.000Z"),
  seed("user_alice", "app_notes", "2026-04-01T09:00:00.000Z"),
  seed("user_alice", "app_admin_console", "2026-04-01T09:00:00.000Z"),
  // Bob (user) — content + productivity apps
  seed("user_bob", "app_blog", "2026-04-15T10:30:00.000Z"),
  seed("user_bob", "app_calendar", "2026-04-15T10:30:00.000Z"),
  seed("user_bob", "app_notes", "2026-04-15T10:30:00.000Z"),
  // Carol (user) — partial
  seed("user_carol", "app_blog", "2026-05-02T14:00:00.000Z"),
  seed("user_carol", "app_notes", "2026-05-02T14:00:00.000Z")
  // Dave (user) — no entitlements yet
];

const findActiveEntitlement = (
  userId: string,
  webAppId: string
): Entitlement | undefined =>
  MOCK_ENTITLEMENTS.find(
    (e) =>
      e.userId === userId && e.webAppId === webAppId && e.revokedAt === null
  );

export const getEntitlementsByUserId = async (
  userId: string
): Promise<EntitlementRow[]> => {
  const user = MOCK_ADMIN_USERS.find((u) => u._id === userId);
  if (!user) throw new Error(`User ${userId} not found`);
  const { items: apps } = await getAdminApps();
  const rows: EntitlementRow[] = apps.map((app) => {
    const entitlement = findActiveEntitlement(userId, app._id) ?? null;
    let status: EntitlementStatus;
    if (entitlement) status = GRANTED;
    else if (!app.requiredRoles.includes(user.role)) status = INSUFFICIENT_ROLE;
    else status = NOT_GRANTED;
    return { app, entitlement, status };
  });
  return delay(rows);
};

export const grantEntitlement = async (
  input: GrantEntitlementInput
): Promise<Entitlement> => {
  const existing = MOCK_ENTITLEMENTS.find(
    (e) => e.userId === input.userId && e.webAppId === input.webAppId
  );
  if (existing) {
    existing.revokedAt = null;
    existing.grantedAt = new Date().toISOString();
    existing.grantedBy = ADMIN_ACTOR_ID;
    return delay(existing);
  }
  const created: Entitlement = {
    _id: generateId("ent"),
    userId: input.userId,
    webAppId: input.webAppId,
    grantedBy: ADMIN_ACTOR_ID,
    grantedAt: new Date().toISOString(),
    revokedAt: null
  };
  MOCK_ENTITLEMENTS.push(created);
  return delay(created);
};

export const revokeEntitlement = async (
  input: GrantEntitlementInput
): Promise<{ userId: string; webAppId: string }> => {
  const existing = MOCK_ENTITLEMENTS.find(
    (e) =>
      e.userId === input.userId &&
      e.webAppId === input.webAppId &&
      e.revokedAt === null
  );
  if (!existing) {
    throw new Error(
      `No active entitlement for user ${input.userId} on app ${input.webAppId}`
    );
  }
  existing.revokedAt = new Date().toISOString();
  return delay({ userId: input.userId, webAppId: input.webAppId });
};

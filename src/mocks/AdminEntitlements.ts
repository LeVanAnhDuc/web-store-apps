// types
import type {
  BulkEntitlementInput,
  BulkEntitlementRow,
  Entitlement,
  EntitlementChange,
  EntitlementStatus
} from "@/types/AdminEntitlements";
// requests
import { getAdminApps } from "@/requests/adminApps";
// others
import { MOCK_ADMIN_USERS } from "./AdminUsers";
import CONSTANTS from "@/constants";

const { GRANTED, PARTIAL, NOT_GRANTED, INSUFFICIENT_ROLE } =
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

const isGranted = (userId: string, webAppId: string): boolean =>
  MOCK_ENTITLEMENTS.some(
    (e) =>
      e.userId === userId && e.webAppId === webAppId && e.revokedAt === null
  );

const isInsufficientRole = (
  userId: string,
  requiredRoles: string[]
): boolean => {
  const user = MOCK_ADMIN_USERS.find((u) => u._id === userId);
  // Unknown users (e.g. selected via the real API) have no known mock role,
  // so we cannot assert a role deficiency — treat them as sufficient.
  if (!user) return false;
  // Apps with no required roles are open to everyone — never insufficient.
  return requiredRoles.length > 0 && !requiredRoles.includes(user.role);
};

const deriveStatus = (
  grantedCount: number,
  totalCount: number,
  insufficientCount: number
): EntitlementStatus => {
  if (insufficientCount > 0) return INSUFFICIENT_ROLE;
  if (totalCount > 0 && grantedCount === totalCount) return GRANTED;
  if (grantedCount === 0) return NOT_GRANTED;
  return PARTIAL;
};

export const getBulkEntitlements = async (
  userIds: string[]
): Promise<BulkEntitlementRow[]> => {
  const { items: apps } = await getAdminApps();
  const rows: BulkEntitlementRow[] = apps.map((app) => {
    const insufficientRoleUserIds = userIds.filter((userId) =>
      isInsufficientRole(userId, app.requiredRoles)
    );
    const grantedCount = userIds.filter((userId) =>
      isGranted(userId, app._id)
    ).length;
    const totalCount = userIds.length;
    return {
      app,
      grantedCount,
      totalCount,
      status: deriveStatus(
        grantedCount,
        totalCount,
        insufficientRoleUserIds.length
      ),
      insufficientRoleUserIds
    };
  });
  return delay(rows);
};

export const grantEntitlementBulk = async ({
  appId,
  userIds
}: BulkEntitlementInput): Promise<void> => {
  userIds.forEach((userId) => {
    const existing = MOCK_ENTITLEMENTS.find(
      (e) => e.userId === userId && e.webAppId === appId
    );
    if (existing) {
      existing.revokedAt = null;
      existing.grantedAt = new Date().toISOString();
      existing.grantedBy = ADMIN_ACTOR_ID;
      return;
    }
    MOCK_ENTITLEMENTS.push({
      _id: generateId("ent"),
      userId,
      webAppId: appId,
      grantedBy: ADMIN_ACTOR_ID,
      grantedAt: new Date().toISOString(),
      revokedAt: null
    });
  });
  return delay(undefined);
};

export const revokeEntitlementBulk = async ({
  appId,
  userIds
}: BulkEntitlementInput): Promise<void> => {
  userIds.forEach((userId) => {
    const existing = MOCK_ENTITLEMENTS.find(
      (e) => e.userId === userId && e.webAppId === appId && e.revokedAt === null
    );
    if (existing) existing.revokedAt = new Date().toISOString();
  });
  return delay(undefined);
};

export const getUserGrants = async (
  userIds: string[]
): Promise<Record<string, string[]>> => {
  const grantsByUser: Record<string, string[]> = {};
  userIds.forEach((userId) => {
    grantsByUser[userId] = MOCK_ENTITLEMENTS.filter(
      (e) => e.userId === userId && e.revokedAt === null
    ).map((e) => e.webAppId);
  });
  return delay(grantsByUser);
};

export const updateUserGrants = async (
  changes: EntitlementChange[]
): Promise<void> => {
  changes.forEach(({ userId, appId, granted }) => {
    const existing = MOCK_ENTITLEMENTS.find(
      (e) => e.userId === userId && e.webAppId === appId
    );
    if (granted) {
      if (existing) {
        existing.revokedAt = null;
        existing.grantedAt = new Date().toISOString();
        existing.grantedBy = ADMIN_ACTOR_ID;
        return;
      }
      MOCK_ENTITLEMENTS.push({
        _id: generateId("ent"),
        userId,
        webAppId: appId,
        grantedBy: ADMIN_ACTOR_ID,
        grantedAt: new Date().toISOString(),
        revokedAt: null
      });
      return;
    }
    if (existing && existing.revokedAt === null) {
      existing.revokedAt = new Date().toISOString();
    }
  });
  return delay(undefined);
};

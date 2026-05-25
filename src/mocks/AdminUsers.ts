// types
import type { AdminUser } from "@/types/AdminEntitlements";

const SIMULATED_LATENCY_MS = 200;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), SIMULATED_LATENCY_MS)
  );

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    _id: "user_alice",
    fullName: "Alice Nguyễn",
    email: "alice@example.com",
    avatar: null,
    role: "admin"
  },
  {
    _id: "user_bob",
    fullName: "Bob Trần",
    email: "bob@example.com",
    avatar: null,
    role: "user"
  },
  {
    _id: "user_carol",
    fullName: "Carol Phạm",
    email: "carol@example.com",
    avatar: null,
    role: "user"
  },
  {
    _id: "user_dave",
    fullName: "Dave Lê",
    email: "dave@example.com",
    avatar: null,
    role: "user"
  }
];

export const getAdminUsers = async (): Promise<AdminUser[]> =>
  delay(MOCK_ADMIN_USERS);

export const getAdminUserById = async (
  id: string
): Promise<AdminUser | null> => {
  const user = MOCK_ADMIN_USERS.find((u) => u._id === id) ?? null;
  return delay(user);
};

// types
import type { AuthenticationRole } from "@/types/User";

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  avatar: string | null;
  role: AuthenticationRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export type AdminUserStatusFilter = "active" | "locked";

export interface AdminUsersQueryParams {
  search?: string;
  role?: AuthenticationRole;
  status?: AdminUserStatusFilter;
}

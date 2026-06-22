// types
import type { AuthenticationRole } from "@/types/User";
import type { SortOrder } from "@/constants/list";

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
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "fullName" | "lastLoginAt";
  sortOrder?: SortOrder;
}

export type PaginatedAdminUsersResponse = Paginated<AdminUser>;

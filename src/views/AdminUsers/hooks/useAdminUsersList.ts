// libs
import { useQuery } from "@tanstack/react-query";
// types
import type { AdminUsersQueryParams } from "@/types/AdminUsers";
// requests
import { getAdminUsers } from "@/requests/adminUsers";

export const ADMIN_USERS_LIST_QUERY_KEY = "adminUsersList";

const useAdminUsersList = (params: AdminUsersQueryParams) =>
  useQuery({
    queryKey: [ADMIN_USERS_LIST_QUERY_KEY, params],
    queryFn: () => getAdminUsers(params)
  });

export default useAdminUsersList;

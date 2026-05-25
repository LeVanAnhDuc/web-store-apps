// libs
import { useQuery } from "@tanstack/react-query";
// types
import type { AdminUsersQueryParams } from "@/types/AdminUsers";
// others
import { getAdminUsersList } from "@/mocks/AdminUsers";

export const ADMIN_USERS_LIST_QUERY_KEY = "adminUsersList";

const useAdminUsersList = (params: AdminUsersQueryParams) =>
  useQuery({
    queryKey: [ADMIN_USERS_LIST_QUERY_KEY, params],
    queryFn: () => getAdminUsersList(params)
  });

export default useAdminUsersList;

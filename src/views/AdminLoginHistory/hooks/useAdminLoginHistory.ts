// libs
import { useQuery } from "@tanstack/react-query";
// types
import type { AdminLoginHistoryQueryParams } from "@/types/LoginHistory";
// requests
import { getAdminLoginHistory } from "@/requests/loginHistory";

export const ADMIN_LOGIN_HISTORY_QUERY_KEY = "adminLoginHistory";

const useAdminLoginHistory = (params: AdminLoginHistoryQueryParams) =>
  useQuery({
    queryKey: [ADMIN_LOGIN_HISTORY_QUERY_KEY, params],
    queryFn: () => getAdminLoginHistory(params)
  });

export default useAdminLoginHistory;

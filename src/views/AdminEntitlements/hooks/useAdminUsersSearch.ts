// libs
import { useQuery } from "@tanstack/react-query";
// requests
import { getAdminUsers } from "@/requests/adminUsers";
// others
import CONSTANTS from "@/constants";

const USER_SEARCH_LIMIT = 20;

const useAdminUsersSearch = (search: string, enabled = true) =>
  useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_USERS, search],
    queryFn: () => getAdminUsers({ search, limit: USER_SEARCH_LIMIT }),
    enabled
  });

export default useAdminUsersSearch;

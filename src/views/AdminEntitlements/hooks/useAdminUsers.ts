// libs
import { useQuery } from "@tanstack/react-query";
// others
import { getAdminUsers } from "@/mocks/AdminUsers";

export const ADMIN_USERS_QUERY_KEY = "adminUsers";

const useAdminUsers = () =>
  useQuery({
    queryKey: [ADMIN_USERS_QUERY_KEY],
    queryFn: getAdminUsers
  });

export default useAdminUsers;

// libs
import { useQuery } from "@tanstack/react-query";
// others
import CONSTANTS from "@/constants";
import { getAdminUsers } from "@/mocks/AdminUsers";

const useAdminUsers = () =>
  useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_USERS],
    queryFn: getAdminUsers
  });

export default useAdminUsers;

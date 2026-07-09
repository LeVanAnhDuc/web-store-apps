// libs
import { useQuery } from "@tanstack/react-query";
// requests
import { getAdminUserOptions } from "@/requests/adminUsers";
// others
import CONSTANTS from "@/constants";

const useAdminUsers = () =>
  useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_USERS],
    queryFn: getAdminUserOptions
  });

export default useAdminUsers;

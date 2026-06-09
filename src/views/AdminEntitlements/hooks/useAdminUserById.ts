// libs
import { useQuery } from "@tanstack/react-query";
// others
import CONSTANTS from "@/constants";
import { getAdminUserById } from "@/mocks/AdminUsers";

const useAdminUserById = (userId: string | null) =>
  useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_USER, userId],
    queryFn: () => getAdminUserById(userId!),
    enabled: Boolean(userId)
  });

export default useAdminUserById;

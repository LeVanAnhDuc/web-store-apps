// libs
import { useQuery } from "@tanstack/react-query";
// others
import { getAdminUserById } from "@/mocks/AdminUsers";

export const ADMIN_USER_QUERY_KEY = "adminUser";

const useAdminUserById = (userId: string | null) =>
  useQuery({
    queryKey: [ADMIN_USER_QUERY_KEY, userId],
    queryFn: () => getAdminUserById(userId!),
    enabled: Boolean(userId)
  });

export default useAdminUserById;

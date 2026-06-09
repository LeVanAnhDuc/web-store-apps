// libs
import { useQuery } from "@tanstack/react-query";
// others
import CONSTANTS from "@/constants";
import { getEntitlementsByUserId } from "@/mocks/AdminEntitlements";

const useEntitlementsByUser = (userId: string | null) =>
  useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_ENTITLEMENTS, userId],
    queryFn: () => getEntitlementsByUserId(userId!),
    enabled: Boolean(userId)
  });

export default useEntitlementsByUser;

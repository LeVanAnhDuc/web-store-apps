// libs
import { useQuery } from "@tanstack/react-query";
// others
import { getEntitlementsByUserId } from "@/mocks/AdminEntitlements";

export const ENTITLEMENTS_QUERY_KEY = "adminEntitlements";

const useEntitlementsByUser = (userId: string | null) =>
  useQuery({
    queryKey: [ENTITLEMENTS_QUERY_KEY, userId],
    queryFn: () => getEntitlementsByUserId(userId!),
    enabled: Boolean(userId)
  });

export default useEntitlementsByUser;

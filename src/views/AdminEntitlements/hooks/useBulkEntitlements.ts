// libs
import { useQuery } from "@tanstack/react-query";
// others
import CONSTANTS from "@/constants";
import { getBulkEntitlements } from "@/mocks/AdminEntitlements";

const useBulkEntitlements = (userIds: string[]) =>
  useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_ENTITLEMENTS, userIds],
    queryFn: () => getBulkEntitlements(userIds),
    enabled: userIds.length > 0
  });

export default useBulkEntitlements;

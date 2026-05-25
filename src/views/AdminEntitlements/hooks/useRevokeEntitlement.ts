// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import { revokeEntitlement } from "@/mocks/AdminEntitlements";
import { ENTITLEMENTS_QUERY_KEY } from "./useEntitlementsByUser";

const useRevokeEntitlement = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminEntitlements.toast");
  return useMutation({
    mutationFn: revokeEntitlement,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ENTITLEMENTS_QUERY_KEY, variables.userId]
      });
      toast.success(tToast("revokeSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useRevokeEntitlement;

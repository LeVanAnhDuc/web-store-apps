// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import CONSTANTS from "@/constants";
import { revokeEntitlement } from "@/mocks/AdminEntitlements";

const useRevokeEntitlement = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminEntitlements.toast");
  return useMutation({
    mutationFn: revokeEntitlement,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_ENTITLEMENTS, variables.userId]
      });
      toast.success(tToast("revokeSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useRevokeEntitlement;

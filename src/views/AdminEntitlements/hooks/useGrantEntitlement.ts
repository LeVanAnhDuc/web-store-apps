// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import { grantEntitlement } from "@/mocks/AdminEntitlements";
import { ENTITLEMENTS_QUERY_KEY } from "./useEntitlementsByUser";

const useGrantEntitlement = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminEntitlements.toast");
  return useMutation({
    mutationFn: grantEntitlement,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ENTITLEMENTS_QUERY_KEY, variables.userId]
      });
      toast.success(tToast("grantSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useGrantEntitlement;

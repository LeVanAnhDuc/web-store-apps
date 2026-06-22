// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import CONSTANTS from "@/constants";
import { grantEntitlement } from "@/mocks/AdminEntitlements";

const useGrantEntitlement = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminEntitlements.toast");
  return useMutation({
    mutationFn: grantEntitlement,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_ENTITLEMENTS, variables.userId]
      });
      toast.success(tToast("grantSuccess"));
    }
  });
};

export default useGrantEntitlement;

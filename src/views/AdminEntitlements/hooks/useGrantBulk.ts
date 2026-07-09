// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import CONSTANTS from "@/constants";
import { grantEntitlementBulk } from "@/mocks/AdminEntitlements";

const useGrantBulk = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminEntitlements.toast");
  return useMutation({
    mutationFn: grantEntitlementBulk,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_ENTITLEMENTS]
      });
      toast.success(tToast("grantSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useGrantBulk;

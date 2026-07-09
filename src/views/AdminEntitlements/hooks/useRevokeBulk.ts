// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import CONSTANTS from "@/constants";
import { revokeEntitlementBulk } from "@/mocks/AdminEntitlements";

const useRevokeBulk = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminEntitlements.toast");
  return useMutation({
    mutationFn: revokeEntitlementBulk,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_ENTITLEMENTS]
      });
      toast.success(tToast("revokeSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useRevokeBulk;

// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import { unlockAdminUser } from "@/mocks/AdminUsers";
import { ADMIN_USERS_LIST_QUERY_KEY } from "./useAdminUsersList";

const useUnlockAdminUser = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminUsers.toast");
  return useMutation({
    mutationFn: unlockAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_USERS_LIST_QUERY_KEY]
      });
      toast.success(tToast("unlockSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useUnlockAdminUser;

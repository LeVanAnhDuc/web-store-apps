// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import { lockAdminUser } from "@/mocks/AdminUsers";
import { ADMIN_USERS_LIST_QUERY_KEY } from "./useAdminUsersList";

const useLockAdminUser = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminUsers.toast");
  return useMutation({
    mutationFn: lockAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_USERS_LIST_QUERY_KEY]
      });
      toast.success(tToast("lockSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useLockAdminUser;

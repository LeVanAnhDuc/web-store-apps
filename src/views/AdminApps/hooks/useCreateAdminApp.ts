// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// requests
import { createAdminApp } from "@/requests/adminApps";

export const ADMIN_APPS_QUERY_KEY = "adminApps";

const useCreateAdminApp = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminApps.toast");

  return useMutation({
    mutationFn: createAdminApp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_APPS_QUERY_KEY] });
      toast.success(tToast("createSuccess"));
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useCreateAdminApp;

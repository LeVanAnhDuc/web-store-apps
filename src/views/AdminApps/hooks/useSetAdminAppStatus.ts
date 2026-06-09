// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { AppStatus } from "@/types/AdminApps";
// requests
import { setAdminAppStatus } from "@/requests/adminApps";
// others
import { ADMIN_APPS_QUERY_KEY } from "./useCreateAdminApp";

const useSetAdminAppStatus = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminApps.toast");

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AppStatus }) =>
      setAdminAppStatus(id, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_APPS_QUERY_KEY] });
      toast.success(
        variables.status === "inactive"
          ? tToast("hidden")
          : tToast("reactivated")
      );
    },
    onError: () => toast.error(tToast("error"))
  });
};

export default useSetAdminAppStatus;

// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { AdminAppUpdateInput } from "@/types/AdminApps";
// requests
import { updateAdminApp } from "@/requests/adminApps";
// others
import { ADMIN_APPS_QUERY_KEY } from "./useCreateAdminApp";

const useUpdateAdminApp = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("adminApps.toast");

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: AdminAppUpdateInput }) =>
      updateAdminApp(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_APPS_QUERY_KEY] });
      toast.success(tToast("updateSuccess"));
    }
  });
};

export default useUpdateAdminApp;

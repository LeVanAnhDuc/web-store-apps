// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { ContactStatus } from "@/types/ContactAdmin";
// requests
import { updateContactStatus } from "@/requests/contactAdmin";
// others
import { ADMIN_CONTACT_LIST_QUERY_KEY } from "@/views/AdminContact/hooks/useAdminContactList";
import { ADMIN_CONTACT_DETAIL_QUERY_KEY } from "./useAdminContactDetail";

const useUpdateContactStatus = (id: string) => {
  const queryClient = useQueryClient();
  const t = useTranslations("contactAdmin.admin.detail.updateStatus");
  return useMutation({
    mutationFn: (status: ContactStatus) => updateContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_CONTACT_DETAIL_QUERY_KEY, id]
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_CONTACT_LIST_QUERY_KEY]
      });
      toast.success(t("success"));
    },
    onError: () => toast.error(t("error"))
  });
};

export default useUpdateContactStatus;

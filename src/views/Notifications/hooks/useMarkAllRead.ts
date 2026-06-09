// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// requests
import { markAllNotificationsRead } from "@/requests/notification";
// others
import CONSTANTS from "@/constants";

const useMarkAllRead = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations("notifications.toast");
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONSTANTS.QUERY_KEYS.NOTIFICATIONS]
      });
      queryClient.invalidateQueries({
        queryKey: [CONSTANTS.QUERY_KEYS.NOTIFICATIONS_UNREAD_COUNT]
      });
    },
    onError: () => toast.error(tToast("markAllError"))
  });
};

export default useMarkAllRead;

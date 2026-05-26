// libs
import { useQuery } from "@tanstack/react-query";
// requests
import { getAdminContactDetail } from "@/requests/contactAdmin";

export const ADMIN_CONTACT_DETAIL_QUERY_KEY = "adminContactDetail";

const useAdminContactDetail = (id: string) =>
  useQuery({
    queryKey: [ADMIN_CONTACT_DETAIL_QUERY_KEY, id],
    queryFn: () => getAdminContactDetail(id),
    enabled: Boolean(id)
  });

export default useAdminContactDetail;

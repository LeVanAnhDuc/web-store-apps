// libs
import { useQuery } from "@tanstack/react-query";
// types
import type { AdminContactQuery } from "@/types/ContactAdmin";
// requests
import { getAdminContact } from "@/requests/contactAdmin";

export const ADMIN_CONTACT_LIST_QUERY_KEY = "adminContactList";

const useAdminContactList = (params: AdminContactQuery) =>
  useQuery({
    queryKey: [ADMIN_CONTACT_LIST_QUERY_KEY, params],
    queryFn: () => getAdminContact(params)
  });

export default useAdminContactList;

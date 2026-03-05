"use client";

// libs
import { useMutation } from "@tanstack/react-query";
// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
// stores
import { useContactAdminStore } from "@/stores";
// requests
import { submitContact } from "@/requests/contactAdmin";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { CONTACT_ADMIN_SUCCESS } = CONSTANTS.ROUTES;

export const useContactAdmin = () => {
  const router = useRouter();
  const setSuccessData = useContactAdminStore((state) => state.setSuccessData);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: (data: ContactAdminFormValues) => submitContact(data),
    onSuccess: (response, data) => {
      setSuccessData(data, response.ticketNumber);
      router.push(CONTACT_ADMIN_SUCCESS);
    }
  });

  return { submit, isPending };
};

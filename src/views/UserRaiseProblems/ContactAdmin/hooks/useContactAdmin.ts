"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { AxiosError } from "axios";
// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
// hooks
import { useAnnounce } from "@/hooks";
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
  const t = useTranslations("contactAdmin.form.errors");
  const tAnnounce = useTranslations("contactAdmin.announce");
  const { announce } = useAnnounce();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: ({
      data,
      files
    }: {
      data: ContactAdminFormValues;
      files?: File[];
    }) => submitContact(data, files),
    onMutate: () => {
      announce(tAnnounce("submitting"));
    },
    onSuccess: (response, { data }) => {
      announce(tAnnounce("success", { ticketNumber: response.ticketNumber }));
      setSuccessData(data, response.ticketNumber);
      router.push(CONTACT_ADMIN_SUCCESS);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 429) {
        announce(tAnnounce("rateLimitError"));
        toast.error(t("rateLimitExceeded"));
      } else {
        announce(tAnnounce("error"));
      }
    }
  });

  return { submit, isPending };
};

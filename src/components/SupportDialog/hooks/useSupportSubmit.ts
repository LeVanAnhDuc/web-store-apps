"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { AxiosError } from "axios";
import type { SupportFormValues } from "@/types/Support";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { submitSupport } from "@/requests/support";

const useSupportSubmit = ({
  onSuccess
}: {
  onSuccess: (ticketNumber: string) => void;
}) => {
  const tErrors = useTranslations("support.form.errors");
  const tAnnounce = useTranslations("support.announce");
  const { announce } = useAnnounce();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: (data: SupportFormValues) => submitSupport(data),
    onMutate: () => {
      announce(tAnnounce("submitting"));
    },
    onSuccess: (response) => {
      announce(tAnnounce("success", { ticketNumber: response.ticketNumber }));
      onSuccess(response.ticketNumber);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 429) {
        announce(tAnnounce("rateLimitError"));
        toast.error(tErrors("rateLimitExceeded"));
      } else {
        announce(tAnnounce("error"));
        toast.error(tErrors("generic"));
      }
    }
  });

  return { submit, isPending };
};

export default useSupportSubmit;

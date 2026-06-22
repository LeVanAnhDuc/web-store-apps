"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
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
  const tAnnounce = useTranslations("support.announce");
  const { announce } = useAnnounce();

  return useMutation({
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
      } else {
        announce(tAnnounce("error"));
      }
    }
  });
};

export default useSupportSubmit;

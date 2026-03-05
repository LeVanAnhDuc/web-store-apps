"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// requests
import { sendLoginMagicLink } from "@/requests/login";
// hooks
import { useCountdown } from "@/hooks";
// others
import CONSTANTS from "@/constants";

const { RESEND_COUNTDOWN } = CONSTANTS.LOGIN;

export const useMagicLinkLogin = ({
  email,
  resendSuccessMessage
}: {
  email: string;
  resendSuccessMessage: string;
}) => {
  const {
    seconds: countdown,
    isFinished: canResend,
    reset: resetCountdown
  } = useCountdown(RESEND_COUNTDOWN);

  const { mutate: sendMagicLink, isPending: isSending } = useMutation({
    mutationFn: () => sendLoginMagicLink(email),
    onSuccess: () => {
      toast.success(resendSuccessMessage);
      resetCountdown();
    }
  });

  return { sendMagicLink, isSending, countdown, canResend };
};

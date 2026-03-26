"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// requests
import { sendForgotPasswordMagicLink } from "@/requests/forgotPassword";
// hooks
import { useCountdown } from "@/hooks";
// others
import CONSTANTS from "@/constants";

const { RESEND_COUNTDOWN } = CONSTANTS.FORGOT_PASSWORD;

export const useMagicLink = ({
  email,
  messages
}: {
  email: string;
  messages: {
    resendSuccess: string;
  };
}) => {
  const {
    seconds: countdown,
    isFinished: canResend,
    reset: resetCountdown
  } = useCountdown(RESEND_COUNTDOWN);

  const { mutate: sendMagicLink, isPending: isResending } = useMutation({
    mutationFn: () => sendForgotPasswordMagicLink(email),
    onSuccess: () => {
      toast.success(messages.resendSuccess);
      resetCountdown();
    }
  });

  return {
    countdown,
    canResend,
    isResending,
    handleResend: sendMagicLink
  };
};

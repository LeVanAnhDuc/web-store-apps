"use client";

// libs
import { toast } from "sonner";
// hooks
import { useCountdown } from "@/hooks";

const COUNTDOWN_SECONDS = 60;

export const useMagicLink = ({
  email,
  messages
}: {
  email: string;
  messages: {
    resendSuccess: string;
    errorGeneric: string;
  };
}) => {
  const {
    seconds: countdown,
    isFinished: canResend,
    reset: resetCountdown
  } = useCountdown(COUNTDOWN_SECONDS);

  const handleResend = () => {
    // TODO: Implement magic link API
    console.log("Resend magic link:", email);
    toast.success(messages.resendSuccess);
    resetCountdown();
  };

  return {
    countdown,
    canResend,
    isResending: false,
    handleResend
  };
};

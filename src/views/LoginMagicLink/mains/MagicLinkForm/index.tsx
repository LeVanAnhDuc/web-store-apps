"use client";

// libs
import { useState } from "react";
import { toast } from "sonner";
// types
import type { LoginMessages } from "@/types/libs";
// components
import ResendButton from "@/components/ResendButton";
// hooks
import { useCountdown } from "@/hooks";

const COUNTDOWN_SECONDS = 60;

const MagicLinkForm = ({
  tryOtherHref,
  translations
}: {
  tryOtherHref: string;
  translations: LoginMessages;
}) => {
  const {
    seconds: countdown,
    isFinished: canResend,
    reset: resetCountdown
  } = useCountdown(COUNTDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);

  const {
    button: { resend, resendIn, sending, tryOther },
    resendSuccess
  } = translations.form.magicLink;

  const handleResend = async () => {
    setIsResending(true);

    // TODO: Implement actual resend API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(resendSuccess);
    resetCountdown();
    setIsResending(false);
  };

  return (
    <ResendButton
      countdown={countdown}
      canResend={canResend}
      isResending={isResending}
      onResend={handleResend}
      tryOtherHref={tryOtherHref}
      labels={{ resend, resendIn, sending, tryOther }}
    />
  );
};

export default MagicLinkForm;

"use client";

// libs
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
// types
import type { LoginMessages } from "@/types/libs";
// components
import ResendButton from "@/components/ResendButton";
import OtpInputGroup from "@/components/OtpInputGroup";
import OtpInstruction from "../../components/OtpInstruction";
// hooks
import { useCountdown } from "@/hooks";
// ghosts
import AutoVerifyOtpEffect from "@/ghosts/AutoVerifyOtpEffect";
// others
import CONSTANTS from "@/constants";

const { OTP_LENGTH, RESEND_COUNTDOWN } = CONSTANTS.FORGOT_PASSWORD;
const { HOME } = CONSTANTS.ROUTES;

const OtpStepForm = ({
  tryOtherHref,
  translations
}: {
  tryOtherHref: string;
  translations: LoginMessages;
}) => {
  const router = useRouter();
  const {
    seconds: countdown,
    isFinished: canResend,
    reset: resetCountdown
  } = useCountdown(RESEND_COUNTDOWN);

  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    button: { resend, resendIn, sending, tryOther },
    instruction,
    resendSuccess,
    verifying
  } = translations.form.otp;

  const handleVerify = async () => {
    if (otp.length !== OTP_LENGTH) return;

    setIsVerifying(true);

    // TODO: Implement actual verification API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsVerifying(false);

    // After OTP verified, go to home/dashboard
    router.push(HOME);
  };

  const handleResend = async () => {
    setIsResending(true);

    // TODO: Implement actual resend API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(resendSuccess);
    resetCountdown();
    setIsResending(false);
    setOtp("");
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  return (
    <>
      <OtpInputGroup
        value={otp}
        onChange={handleOtpChange}
        disabled={isResending}
        isVerifying={isVerifying}
        verifyingLabel={verifying}
      />

      <OtpInstruction label={instruction} />

      <ResendButton
        countdown={countdown}
        canResend={canResend}
        isResending={isResending}
        isProcessing={isVerifying}
        onResend={handleResend}
        tryOtherHref={tryOtherHref}
        labels={{ resend, resendIn, sending, tryOther }}
      />

      <AutoVerifyOtpEffect
        otpValue={otp}
        otpLength={OTP_LENGTH}
        onVerify={handleVerify}
      />
    </>
  );
};

export default OtpStepForm;

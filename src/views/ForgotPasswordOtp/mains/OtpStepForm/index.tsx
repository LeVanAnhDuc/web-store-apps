"use client";

// libs
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
// types
import type { ForgotPasswordMessages } from "@/types/libs";
// components
import ResendButton from "@/components/ResendButton";
import OtpInputGroup from "@/components/OtpInputGroup";
import OtpInstructionBox from "../../components/OtpInstructionBox";
// hooks
import { useCountdown } from "@/hooks";
// ghosts
import AutoVerifyOtpEffect from "@/ghosts/AutoVerifyOtpEffect";
// others
import CONSTANTS from "@/constants";

const { OTP_LENGTH, RESEND_COUNTDOWN } = CONSTANTS.FORGOT_PASSWORD;
const { RESET_PASSWORD } = CONSTANTS.ROUTES;

const OtpStepForm = ({
  email,
  tryOtherHref,
  translations
}: {
  email: string;
  tryOtherHref: string;
  translations: ForgotPasswordMessages;
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

    // Navigate to reset password page
    const encodedEmail = encodeURIComponent(email);
    const encodedToken = encodeURIComponent(otp);
    router.push(
      `${RESET_PASSWORD}?email=${encodedEmail}&token=${encodedToken}`
    );
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

      <OtpInstructionBox instruction={instruction} />

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

"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// requests
import {
  verifyForgotPasswordOtp,
  sendForgotPasswordOtp
} from "@/requests/forgotPassword";
// hooks
import { useCountdown } from "@/hooks";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { FORGOT_PASSWORD_RESET } = CONSTANTS.ROUTES;
const { RESEND_COUNTDOWN } = CONSTANTS.FORGOT_PASSWORD;

export const useForgotPasswordOtp = ({
  email,
  onVerifyError,
  resendSuccessMessage
}: {
  email: string;
  onVerifyError: () => void;
  resendSuccessMessage: string;
}) => {
  const router = useRouter();
  const {
    seconds: countdown,
    isFinished: canResend,
    reset: resetCountdown
  } = useCountdown(RESEND_COUNTDOWN);

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: (otp: string) => verifyForgotPasswordOtp(email, otp),
    onSuccess: ({ resetToken }) => {
      router.push(
        `${FORGOT_PASSWORD_RESET}?email=${encodeURIComponent(email)}&token=${resetToken}`
      );
    },
    onError: onVerifyError
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => sendForgotPasswordOtp(email),
    onSuccess: () => {
      toast.success(resendSuccessMessage);
      resetCountdown();
    }
  });

  return {
    verifyOtp,
    resendOtp,
    isVerifying,
    isResending,
    countdown,
    canResend
  };
};

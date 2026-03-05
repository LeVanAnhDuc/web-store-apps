"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// requests
import { sendLoginOtp, verifyLoginOtp } from "@/requests/login";
// stores
import { useAuthStore } from "@/stores";
// hooks
import { useCountdown } from "@/hooks";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { HOME } = CONSTANTS.ROUTES;
const { RESEND_COUNTDOWN } = CONSTANTS.LOGIN;

export const useOtpLogin = ({
  email,
  onVerifyError,
  resendSuccessMessage
}: {
  email: string;
  onVerifyError: () => void;
  resendSuccessMessage: string;
}) => {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const {
    seconds: countdown,
    isFinished: canResend,
    reset: resetCountdown
  } = useCountdown(RESEND_COUNTDOWN);

  const { mutate: sendOtp, isPending: isSending } = useMutation({
    mutationFn: () => sendLoginOtp(email),
    onSuccess: () => {
      toast.success(resendSuccessMessage);
      resetCountdown();
    }
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: (otp: string) => verifyLoginOtp(email, otp),
    onSuccess: (tokens) => {
      setTokens(tokens);
      router.push(HOME);
    },
    onError: onVerifyError
  });

  return {
    sendOtp,
    verifyOtp,
    isSending,
    isVerifying,
    countdown,
    canResend
  };
};

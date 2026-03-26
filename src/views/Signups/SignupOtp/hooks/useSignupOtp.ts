"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// requests
import { verifySignupOtp, resendSignupOtp } from "@/requests/signup";
// hooks
import { useCountdown } from "@/hooks";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { SIGNUP_INFO } = CONSTANTS.ROUTES;
const { RESEND_COUNTDOWN } = CONSTANTS.SIGNUP;

export const useSignupOtp = ({
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
    mutationFn: (otp: string) => verifySignupOtp(email, otp),
    onSuccess: ({ sessionToken }) => {
      router.push(
        `${SIGNUP_INFO}?sessionToken=${sessionToken}&email=${encodeURIComponent(email)}`
      );
    },
    onError: onVerifyError
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => resendSignupOtp(email),
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

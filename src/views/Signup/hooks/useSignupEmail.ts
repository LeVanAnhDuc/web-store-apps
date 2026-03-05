"use client";

// libs
import { useMutation } from "@tanstack/react-query";
// requests
import { sendSignupOtp } from "@/requests/signup";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { SIGNUP_OTP } = CONSTANTS.ROUTES;

export const useSignupEmail = () => {
  const router = useRouter();

  const { mutate: sendOtp, isPending } = useMutation({
    mutationFn: (email: string) => sendSignupOtp(email),
    onSuccess: (_, email) => {
      router.push(`${SIGNUP_OTP}?email=${encodeURIComponent(email)}`);
    }
  });

  return { sendOtp, isPending };
};

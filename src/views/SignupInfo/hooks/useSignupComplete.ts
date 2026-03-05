"use client";

// libs
import { useMutation } from "@tanstack/react-query";
// requests
import { completeSignup } from "@/requests/signup";
// stores
import { useAuthStore } from "@/stores";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { HOME } = CONSTANTS.ROUTES;

export const useSignupComplete = () => {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  const { mutate: complete, isPending } = useMutation({
    mutationFn: completeSignup,
    onSuccess: ({ tokens }) => {
      setTokens(tokens);
      router.push(HOME);
    }
  });

  return { complete, isPending };
};

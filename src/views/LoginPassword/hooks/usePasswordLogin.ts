"use client";

// libs
import { useMutation } from "@tanstack/react-query";
// requests
import { loginWithPassword } from "@/requests/login";
// stores
import { useAuthStore } from "@/stores";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { HOME } = CONSTANTS.ROUTES;

export const usePasswordLogin = () => {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithPassword(email, password),
    onSuccess: (tokens) => {
      setTokens(tokens);
      router.push(HOME);
    }
  });

  return { login, isPending };
};

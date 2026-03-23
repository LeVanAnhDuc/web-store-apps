"use client";

// libs
import { useMutation } from "@tanstack/react-query";
// requests
import { loginWithPassword } from "@/requests/login";
// hooks
import { usePostLoginRedirect } from "@/hooks";
// stores
import { useAuthStore } from "@/stores";

export const usePasswordLogin = () => {
  const redirectAfterLogin = usePostLoginRedirect();
  const setTokens = useAuthStore((state) => state.setTokens);

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithPassword(email, password),
    onSuccess: (tokens) => {
      setTokens(tokens);
      redirectAfterLogin();
    }
  });

  return { login, isPending };
};

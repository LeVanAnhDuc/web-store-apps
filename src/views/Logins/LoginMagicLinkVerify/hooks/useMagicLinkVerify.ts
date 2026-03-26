"use client";

// libs
import { useMutation } from "@tanstack/react-query";
// requests
import { verifyLoginMagicLink } from "@/requests/login";
// hooks
import { usePostLoginRedirect } from "@/hooks";
// stores
import { useAuthStore } from "@/stores";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { LOGIN } = CONSTANTS.ROUTES;

export const useMagicLinkVerify = () => {
  const router = useRouter();
  const redirectAfterLogin = usePostLoginRedirect();
  const setTokens = useAuthStore((state) => state.setTokens);

  const { mutate: verifyMagicLink, isPending } = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) =>
      verifyLoginMagicLink(email, token),
    onSuccess: (tokens) => {
      setTokens(tokens);
      redirectAfterLogin();
    },
    onError: () => {
      router.push(LOGIN);
    }
  });

  return { verifyMagicLink, isPending };
};

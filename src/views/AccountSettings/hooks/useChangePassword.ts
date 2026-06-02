"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
// types
import type { AxiosError } from "axios";
import type { ChangePasswordFormValues } from "@/forms/ChangePassword/validations";
// hooks
import { useAnnounce } from "@/hooks";
// stores
import { useAuthStore } from "@/stores";
// requests
import { changePassword } from "@/requests/changePassword";

export const useChangePassword = ({ onSuccess }: { onSuccess: () => void }) => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const t = useTranslations("accountSettings.changePassword");
  const { announce } = useAnnounce();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ChangePasswordFormValues) => changePassword(payload),
    onMutate: () => {
      announce(t("announce.saving"));
    },
    onSuccess: (tokens) => {
      // Keep the current device signed in with freshly issued tokens.
      setTokens(tokens);
      announce(t("announce.saved"));
      toast.success(t("toast.success"));
      onSuccess();
    },
    onError: (error: AxiosError<ErrorResponsePattern>) => {
      toast.error(error.response?.data?.message ?? t("toast.error"));
    }
  });

  return { changePassword: mutate, isPending };
};

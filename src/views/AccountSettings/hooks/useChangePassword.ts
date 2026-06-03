"use client";

// libs
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
// types
import type { AxiosError } from "axios";
import type { UseFormReturn } from "react-hook-form";
import type { ChangePasswordFormValues } from "@/forms/ChangePassword/validations";
// hooks
import { useAnnounce } from "@/hooks";
// stores
import { useAuthStore } from "@/stores";
// requests
import { changePassword } from "@/requests/changePassword";
// others
import CONSTANTS from "@/constants";

const { CHANGE_PASSWORD_WRONG_CURRENT, CHANGE_PASSWORD_SAME_AS_CURRENT } =
  CONSTANTS.ERROR_CODES;
const { CURRENT_PASSWORD, NEW_PASSWORD } =
  CONSTANTS.FIELD_NAMES.CHANGE_PASSWORD_FIELD_NAMES;

export const useChangePassword = (
  form: UseFormReturn<ChangePasswordFormValues>
) => {
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
      form.reset();
    },
    onError: (error: AxiosError<ErrorResponsePattern>) => {
      const code = error.response?.data?.code;
      if (code === CHANGE_PASSWORD_WRONG_CURRENT) {
        form.setError(CURRENT_PASSWORD, { message: "wrongCurrentPassword" });
      } else if (code === CHANGE_PASSWORD_SAME_AS_CURRENT) {
        form.setError(NEW_PASSWORD, { message: "sameAsCurrent" });
      } else {
        toast.error(t("toast.error"));
      }
    }
  });

  return { changePassword: mutate, isPending };
};

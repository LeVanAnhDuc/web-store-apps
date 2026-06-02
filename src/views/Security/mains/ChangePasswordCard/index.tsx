"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
// types
import type { ChangePasswordFormValues } from "@/forms/ChangePassword/validations";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
// hooks
import { useChangePassword } from "../../hooks/useChangePassword";
// forms
import { changePasswordFormProps } from "@/forms/ChangePassword";
// others
import CONSTANTS from "@/constants";

const { CURRENT_PASSWORD, NEW_PASSWORD, CONFIRM_PASSWORD } =
  CONSTANTS.FIELD_NAMES.CHANGE_PASSWORD_FIELD_NAMES;

const ChangePasswordCard = () => {
  const t = useTranslations("security.changePassword");
  const methods = useForm<ChangePasswordFormValues>(changePasswordFormProps);

  const { changePassword, isPending } = useChangePassword({
    onSuccess: () => methods.reset()
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword(data);
  };

  return (
    <Card aria-labelledby="change-password-title">
      <CardHeader className="border-b">
        <h3
          id="change-password-title"
          className="text-foreground text-base leading-none font-semibold"
        >
          {t("title")}
        </h3>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <PasswordInput
              name={CURRENT_PASSWORD}
              label={t("form.currentLabel")}
              placeholder={t("form.currentPlaceholder")}
              autoComplete="current-password"
              disabled={isPending}
            />
            <PasswordInput
              name={NEW_PASSWORD}
              label={t("form.newLabel")}
              placeholder={t("form.newPlaceholder")}
              autoComplete="new-password"
              disabled={isPending}
            />
            <PasswordInput
              name={CONFIRM_PASSWORD}
              label={t("form.confirmLabel")}
              placeholder={t("form.confirmPlaceholder")}
              autoComplete="new-password"
              disabled={isPending}
            />
            <CustomButton
              type="submit"
              loading={isPending}
              disabled={isPending}
            >
              {t("form.submit")}
            </CustomButton>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;

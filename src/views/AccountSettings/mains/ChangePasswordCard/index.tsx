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
import CustomTooltip from "@/components/CustomTooltip";
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
  const t = useTranslations("accountSettings.changePassword");
  const methods = useForm<ChangePasswordFormValues>({
    ...changePasswordFormProps
  });

  const { changePassword, isPending } = useChangePassword({
    onSuccess: () => methods.reset()
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword(data);
  };

  const isDisabled = !methods.formState.isDirty || isPending;

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
      <FormProvider {...methods}>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
            <PasswordInput
              name={CURRENT_PASSWORD}
              label={t("fields.currentPassword")}
              placeholder={t("placeholders.currentPassword")}
              autoComplete="current-password"
              disabled={isPending}
            />
            <PasswordInput
              name={NEW_PASSWORD}
              label={t("fields.newPassword")}
              placeholder={t("placeholders.newPassword")}
              autoComplete="new-password"
              disabled={isPending}
            />
            <PasswordInput
              name={CONFIRM_PASSWORD}
              label={t("fields.confirmPassword")}
              placeholder={t("placeholders.confirmPassword")}
              autoComplete="new-password"
              disabled={isPending}
            />
            <div className="border-border flex justify-end gap-3 border-t pt-5">
              <CustomTooltip
                content={
                  !methods.formState.isDirty ? t("tooltips.noChanges") : ""
                }
              >
                <CustomButton
                  type="button"
                  variant="outline"
                  onClick={() => methods.reset()}
                  disabled={isDisabled}
                >
                  {t("buttons.cancel")}
                </CustomButton>
              </CustomTooltip>
              <CustomTooltip
                content={
                  !methods.formState.isDirty ? t("tooltips.noChanges") : ""
                }
              >
                <CustomButton
                  type="submit"
                  loading={isPending}
                  disabled={isDisabled}
                >
                  {t("buttons.save")}
                </CustomButton>
              </CustomTooltip>
            </div>
          </form>
        </CardContent>
      </FormProvider>
    </Card>
  );
};

export default ChangePasswordCard;

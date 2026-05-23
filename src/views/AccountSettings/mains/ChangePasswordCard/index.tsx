"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { ChangePasswordFormValues } from "@/forms/ChangePassword/validations";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import CustomTooltip from "@/components/CustomTooltip";
import PasswordInput from "@/components/PasswordInput";
// hooks
import { useAnnounce } from "@/hooks";
// forms
import { changePasswordFormProps } from "@/forms/ChangePassword";

const ChangePasswordCard = () => {
  const t = useTranslations("accountSettings.changePassword");
  const { announce } = useAnnounce();
  const methods = useForm<ChangePasswordFormValues>({
    ...changePasswordFormProps
  });

  const onSubmit = () => {
    announce(t("announce.saving"));
    setTimeout(() => {
      announce(t("announce.saved"));
      toast.success(t("toast.success"));
      methods.reset();
    }, 400);
  };

  return (
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="change-password-title"
    >
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h3
          id="change-password-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h3>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-6"
        >
          <PasswordInput
            name="currentPassword"
            label={t("fields.currentPassword")}
            placeholder={t("placeholders.currentPassword")}
            autoComplete="current-password"
          />
          <PasswordInput
            name="newPassword"
            label={t("fields.newPassword")}
            placeholder={t("placeholders.newPassword")}
            autoComplete="new-password"
          />
          <PasswordInput
            name="confirmPassword"
            label={t("fields.confirmPassword")}
            placeholder={t("placeholders.confirmPassword")}
            autoComplete="new-password"
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
                disabled={!methods.formState.isDirty}
              >
                {t("buttons.cancel")}
              </CustomButton>
            </CustomTooltip>
            <CustomTooltip
              content={
                !methods.formState.isDirty ? t("tooltips.noChanges") : ""
              }
            >
              <CustomButton type="submit" disabled={!methods.formState.isDirty}>
                {t("buttons.save")}
              </CustomButton>
            </CustomTooltip>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default ChangePasswordCard;

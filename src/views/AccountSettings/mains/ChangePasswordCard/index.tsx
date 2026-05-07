"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { ChangePasswordFormValues } from "@/forms/ChangePassword/validations";
// components
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import FormFieldMessage from "@/components/FormFieldMessage";
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
        <h2
          id="change-password-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-6"
        >
          <FormField
            control={methods.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.currentPassword")}</FormLabel>
                <FormControl>
                  <CustomInput
                    {...field}
                    type="password"
                    placeholder={t("placeholders.currentPassword")}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormFieldMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.newPassword")}</FormLabel>
                <FormControl>
                  <CustomInput
                    {...field}
                    type="password"
                    placeholder={t("placeholders.newPassword")}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormFieldMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.confirmPassword")}</FormLabel>
                <FormControl>
                  <CustomInput
                    {...field}
                    type="password"
                    placeholder={t("placeholders.confirmPassword")}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormFieldMessage />
              </FormItem>
            )}
          />
          <div className="border-border flex justify-end gap-3 border-t pt-5">
            <CustomButton
              type="button"
              variant="outline"
              onClick={() => methods.reset()}
              disabled={!methods.formState.isDirty}
            >
              {t("buttons.cancel")}
            </CustomButton>
            <CustomButton type="submit" disabled={!methods.formState.isDirty}>
              {t("buttons.save")}
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default ChangePasswordCard;

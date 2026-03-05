"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
// types
import type { ResetPasswordFormValues } from "@/types/ResetPassword";
import type { ResetPasswordMessages } from "@/types/libs";
// components
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import PasswordRequirements from "../../components/PasswordRequirements";
// forms
import { resetPasswordFormProps } from "@/forms/ResetPassword";
// hooks
import { useResetPassword } from "../../hooks/useResetPassword";
// others
import CONSTANTS from "@/constants";

const { NEW_PASSWORD } = CONSTANTS.FIELD_NAMES.FORGOT_PASSWORD_FIELD_NAMES;
const { CONFIRM_PASSWORD } = CONSTANTS.FIELD_NAMES.FORGOT_PASSWORD_FIELD_NAMES;

const ResetPasswordForm = ({
  email,
  token,
  method,
  translations
}: {
  email: string;
  token: string;
  method?: string;
  translations: ResetPasswordMessages;
}) => {
  const methods = useForm<ResetPasswordFormValues>({
    ...resetPasswordFormProps
  });

  const {
    input: {
      labelNewPassword,
      placeholderNewPassword,
      labelConfirmPassword,
      placeholderConfirmPassword
    },
    requirements,
    button: { reset }
  } = translations.form;
  const { success } = translations.message;

  const {
    resetToken,
    isVerifying,
    verifyFailed,
    reset: doReset,
    isResetting
  } = useResetPassword({ email, token, method, successMessage: success });

  const onSubmit = (data: ResetPasswordFormValues) => {
    doReset(data[NEW_PASSWORD]);
  };

  if (isVerifying) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        Verifying...
      </p>
    );
  }

  if (verifyFailed) {
    return (
      <p className="text-destructive py-8 text-center text-sm">
        {translations.message.error.tokenExpired}
      </p>
    );
  }

  const isDisabled = isResetting || !resetToken;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput
          name={NEW_PASSWORD}
          label={labelNewPassword}
          placeholder={placeholderNewPassword}
          disabled={isDisabled}
        />
        <PasswordInput
          name={CONFIRM_PASSWORD}
          label={labelConfirmPassword}
          placeholder={placeholderConfirmPassword}
          disabled={isDisabled}
        />
        <PasswordRequirements labels={requirements} />

        <CustomButton
          type="submit"
          fullWidth
          loading={isResetting}
          disabled={isDisabled}
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {reset}
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;

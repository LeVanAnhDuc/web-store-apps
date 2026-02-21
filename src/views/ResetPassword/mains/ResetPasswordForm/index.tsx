"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
// types
import type { ResetPasswordFormValues } from "@/types/ResetPassword";
import type { ResetPasswordMessages } from "@/types/libs";
// components
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import PasswordRequirements from "../../components/PasswordRequirements";
// forms
import { resetPasswordFormProps } from "@/forms/ResetPassword";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { NEW_PASSWORD, CONFIRM_PASSWORD } =
  CONSTANTS.FIELD_NAMES.FORGOT_PASSWORD_FIELD_NAMES;
const { LOGIN } = CONSTANTS.ROUTES;

const ResetPasswordForm = ({
  email,
  token,
  translations
}: {
  email: string;
  token: string;
  translations: ResetPasswordMessages;
}) => {
  const router = useRouter();

  const methods = useForm<ResetPasswordFormValues>({
    ...resetPasswordFormProps
  });
  const { formState } = methods;
  const { isSubmitting } = formState;

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

  const onSubmit = async (data: ResetPasswordFormValues) => {
    // TODO: Call API to reset password with email, token, and newPassword
    console.log("Reset password:", {
      email,
      token,
      newPassword: data.newPassword
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(success);
    router.push(LOGIN);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput
          name={NEW_PASSWORD}
          label={labelNewPassword}
          placeholder={placeholderNewPassword}
          disabled={isSubmitting}
        />
        <PasswordInput
          name={CONFIRM_PASSWORD}
          label={labelConfirmPassword}
          placeholder={placeholderConfirmPassword}
          disabled={isSubmitting}
        />
        <PasswordRequirements labels={requirements} />

        <CustomButton
          type="submit"
          fullWidth
          loading={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {reset}
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;

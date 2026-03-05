"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
// types
import type { PasswordStepFormValues } from "@/types/Login";
import type { LoginMessages } from "@/types/libs";
// components
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import ForgotPasswordLink from "../../components/ForgotPasswordLink";
import TryAnotherButton from "../../components/TryAnotherButton";
// forms
import { passwordStepFormProps } from "@/forms/Login";
// hooks
import { usePasswordLogin } from "../../hooks/usePasswordLogin";
// others
import CONSTANTS from "@/constants";

const { PASSWORD } = CONSTANTS.FIELD_NAMES.LOGIN_FIELD_NAMES;

const PasswordStepForm = ({
  email,
  translations
}: {
  email: string;
  translations: LoginMessages;
}) => {
  const { login, isPending } = usePasswordLogin();
  const methods = useForm<PasswordStepFormValues>({ ...passwordStepFormProps });

  const {
    input: { labelEnterPassword, placeholderPassword },
    button: { tryAnother, next }
  } = translations.form;
  const { forgotPassword } = translations.link;

  const onSubmit = (data: PasswordStepFormValues) => {
    login({ email, password: data[PASSWORD] });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <PasswordInput
          name={PASSWORD}
          label={labelEnterPassword}
          placeholder={placeholderPassword}
          disabled={isPending}
        />
        <ForgotPasswordLink email={email} label={forgotPassword} />
        <div className="flex gap-3">
          <TryAnotherButton email={email} label={tryAnother} />
          <CustomButton
            type="submit"
            disabled={isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 flex-1 rounded-lg transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "..." : next}
          </CustomButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default PasswordStepForm;

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
import { Link } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { PASSWORD } = CONSTANTS.FIELD_NAMES.LOGIN_FIELD_NAMES;
const { LOGIN } = CONSTANTS.ROUTES;

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
    button: { tryAnother, signIn, changeEmail }
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
        <div className="flex items-center justify-between">
          <ForgotPasswordLink email={email} label={forgotPassword} />
          <TryAnotherButton
            email={email}
            disabled={isPending}
            label={tryAnother}
          />
        </div>
        <CustomButton
          type="submit"
          disabled={isPending}
          className="h-12"
          fullWidth
        >
          {isPending ? "..." : signIn}
        </CustomButton>
        <div className="text-center">
          <Link
            href={LOGIN}
            className="text-primary text-sm transition-colors duration-200 hover:underline"
          >
            {changeEmail}
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default PasswordStepForm;

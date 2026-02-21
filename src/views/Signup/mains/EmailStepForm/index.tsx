"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "@/i18n/navigation";
// types
import type { SignupEmailFormValues } from "@/types/Signup";
// components
import EmailInput from "../../components/EmailInput";
import NextButton from "../../components/NextButton";
// forms
import { signupEmailFormProps } from "@/forms/Signup";
// others
import CONSTANTS from "@/constants";

const { EMAIL } = CONSTANTS.FIELD_NAMES.SIGNUP_FIELD_NAMES;
const { SIGNUP_OTP } = CONSTANTS.ROUTES;

const EmailStepForm = ({
  labels
}: {
  labels: {
    email: string;
    next: string;
  };
}) => {
  const router = useRouter();
  const methods = useForm<SignupEmailFormValues>({ ...signupEmailFormProps });

  const onSubmit = (data: SignupEmailFormValues) => {
    // TODO: Call API to send OTP to email
    const email = encodeURIComponent(data[EMAIL]);
    router.push(`${SIGNUP_OTP}?email=${email}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <EmailInput label={labels.email} />
        <NextButton label={labels.next} />
      </form>
    </FormProvider>
  );
};

export default EmailStepForm;

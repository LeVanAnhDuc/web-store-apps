"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
// types
import type { SignupEmailFormValues } from "@/types/Signup";
// components
import EmailInput from "../../components/EmailInput";
import NextButton from "../../components/NextButton";
// forms
import { signupEmailFormProps } from "@/forms/Signup";
// hooks
import { useSignupEmail } from "../../hooks/useSignupEmail";
// others
import CONSTANTS from "@/constants";

const { EMAIL } = CONSTANTS.FIELD_NAMES.SIGNUP_FIELD_NAMES;

const EmailStepForm = ({
  labels
}: {
  labels: {
    email: string;
    next: string;
  };
}) => {
  const methods = useForm<SignupEmailFormValues>({ ...signupEmailFormProps });
  const { sendOtp, isPending } = useSignupEmail();

  const onSubmit = (data: SignupEmailFormValues) => {
    sendOtp(data[EMAIL]);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <EmailInput label={labels.email} disabled={isPending} />
        <NextButton label={labels.next} loading={isPending} />
      </form>
    </FormProvider>
  );
};

export default EmailStepForm;

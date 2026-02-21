"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
// types
import type { EmailStepFormValues } from "@/types/Login";
// components
import EmailInput from "../../components/EmailInput";
import NextButton from "../../components/NextButton";
// forms
import { emailStepFormProps } from "@/forms/Login";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { EMAIL } = CONSTANTS.FIELD_NAMES.LOGIN_FIELD_NAMES;
const { LOGIN_PASSWORD } = CONSTANTS.ROUTES;

const EmailStepForm = ({
  labels
}: {
  labels: { email: string; next: string };
}) => {
  const router = useRouter();
  const methods = useForm<EmailStepFormValues>({ ...emailStepFormProps });

  const onSubmit = (data: EmailStepFormValues) => {
    const email = encodeURIComponent(data[EMAIL]);
    router.push(`${LOGIN_PASSWORD}?email=${email}`);
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

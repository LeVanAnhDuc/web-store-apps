"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
import type { ContactAdminMessages } from "@/types/libs";
// components
import EmailInput from "../../components/EmailInput";
import SubjectInput from "../../components/SubjectInput";
import CategorySelect from "../../components/CategorySelect";
import PrioritySelect from "../../components/PrioritySelect";
import MessageTextarea from "../../components/MessageTextarea";
import SubmitButton from "../../components/SubmitButton";
// forms
import { contactAdminFormProps } from "@/forms/ContactAdmin";
// stores
import { useContactAdminStore } from "@/stores";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { CONTACT_ADMIN_SUCCESS } = CONSTANTS.ROUTES;

const ContactAdminForm = ({
  initialEmail,
  labels
}: {
  initialEmail?: string;
  labels: Pick<
    ContactAdminMessages["form"],
    "input" | "category" | "priority" | "button" | "hint"
  >;
}) => {
  const router = useRouter();
  const { input, category, priority, button, hint } = labels;
  const {
    labelEmail,
    labelEmailNote,
    labelSubject,
    placeholderSubject,
    labelCategory,
    placeholderCategory,
    labelPriority,
    labelMessage,
    placeholderMessage,
    emailHint,
    emailAutoFillHint
  } = input;

  const setSuccessData = useContactAdminStore((state) => state.setSuccessData);

  const methods = useForm<ContactAdminFormValues>({
    ...contactAdminFormProps,
    defaultValues: {
      ...contactAdminFormProps.defaultValues,
      email: initialEmail || ""
    }
  });

  const { isSubmitting } = methods.formState;

  const generateTicketNumber = () =>
    `TICKET-${Date.now().toString().slice(-8)}`;

  const onSubmit = async (data: ContactAdminFormValues) => {
    // TODO: Implement actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const ticketNumber = generateTicketNumber();
    setSuccessData(data, ticketNumber);
    router.push(CONTACT_ADMIN_SUCCESS);
  };

  const hintText = initialEmail ? emailAutoFillHint : emailHint;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        <EmailInput
          disabled={isSubmitting}
          hint={hintText}
          labels={{ label: labelEmail, labelNote: labelEmailNote }}
        />

        <SubjectInput
          disabled={isSubmitting}
          labels={{ label: labelSubject, placeholder: placeholderSubject }}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <CategorySelect
            disabled={isSubmitting}
            labels={{
              label: labelCategory,
              placeholder: placeholderCategory,
              options: category
            }}
          />
          <PrioritySelect
            disabled={isSubmitting}
            labels={{ label: labelPriority, options: priority }}
          />
        </div>

        <MessageTextarea
          disabled={isSubmitting}
          labels={{
            label: labelMessage,
            placeholder: placeholderMessage,
            hint
          }}
        />

        <SubmitButton isSubmitting={isSubmitting} labels={button} />
      </form>
    </FormProvider>
  );
};

export default ContactAdminForm;

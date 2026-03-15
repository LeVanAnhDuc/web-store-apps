"use client";

// libs
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
import type { ContactAdminMessages } from "@/types/libs";
// components
import EmailInput from "../../components/EmailInput";
import SubjectInput from "../../components/SubjectInput";
import MessageTextarea from "../../components/MessageTextarea";
import SubmitButton from "../../components/SubmitButton";
import FileUploadInput from "../../components/FileUploadInput";
// forms
import { contactAdminFormProps } from "@/forms/ContactAdmin";
// hooks
import { useContactAdmin } from "../../hooks/useContactAdmin";

const ContactAdminForm = ({
  initialEmail,
  labels
}: {
  initialEmail?: string;
  labels: Pick<ContactAdminMessages["form"], "input" | "button" | "hint">;
}) => {
  const { input, button, hint } = labels;
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const {
    labelEmail,
    labelEmailNote,
    labelSubject,
    placeholderSubject,
    labelMessage,
    placeholderMessage,
    emailHint,
    emailAutoFillHint
  } = input;

  const { submit, isPending } = useContactAdmin();

  const methods = useForm<ContactAdminFormValues>({
    ...contactAdminFormProps,
    defaultValues: {
      ...contactAdminFormProps.defaultValues,
      email: initialEmail || ""
    }
  });

  const onSubmit = (data: ContactAdminFormValues) => {
    submit({ data, files: attachedFiles });
  };

  const hintText = initialEmail ? emailAutoFillHint : emailHint;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        <EmailInput
          disabled={isPending}
          hint={hintText}
          labels={{ label: labelEmail, labelNote: labelEmailNote }}
        />

        <SubjectInput
          disabled={isPending}
          labels={{ label: labelSubject, placeholder: placeholderSubject }}
        />

        <MessageTextarea
          disabled={isPending}
          labels={{
            label: labelMessage,
            placeholder: placeholderMessage,
            hint
          }}
        />

        <FileUploadInput
          disabled={isPending}
          onFilesChange={setAttachedFiles}
        />

        <SubmitButton isSubmitting={isPending} labels={button} />
      </form>
    </FormProvider>
  );
};

export default ContactAdminForm;

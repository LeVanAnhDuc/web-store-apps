"use client";

// libs
import { useTranslations } from "next-intl";
// components
import { useFormField } from "@/components/ui/form";
// others
import { cn } from "@/libs/utils";

const FormFieldMessage = ({ className }: { className?: string }) => {
  const { error, name, formMessageId } = useFormField();
  const t = useTranslations("common.validation");

  if (!error?.message) return null;

  // Try to translate: validation.{fieldName}.{errorKey}
  // If not found, fallback to the raw message
  const errorKey = error.message;
  const translationKey = `${name}.${errorKey}`;

  let message: string;
  // Use t.has() to check if key exists, avoiding runtime errors
  if (t.has(translationKey as Parameters<typeof t.has>[0])) {
    message = t(translationKey as Parameters<typeof t>[0]);
  } else {
    // Fallback to raw message if translation not found
    message = errorKey;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
    >
      {message}
    </p>
  );
};

export default FormFieldMessage;

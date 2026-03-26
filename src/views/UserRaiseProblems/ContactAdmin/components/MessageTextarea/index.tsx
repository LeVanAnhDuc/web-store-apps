"use client";

// libs
import { useFormContext, useWatch } from "react-hook-form";
// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
import type { ContactAdminMessages } from "@/types/libs";
// components
import FormFieldMessage from "@/components/FormFieldMessage";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
// hooks
import { useFormField } from "@/components/ui/form";
// others
import CONSTANTS from "@/constants";

const { MESSAGE } = CONSTANTS.FIELD_NAMES.CONTACT_ADMIN_FIELD_NAMES;
const { MESSAGE_MIN_CHARS } = CONSTANTS.CONTACT_ADMIN;

const MessageHint = ({
  charCount,
  labels
}: {
  charCount: number;
  labels: ContactAdminMessages["form"]["hint"];
}) => {
  const { error } = useFormField();

  return (
    <div className="flex items-center justify-between">
      {error?.message ? (
        <FormFieldMessage />
      ) : (
        <p className="text-muted-foreground text-xs">
          {labels.minChars.replace("{count}", String(MESSAGE_MIN_CHARS))}
        </p>
      )}
      <p className="text-muted-foreground text-xs">
        {labels.charCount.replace("{count}", String(charCount))}
      </p>
    </div>
  );
};

const MessageTextarea = ({
  disabled = false,
  labels
}: {
  disabled?: boolean;
  labels: {
    label: string;
    placeholder: string;
    hint: ContactAdminMessages["form"]["hint"];
  };
}) => {
  const { control } = useFormContext<ContactAdminFormValues>();
  const messageValue = useWatch({ control, name: MESSAGE });

  return (
    <FormField
      control={control}
      name={MESSAGE}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {labels.label} <span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={labels.placeholder}
              disabled={disabled}
              rows={6}
              className="resize-none"
            />
          </FormControl>
          <MessageHint
            charCount={messageValue?.length || 0}
            labels={labels.hint}
          />
        </FormItem>
      )}
    />
  );
};

export default MessageTextarea;

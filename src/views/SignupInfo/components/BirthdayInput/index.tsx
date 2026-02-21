"use client";

// libs
import { format } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { CalendarIcon } from "lucide-react";
// types
import type { SignupInfoFormValues } from "@/types/Signup";
// components
import CustomButton from "@/components/CustomButton";
import FormFieldMessage from "@/components/FormFieldMessage";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
// hooks
import { useFieldProps } from "@/hooks";
// others
import CONSTANTS from "@/constants";
import { cn } from "@/libs/utils";

const { BIRTHDAY } = CONSTANTS.FIELD_NAMES.SIGNUP_FIELD_NAMES;

const BirthdayInput = ({
  label,
  placeholder,
  disabled = false
}: {
  label: string;
  placeholder: string;
  disabled?: boolean;
}) => {
  const locale = useLocale();
  const { field, fieldState } = useFieldProps<SignupInfoFormValues>(BIRTHDAY);
  const today = new Date();

  const dateLocale = locale === "vi" ? vi : enUS;

  return (
    <FormField
      {...field}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem>
            <FormLabel className="text-foreground">
              {label} <span className="text-destructive">*</span>
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <CustomButton
                    variant="outline"
                    disabled={disabled}
                    aria-invalid={fieldState.invalid}
                    fullWidth
                    className={cn(
                      "h-12 justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(selectedDate!, "dd/MM/yyyy", {
                        locale: dateLocale
                      })
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="h-4 w-4" />
                  </CustomButton>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                  }}
                  disabled={(date) => date > today}
                  defaultMonth={selectedDate || new Date(2000, 0)}
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={today.getFullYear()}
                  locale={dateLocale}
                  className="w-[var(--radix-popover-trigger-width)] p-0"
                  classNames={{
                    nav: "flex items-center w-full absolute inset-x-0 top-3 justify-between",
                    month_caption:
                      "flex items-center justify-center w-full pt-3 px-10",
                    dropdowns: "w-full flex items-center justify-center gap-4",
                    caption_label:
                      "w-20 h-10 flex items-center justify-between px-3",
                    button_next:
                      "size-10 flex justify-center items-center cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                    button_previous:
                      "size-10 flex justify-center items-center cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormFieldMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default BirthdayInput;

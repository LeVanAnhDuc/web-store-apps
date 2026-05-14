"use client";

// libs
import { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { CalendarIcon } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
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
import { getDateOfBirthBounds, parseLocalDate } from "@/utils";

const BirthdayInput = ({
  name,
  label,
  placeholder,
  disabled = false,
  required = false
}: {
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
}) => {
  const locale = useLocale();
  const { field, fieldState } = useFieldProps(name);
  const { minDate, maxDate } = getDateOfBirthBounds();
  const dateLocale = locale === "vi" ? vi : enUS;
  const displayFormat = "dd/MM/yyyy";
  const isoFormat = "yyyy-MM-dd";

  const fieldValue = typeof field.value === "string" ? field.value : "";
  const selectedDate = fieldValue ? parseLocalDate(fieldValue) : undefined;

  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(
    selectedDate ? format(selectedDate, displayFormat) : ""
  );
  const [month, setMonth] = useState<Date | undefined>(selectedDate);

  useEffect(() => {
    if (fieldValue) {
      const next = parseLocalDate(fieldValue);
      setDisplayValue(format(next, displayFormat));
      setMonth(next);
    } else {
      setDisplayValue("");
    }
  }, [fieldValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setDisplayValue(text);

    if (!text) {
      field.onChange("");
      return;
    }

    const parsed = parse(text, displayFormat, new Date());
    if (isValid(parsed) && parsed >= minDate && parsed <= maxDate) {
      field.onChange(format(parsed, isoFormat));
      setMonth(parsed);
    } else {
      field.onChange(text);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      field.onChange(format(date, isoFormat));
      setDisplayValue(format(date, displayFormat));
      setMonth(date);
    } else {
      field.onChange("");
      setDisplayValue("");
    }
    setOpen(false);
  };

  return (
    <FormField
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-foreground">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <CustomInput
                value={displayValue}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={fieldState.invalid}
                className="pr-11"
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
            </FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <CustomButton
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={disabled}
                  aria-label={placeholder}
                  className="absolute top-1/2 right-1.5 -translate-y-1/2"
                >
                  <CalendarIcon className="size-4 opacity-60" />
                </CustomButton>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                alignOffset={-8}
                sideOffset={10}
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={handleCalendarSelect}
                  disabled={(date) => date > maxDate || date < minDate}
                  defaultMonth={selectedDate || new Date(2000, 0)}
                  captionLayout="dropdown"
                  fromYear={minDate.getFullYear()}
                  toYear={maxDate.getFullYear()}
                  locale={dateLocale}
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormFieldMessage />
        </FormItem>
      )}
    />
  );
};

export default BirthdayInput;

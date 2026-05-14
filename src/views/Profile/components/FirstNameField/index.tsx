"use client";

// libs
import { useTranslations } from "next-intl";
// types
import type { Control } from "react-hook-form";
import type { UpdatePersonalInfoFormValues } from "@/forms/UpdatePersonalInfo/validations";
// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import FormFieldMessage from "@/components/FormFieldMessage";

type Props = {
  control: Control<UpdatePersonalInfoFormValues>;
  isPending: boolean;
};

const FirstNameField = ({ control, isPending }: Props) => {
  const t = useTranslations("profile.personalInfo");

  return (
    <FormField
      control={control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("fields.firstName")}</FormLabel>
          <FormControl>
            <CustomInput
              {...field}
              placeholder={t("placeholders.firstName")}
              disabled={isPending}
            />
          </FormControl>
          <FormFieldMessage />
        </FormItem>
      )}
    />
  );
};

export default FirstNameField;

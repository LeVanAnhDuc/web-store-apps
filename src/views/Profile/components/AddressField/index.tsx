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

const AddressField = ({ control, isPending }: Props) => {
  const t = useTranslations("profile.personalInfo");

  return (
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("fields.address")}</FormLabel>
          <FormControl>
            <CustomInput
              {...field}
              value={field.value ?? ""}
              placeholder={t("placeholders.address")}
              disabled={isPending}
            />
          </FormControl>
          <FormFieldMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressField;

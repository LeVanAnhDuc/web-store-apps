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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import CustomSelectTrigger from "@/components/CustomSelectTrigger";
import FormFieldMessage from "@/components/FormFieldMessage";
// dataSources
import { GENDER_VALUES } from "@/dataSources/Profile";

type Props = {
  control: Control<UpdatePersonalInfoFormValues>;
  isPending: boolean;
};

const GenderField = ({ control, isPending }: Props) => {
  const t = useTranslations("profile.personalInfo");
  const tGender = useTranslations("profile.personalInfo.genderOptions");

  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("fields.gender")}</FormLabel>
          <Select
            value={field.value || undefined}
            onValueChange={field.onChange}
            disabled={isPending}
          >
            <FormControl>
              <CustomSelectTrigger>
                <SelectValue placeholder={t("placeholders.gender")} />
              </CustomSelectTrigger>
            </FormControl>
            <SelectContent>
              {GENDER_VALUES.map((g) => (
                <SelectItem key={g} value={g}>
                  {tGender(g)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormFieldMessage />
        </FormItem>
      )}
    />
  );
};

export default GenderField;

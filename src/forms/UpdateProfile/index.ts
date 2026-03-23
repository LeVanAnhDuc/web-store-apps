// libs
import { zodResolver } from "@hookform/resolvers/zod";
// types
import type { UseFormProps } from "react-hook-form";
import type { UpdateProfileFormValues } from "./validations";
// forms
import { initialUpdateProfileData } from "./data";
import { updateProfileValidation } from "./validations";

export const updateProfileFormProps: UseFormProps<UpdateProfileFormValues> = {
  defaultValues: initialUpdateProfileData,
  resolver: zodResolver(updateProfileValidation)
};

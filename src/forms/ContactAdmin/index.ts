// libs
import { zodResolver } from "@hookform/resolvers/zod";
// types
import type { UseFormProps } from "react-hook-form";
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
// forms
import { initialContactAdminData } from "./data";
import { contactAdminValidation } from "./validations";

export const contactAdminFormProps: UseFormProps<ContactAdminFormValues> = {
  defaultValues: initialContactAdminData,
  resolver: zodResolver(contactAdminValidation)
};

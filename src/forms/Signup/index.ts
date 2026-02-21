// libs
import { zodResolver } from "@hookform/resolvers/zod";
// types
import type { UseFormProps } from "react-hook-form";
import type {
  SignupEmailFormValues,
  SignupInfoFormValues
} from "@/types/Signup";
// forms
import { initialSignupEmailFormData, initialSignupInfoFormData } from "./data";
import {
  signupEmailFormValidation,
  signupInfoFormValidation
} from "./validations";

export const signupEmailFormProps: UseFormProps<SignupEmailFormValues> = {
  defaultValues: initialSignupEmailFormData,
  resolver: zodResolver(signupEmailFormValidation)
};

export const signupInfoFormProps: UseFormProps<SignupInfoFormValues> = {
  defaultValues: initialSignupInfoFormData,
  resolver: zodResolver(signupInfoFormValidation)
};

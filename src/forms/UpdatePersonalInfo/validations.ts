// libs
import * as z from "zod";

const SAFE_PHONE_PATTERN = /^[\d\s()+-]+$/;
const SAFE_USERNAME_PATTERN = /^@?[a-zA-Z0-9_-]+$/;

export const updatePersonalInfoValidation = z.object({
  firstName: z
    .string()
    .min(1, { message: "required" })
    .max(50, { message: "maxLength" }),
  lastName: z
    .string()
    .min(1, { message: "required" })
    .max(50, { message: "maxLength" }),
  phone: z
    .string()
    .max(20, { message: "maxLength" })
    .regex(SAFE_PHONE_PATTERN, { message: "invalid" })
    .optional()
    .or(z.literal("")),
  username: z
    .string()
    .max(30, { message: "maxLength" })
    .regex(SAFE_USERNAME_PATTERN, { message: "invalid" })
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(280, { message: "maxLength" })
    .optional()
    .or(z.literal(""))
});

export type UpdatePersonalInfoFormValues = z.infer<
  typeof updatePersonalInfoValidation
>;

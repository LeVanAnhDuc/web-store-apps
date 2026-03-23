// libs
import * as z from "zod";
// schemas
import {
  fullNameSchema,
  genderSchema,
  profileDateOfBirthSchema
} from "@/schemas";

const SAFE_ADDRESS_PATTERN = /^[\p{L}\d\s,.'/#-]+$/u;
const SAFE_PHONE_PATTERN = /^[\d\s()+-]+$/;

export const updateProfileValidation = z.object({
  fullName: fullNameSchema.optional(),
  phone: z
    .string()
    .min(1, { message: "required" })
    .max(20, { message: "maxLength" })
    .regex(SAFE_PHONE_PATTERN, { message: "invalid" })
    .optional(),
  address: z
    .string()
    .max(500, { message: "maxLength" })
    .regex(SAFE_ADDRESS_PATTERN, { message: "invalid" })
    .optional()
    .or(z.literal("")),
  dateOfBirth: profileDateOfBirthSchema.optional().or(z.literal("")),
  gender: genderSchema.optional()
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileValidation>;

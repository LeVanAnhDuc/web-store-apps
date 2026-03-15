// libs
import * as z from "zod";
// schemas
import { passwordSchema } from "@/schemas";
// others
import CONSTANTS from "@/constants";

const { EMAIL, PASSWORD } = CONSTANTS.FIELD_NAMES.LOGIN_FIELD_NAMES;

export const emailStepValidation = z.object({
  [EMAIL]: z
    .string()
    .min(1, { message: "required" })
    .email({ message: "invalid" })
    .refine((value) => CONSTANTS.REGEX_EMAIL.test(value), {
      message: "invalid"
    })
});

export const passwordStepValidation = z.object({
  [PASSWORD]: passwordSchema
});

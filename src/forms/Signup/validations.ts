// libs
import * as z from "zod";
// schemas
import { emailSchema, passwordSchema } from "@/schemas";
// others
import CONSTANTS from "@/constants";

const { EMAIL, FULL_NAME, GENDER, BIRTHDAY, PASSWORD, PASSWORD_CONFIRM } =
  CONSTANTS.FIELD_NAMES.SIGNUP_FIELD_NAMES;

export const signupEmailFormValidation = z.object({
  [EMAIL]: emailSchema
});

export const signupInfoFormValidation = z
  .object({
    [FULL_NAME]: z
      .string()
      .min(1, { message: "required" })
      .min(2, { message: "minLength" }),
    [GENDER]: z.string().min(1, { message: "required" }),
    [BIRTHDAY]: z.string().min(1, { message: "required" }),
    [PASSWORD]: passwordSchema,
    [PASSWORD_CONFIRM]: z.string().min(1, { message: "required" })
  })
  .refine((data) => data[PASSWORD] === data[PASSWORD_CONFIRM], {
    message: "mismatch",
    path: [PASSWORD_CONFIRM]
  });

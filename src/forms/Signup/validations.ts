// libs
import * as z from "zod";
// others
import CONSTANTS from "@/constants";

const { EMAIL, FULL_NAME, GENDER, BIRTHDAY, PASSWORD, PASSWORD_CONFIRM } =
  CONSTANTS.FIELD_NAMES.SIGNUP_FIELD_NAMES;

export const signupEmailFormValidation = z.object({
  [EMAIL]: z
    .string()
    .min(1, { message: "required" })
    .email({ message: "invalid" })
    .refine((value) => CONSTANTS.REGEX_EMAIL.test(value), {
      message: "invalid"
    })
});

export const signupInfoFormValidation = z
  .object({
    [FULL_NAME]: z
      .string()
      .min(1, { message: "required" })
      .min(2, { message: "minLength" }),
    [GENDER]: z.string().min(1, { message: "required" }),
    [BIRTHDAY]: z.string().min(1, { message: "required" }),
    [PASSWORD]: z
      .string()
      .min(1, { message: "required" })
      .min(8, { message: "minLength" })
      .max(100, { message: "maxLength" })
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { message: "requirements" }),
    [PASSWORD_CONFIRM]: z.string().min(1, { message: "required" })
  })
  .refine((data) => data[PASSWORD] === data[PASSWORD_CONFIRM], {
    message: "mismatch",
    path: [PASSWORD_CONFIRM]
  });

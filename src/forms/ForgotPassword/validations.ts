// libs
import * as z from "zod";
// constants
import CONSTANTS from "@/constants";

const { NEW_PASSWORD, CONFIRM_PASSWORD } =
  CONSTANTS.FIELD_NAMES.FORGOT_PASSWORD_FIELD_NAMES;

export const newPasswordValidation = z
  .object({
    [NEW_PASSWORD]: z
      .string()
      .min(1, { message: "required" })
      .min(8, { message: "minLength" })
      .max(100, { message: "maxLength" })
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { message: "requirements" }),
    [CONFIRM_PASSWORD]: z.string().min(1, { message: "required" })
  })
  .refine((data) => data[NEW_PASSWORD] === data[CONFIRM_PASSWORD], {
    message: "mismatch",
    path: [CONFIRM_PASSWORD]
  });

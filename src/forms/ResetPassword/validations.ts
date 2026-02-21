// libs
import * as z from "zod";
// constants
import CONSTANTS from "@/constants";

const { NEW_PASSWORD, CONFIRM_PASSWORD } =
  CONSTANTS.FIELD_NAMES.FORGOT_PASSWORD_FIELD_NAMES;

export const resetPasswordValidation = z
  .object({
    [NEW_PASSWORD]: z
      .string()
      .min(1, "required")
      .min(8, "minLength")
      .max(100, "maxLength")
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "requirements"),
    [CONFIRM_PASSWORD]: z.string().min(1, "required")
  })
  .refine((data) => data[NEW_PASSWORD] === data[CONFIRM_PASSWORD], {
    message: "mismatch",
    path: [CONFIRM_PASSWORD]
  });

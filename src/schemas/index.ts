// libs
import * as z from "zod";

const SAFE_EMAIL_PATTERN =
  // eslint-disable-next-line no-control-regex
  /^[^\u0000-\u001F\u007F-\u009F\u200B-\u200D\u202A-\u202E\uFEFF]+$/;

export const emailSchema = z
  .string()
  .min(1, { message: "required" })
  .min(3, { message: "minLength" })
  .max(254, { message: "maxLength" })
  .email({ message: "invalid" })
  .regex(SAFE_EMAIL_PATTERN, { message: "invalid" });

export const passwordSchema = z
  .string()
  .min(1, { message: "required" })
  .min(8, { message: "minLength" })
  .max(128, { message: "maxLength" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "requirements"
  });

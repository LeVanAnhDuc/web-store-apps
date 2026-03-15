// libs
import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(1, { message: "required" })
  .min(8, { message: "minLength" })
  .max(128, { message: "maxLength" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "requirements"
  });

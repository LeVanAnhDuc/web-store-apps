// libs
import * as z from "zod";
// dataSources
import { PRIORITY_VALUES } from "@/dataSources/ContactAdmin";
// others
import CONSTANTS from "@/constants";

const { EMAIL, SUBJECT, CATEGORY, PRIORITY, MESSAGE } =
  CONSTANTS.FIELD_NAMES.CONTACT_ADMIN_FIELD_NAMES;

export const contactAdminValidation = z.object({
  [EMAIL]: z
    .string()
    .email({ message: "invalid" })
    .refine((value) => CONSTANTS.REGEX_EMAIL.test(value), {
      message: "invalid"
    })
    .optional()
    .or(z.literal("")),
  [SUBJECT]: z
    .string()
    .min(1, { message: "required" })
    .min(5, { message: "minLength" }),
  [CATEGORY]: z.string().min(1, { message: "required" }),
  [PRIORITY]: z.enum(PRIORITY_VALUES),
  [MESSAGE]: z
    .string()
    .min(1, { message: "required" })
    .min(20, { message: "minLength" })
});

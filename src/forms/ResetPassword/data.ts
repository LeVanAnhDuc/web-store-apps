// types
import type { ResetPasswordFormValues } from "@/types/ResetPassword";
// constants
import CONSTANTS from "@/constants";

const { NEW_PASSWORD, CONFIRM_PASSWORD } =
  CONSTANTS.FIELD_NAMES.FORGOT_PASSWORD_FIELD_NAMES;

export const initialResetPasswordFormData: ResetPasswordFormValues = {
  [NEW_PASSWORD]: "",
  [CONFIRM_PASSWORD]: ""
};

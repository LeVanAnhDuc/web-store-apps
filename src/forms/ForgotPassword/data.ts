// types
import type { NewPasswordFormValues } from "@/types/ForgotPassword";
// others
import CONSTANTS from "@/constants";

const { NEW_PASSWORD, CONFIRM_PASSWORD } =
  CONSTANTS.FIELD_NAMES.FORGOT_PASSWORD_FIELD_NAMES;

export const initialNewPasswordFormData: NewPasswordFormValues = {
  [NEW_PASSWORD]: "",
  [CONFIRM_PASSWORD]: ""
};

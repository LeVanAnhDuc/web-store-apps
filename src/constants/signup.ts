export const GENDER_VALUES = [
  "male",
  "female",
  "other",
  "prefer_not_to_say"
] as const;

const SIGNUP_CONSTANTS = {
  OTP_LENGTH: 6,
  RESEND_COUNTDOWN: 60,
  SIGNUP_EMAIL_PARAM: "email",
  SIGNUP_SESSION_PARAM: "sessionToken",
  AGE_VALIDATION: {
    MIN_AGE: 13,
    MAX_AGE: 120
  }
};

export default SIGNUP_CONSTANTS;

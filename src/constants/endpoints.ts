const END_POINTS = {
  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGIN_OTP_SEND: "/auth/login/otp/send",
  AUTH_LOGIN_OTP_VERIFY: "/auth/login/otp/verify",
  AUTH_LOGIN_MAGIC_LINK_SEND: "/auth/login/magic-link/send",
  AUTH_LOGIN_MAGIC_LINK_VERIFY: "/auth/login/magic-link/verify",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_REFRESH: "/auth/refresh",

  // Signup
  AUTH_SIGNUP_SEND_OTP: "/auth/signup/send-otp",
  AUTH_SIGNUP_VERIFY_OTP: "/auth/signup/verify-otp",
  AUTH_SIGNUP_RESEND_OTP: "/auth/signup/resend-otp",
  AUTH_SIGNUP_COMPLETE: "/auth/signup/complete",
  AUTH_SIGNUP_CHECK_EMAIL: "/auth/signup/check-email",

  // Forgot Password
  AUTH_FORGOT_PASSWORD_OTP_SEND: "/auth/forgot-password/otp/send",
  AUTH_FORGOT_PASSWORD_OTP_VERIFY: "/auth/forgot-password/otp/verify",
  AUTH_FORGOT_PASSWORD_MAGIC_LINK_SEND: "/auth/forgot-password/magic-link/send",
  AUTH_FORGOT_PASSWORD_MAGIC_LINK_VERIFY:
    "/auth/forgot-password/magic-link/verify",
  AUTH_FORGOT_PASSWORD_RESET: "/auth/forgot-password/reset",

  // Users
  USERS_ME: "/users/me",
  USERS_ME_AVATAR: "/users/me/avatar",
  USERS_BY_ID: "/users",

  // Contact
  CONTACT_SUBMIT: "/contact/submit",
  ADMIN_CONTACTS: "/admin/contacts",
  AUTH_CONTACTS_ME: "/auth/contacts/me",

  // Login History
  LOGIN_HISTORY: "/login-history",
  ADMIN_LOGIN_HISTORY: "/admin/login-history"
};

export default END_POINTS;

import type { routing } from "@/i18n/routing";
import type { formats } from "@/i18n/request";
import type messages from "@/locales/en/index";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

// Export inferred message types for reuse
export type Messages = typeof messages;
export type LoginMessages = Messages["login"];
export type CommonMessages = Messages["common"];
export type SignupMessages = Messages["signup"];
export type ForgotPasswordMessages = Messages["forgotPassword"];
export type ResetPasswordMessages = Messages["resetPassword"];
export type ContactAdminMessages = Messages["contactAdmin"];

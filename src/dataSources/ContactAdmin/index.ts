// types
import type { ContactStatus, ContactCategory } from "@/types/ContactAdmin";

export const NEXT_STEPS = [
  {
    key: "step2",
    bgClass: "bg-primary",
    textClass: "text-primary-foreground"
  },
  {
    key: "step3",
    bgClass: "bg-success",
    textClass: "text-success-foreground"
  }
] as const;

export const CONTACT_STATUS_VARIANT: Record<
  ContactStatus,
  "warning" | "info" | "success"
> = {
  new: "warning",
  processing: "info",
  resolved: "success"
};

export const CONTACT_CATEGORY_VALUES: ContactCategory[] = [
  "account",
  "technical",
  "feature",
  "billing",
  "security",
  "other"
];

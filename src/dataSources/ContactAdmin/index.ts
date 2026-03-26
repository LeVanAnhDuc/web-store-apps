// types
import type { ContactStatus, ContactCategory } from "@/types/ContactAdmin";

export const NEXT_STEPS = [
  {
    key: "step2",
    color: "from-primary to-primary/80",
    textColor: "text-primary-foreground"
  },
  {
    key: "step3",
    color: "from-success to-success/80",
    textColor: "text-success-foreground"
  }
] as const;

export const CONTACT_STATUS_VARIANT: Record<
  ContactStatus,
  "default" | "secondary" | "outline"
> = {
  new: "default",
  processing: "secondary",
  resolved: "outline"
};

export const CONTACT_CATEGORY_VALUES: ContactCategory[] = [
  "account",
  "technical",
  "feature",
  "billing",
  "security",
  "other"
];

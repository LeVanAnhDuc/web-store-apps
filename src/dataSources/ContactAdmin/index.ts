// types
import type { ContactStatus, ContactCategory } from "@/types/ContactAdmin";
import type { ListFilterDef } from "@/types/List";

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

export const buildAdminContactFilterDefs = (
  tStatus: (k: string) => string,
  tCategory: (k: string) => string,
  labels: {
    status: string;
    category: string;
    email: string;
    ticketNumber: string;
    dateRange: string;
    emailPh: string;
    ticketPh: string;
  }
): ListFilterDef[] => [
  {
    key: "status",
    type: "select",
    label: labels.status,
    options: (["new", "processing", "resolved"] as const).map((s) => ({
      value: s,
      label: tStatus(s)
    }))
  },
  {
    key: "category",
    type: "select",
    label: labels.category,
    options: CONTACT_CATEGORY_VALUES.map((c) => ({
      value: c,
      label: tCategory(c)
    }))
  },
  {
    key: "email",
    type: "text",
    label: labels.email,
    placeholder: labels.emailPh
  },
  {
    key: "ticketNumber",
    type: "text",
    label: labels.ticketNumber,
    placeholder: labels.ticketPh
  },
  { key: "dateRange", type: "dateRange", label: labels.dateRange }
];

// types
import type { ContactStatus } from "@/types/ContactAdmin";
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

export const buildAdminContactFilterDefs = (
  tStatus: (k: string) => string,
  labels: {
    status: string;
    email: string;
    dateRange: string;
    emailPh: string;
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
    key: "email",
    type: "text",
    label: labels.email,
    placeholder: labels.emailPh
  },
  { key: "dateRange", type: "dateRange", label: labels.dateRange }
];

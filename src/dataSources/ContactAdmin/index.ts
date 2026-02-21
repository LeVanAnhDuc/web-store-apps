export const CATEGORIES = [
  "account",
  "technical",
  "feature",
  "billing",
  "security",
  "other"
] as const;

export const PRIORITY_VALUES = ["low", "medium", "high"] as const;

export type Priority = (typeof PRIORITY_VALUES)[number];

export const PRIORITIES: Record<
  Priority,
  { colorClass: string; styleClass: string }
> = {
  low: {
    colorClass: "text-success",
    styleClass: "bg-success/10 text-success"
  },
  medium: {
    colorClass: "text-warning-foreground",
    styleClass: "bg-warning/20 text-warning-foreground"
  },
  high: {
    colorClass: "text-destructive",
    styleClass: "bg-destructive/10 text-destructive"
  }
};

export const NEXT_STEPS = [
  {
    key: "step1",
    color: "from-info to-info/80",
    textColor: "text-info-foreground"
  },
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

export const CATEGORIES = [
  "account",
  "technical",
  "feature",
  "billing",
  "security",
  "other"
] as const;

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

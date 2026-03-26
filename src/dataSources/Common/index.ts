// types
import type { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

export type ColorVariant = "primary" | "info" | "success" | "cream";

export const COLOR_VARIANT_CLASSES: Record<ColorVariant, string> = {
  primary: "bg-primary/10 group-hover:bg-primary/20 text-primary",
  info: "bg-info/10 group-hover:bg-info/20 text-info",
  success: "bg-success/10 group-hover:bg-success/20 text-success",
  cream: "bg-cream group-hover:bg-cream/80 text-cream-foreground"
};

export const DISABLED_CLASSES = "bg-muted text-muted-foreground";

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export const BUTTON_SIZE_TEXT_CLASSES: Record<ButtonSize, string> = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-base",
  icon: "",
  "icon-sm": "",
  "icon-lg": ""
};

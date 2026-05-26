// types
import type { LucideIcon } from "lucide-react";
// libs
import { Headphones, Keyboard, LifeBuoy } from "lucide-react";

export type UtilityMenuKey = "keyboardShortcuts" | "helpCenter" | "support";

export interface UtilityMenuItem {
  key: UtilityMenuKey;
  icon: LucideIcon;
  href?: string;
}

export const UTILITY_MENU_ITEMS: readonly UtilityMenuItem[] = [
  { key: "keyboardShortcuts", icon: Keyboard },
  { key: "helpCenter", icon: LifeBuoy },
  { key: "support", icon: Headphones }
] as const;

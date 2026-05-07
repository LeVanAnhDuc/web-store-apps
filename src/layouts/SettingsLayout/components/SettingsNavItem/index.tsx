// libs
import type { LucideIcon } from "lucide-react";
// others
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/libs/utils";

const SettingsNavItem = ({
  icon: Icon,
  label,
  href
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "focus-visible:ring-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
        isActive
          ? "bg-primary text-primary-foreground shadow-primary/30 shadow-md"
          : "text-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="flex-1 truncate">{label}</span>
    </Link>
  );
};

export default SettingsNavItem;

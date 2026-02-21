// libs
import type { LucideIcon } from "lucide-react";
// components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// i18n
import { Link } from "@/i18n/navigation";

const MenuItemBase = ({
  icon: Icon,
  label,
  description,
  onClick,
  href
}: {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick?: () => void;
  href?: string;
}) => {
  const content = (
    <div className="flex w-full items-center gap-3">
      <div className="group-hover:text-accent-foreground group-hover:bg-accent dark:group-hover:bg-accent/50 flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300">
        <Icon className="text-muted-foreground group-hover:text-accent-foreground size-4 transition-colors duration-300" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm font-medium transition-colors duration-300">
          {label}
        </p>
        <p className="text-muted-foreground truncate text-xs transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <DropdownMenuItem
        asChild
        className="group focus:bg-accent focus:text-accent-foreground dark:focus:bg-accent/50 cursor-pointer px-3 py-2 transition-colors duration-300"
      >
        <Link href={href}>{content}</Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      onClick={onClick}
      className="group focus:bg-accent focus:text-accent-foreground dark:focus:bg-accent/50 cursor-pointer px-3 py-2 transition-colors duration-300"
    >
      {content}
    </DropdownMenuItem>
  );
};

export default MenuItemBase;

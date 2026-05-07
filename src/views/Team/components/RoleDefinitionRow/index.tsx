// libs
import type { LucideIcon } from "lucide-react";
// components
import { Badge } from "@/components/ui/badge";
// others
import { cn } from "@/libs/utils";

const RoleDefinitionRow = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  isYou,
  youLabel
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  isYou?: boolean;
  youLabel: string;
}) => (
  <div className="border-border flex items-start gap-4 border-b px-6 py-4 last:border-b-0">
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl",
        iconBg,
        iconColor
      )}
      aria-hidden="true"
    >
      <Icon className="size-4" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-foreground text-sm font-semibold">{title}</p>
        {isYou ? (
          <Badge
            variant="secondary"
            className="bg-primary/15 text-primary rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase"
          >
            {youLabel}
          </Badge>
        ) : null}
      </div>
      <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
    </div>
  </div>
);

export default RoleDefinitionRow;

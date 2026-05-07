// libs
import type { LucideIcon } from "lucide-react";
// others
import { cn } from "@/libs/utils";

const NotificationItem = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  timestamp,
  isRead
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}) => (
  <article
    aria-label={title}
    className={cn(
      "border-border flex items-start gap-3 border-b px-5 py-4",
      !isRead && "bg-info/5"
    )}
  >
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full",
        iconBg,
        iconColor
      )}
      aria-hidden="true"
    >
      <Icon className="size-4" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <span className="text-muted-foreground shrink-0 text-xs">
          {timestamp}
        </span>
      </div>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
    </div>
    {!isRead ? (
      <span
        className="bg-info mt-2 size-2 shrink-0 rounded-full"
        aria-label="Unread"
      />
    ) : null}
  </article>
);

export default NotificationItem;

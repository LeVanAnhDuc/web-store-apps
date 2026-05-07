"use client";

// components
import { Switch } from "@/components/ui/switch";

const NotificationToggleRow = ({
  id,
  title,
  description,
  checked,
  onCheckedChange
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}) => (
  <div className="border-border flex items-start justify-between gap-4 border-b px-6 py-4 last:border-b-0">
    <div className="min-w-0 flex-1">
      <label
        htmlFor={id}
        className="text-foreground block cursor-pointer text-sm font-semibold"
      >
        {title}
      </label>
      <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
    </div>
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={title}
    />
  </div>
);

export default NotificationToggleRow;

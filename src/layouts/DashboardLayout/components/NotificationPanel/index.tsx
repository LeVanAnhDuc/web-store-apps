"use client";

// libs
import { useState } from "react";
import { CircleCheck, CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { NotificationPanelTab } from "@/types/Notification";
// components
import CustomButton from "@/components/CustomButton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { NOTIFICATIONS_MOCK } from "@/mocks/Dashboard";
import { cn } from "@/libs/utils";
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const NotificationPanel = ({ onNavigate }: { onNavigate?: () => void }) => {
  const router = useRouter();
  const t = useTranslations("dashboard.notifications");
  const { announce } = useAnnounce();
  const [activeTab, setActiveTab] = useState<NotificationPanelTab>("all");

  const handleViewAll = () => {
    announce(t("viewAllAnnounce"));
    onNavigate?.();
    router.push(CONSTANTS.ROUTES.NOTIFICATIONS);
  };

  const unreadCount = NOTIFICATIONS_MOCK.filter((n) => !n.isRead).length;

  const filtered =
    activeTab === "unread"
      ? NOTIFICATIONS_MOCK.filter((n) => !n.isRead)
      : NOTIFICATIONS_MOCK;

  return (
    <div className="bg-card border-border flex w-[380px] flex-col overflow-hidden rounded-xl border shadow-lg">
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-base font-semibold">
            {t("title")}
          </span>
          <Badge className="flex h-5 items-center justify-center rounded-full px-2 text-xs">
            {unreadCount}
          </Badge>
          <div className="flex-1" />
          <CustomButton
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-auto p-0 text-sm font-normal"
          >
            {t("markAllRead")}
          </CustomButton>
        </div>
        <div className="flex">
          {(["all", "unread", "mentions"] as const).map((tab) => (
            <CustomButton
              key={tab}
              variant="ghost"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-auto rounded-none px-3 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "text-foreground border-foreground border-b-2"
                  : "text-muted-foreground"
              )}
            >
              {t(tab)}
            </CustomButton>
          ))}
        </div>
      </div>
      <ScrollArea className="max-h-[360px]">
        <div className="px-2 py-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={cn(
                "hover:bg-muted/50 relative flex cursor-pointer items-start gap-3 rounded-lg px-2 py-3 transition-colors",
                item.isRead && "opacity-50"
              )}
            >
              {!item.isRead && (
                <span className="absolute top-1/2 left-1 size-2 -translate-y-1/2 rounded-full bg-blue-500" />
              )}
              {item.avatar.kind === "initials" ? (
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${item.avatar.gradientFrom}, ${item.avatar.gradientTo})`
                  }}
                >
                  <span className="text-sm font-semibold text-white">
                    {item.avatar.initials}
                  </span>
                </div>
              ) : (
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: item.avatar.bgColor }}
                >
                  {item.type === "alert" ? (
                    <CircleAlert
                      className="size-5"
                      style={{ color: "#EF4444" }}
                    />
                  ) : (
                    <CircleCheck
                      className="size-5"
                      style={{ color: "#10B981" }}
                    />
                  )}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-foreground truncate text-sm font-semibold">
                    {item.title}
                  </span>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {item.time}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-sm leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="flex justify-center px-4 py-3">
        <CustomButton
          variant="ghost"
          size="sm"
          className="text-sm font-medium"
          onClick={handleViewAll}
        >
          {t("viewAll")}
        </CustomButton>
      </div>
    </div>
  );
};

export default NotificationPanel;

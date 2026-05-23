"use client";

// libs
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { NotificationListTabValue } from "@/types/Notification";
// components
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CustomButton from "@/components/CustomButton";
import NotificationItem from "../../components/NotificationItem";
import GroupHeader from "../../components/GroupHeader";
// hooks
import { useAnnounce } from "@/hooks";
// others
import {
  NOTIFICATIONS_LIST_MOCK,
  type NotificationItemMock,
  type NotificationGroup
} from "@/mocks/Notifications";

const NotificationList = ({
  itemsOverride
}: {
  itemsOverride?: readonly NotificationItemMock[];
}) => {
  const t = useTranslations("notifications");
  const tItems = useTranslations("notifications.items");
  const tGroups = useTranslations("notifications.groups");
  const { announce } = useAnnounce();
  const [tab, setTab] = useState<NotificationListTabValue>("unread");
  const items = itemsOverride ?? NOTIFICATIONS_LIST_MOCK;

  const filtered = useMemo(
    () => items.filter((it) => (tab === "unread" ? !it.isRead : it.isRead)),
    [items, tab]
  );

  const grouped = useMemo(() => {
    const groups: Record<NotificationGroup, NotificationItemMock[]> = {
      today: [],
      yesterday: [],
      earlier: []
    };
    filtered.forEach((it) => groups[it.group].push(it));
    return groups;
  }, [filtered]);

  const unreadCount = items.filter((it) => !it.isRead).length;

  const handleTabChange = (value: string) => {
    const next = value as NotificationListTabValue;
    setTab(next);
    announce(t("announce.tabChanged", { tab: t(`tabs.${next}`) }));
  };

  return (
    <Card className="overflow-hidden rounded-none border-x-0 border-t-0 border-b p-0">
      <Tabs value={tab} onValueChange={handleTabChange}>
        <div className="border-border bg-card border-b px-6 py-2">
          <TabsList>
            <TabsTrigger value="unread">
              {t("tabs.unread")}
              {unreadCount > 0 ? (
                <span className="bg-primary text-primary-foreground ml-1.5 inline-flex size-4 items-center justify-center rounded-full text-xs font-semibold">
                  {unreadCount}
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="read">{t("tabs.read")}</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={tab} className="m-0">
          {(["today", "yesterday", "earlier"] as NotificationGroup[]).map(
            (group) =>
              grouped[group].length > 0 ? (
                <div key={group}>
                  <GroupHeader label={tGroups(group)} />
                  {grouped[group].map((item) => (
                    <NotificationItem
                      key={item.id}
                      icon={item.icon}
                      iconBg={item.iconBg}
                      iconColor={item.iconColor}
                      title={tItems(`${item.itemKey}.title`)}
                      description={tItems(`${item.itemKey}.description`)}
                      timestamp={item.timestamp}
                      isRead={item.isRead}
                    />
                  ))}
                </div>
              ) : null
          )}
          <div className="flex items-center justify-center px-5 py-5">
            <CustomButton variant="outline" size="sm">
              {t("actions.loadMore")}
            </CustomButton>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default NotificationList;

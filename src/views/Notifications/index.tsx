"use client";

// libs
import { useState } from "react";
// components
import PageHeader from "./mains/PageHeader";
import NotificationList from "./mains/NotificationList";
// others
import {
  NOTIFICATIONS_LIST_MOCK,
  type NotificationItemMock
} from "@/mocks/Notifications";

const Notifications = () => {
  const [items, setItems] = useState<readonly NotificationItemMock[]>(
    NOTIFICATIONS_LIST_MOCK
  );

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((it) => ({ ...it, isRead: true })));
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader onMarkAllRead={handleMarkAllRead} />
      <NotificationList itemsOverride={items} />
    </div>
  );
};

export default Notifications;

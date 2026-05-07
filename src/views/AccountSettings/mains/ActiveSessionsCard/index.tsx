"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import SessionRow from "../../components/SessionRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import {
  ACTIVE_SESSIONS_MOCK,
  type ActiveSessionMock
} from "@/mocks/AccountSettings";

const ActiveSessionsCard = () => {
  const t = useTranslations("accountSettings.sessions");
  const { announce } = useAnnounce();
  const [sessions, setSessions] =
    useState<readonly ActiveSessionMock[]>(ACTIVE_SESSIONS_MOCK);

  const handleRevoke = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    announce(t("announce.revoked"));
  };

  return (
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="active-sessions-title"
    >
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="active-sessions-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="flex flex-col">
        {sessions.map((session) => (
          <SessionRow
            key={session.id}
            icon={session.icon}
            device={session.device}
            location={session.location}
            lastActive={session.lastActive}
            isCurrent={session.isCurrent}
            activeLabel={t("active")}
            revokeLabel={t("buttons.revoke")}
            onRevoke={() => handleRevoke(session.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default ActiveSessionsCard;

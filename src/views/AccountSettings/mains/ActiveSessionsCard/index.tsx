"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
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
    <Card aria-labelledby="active-sessions-title">
      <CardHeader className="border-b">
        <h3
          id="active-sessions-title"
          className="text-foreground text-base leading-none font-semibold"
        >
          {t("title")}
        </h3>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
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
      </CardContent>
    </Card>
  );
};

export default ActiveSessionsCard;

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
import PendingInvitationRow from "../../components/PendingInvitationRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import {
  PENDING_INVITATIONS_MOCK,
  type PendingInvitationMock
} from "@/mocks/Team";

const PendingInvitationsCard = () => {
  const t = useTranslations("team.pending");
  const { announce } = useAnnounce();
  const [invitations, setInvitations] = useState<
    readonly PendingInvitationMock[]
  >(PENDING_INVITATIONS_MOCK);

  const handleRevoke = (id: string) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    announce(t("announce.revoked"));
  };

  if (invitations.length === 0) return null;

  return (
    <Card aria-labelledby="pending-invitations-title">
      <CardHeader className="border-b">
        <h3
          id="pending-invitations-title"
          className="text-foreground text-base leading-none font-semibold"
        >
          {t("title")}
        </h3>
        <CardDescription>
          {t("description", { count: invitations.length })}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {invitations.map((inv) => (
          <PendingInvitationRow
            key={inv.id}
            email={inv.email}
            sentAtLabel={t("sentAt", { date: inv.sentAt })}
            pendingLabel={t("status")}
            revokeLabel={t("buttons.revoke")}
            onRevoke={() => handleRevoke(inv.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingInvitationsCard;

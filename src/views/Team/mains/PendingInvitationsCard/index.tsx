"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
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
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="pending-invitations-title"
    >
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h3
          id="pending-invitations-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h3>
        <p className="text-muted-foreground text-sm">
          {t("description", { count: invitations.length })}
        </p>
      </div>
      <div className="flex flex-col">
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
      </div>
    </Card>
  );
};

export default PendingInvitationsCard;

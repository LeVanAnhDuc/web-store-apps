"use client";

// libs
import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import TeamMemberRow from "../../components/TeamMemberRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { TEAM_MEMBERS_MOCK, type TeamMemberMock } from "@/mocks/Team";

const TeamMembersCard = () => {
  const t = useTranslations("team.members");
  const { announce } = useAnnounce();
  const [members, setMembers] =
    useState<readonly TeamMemberMock[]>(TEAM_MEMBERS_MOCK);

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    announce(t("announce.removed"));
  };

  return (
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="team-members-title"
    >
      <div className="border-border flex items-center justify-between gap-3 border-b px-6 py-5">
        <div className="flex flex-col gap-1">
          <h3
            id="team-members-title"
            className="text-foreground text-base font-semibold"
          >
            {t("title")}
          </h3>
          <p className="text-muted-foreground text-sm">
            {t("description", { count: members.length, limit: 10 })}
          </p>
        </div>
        <CustomButton
          size="sm"
          iconLeft={<Plus className="size-3.5" aria-hidden="true" />}
        >
          {t("buttons.invite")}
        </CustomButton>
      </div>
      <div className="flex flex-col">
        {members.map((member) => (
          <TeamMemberRow
            key={member.id}
            fullName={member.fullName}
            email={member.email}
            initials={member.initials}
            avatarFromColor={member.avatarFromColor}
            avatarToColor={member.avatarToColor}
            role={member.role}
            roleLabel={t(`roles.${member.role}`)}
            removeLabel={t("buttons.remove")}
            showRemove={!member.isYou && member.role !== "owner"}
            onRemove={() => handleRemove(member.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default TeamMembersCard;

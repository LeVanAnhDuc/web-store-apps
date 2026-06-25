"use client";

// libs
import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { TeamMemberMock } from "@/types/Team";
// components
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import CardSectionTitle from "@/components/CardSectionTitle";
import CustomButton from "@/components/CustomButton";
import TeamMemberRow from "../../components/TeamMemberRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { TEAM_MEMBERS_MOCK } from "@/mocks/Team";

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
    <Card aria-labelledby="team-members-title">
      <CardHeader className="border-b">
        <CardSectionTitle id="team-members-title">
          {t("title")}
        </CardSectionTitle>
        <CardDescription>
          {t("description", { count: members.length, limit: 10 })}
        </CardDescription>
        <CardAction>
          <CustomButton
            iconLeft={<Plus className="size-3.5" aria-hidden="true" />}
          >
            {t("buttons.invite")}
          </CustomButton>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
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
      </CardContent>
    </Card>
  );
};

export default TeamMembersCard;

"use client";

// libs
import { useTranslations } from "next-intl";
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import StatBadge from "../../components/StatBadge";
// hooks
import useUserInfo from "@/hooks/useUserInfo";
// others
import { PROFILE_STATS_MOCK } from "@/mocks/Profile";

const ProfileCard = () => {
  const t = useTranslations("profile");
  const userInfo = useUserInfo();

  if (!userInfo) return null;

  return (
    <Card
      className="gap-0 overflow-hidden py-0"
      aria-labelledby="profile-page-title"
    >
      <div className="from-info to-primary relative h-40 bg-gradient-to-r">
        <div className="absolute inset-0 flex items-end justify-end px-6 pb-4">
          <CustomButton
            variant="outline"
            size="sm"
            className="bg-card/95 hover:bg-card"
          >
            {t("card.edit")}
          </CustomButton>
        </div>
      </div>
      <div className="-mt-10 flex flex-col gap-4 px-8 pb-6">
        <div className="flex items-end gap-5">
          <Avatar className="ring-card size-20 shrink-0 ring-4">
            <AvatarImage src={userInfo.avatar ?? ""} alt={userInfo.fullName} />
            <AvatarFallback className="from-cream to-primary text-primary-foreground bg-gradient-to-br text-xl font-bold">
              {userInfo.initials}
            </AvatarFallback>
          </Avatar>
          <div className="mb-2 min-w-0 flex-1">
            <h2 className="text-foreground truncate text-lg font-semibold">
              {userInfo.fullName}
            </h2>
            <p className="text-muted-foreground truncate text-sm">
              {userInfo.email}
            </p>
          </div>
        </div>
      </div>
      <div className="border-border flex flex-wrap items-center gap-2 border-t px-8 py-4">
        <StatBadge>
          {t("card.stats.apps", { count: PROFILE_STATS_MOCK.appsCount })}
        </StatBadge>
        <StatBadge>
          {t("card.stats.teams", { count: PROFILE_STATS_MOCK.teamsCount })}
        </StatBadge>
        <StatBadge>
          {t("card.stats.plan", { plan: PROFILE_STATS_MOCK.planName })}
        </StatBadge>
      </div>
    </Card>
  );
};

export default ProfileCard;

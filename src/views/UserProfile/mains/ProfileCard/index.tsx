"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileCardSkeleton from "../../components/ProfileCardSkeleton";
import ProfileFields from "../../components/ProfileFields";
// requests
import { getMyProfile } from "@/requests/user";
// others
import { getInitials } from "@/utils";

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, { dateStyle: "long" })
    : null;

const ProfileCard = () => {
  const t = useTranslations("user.profile");
  const { data: profile, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile
  });

  if (isLoading) return <ProfileCardSkeleton />;

  if (!profile) return null;

  const initials = getInitials(profile.fullName);

  const fields: { label: string; value: string | null }[] = [
    { label: t("fields.email"), value: profile.email },
    { label: t("fields.phone"), value: profile.phone },
    { label: t("fields.address"), value: profile.address },
    {
      label: t("fields.dateOfBirth"),
      value: formatDate(profile.dateOfBirth)
    },
    {
      label: t("fields.gender"),
      value: profile.gender ? t(`gender.${profile.gender}`) : null
    },
    {
      label: t("fields.createdAt"),
      value: formatDate(profile.createdAt)
    }
  ];

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex flex-col items-center gap-3 border-b pb-6">
        <Avatar className="ring-border size-24 ring-2">
          <AvatarImage src={profile.avatar ?? ""} alt={profile.fullName} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-foreground text-xl font-semibold">
            {profile.fullName}
          </h2>
          <p className="text-muted-foreground text-sm">{profile.email}</p>
        </div>
      </div>
      <ProfileFields fields={fields} />
    </div>
  );
};

export default ProfileCard;

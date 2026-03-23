// libs
import { getTranslations } from "next-intl/server";
// components
import AvatarUpload from "./mains/AvatarUpload";
import ProfileCard from "./mains/ProfileCard";

const UserProfile = async () => {
  const t = await getTranslations("user.profile");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
      </div>
      <AvatarUpload />
      <ProfileCard />
    </div>
  );
};

export default UserProfile;

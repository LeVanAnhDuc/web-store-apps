// libs
import { getTranslations } from "next-intl/server";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import CardSectionTitle from "@/components/CardSectionTitle";
import RoleDefinitionRow from "../../components/RoleDefinitionRow";
// others
import { ROLE_DEFINITIONS_MOCK } from "@/mocks/Team";

const RolesCard = async () => {
  const t = await getTranslations("team.roles");
  return (
    <Card aria-labelledby="roles-title">
      <CardHeader className="border-b">
        <CardSectionTitle id="roles-title">{t("title")}</CardSectionTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {ROLE_DEFINITIONS_MOCK.map((role) => (
          <RoleDefinitionRow
            key={role.key}
            icon={role.icon}
            iconBg={role.iconBg}
            iconColor={role.iconColor}
            title={t(`items.${role.key}.title`)}
            description={t(`items.${role.key}.description`)}
            isYou={role.key === "owner"}
            youLabel={t("you")}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default RolesCard;

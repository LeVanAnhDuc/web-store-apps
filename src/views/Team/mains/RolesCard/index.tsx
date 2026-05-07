// libs
import { getTranslations } from "next-intl/server";
// components
import { Card } from "@/components/ui/card";
import RoleDefinitionRow from "../../components/RoleDefinitionRow";
// others
import { ROLE_DEFINITIONS_MOCK } from "@/mocks/Team";

const RolesCard = async () => {
  const t = await getTranslations("team.roles");
  return (
    <Card className="rounded-2xl border p-0" aria-labelledby="roles-title">
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="roles-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="flex flex-col">
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
      </div>
    </Card>
  );
};

export default RolesCard;

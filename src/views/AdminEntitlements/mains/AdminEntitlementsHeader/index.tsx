// libs
import { getTranslations } from "next-intl/server";

const AdminEntitlementsHeader = async () => {
  const t = await getTranslations("adminEntitlements");
  return (
    <div>
      <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
    </div>
  );
};

export default AdminEntitlementsHeader;

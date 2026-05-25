// libs
import { getTranslations } from "next-intl/server";
// components
import AdminStubCard from "@/components/AdminStubCard";

const AdminContacts = async () => {
  const t = await getTranslations("adminContacts");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>
      <AdminStubCard />
    </div>
  );
};

export default AdminContacts;

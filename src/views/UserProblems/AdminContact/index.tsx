// libs
import { getTranslations } from "next-intl/server";
// components
import AdminContactFilters from "./mains/AdminContactFilters";
import AdminContactTable from "./mains/AdminContactTable";

const AdminContact = async () => {
  const t = await getTranslations("contactAdmin.admin.list");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>
      <AdminContactFilters />
      <AdminContactTable />
    </div>
  );
};

export default AdminContact;

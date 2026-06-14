// libs
import { getTranslations } from "next-intl/server";
// components
import PageTitle from "@/components/PageTitle";
import MyContactsTable from "./mains/MyContactsTable";

const MyContacts = async () => {
  const t = await getTranslations("contactAdmin.myContacts");

  return (
    <div className="space-y-6 p-6">
      <div>
        <PageTitle>{t("title")}</PageTitle>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>
      <MyContactsTable />
    </div>
  );
};

export default MyContacts;

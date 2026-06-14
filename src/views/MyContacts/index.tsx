// libs
import { getTranslations } from "next-intl/server";
// components
import PageTitle from "@/components/PageTitle";
import MyContactsTable from "./mains/MyContactsTable";

const MyContacts = async () => {
  const t = await getTranslations("contactAdmin.myContacts");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <PageTitle>{t("title")}</PageTitle>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <MyContactsTable />
    </div>
  );
};

export default MyContacts;

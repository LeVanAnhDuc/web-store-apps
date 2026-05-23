// libs
import { getTranslations } from "next-intl/server";
// components
import BackLink from "@/components/BackLink";
import ContactDetailCard from "./mains/ContactDetailCard";
import ContactAttachments from "./mains/ContactAttachments";
// others
import CONSTANTS from "@/constants";

const { ADMIN_CONTACTS } = CONSTANTS.ROUTES;

const AdminContactDetail = async ({ id }: { id: string }) => {
  const t = await getTranslations("contactAdmin.admin.detail");

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3">
        <BackLink href={ADMIN_CONTACTS} label={t("back")} />
        <h1 className="text-foreground text-2xl font-bold tracking-tight">
          {t("title")}
        </h1>
      </div>
      <ContactDetailCard id={id} />
      <ContactAttachments id={id} />
    </div>
  );
};

export default AdminContactDetail;

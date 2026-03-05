// libs
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
// components
import ContactDetailCard from "./mains/ContactDetailCard";
import ContactAttachments from "./mains/ContactAttachments";
import { Link } from "@/i18n/navigation";
// others
import CONSTANTS from "@/constants";

const { ADMIN_CONTACTS } = CONSTANTS.ROUTES;

const AdminContactDetail = async ({ id }: { id: string }) => {
  const t = await getTranslations("contactAdmin.admin.detail");

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link
          href={ADMIN_CONTACTS}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft className="size-4" />
          {t("back")}
        </Link>
      </div>
      <ContactDetailCard id={id} />
      <ContactAttachments id={id} />
    </div>
  );
};

export default AdminContactDetail;

"use client";

// libs
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import { Link } from "@/i18n/navigation";
// others
import CONSTANTS from "@/constants";

const { CONTACT_ADMIN } = CONSTANTS.ROUTES;

const MyContactsTable = () => {
  const tTable = useTranslations("contactAdmin.myContacts.table");
  const t = useTranslations("contactAdmin.myContacts");

  return (
    <div className="bg-card rounded-xl border p-12 text-center">
      <p className="text-muted-foreground mb-4 text-sm">{tTable("empty")}</p>
      <Link href={CONTACT_ADMIN}>
        <CustomButton size="sm">{t("submitNew")}</CustomButton>
      </Link>
    </div>
  );
};

export default MyContactsTable;

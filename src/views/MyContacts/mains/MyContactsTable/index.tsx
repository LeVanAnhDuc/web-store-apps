"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import SupportDialog from "@/components/SupportDialog";

const MyContactsTable = () => {
  const tTable = useTranslations("contactAdmin.myContacts.table");
  const t = useTranslations("contactAdmin.myContacts");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-card rounded-xl border p-12 text-center">
        <p className="text-muted-foreground mb-4 text-sm">{tTable("empty")}</p>
        <CustomButton size="sm" onClick={() => setOpen(true)}>
          {t("submitNew")}
        </CustomButton>
      </div>
      <SupportDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default MyContactsTable;

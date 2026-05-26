// libs
import { getTranslations } from "next-intl/server";
// components
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
// dataSources
import { ADMIN_CONTACT_DETAIL_BREADCRUMB } from "@/dataSources/AdminContactDetail";

const AdminContactDetailHeader = async () => {
  const t = await getTranslations("contactAdmin.admin.detail");
  return (
    <div className="flex flex-col gap-3">
      <CustomBreadcrumb
        items={ADMIN_CONTACT_DETAIL_BREADCRUMB}
        namespace="contactAdmin.admin.detail.breadcrumb"
      />
      <h1 className="text-foreground text-2xl font-bold tracking-tight">
        {t("title")}
      </h1>
    </div>
  );
};

export default AdminContactDetailHeader;

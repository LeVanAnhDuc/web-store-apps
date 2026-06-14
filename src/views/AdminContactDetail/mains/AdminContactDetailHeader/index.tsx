// libs
import { getTranslations } from "next-intl/server";
// components
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import PageTitle from "@/components/PageTitle";
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
      <PageTitle>{t("title")}</PageTitle>
    </div>
  );
};

export default AdminContactDetailHeader;

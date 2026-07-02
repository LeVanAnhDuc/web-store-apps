// libs
import { getTranslations } from "next-intl/server";
// components
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import PageTitle from "@/components/PageTitle";
// dataSources
import { buildAdminContactDetailBreadcrumb } from "@/dataSources/AdminContactDetail";

const AdminContactDetailHeader = async ({ id }: { id: string }) => {
  const t = await getTranslations("contactAdmin.admin.detail");
  return (
    <div className="flex flex-col gap-3">
      <CustomBreadcrumb
        items={buildAdminContactDetailBreadcrumb(id)}
        namespace="contactAdmin.admin.detail.breadcrumb"
      />
      <PageTitle>{t("title")}</PageTitle>
    </div>
  );
};

export default AdminContactDetailHeader;

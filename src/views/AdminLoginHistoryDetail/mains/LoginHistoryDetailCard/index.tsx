"use client";

// libs
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
// types
import type { LoginHistoryMethod } from "@/types/LoginHistory";
// components
import CustomBadge from "@/components/CustomBadge";
import LoginHistoryDetailSkeleton from "../../components/LoginHistoryDetailSkeleton";
import DetailField from "../../components/DetailField";
// hooks
import useAdminLoginHistoryDetail from "../../hooks/useAdminLoginHistoryDetail";
// others
import { formatDateTimeMedium } from "@/utils";

const LoginHistoryDetailCard = ({ id }: { id: string }) => {
  const t = useTranslations("loginHistory.admin.detail");
  const tFields = useTranslations("loginHistory.admin.detail.fields");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tDevice = useTranslations("loginHistory.deviceType");

  const { data, isLoading, isError, error } = useAdminLoginHistoryDetail(id);

  if (isLoading) return <LoginHistoryDetailSkeleton />;

  if (isError) {
    const status = isAxiosError(error) ? error.response?.status : undefined;
    const isMissing = status === 404 || status === 400;
    return (
      <div className="bg-card rounded-xl border p-6">
        <p className="text-muted-foreground text-sm">
          {isMissing ? t("notFound") : t("error")}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-card rounded-xl border p-6">
        <p className="text-muted-foreground text-sm">{t("notFound")}</p>
      </div>
    );
  }

  const location =
    data.city !== "UNKNOWN" ? `${data.city}, ${data.country}` : data.country;

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">{data.usernameAttempted}</h2>
          <p className="text-muted-foreground text-sm">
            {formatDateTimeMedium(data.createdAt)}
          </p>
        </div>
        <CustomBadge
          variant={data.status === "success" ? "success" : "warning"}
          className="text-sm"
        >
          {tStatus(data.status)}
        </CustomBadge>
      </div>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DetailField
          label={tFields("method")}
          value={tMethod(data.method as LoginHistoryMethod)}
        />
        <DetailField label={tFields("status")} value={tStatus(data.status)} />
        {data.userId && (
          <DetailField label={tFields("userId")} value={data.userId} mono />
        )}
        {data.failReason && (
          <DetailField label={tFields("failReason")} value={data.failReason} />
        )}
        <DetailField label={tFields("ip")} value={data.ip} mono />
        <DetailField label={tFields("country")} value={location} />
        <DetailField
          label={tFields("deviceType")}
          value={tDevice(data.deviceType)}
        />
        <DetailField label={tFields("os")} value={data.os} />
        <DetailField label={tFields("browser")} value={data.browser} />
        <DetailField label={tFields("clientType")} value={data.clientType} />
        {data.timezoneOffset && (
          <DetailField
            label={tFields("timezoneOffset")}
            value={data.timezoneOffset}
          />
        )}
        <DetailField
          label={tFields("isAnomaly")}
          value={data.isAnomaly ? t("anomalyYes") : t("anomalyNo")}
        />
        <DetailField
          label={tFields("anomalyReasons")}
          value={
            data.anomalyReasons.length > 0
              ? data.anomalyReasons.join(", ")
              : t("anomalyNone")
          }
        />
        <DetailField
          label={tFields("userAgent")}
          value={data.userAgent}
          mono
          span
        />
      </dl>
    </div>
  );
};

export default LoginHistoryDetailCard;

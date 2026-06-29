"use client";

// libs
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
// types
import type { LoginHistoryMethod } from "@/types/LoginHistory";
// components
import CustomBadge from "@/components/CustomBadge";
import EntityName from "@/components/EntityName";
import FormatTime from "@/components/FormatTime";
import LoginHistoryDetailSkeleton from "../../components/LoginHistoryDetailSkeleton";
import DetailField from "../../components/DetailField";
// ghosts
import LoginHistoryDetailAnnouncer from "../../ghosts/LoginHistoryDetailAnnouncer";
// hooks
import useAdminLoginHistoryDetail from "../../hooks/useAdminLoginHistoryDetail";
// others

const LoginHistoryDetailCard = ({ id }: { id: string }) => {
  const t = useTranslations("loginHistory.admin.detail");
  const tFields = useTranslations("loginHistory.admin.detail.fields");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tDevice = useTranslations("loginHistory.deviceType");

  const { data, isLoading, isError, error } = useAdminLoginHistoryDetail(id);

  if (isLoading) {
    return (
      <>
        <LoginHistoryDetailAnnouncer
          isLoading={true}
          hasData={false}
          isError={false}
        />
        <LoginHistoryDetailSkeleton />
      </>
    );
  }

  if (isError) {
    const status = isAxiosError(error) ? error.response?.status : undefined;
    const isMissing = status === 404 || status === 400;
    return (
      <>
        <LoginHistoryDetailAnnouncer
          isLoading={false}
          hasData={false}
          isError={true}
        />
        <div className="bg-card rounded-xl border p-6">
          <p className="text-destructive text-sm" role="alert">
            {isMissing ? t("notFound") : t("error")}
          </p>
        </div>
      </>
    );
  }

  if (!data) return null;

  const location =
    data.city !== "UNKNOWN" ? `${data.city}, ${data.country}` : data.country;

  return (
    <>
      <LoginHistoryDetailAnnouncer
        isLoading={false}
        hasData={true}
        isError={false}
      />
      <div className="bg-card rounded-xl border p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <EntityName>{data.usernameAttempted}</EntityName>
            <p className="text-muted-foreground text-sm">
              <FormatTime value={data.createdAt} variant="datetime" />
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
            <DetailField
              label={tFields("failReason")}
              value={data.failReason}
            />
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
    </>
  );
};

export default LoginHistoryDetailCard;

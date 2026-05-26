"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
// types
import type { AdminLoginHistoryFilterFormValues } from "@/types/LoginHistory";
// components
import CustomButton from "@/components/CustomButton";
import StatusFilter from "../../components/StatusFilter";
import MethodFilter from "../../components/MethodFilter";
import CountryFilter from "../../components/CountryFilter";
import CityFilter from "../../components/CityFilter";
import FromDateFilter from "../../components/FromDateFilter";
import ToDateFilter from "../../components/ToDateFilter";
import UserIdFilter from "../../components/UserIdFilter";
import IpFilter from "../../components/IpFilter";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { useRouter, usePathname } from "@/i18n/navigation";

const AdminLoginHistoryFilters = () => {
  const t = useTranslations("loginHistory.filters");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tAnnounce = useTranslations("loginHistory.announce");
  const { announce } = useAnnounce();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const methods = useForm<AdminLoginHistoryFilterFormValues>({
    defaultValues: {
      status: searchParams.get("status") ?? "",
      method: searchParams.get("method") ?? "",
      country: searchParams.get("country") ?? "",
      city: searchParams.get("city") ?? "",
      fromDate: searchParams.get("fromDate") ?? "",
      toDate: searchParams.get("toDate") ?? "",
      userId: searchParams.get("userId") ?? "",
      ip: searchParams.get("ip") ?? ""
    }
  });

  const onSubmit = (data: AdminLoginHistoryFilterFormValues) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (data.status) params.set("status", data.status);
    if (data.method) params.set("method", data.method);
    if (data.country) params.set("country", data.country);
    if (data.city) params.set("city", data.city);
    if (data.fromDate) params.set("fromDate", data.fromDate);
    if (data.toDate) params.set("toDate", data.toDate);
    if (data.userId) params.set("userId", data.userId);
    if (data.ip) params.set("ip", data.ip);
    announce(tAnnounce("filterApplied"));
    router.push(`${pathname}?${params.toString()}`);
  };

  const onClear = () => {
    methods.reset({
      status: "",
      method: "",
      country: "",
      city: "",
      fromDate: "",
      toDate: "",
      userId: "",
      ip: ""
    });
    announce(tAnnounce("filterCleared"));
    router.push(pathname);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        role="search"
        aria-label={t("title")}
        className="bg-card rounded-xl border p-4"
      >
        <p className="text-foreground mb-4 text-sm font-semibold">
          {t("title")}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatusFilter
            label={t("status")}
            allLabel={t("all")}
            successLabel={tStatus("success")}
            failedLabel={tStatus("failed")}
          />
          <MethodFilter
            label={t("method")}
            allLabel={t("all")}
            methodLabels={{
              password: tMethod("password"),
              otp: tMethod("otp"),
              "magic-link": tMethod("magic-link"),
              "forgot-password": tMethod("forgot-password")
            }}
          />
          <CountryFilter label={t("country")} placeholder={t("country")} />
          <CityFilter label={t("city")} placeholder={t("city")} />
          <FromDateFilter label={t("fromDate")} placeholder="dd/MM/yyyy" />
          <ToDateFilter label={t("toDate")} placeholder="dd/MM/yyyy" />
          <UserIdFilter label={t("userId")} placeholder="24-char ObjectId" />
          <IpFilter label={t("ip")} placeholder={t("ip")} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <CustomButton
            type="button"
            variant="outline"
            size="sm"
            onClick={onClear}
          >
            {t("clear")}
          </CustomButton>
          <CustomButton type="submit" size="sm">
            {t("apply")}
          </CustomButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdminLoginHistoryFilters;

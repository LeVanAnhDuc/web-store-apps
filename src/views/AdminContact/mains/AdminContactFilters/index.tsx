"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
// types
import type { AdminContactFilterFormValues } from "@/types/ContactAdmin";
// components
import CustomButton from "@/components/CustomButton";
import SearchFilter from "../../components/SearchFilter";
import StatusFilter from "../../components/StatusFilter";
import CategoryFilter from "../../components/CategoryFilter";
import EmailFilter from "../../components/EmailFilter";
import TicketNumberFilter from "../../components/TicketNumberFilter";
import FromDateFilter from "../../components/FromDateFilter";
import ToDateFilter from "../../components/ToDateFilter";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { useRouter, usePathname } from "@/i18n/navigation";

const AdminContactFilters = () => {
  const t = useTranslations("contactAdmin.admin.list.filters");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const tAnnounce = useTranslations("contactAdmin.announce");
  const { announce } = useAnnounce();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const methods = useForm<AdminContactFilterFormValues>({
    defaultValues: {
      status: searchParams.get("status") ?? "",
      category: searchParams.get("category") ?? "",
      email: searchParams.get("email") ?? "",
      ticketNumber: searchParams.get("ticketNumber") ?? "",
      search: searchParams.get("search") ?? "",
      fromDate: searchParams.get("fromDate") ?? "",
      toDate: searchParams.get("toDate") ?? ""
    }
  });

  const onSubmit = (data: AdminContactFilterFormValues) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (data.status) params.set("status", data.status);
    if (data.category) params.set("category", data.category);
    if (data.email) params.set("email", data.email);
    if (data.ticketNumber) params.set("ticketNumber", data.ticketNumber);
    if (data.search) params.set("search", data.search);
    if (data.fromDate) params.set("fromDate", data.fromDate);
    if (data.toDate) params.set("toDate", data.toDate);
    announce(tAnnounce("filterApplied"));
    router.push(`${pathname}?${params.toString()}`);
  };

  const onClear = () => {
    methods.reset({
      status: "",
      category: "",
      email: "",
      ticketNumber: "",
      search: "",
      fromDate: "",
      toDate: ""
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
        <h2 className="text-foreground mb-4 text-sm font-semibold">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SearchFilter
            label={t("search")}
            placeholder={t("searchPlaceholder")}
          />
          <StatusFilter
            label={t("status")}
            allLabel={t("all")}
            newLabel={tStatus("new")}
            processingLabel={tStatus("processing")}
            resolvedLabel={tStatus("resolved")}
          />
          <CategoryFilter
            label={t("category")}
            allLabel={t("all")}
            categoryLabels={{
              account: tCategory("account"),
              technical: tCategory("technical"),
              feature: tCategory("feature"),
              billing: tCategory("billing"),
              security: tCategory("security"),
              other: tCategory("other")
            }}
          />
          <EmailFilter label={t("email")} placeholder={t("email")} />
          <TicketNumberFilter
            label={t("ticketNumber")}
            placeholder={t("ticketNumber")}
          />
          <FromDateFilter label={t("fromDate")} placeholder="dd/MM/yyyy" />
          <ToDateFilter label={t("toDate")} placeholder="dd/MM/yyyy" />
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

export default AdminContactFilters;

"use client";
// libs
import { Calendar, ChevronDown, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// types
import type { DateRangePreset } from "@/types/LoginHistory";
// components
import CustomButton from "@/components/CustomButton";
import SearchInput from "@/components/SearchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { computeDateRange, isDateRangePreset } from "@/utils";

const LoginHistoryFilters = () => {
  const t = useTranslations("loginHistory");
  const tToolbar = useTranslations("loginHistory.toolbar");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tFilter = useTranslations("loginHistory.filters");
  const tDateRange = useTranslations("loginHistory.dateRange");
  const tAnnounce = useTranslations("loginHistory.announce");
  const { announce } = useAnnounce();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "";
  const method = searchParams.get("method") ?? "";
  const dateRangeParam = searchParams.get("dateRange");
  const dateRange: DateRangePreset = isDateRangePreset(dateRangeParam)
    ? dateRangeParam
    : "all";
  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    announce(tAnnounce("filterApplied"));
    router.push(`${pathname}?${next.toString()}`);
  };
  const applyDateRange = (preset: DateRangePreset) => {
    const { fromDate, toDate } = computeDateRange(preset);
    const next = new URLSearchParams(searchParams.toString());
    if (preset === "all") {
      next.delete("dateRange");
      next.delete("fromDate");
      next.delete("toDate");
    } else {
      next.set("dateRange", preset);
      if (fromDate) next.set("fromDate", fromDate);
      if (toDate) next.set("toDate", toDate);
    }
    next.set("page", "1");
    announce(tAnnounce("filterApplied"));
    router.push(`${pathname}?${next.toString()}`);
  };
  const methodLabel =
    method === "password"
      ? tMethod("password")
      : method === "otp"
        ? tMethod("otp")
        : method === "magic-link"
          ? tMethod("magic-link")
          : method === "forgot-password"
            ? tMethod("forgot-password")
            : tToolbar("allMethods");
  const statusLabel =
    status === "success"
      ? tStatus("success")
      : status === "failed"
        ? tStatus("failed")
        : tToolbar("allStatus");
  const dateRangeLabel = tDateRange(dateRange);
  return (
    <div
      className="flex flex-wrap items-center gap-3"
      role="toolbar"
      aria-label={t("title")}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomButton
            size="default"
            variant="outline"
            aria-label={`${tFilter("method")}: ${methodLabel}`}
            iconRight={<ChevronDown className="size-3.5" aria-hidden="true" />}
            className="h-10"
          >
            {methodLabel}
          </CustomButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => updateParam("method", "")}>
            {tFilter("all")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateParam("method", "password")}>
            {tMethod("password")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateParam("method", "otp")}>
            {tMethod("otp")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateParam("method", "magic-link")}>
            {tMethod("magic-link")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateParam("method", "forgot-password")}
          >
            {tMethod("forgot-password")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomButton
            size="default"
            variant="outline"
            aria-label={`${tFilter("status")}: ${statusLabel}`}
            iconRight={<ChevronDown className="size-3.5" aria-hidden="true" />}
            className="h-10"
          >
            {statusLabel}
          </CustomButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => updateParam("status", "")}>
            {tFilter("all")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateParam("status", "success")}>
            {tStatus("success")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateParam("status", "failed")}>
            {tStatus("failed")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomButton
            size="default"
            variant="outline"
            aria-label={`${tFilter("fromDate")} - ${tFilter("toDate")}: ${dateRangeLabel}`}
            iconLeft={<Calendar className="size-3.5" aria-hidden="true" />}
            iconRight={<ChevronDown className="size-3.5" aria-hidden="true" />}
            className="h-10"
          >
            {dateRangeLabel}
          </CustomButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => applyDateRange("today")}>
            {tDateRange("today")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => applyDateRange("7d")}>
            {tDateRange("7d")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => applyDateRange("30d")}>
            {tDateRange("30d")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => applyDateRange("90d")}>
            {tDateRange("90d")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => applyDateRange("all")}>
            {tDateRange("all")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SearchInput
        placeholder={tToolbar("search")}
        ariaLabel={tToolbar("search")}
        className="ml-auto w-56"
      />
      <CustomButton
        size="default"
        iconLeft={<Download className="size-3.5" aria-hidden="true" />}
        className="h-10"
      >
        {tToolbar("export")}
      </CustomButton>
    </div>
  );
};

export default LoginHistoryFilters;

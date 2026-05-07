"use client";
// libs
import { Calendar, ChevronDown, Download, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
// hooks
import { useAnnounce } from "@/hooks";

const LoginHistoryFilters = () => {
  const t = useTranslations("loginHistory");
  const tToolbar = useTranslations("loginHistory.toolbar");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tFilter = useTranslations("loginHistory.filters");
  const tAnnounce = useTranslations("loginHistory.announce");
  const { announce } = useAnnounce();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "";
  const method = searchParams.get("method") ?? "";
  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
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
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomButton
            size="default"
            variant="outline"
            iconRight={<ChevronDown className="size-3.5" />}
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
            iconRight={<ChevronDown className="size-3.5" />}
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
      <CustomButton
        size="default"
        variant="outline"
        iconLeft={<Calendar className="size-3.5" />}
        iconRight={<ChevronDown className="size-3.5" />}
        className="h-10"
      >
        {tToolbar("last30days")}
      </CustomButton>
      <div className="border-border bg-background ml-auto flex h-10 w-56 items-center gap-2 rounded-lg border px-3">
        <Search className="text-muted-foreground size-4" />
        <CustomInput
          placeholder={tToolbar("search")}
          aria-label={t("title")}
          className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
        />
      </div>
      <CustomButton
        size="default"
        iconLeft={<Download className="size-3.5" />}
        className="h-10 bg-slate-900 text-white hover:bg-slate-800"
      >
        {tToolbar("export")}
      </CustomButton>
    </div>
  );
};

export default LoginHistoryFilters;

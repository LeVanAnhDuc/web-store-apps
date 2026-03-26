"use client";

// libs
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// hooks
import { useAnnounce } from "@/hooks";
// components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import CustomButton from "@/components/CustomButton";

type FilterFormValues = {
  status: string;
  method: string;
  country: string;
  city: string;
  fromDate: string;
  toDate: string;
};

const LoginHistoryFilters = () => {
  const t = useTranslations("loginHistory.filters");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tAnnounce = useTranslations("loginHistory.announce");
  const { announce } = useAnnounce();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<FilterFormValues>({
      defaultValues: {
        status: searchParams.get("status") ?? "",
        method: searchParams.get("method") ?? "",
        country: searchParams.get("country") ?? "",
        city: searchParams.get("city") ?? "",
        fromDate: searchParams.get("fromDate") ?? "",
        toDate: searchParams.get("toDate") ?? ""
      }
    });

  const onSubmit = (data: FilterFormValues) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (data.status) params.set("status", data.status);
    if (data.method) params.set("method", data.method);
    if (data.country) params.set("country", data.country);
    if (data.city) params.set("city", data.city);
    if (data.fromDate) params.set("fromDate", data.fromDate);
    if (data.toDate) params.set("toDate", data.toDate);
    announce(tAnnounce("filterApplied"));
    router.push(`${pathname}?${params.toString()}`);
  };

  const onClear = () => {
    reset({
      status: "",
      method: "",
      country: "",
      city: "",
      fromDate: "",
      toDate: ""
    });
    announce(tAnnounce("filterCleared"));
    router.push(pathname);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-xl border p-4"
    >
      <p className="text-foreground mb-4 text-sm font-semibold">{t("title")}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">{t("status")}</Label>
          <Select
            value={watch("status")}
            onValueChange={(v) => setValue("status", v)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder={t("all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{t("all")}</SelectItem>
              <SelectItem value="success">{tStatus("success")}</SelectItem>
              <SelectItem value="failed">{tStatus("failed")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">{t("method")}</Label>
          <Select
            value={watch("method")}
            onValueChange={(v) => setValue("method", v)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder={t("all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{t("all")}</SelectItem>
              <SelectItem value="password">{tMethod("password")}</SelectItem>
              <SelectItem value="otp">{tMethod("otp")}</SelectItem>
              <SelectItem value="magic-link">
                {tMethod("magic-link")}
              </SelectItem>
              <SelectItem value="forgot-password">
                {tMethod("forgot-password")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">
            {t("country")}
          </Label>
          <Input
            {...register("country")}
            className="h-9"
            placeholder={t("country")}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">{t("city")}</Label>
          <Input
            {...register("city")}
            className="h-9"
            placeholder={t("city")}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">
            {t("fromDate")}
          </Label>
          <Input {...register("fromDate")} type="date" className="h-9" />
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">{t("toDate")}</Label>
          <Input {...register("toDate")} type="date" className="h-9" />
        </div>
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
  );
};

export default LoginHistoryFilters;

"use client";

// libs
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  category: string;
  email: string;
  ticketNumber: string;
  search: string;
  fromDate: string;
  toDate: string;
};

const AdminContactsFilters = () => {
  const t = useTranslations("contactAdmin.admin.list.filters");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<FilterFormValues>({
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

  const onSubmit = (data: FilterFormValues) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (data.status) params.set("status", data.status);
    if (data.category) params.set("category", data.category);
    if (data.email) params.set("email", data.email);
    if (data.ticketNumber) params.set("ticketNumber", data.ticketNumber);
    if (data.search) params.set("search", data.search);
    if (data.fromDate) params.set("fromDate", data.fromDate);
    if (data.toDate) params.set("toDate", data.toDate);
    router.push(`${pathname}?${params.toString()}`);
  };

  const onClear = () => {
    reset({
      status: "",
      category: "",
      email: "",
      ticketNumber: "",
      search: "",
      fromDate: "",
      toDate: ""
    });
    router.push(pathname);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-xl border p-4"
    >
      <p className="text-foreground mb-4 text-sm font-semibold">{t("title")}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5 lg:col-span-2">
          <Label className="text-muted-foreground text-xs">{t("search")}</Label>
          <Input
            {...register("search")}
            className="h-9"
            placeholder={t("searchPlaceholder")}
          />
        </div>

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
              <SelectItem value="new">{tStatus("new")}</SelectItem>
              <SelectItem value="processing">
                {tStatus("processing")}
              </SelectItem>
              <SelectItem value="resolved">{tStatus("resolved")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">
            {t("category")}
          </Label>
          <Select
            value={watch("category")}
            onValueChange={(v) => setValue("category", v)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder={t("all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{t("all")}</SelectItem>
              {(
                [
                  "account",
                  "technical",
                  "feature",
                  "billing",
                  "security",
                  "other"
                ] as const
              ).map((c) => (
                <SelectItem key={c} value={c}>
                  {tCategory(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">{t("email")}</Label>
          <Input
            {...register("email")}
            className="h-9"
            placeholder={t("email")}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">
            {t("ticketNumber")}
          </Label>
          <Input
            {...register("ticketNumber")}
            className="h-9"
            placeholder={t("ticketNumber")}
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

export default AdminContactsFilters;

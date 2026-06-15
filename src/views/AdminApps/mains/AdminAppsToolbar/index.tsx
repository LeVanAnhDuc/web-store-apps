"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
// components
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import CustomButton from "@/components/CustomButton";
import CustomSelectTrigger from "@/components/CustomSelectTrigger";
import SearchInput from "@/components/SearchInput";
// dataSources
import { APP_STATUSES } from "@/dataSources/AdminApps";
// requests
import { getAdminAppCategories } from "@/requests/adminApps";
// others
import CONSTANTS from "@/constants";
import { useRouter, usePathname } from "@/i18n/navigation";

const ALL_VALUE = "__all";

const AdminAppsToolbar = () => {
  const t = useTranslations("adminApps.toolbar");
  const tStatus = useTranslations("adminApps.status");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? ALL_VALUE;
  const categoryId = searchParams.get("categoryId") ?? ALL_VALUE;
  const hasFilters = Boolean(
    searchParams.get("search") ||
      searchParams.get("status") ||
      searchParams.get("categoryId")
  );

  const { data: categories = [] } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_APP_CATEGORIES],
    queryFn: getAdminAppCategories
  });

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value && value !== ALL_VALUE) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleClear = () => router.push(pathname);

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <div className="space-y-1.5 lg:col-span-2">
          <Label className="text-muted-foreground text-xs">{t("search")}</Label>
          <SearchInput
            value={search}
            onChange={(value) => updateParam("search", value)}
            placeholder={t("searchPlaceholder")}
            ariaLabel={t("search")}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">{t("status")}</Label>
          <Select
            value={status}
            onValueChange={(v) => updateParam("status", v)}
          >
            <CustomSelectTrigger>
              <SelectValue placeholder={t("all")} />
            </CustomSelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>{t("all")}</SelectItem>
              {APP_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {tStatus(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">
            {t("category")}
          </Label>
          <Select
            value={categoryId}
            onValueChange={(v) => updateParam("categoryId", v)}
          >
            <CustomSelectTrigger>
              <SelectValue placeholder={t("all")} />
            </CustomSelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>{t("all")}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <CustomButton
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
          >
            {t("clear")}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default AdminAppsToolbar;

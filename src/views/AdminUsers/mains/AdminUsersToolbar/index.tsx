"use client";

// libs
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
// others
import { useRouter, usePathname } from "@/i18n/navigation";

const ALL_VALUE = "__all";

const AdminUsersToolbar = () => {
  const t = useTranslations("adminUsers.toolbar");
  const tRole = useTranslations("adminUsers.role");
  const tStatus = useTranslations("adminUsers.status");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const role = searchParams.get("role") ?? ALL_VALUE;
  const status = searchParams.get("status") ?? ALL_VALUE;
  const hasFilters = Boolean(
    searchParams.get("search") ||
      searchParams.get("role") ||
      searchParams.get("status")
  );

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
          <Label className="text-muted-foreground text-xs">{t("role")}</Label>
          <Select value={role} onValueChange={(v) => updateParam("role", v)}>
            <CustomSelectTrigger>
              <SelectValue placeholder={t("all")} />
            </CustomSelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>{t("all")}</SelectItem>
              <SelectItem value="user">{tRole("user")}</SelectItem>
              <SelectItem value="admin">{tRole("admin")}</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="active">{tStatus("active")}</SelectItem>
              <SelectItem value="locked">{tStatus("locked")}</SelectItem>
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

export default AdminUsersToolbar;

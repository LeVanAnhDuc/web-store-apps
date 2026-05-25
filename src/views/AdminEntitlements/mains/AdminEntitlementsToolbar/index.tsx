"use client";

// libs
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
// components
import { Label } from "@/components/ui/label";
import CustomButton from "@/components/CustomButton";
import SearchInput from "@/components/SearchInput";
import UserPickerSelect from "../../components/UserPickerSelect";

const AdminEntitlementsToolbar = () => {
  const t = useTranslations("adminEntitlements.toolbar");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId") ?? undefined;
  const search = searchParams.get("search") ?? "";
  const hasFilters = Boolean(
    searchParams.get("userId") || searchParams.get("search")
  );

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleClear = () => router.push(pathname);

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">{t("user")}</Label>
          <UserPickerSelect
            value={userId}
            onValueChange={(v) => updateParam("userId", v)}
            placeholder={t("userPlaceholder")}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">
            {t("appSearch")}
          </Label>
          <SearchInput
            value={search}
            onChange={(value) => updateParam("search", value)}
            placeholder={t("appSearchPlaceholder")}
            ariaLabel={t("appSearch")}
            inputClassName="!h-12"
          />
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

export default AdminEntitlementsToolbar;

"use client";

// libs
import { Check } from "lucide-react";
import { hasLocale, useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
// types
import { localeNames, type Locale } from "@/i18n/config";
// components
import CustomButton from "@/components/CustomButton";
import { Spinner } from "@/components/ui/spinner";
// others
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/libs/utils";

const SelectLocale = () => {
  const t = useTranslations("common");
  const localActive = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === localActive || !hasLocale(routing.locales, newLocale))
      return;

    setPendingLocale(newLocale);

    const search = searchParams.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    startTransition(() => {
      router.replace(fullPath, { locale: newLocale });
    });
  };

  const getRightIcon = (locale: Locale) => {
    if (locale === localActive) return <Check />;

    if (pending && locale === pendingLocale) return <Spinner />;

    return null;
  };

  return (
    <main className="@container space-y-4">
      <h3 className="text-xl font-semibold">
        {t("localeDialog.selectLanguage")}
      </h3>
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 @2xl:grid-cols-5">
        {routing.locales.map((locale) => (
          <CustomButton
            key={locale}
            variant={"outline"}
            disabled={pending}
            onClick={() => handleLanguageChange(locale)}
            className={cn(
              "h-11",
              localActive === locale && "border-primary border-2"
            )}
            iconRight={getRightIcon(locale)}
          >
            {localeNames[locale]}
          </CustomButton>
        ))}
      </div>
    </main>
  );
};

export default SelectLocale;

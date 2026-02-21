"use client";

// Why "use client"?
// This component is rendered inside Dialog (shadcn) which is a client component.
// useTranslations hook requires client-side rendering.

// libs
import { useTranslations } from "next-intl";
// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectLocale from "../../components/SelectLocale";

const LocaleDialogContent = () => {
  const t = useTranslations("common");

  return (
    <Tabs defaultValue="language">
      <TabsList className="mb-10 h-11 space-x-4 bg-transparent p-0">
        <TabsTrigger
          value="language"
          className="border-primary cursor-pointer rounded-none border-0 data-[state=active]:border-b-1 data-[state=active]:shadow-none"
        >
          {t("localeDialog.languageTab")}
        </TabsTrigger>
        <TabsTrigger
          value="currency"
          className="border-primary cursor-pointer rounded-none border-0 data-[state=active]:border-b-1 data-[state=active]:shadow-none"
        >
          {t("localeDialog.currencyTab")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="language" asChild>
        <SelectLocale />
      </TabsContent>

      {/* TODO: Implement currency selection */}
      <TabsContent value="currency"></TabsContent>
    </Tabs>
  );
};

export default LocaleDialogContent;

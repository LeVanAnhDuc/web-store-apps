// libs
import { BookOpen, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import CustomButton from "@/components/CustomButton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const HeroSection = async () => {
  const t = await getTranslations("discover.hero");
  return (
    <Card
      className="flex flex-row items-center justify-between gap-6 overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white md:p-10 xl:p-12"
      aria-labelledby="discover-hero-title"
    >
      <div className="flex flex-col gap-3.5">
        <Badge
          variant="secondary"
          className="w-fit rounded-full border-0 bg-white/20 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white"
        >
          {t("badge")}
        </Badge>
        <h2
          id="discover-hero-title"
          className="text-3xl leading-tight font-extrabold md:text-4xl"
        >
          {t("name")}
        </h2>
        <p className="max-w-md text-sm text-white/85 md:text-base">
          {t("description")}
        </p>
        <CustomButton
          size="default"
          className="mt-1 w-fit bg-white text-indigo-600 hover:bg-white/90"
          iconLeft={<ExternalLink className="size-4" aria-hidden="true" />}
        >
          {t("cta")}
        </CustomButton>
      </div>
      <div
        className="hidden size-32 shrink-0 items-center justify-center rounded-3xl bg-white/15 lg:flex xl:size-40"
        aria-hidden="true"
      >
        <BookOpen className="size-16 text-white xl:size-22" />
      </div>
    </Card>
  );
};

export default HeroSection;

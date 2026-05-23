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
      className="from-primary via-info to-info/70 text-primary-foreground flex flex-row items-center justify-between gap-6 overflow-hidden rounded-2xl border-0 bg-gradient-to-br p-8 md:p-10 xl:p-12"
      aria-labelledby="discover-hero-title"
    >
      <div className="flex flex-col gap-3.5">
        <Badge
          variant="secondary"
          className="bg-primary-foreground/20 text-primary-foreground w-fit rounded-full border-0 px-3 py-1.5 text-xs font-bold tracking-widest"
        >
          {t("badge")}
        </Badge>
        <h2
          id="discover-hero-title"
          className="text-3xl leading-tight font-bold md:text-4xl"
        >
          {t("name")}
        </h2>
        <p className="text-primary-foreground/85 max-w-md text-sm md:text-base">
          {t("description")}
        </p>
        <CustomButton
          size="default"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 mt-1 w-fit"
          iconLeft={<ExternalLink className="size-4" aria-hidden="true" />}
        >
          {t("cta")}
        </CustomButton>
      </div>
      <div
        className="bg-primary-foreground/15 hidden size-32 shrink-0 items-center justify-center rounded-3xl lg:flex xl:size-40"
        aria-hidden="true"
      >
        <BookOpen className="text-primary-foreground size-16 xl:size-22" />
      </div>
    </Card>
  );
};

export default HeroSection;

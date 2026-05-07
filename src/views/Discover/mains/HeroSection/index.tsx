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
      className="flex items-center justify-between gap-6 overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-white"
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
          className="text-3xl leading-tight font-extrabold"
        >
          {t("name")}
        </h2>
        <p className="max-w-md text-sm text-white/85">{t("description")}</p>
        <CustomButton
          size="default"
          className="mt-1 w-fit bg-white text-indigo-600 hover:bg-white/90"
          iconLeft={<ExternalLink className="size-4" aria-hidden="true" />}
        >
          {t("cta")}
        </CustomButton>
      </div>
      <div
        className="hidden size-40 shrink-0 items-center justify-center rounded-3xl bg-white/15 lg:flex"
        aria-hidden="true"
      >
        <BookOpen className="size-22 text-white" />
      </div>
    </Card>
  );
};

export default HeroSection;

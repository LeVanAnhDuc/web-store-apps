// libs
import { Sparkles, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import CustomButton from "@/components/CustomButton";

const WelcomeBanner = async () => {
  const t = await getTranslations("dashboard.welcome");

  return (
    <div className="from-primary to-primary/80 relative overflow-hidden rounded-2xl bg-gradient-to-r p-6 md:p-8">
      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="text-primary-foreground/80 size-5" />
          <span className="text-primary-foreground/80 text-sm font-medium">
            {t("greeting")}
          </span>
        </div>
        <h1 className="text-primary-foreground mb-2 text-2xl font-bold md:text-3xl">
          {t("title")}
        </h1>
        <p className="text-primary-foreground/80 mb-4 max-w-md">
          {t("description")}
        </p>
        <CustomButton
          variant="secondary"
          className="group"
          iconRight={
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          }
        >
          {t("exploreButton")}
        </CustomButton>
      </div>

      <div className="absolute top-0 right-0 h-full w-1/3 opacity-10">
        <div className="bg-primary-foreground absolute top-4 right-4 size-32 rounded-full blur-3xl" />
        <div className="bg-primary-foreground absolute right-20 bottom-4 size-24 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default WelcomeBanner;

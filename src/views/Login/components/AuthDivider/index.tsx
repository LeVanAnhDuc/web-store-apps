// libs
import { getTranslations } from "next-intl/server";
// components
import { Separator } from "@/components/ui/separator";

const AuthDivider = async () => {
  const t = await getTranslations("common");

  return (
    <div className="relative my-6">
      <Separator className="bg-border" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-card text-muted-foreground px-4 text-sm">
          {t("or")}
        </span>
      </div>
    </div>
  );
};

export default AuthDivider;

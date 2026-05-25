// libs
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const AdminStubCard = async () => {
  const t = await getTranslations("admin.stub");
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="size-3" aria-hidden="true" />
          <span>{t("comingSoon")}</span>
        </Badge>
        <p className="text-muted-foreground max-w-md text-sm">
          {t("description")}
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminStubCard;

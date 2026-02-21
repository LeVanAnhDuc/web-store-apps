// libs
import { Star, Download, Sparkles } from "lucide-react";
// types
import type { App } from "@/dataSources/Dashboard";
// components
import CustomButton from "@/components/CustomButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// others
import { cn } from "@/libs/utils";

const AppCard = ({ app }: { app: App }) => {
  const Icon = app.icon;

  return (
    <Card className="group hover:border-primary/50 relative cursor-pointer overflow-hidden transition-all hover:shadow-lg">
      {app.featured && (
        <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
          <Sparkles className="size-3" />
          Featured
        </div>
      )}

      <CardContent className="p-4">
        <div className="mb-3 flex items-start gap-3">
          <div
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-transform group-hover:scale-105",
              app.gradientClass
            )}
          >
            <Icon className="text-primary-foreground size-7" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground truncate font-medium">{app.name}</h3>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
              {app.description}
            </p>
          </div>
        </div>

        <div className="mb-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="text-warning size-4 fill-current" />
            <span className="text-foreground font-medium">{app.rating}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-1">
            <Download className="size-4" />
            <span>{app.downloads}</span>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {app.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-muted-foreground text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">{app.category}</span>
          <CustomButton
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-warning size-8"
          >
            <Star className="size-4" />
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppCard;

// types
import type { App } from "@/dataSources/Dashboard";
// components
import { Card, CardContent } from "@/components/ui/card";
// others
import { cn } from "@/libs/utils";
import { formatLastUsed } from "@/utils";

const AppCardCompact = ({ app }: { app: App }) => {
  const Icon = app.icon;

  return (
    <Card className="group hover:border-primary/50 cursor-pointer transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
              app.gradientClass
            )}
          >
            <Icon className="text-primary-foreground size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground truncate text-sm font-medium">
              {app.name}
            </h3>
            <p className="text-muted-foreground text-xs">
              {app.lastUsed ? formatLastUsed(app.lastUsed) : app.category}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppCardCompact;

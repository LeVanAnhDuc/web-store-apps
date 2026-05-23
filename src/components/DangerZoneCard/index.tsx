// libs
import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
// components
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent
} from "@/components/ui/card";

const DangerZoneCard = ({
  titleId,
  title,
  description,
  items
}: {
  titleId: string;
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    action: ReactNode;
  }[];
}) => (
  <Card className="border-destructive/40" aria-labelledby={titleId}>
    <CardHeader className="border-destructive/30 border-b">
      <div className="flex items-center gap-2">
        <TriangleAlert className="text-destructive size-4" aria-hidden="true" />
        <h3
          id={titleId}
          className="text-destructive text-base leading-none font-semibold"
        >
          {title}
        </h3>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="min-w-0 flex-1">
            <p className="text-foreground text-sm font-semibold">
              {item.title}
            </p>
            <p className="text-muted-foreground mt-0.5 text-sm">
              {item.description}
            </p>
          </div>
          {item.action}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default DangerZoneCard;

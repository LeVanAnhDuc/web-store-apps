// libs
import { ArrowUpRight } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
import { Card } from "@/components/ui/card";

const AppCard = ({
  id,
  displayName,
  category,
  description,
  iconUrl,
  homeUrl,
  openLabel
}: {
  id: string;
  displayName: string;
  category: string | null;
  description: string | null;
  iconUrl: string | null;
  homeUrl: string;
  openLabel: string;
}) => {
  const initial = displayName.charAt(0).toUpperCase();
  const handleOpen = () => {
    window.open(homeUrl, "_blank", "noopener,noreferrer");
  };

  const iconNode = iconUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={iconUrl} alt="" className="size-full object-cover" />
  ) : (
    initial
  );
  return (
    <Card
      className="flex flex-col overflow-hidden rounded-xl border p-0"
      aria-labelledby={`apps-${id}-title`}
    >
      <div className="flex flex-col gap-3.5 p-6">
        <div className="flex items-center gap-3">
          <div
            className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-lg font-semibold"
            aria-hidden="true"
          >
            {iconNode}
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3
              id={`apps-${id}-title`}
              className="text-foreground truncate text-base font-semibold"
            >
              {displayName}
            </h3>
            {category && (
              <span className="text-muted-foreground text-xs font-medium">
                {category}
              </span>
            )}
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-2 min-h-10 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="border-border border-t" aria-hidden="true" />
      <div className="flex items-center justify-end px-6 py-3">
        <CustomButton
          size="sm"
          onClick={handleOpen}
          iconRight={<ArrowUpRight className="size-3" aria-hidden="true" />}
          aria-label={`${openLabel} ${displayName}`}
        >
          {openLabel}
        </CustomButton>
      </div>
    </Card>
  );
};

export default AppCard;

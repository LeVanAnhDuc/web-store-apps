// libs
import { LayoutGrid } from "lucide-react";
// components
import CustomImage from "@/components/CustomImage";

const AppAccessIcon = ({
  iconUrl,
  name
}: {
  iconUrl: string | null;
  name: string;
}) => (
  <span
    className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl"
    aria-hidden="true"
  >
    {iconUrl ? (
      <CustomImage
        src={iconUrl}
        alt=""
        width={40}
        height={40}
        className="size-full object-cover"
      />
    ) : (
      <LayoutGrid className="size-[18px]" aria-label={name} />
    )}
  </span>
);

export default AppAccessIcon;

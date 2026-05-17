"use client";

// libs
import { X } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
// others
import { useSidebarContext } from "../../context";

const MobileCloseHeader = ({
  "aria-label": ariaLabel
}: {
  "aria-label": string;
}) => {
  const { onMobileOpenChange } = useSidebarContext();
  return (
    <div className="flex h-16 items-center justify-end px-4 lg:hidden">
      <CustomButton
        variant="ghost"
        size="icon"
        aria-label={ariaLabel}
        onClick={() => onMobileOpenChange(false)}
      >
        <X className="size-4" aria-hidden="true" />
      </CustomButton>
    </div>
  );
};

export default MobileCloseHeader;

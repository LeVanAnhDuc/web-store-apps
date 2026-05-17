"use client";

// others
import { useSidebarContext } from "../../context";

const MobileBackdrop = () => {
  const { isMobileOpen, onMobileOpenChange } = useSidebarContext();
  if (!isMobileOpen) return null;
  return (
    <div
      className="bg-background/80 fixed inset-0 z-29 backdrop-blur-sm lg:hidden"
      onClick={() => onMobileOpenChange(false)}
      aria-hidden="true"
    />
  );
};

export default MobileBackdrop;

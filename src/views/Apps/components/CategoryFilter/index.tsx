"use client";
// types
import type { UserCategory } from "@/types/Apps";
// components
import CustomButton from "@/components/CustomButton";
// others
import { cn } from "@/libs/utils";

const pillClass = (isActive: boolean) =>
  cn(
    "rounded-full border px-4 py-2 text-sm font-semibold",
    isActive
      ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
      : "border-border bg-background text-muted-foreground hover:bg-muted"
  );

const CategoryFilter = ({
  categories,
  activeId,
  allLabel,
  groupLabel,
  onSelect
}: {
  categories: UserCategory[];
  activeId: string | null;
  allLabel: string;
  groupLabel: string;
  onSelect: (id: string | null) => void;
}) => (
  <div className="flex flex-wrap gap-2.5" role="group" aria-label={groupLabel}>
    <CustomButton
      size="sm"
      onClick={() => onSelect(null)}
      aria-pressed={activeId === null}
      className={pillClass(activeId === null)}
    >
      {allLabel}
    </CustomButton>
    {categories.map((category) => (
      <CustomButton
        key={category._id}
        size="sm"
        onClick={() => onSelect(category._id)}
        aria-pressed={activeId === category._id}
        className={pillClass(activeId === category._id)}
      >
        {category.displayName}
      </CustomButton>
    ))}
  </div>
);

export default CategoryFilter;

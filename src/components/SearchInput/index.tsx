"use client";

// libs
import { Search, X } from "lucide-react";
import { type ChangeEvent } from "react";
// components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
// others
import { cn } from "@/libs/utils";

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder,
  ariaLabel,
  clearLabel,
  className,
  size = "default"
}: {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  clearLabel?: string;
  className?: string;
  size?: "default" | "compact";
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }
    onChange("");
  };
  const showClear = value.length > 0;
  return (
    <label
      className={cn(
        "border-input bg-background focus-within:border-ring focus-within:ring-ring/50 relative flex items-center gap-2 rounded-lg border px-3 transition-colors focus-within:ring-[3px]",
        size === "compact" ? "h-9" : "h-10",
        className
      )}
    >
      {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
      <Search
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden="true"
      />
      <CustomInput
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-full flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
      />
      {showClear && (
        <CustomButton
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleClear}
          aria-label={clearLabel ?? "Clear"}
          className="text-muted-foreground hover:text-foreground -mr-1 size-6 rounded-full"
        >
          <X className="size-3.5" aria-hidden="true" />
        </CustomButton>
      )}
    </label>
  );
};

export default SearchInput;

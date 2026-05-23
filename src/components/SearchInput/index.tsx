"use client";

// libs
import { Search } from "lucide-react";
import { type ChangeEvent } from "react";
// components
import CustomInput from "@/components/CustomInput";
// others
import { cn } from "@/libs/utils";

const SearchInput = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
  inputClassName
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  inputClassName?: string;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  return (
    <div className={cn("relative", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <CustomInput
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn("h-10 pl-10", inputClassName)}
      />
    </div>
  );
};

export default SearchInput;

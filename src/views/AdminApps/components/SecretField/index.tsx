"use client";

// libs
import { Copy } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";

const SecretField = ({
  label,
  value,
  copyLabel,
  onCopy
}: {
  label: string;
  value: string;
  copyLabel: string;
  onCopy: () => void;
}) => (
  <div className="space-y-1.5">
    <p className="text-foreground text-sm font-medium">{label}</p>
    <div className="border-border flex items-center gap-2 rounded-md border p-2">
      <code className="text-muted-foreground min-w-0 flex-1 truncate font-mono text-sm">
        {value}
      </code>
      <CustomButton
        type="button"
        variant="outline"
        size="sm"
        onClick={onCopy}
        iconLeft={<Copy className="size-3.5" aria-hidden="true" />}
      >
        {copyLabel}
      </CustomButton>
    </div>
  </div>
);

export default SecretField;

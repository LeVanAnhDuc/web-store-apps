// libs
import { Key } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";

const ApiKeyRow = ({
  name,
  prefix,
  meta,
  copyLabel,
  revokeLabel,
  onCopy,
  onRevoke
}: {
  name: string;
  prefix: string;
  meta: string;
  copyLabel: string;
  revokeLabel: string;
  onCopy: () => void;
  onRevoke: () => void;
}) => (
  <div className="border-border flex flex-wrap items-center gap-4 border-b px-6 py-4 last:border-b-0">
    <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
      <Key className="size-4" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate text-sm font-semibold">{name}</p>
      <p className="text-muted-foreground truncate font-mono text-xs">
        {prefix}
      </p>
      <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
        {meta}
      </p>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <CustomButton variant="outline" size="sm" onClick={onCopy}>
        {copyLabel}
      </CustomButton>
      <CustomButton variant="outline" size="sm" onClick={onRevoke}>
        {revokeLabel}
      </CustomButton>
    </div>
  </div>
);

export default ApiKeyRow;

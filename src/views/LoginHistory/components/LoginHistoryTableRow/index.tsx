// libs
import { useTranslations } from "next-intl";
// types
import type {
  LoginHistoryItem,
  LoginHistoryMethod
} from "@/types/LoginHistory";
// components
import { TableCell, TableRow } from "@/components/ui/table";
// dataSources
import { LOGIN_HISTORY_METHOD_COLOR } from "@/dataSources/LoginHistory";
// others
import { formatDateTimeShort } from "@/utils";
import { cn } from "@/libs/utils";

const LoginHistoryTableRow = ({ item }: { item: LoginHistoryItem }) => {
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatDateTimeShort(item.createdAt)}
      </TableCell>
      <TableCell
        className={cn("font-medium", LOGIN_HISTORY_METHOD_COLOR[item.method])}
      >
        {tMethod(item.method as LoginHistoryMethod)}
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-1.5">
          <span
            className={cn(
              "size-1.5 rounded-full",
              item.status === "success" ? "bg-success" : "bg-destructive"
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "font-medium",
              item.status === "success" ? "text-success" : "text-destructive"
            )}
          >
            {tStatus(item.status)}
          </span>
        </span>
      </TableCell>
      <TableCell>
        {item.deviceType !== "UNKNOWN"
          ? `${item.deviceType} · ${item.browser}`
          : item.browser}
      </TableCell>
      <TableCell className="text-muted-foreground font-mono">
        {item.ip}
      </TableCell>
      <TableCell>
        {item.city !== "UNKNOWN"
          ? `${item.city}, ${item.country}`
          : item.country}
      </TableCell>
    </TableRow>
  );
};

export default LoginHistoryTableRow;

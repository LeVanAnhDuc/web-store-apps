// libs
import { useTranslations } from "next-intl";
// types
import type {
  LoginHistoryItem,
  LoginHistoryMethod
} from "@/types/LoginHistory";
// components
import { TableCell, TableRow } from "@/components/ui/table";
import FormatTime from "@/components/FormatTime";
// dataSources
import { LOGIN_HISTORY_METHOD_COLOR } from "@/dataSources/LoginHistory";
// others
import { cn } from "@/libs/utils";
import { formatLoginLocation } from "@/utils";

const LoginHistoryTableRow = ({ item }: { item: LoginHistoryItem }) => {
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tLocation = useTranslations("loginHistory.location");
  return (
    <TableRow>
      <TableCell className="font-medium">
        <FormatTime value={item.createdAt} variant="datetime" />
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
        {formatLoginLocation(item.city, item.country, tLocation)}
      </TableCell>
    </TableRow>
  );
};

export default LoginHistoryTableRow;

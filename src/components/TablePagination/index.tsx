// components
import CustomPagination from "@/components/CustomPagination";
import { Spinner } from "@/components/ui/spinner";
// others
import { cn } from "@/libs/utils";

const TablePagination = ({
  page,
  totalPages,
  total,
  onPageChange,
  labels,
  loading = false,
  className
}: {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  labels: {
    page: string;
    of: string;
    results: string;
  };
  loading?: boolean;
  className?: string;
}) => {
  if (totalPages <= 1) return null;
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border-t px-4 py-3",
        className
      )}
    >
      <p className="text-muted-foreground flex items-center gap-2 text-sm">
        {loading && <Spinner className="size-3.5" aria-hidden="true" />}
        <span>
          {labels.page} {page} {labels.of} {totalPages} · {total}{" "}
          {labels.results}
        </span>
      </p>
      <CustomPagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TablePagination;

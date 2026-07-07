"use client";

// libs
import { useTranslations } from "next-intl";
// components
import CustomPagination from "@/components/CustomPagination";
import { Spinner } from "@/components/ui/spinner";

const ListPagination = ({
  page,
  totalPages,
  total,
  onPageChange,
  loading = false
}: {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}) => {
  const t = useTranslations("list.pagination");
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-nowrap items-center justify-between gap-2">
      <p className="text-muted-foreground flex items-center gap-2 text-sm">
        {loading && <Spinner className="size-3.5" aria-hidden="true" />}
        <span>
          {t("page")} {page} {t("of")} {totalPages} · {total} {t("results")}
        </span>
      </p>
      <CustomPagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mx-0 w-auto justify-end"
      />
    </div>
  );
};

export default ListPagination;

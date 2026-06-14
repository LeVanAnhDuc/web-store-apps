"use client";

// libs
import type { ReactNode } from "react";
// components
import ListEmptyState from "../ListEmptyState";

const ListContent = ({
  isLoading,
  isEmpty,
  hasActiveFilters,
  onClearFilters,
  skeleton,
  emptyTitle,
  emptyDescription,
  emptyIcon,
  emptyAction,
  children
}: {
  isLoading: boolean;
  isEmpty: boolean;
  hasActiveFilters: boolean;
  onClearFilters?: () => void;
  skeleton: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: ReactNode;
  emptyAction?: ReactNode;
  children: ReactNode;
}) => {
  if (isLoading) return <>{skeleton}</>;
  if (isEmpty)
    return (
      <ListEmptyState
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
        action={emptyAction}
      />
    );
  return <>{children}</>;
};

export default ListContent;

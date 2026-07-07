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
  fullHeight = false,
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
  fullHeight?: boolean;
  children: ReactNode;
}) => {
  const content = isLoading ? (
    skeleton
  ) : isEmpty ? (
    <ListEmptyState
      hasActiveFilters={hasActiveFilters}
      onClearFilters={onClearFilters}
      title={emptyTitle}
      description={emptyDescription}
      icon={emptyIcon}
      action={emptyAction}
    />
  ) : (
    children
  );
  if (!fullHeight) return <>{content}</>;
  return (
    <div className="md:flex md:min-h-0 md:flex-1 md:flex-col">{content}</div>
  );
};

export default ListContent;

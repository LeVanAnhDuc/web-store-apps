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
  const wrap = (node: ReactNode) =>
    fullHeight ? (
      <div className="md:flex md:min-h-0 md:flex-col">{node}</div>
    ) : (
      <>{node}</>
    );

  if (isLoading) return wrap(skeleton);

  if (isEmpty)
    return wrap(
      <ListEmptyState
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
        action={emptyAction}
      />
    );

  return wrap(children);
};

export default ListContent;

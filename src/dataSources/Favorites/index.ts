// types
import type { ListFilterDef, ListFilterOption } from "@/types/List";

export const buildFavoritesFilterDefs = (
  categoryOptions: ListFilterOption[],
  labels: { category: string }
): ListFilterDef[] => [
  {
    key: "category",
    type: "select",
    label: labels.category,
    options: categoryOptions
  }
];

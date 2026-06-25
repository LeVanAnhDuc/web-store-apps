const LIST = {
  ALL_VALUE: "__all",
  PARAM: {
    SEARCH: "search",
    PAGE: "page",
    SORT_BY: "sortBy",
    SORT_ORDER: "sortOrder",
    DATE_RANGE: "dateRange",
    FROM_DATE: "fromDate",
    TO_DATE: "toDate"
  },
  DATE_PRESETS: [
    "all",
    "today",
    "last7",
    "last30",
    "last90",
    "custom"
  ] as const,
  SEARCH_DEBOUNCE_MS: 300,
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100
} as const;

export const SORT_ORDER = { ASC: "asc", DESC: "desc" } as const;

export default LIST;

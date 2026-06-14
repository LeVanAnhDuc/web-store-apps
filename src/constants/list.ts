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
  SEARCH_DEBOUNCE_MS: 300
} as const;

export default LIST;

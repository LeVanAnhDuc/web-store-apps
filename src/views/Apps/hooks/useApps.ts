// libs
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// types
import type { UserAppsQueryParams } from "@/types/Apps";
// requests
import { getApps } from "@/requests/apps";

export const APPS_QUERY_KEY = "apps";

const useApps = (params: UserAppsQueryParams) =>
  useQuery({
    queryKey: [APPS_QUERY_KEY, params],
    queryFn: () => getApps(params),
    placeholderData: keepPreviousData
  });

export default useApps;

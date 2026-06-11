// libs
import { useQuery } from "@tanstack/react-query";
// requests
import { getAppCategories } from "@/requests/apps";

export const APP_CATEGORIES_QUERY_KEY = "appCategories";

const useAppCategories = () =>
  useQuery({
    queryKey: [APP_CATEGORIES_QUERY_KEY],
    queryFn: getAppCategories
  });

export default useAppCategories;

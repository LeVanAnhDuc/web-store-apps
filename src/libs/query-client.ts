// libs
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { isAxiosError } from "axios";
// others
import { errorToast } from "@/utils";

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<ErrorResponsePattern>(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.error?.message;

    const errorMapping: Record<number, string> = {
      400: message || "Bad request. Please check your input.",
      403: "You do not have permission to perform this action.",
      404: message || "The requested resource was not found.",
      409: message || "This data already exists.",
      422: message || "Invalid data. Please check your input.",
      429: "Too many requests. Please try again later."
    };

    return message || errorMapping[status as number] || "An error occurred";
  }

  if (error instanceof Error) return error.message;

  return "An unknown error occurred.";
};

const queryErrorHandler = (error: unknown): void => {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    // SKIP these (already toasted in axios interceptor):
    // - 401 (auto refresh, silent or toasted on logout)
    // - Network errors (!error.response)
    // - Timeout errors (ECONNABORTED)
    // - 5xx errors
    if (
      status === 401 ||
      !error.response ||
      error.code === "ECONNABORTED" ||
      (status && status >= 500 && status < 600)
    ) {
      return;
    }
  }

  const message = getErrorMessage(error);

  errorToast(message);
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: queryErrorHandler
  }),
  mutationCache: new MutationCache({
    onError: queryErrorHandler
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false, // Do not refetch on window focus
      retry: (failureCount, error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          // DON'T retry client errors (4xx)
          if (status && status >= 400 && status < 500) {
            return false;
          }

          // DON'T retry if no response (network error handled by axios)
          if (!error.response) {
            return false;
          }
        }

        // Retry server errors (5xx) or unknown errors max 2 times
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) =>
        // Exponential backoff: 1s, 2s, 4s
        Math.min(1000 * 2 ** attemptIndex, 30000)
    },
    mutations: {
      retry: false
    }
  }
});

export default queryClient;

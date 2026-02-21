// libs
import axios from "axios";
// types
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from "axios";
// others
import { confirmErrorToast, getCurrentLocale } from "@/utils";
import CONSTANTS from "@/constants";

const API_TIMEOUT = 30000;

const handleLogout = () => {
  const currentLocale = getCurrentLocale();
  window.location.href = `/${currentLocale}${CONSTANTS.ROUTES.LOGIN}`;
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ============================================
// AXIOS INSTANCE
// ============================================

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: Get id token from store
    const idToken = "";

    if (idToken) config.headers.Authorization = idToken;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // ============================================
    // HANDLE 401 - AUTO REFRESH TOKEN (SILENT)
    // ============================================
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Queue subsequent requests while refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // TODO: Get refresh token from store
      const refreshToken = "";

      if (!refreshToken) {
        processQueue(error, null);
        isRefreshing = false;
        await confirmErrorToast("Session expired. Please login again.");
        handleLogout();
        return Promise.reject(error);
      }

      try {
        // TODO: Call refresh API
        //
        const idToken = "";

        // TODO: Save new token
        //

        if (originalRequest.headers)
          originalRequest.headers.Authorization = `Bearer ${idToken}`;

        // Process queued requests
        processQueue(null, idToken);
        isRefreshing = false;

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;
        await confirmErrorToast(
          "Unable to refresh session. Please login again."
        );
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    // ============================================
    // INFRASTRUCTURE ERRORS (TOAST HERE)
    // ============================================

    // Network Error (no response from server)
    if (!error.response) {
      await confirmErrorToast(
        "Unable to connect to server. Please check your internet connection."
      );
      return Promise.reject(error);
    }

    // Timeout Error
    if (error.code === "ECONNABORTED") {
      await confirmErrorToast("Request timeout. Please try again.");
      return Promise.reject(error);
    }

    // 5XX SERVER ERRORS
    if (error.response.status >= 500) {
      await confirmErrorToast("Server error. Please try again later.");
      return Promise.reject(error);
    }

    // TODO: handle catch cancel request. return early not show message toast

    return Promise.reject(error);
  }
);

export default axiosInstance;

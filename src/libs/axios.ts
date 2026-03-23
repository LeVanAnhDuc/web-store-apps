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
import { useAuthStore } from "@/stores";

const API_TIMEOUT = 30000;

const handleLogout = () => {
  const currentLocale = getCurrentLocale();
  window.location.href = `/${currentLocale}${CONSTANTS.ROUTES.LOGIN}`;
};

// ============================================
// AXIOS INSTANCE
// ============================================

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api/v1",
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().tokens?.accessToken;

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    // ============================================
    // HANDLE 401 — LOGOUT IMMEDIATELY
    // Only for authenticated requests (has Authorization header).
    // Unauthenticated requests (login, signup) return 401 for wrong credentials
    // and should be handled by the caller, not intercepted here.
    // ============================================
    if (
      error.response?.status === 401 &&
      originalRequest?.headers?.Authorization
    ) {
      handleLogout();
      return Promise.reject(error);
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

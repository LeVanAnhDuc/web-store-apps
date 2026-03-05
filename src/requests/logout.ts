// others
import axiosInstance from "@/libs/axios";

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout");
};

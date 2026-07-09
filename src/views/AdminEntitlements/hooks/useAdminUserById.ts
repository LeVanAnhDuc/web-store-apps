// libs
import { useMemo } from "react";
// hooks
import useAdminUsers from "./useAdminUsers";

const useAdminUserById = (userId: string | null) => {
  const { data: users, isLoading } = useAdminUsers();

  const data = useMemo(
    () => users?.find((user) => user._id === userId) ?? null,
    [users, userId]
  );

  return { data, isLoading };
};

export default useAdminUserById;

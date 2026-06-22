// libs
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// others
import { resetAdminUserPassword } from "@/mocks/AdminUsers";

const useResetAdminUserPassword = () => {
  const tToast = useTranslations("adminUsers.toast");
  return useMutation({
    mutationFn: resetAdminUserPassword,
    onSuccess: () => {
      toast.success(tToast("resetSuccess"));
    }
  });
};

export default useResetAdminUserPassword;

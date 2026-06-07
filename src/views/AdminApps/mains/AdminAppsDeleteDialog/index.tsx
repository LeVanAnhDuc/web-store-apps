"use client";

// libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { WebApp } from "@/types/AdminApps";
// components
import CustomButton from "@/components/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
// hooks
import { useAnnounce } from "@/hooks";
import { ADMIN_APPS_QUERY_KEY } from "../../hooks/useCreateAdminApp";
// others
import { deleteAdminApp } from "@/mocks/AdminApps";

const AdminAppsDeleteDialog = ({
  target,
  onClose
}: {
  target: WebApp | null;
  onClose: () => void;
}) => {
  const t = useTranslations("adminApps");
  const tActions = useTranslations("adminApps.actions");
  const tToast = useTranslations("adminApps.toast");
  const tAnnounce = useTranslations("adminApps.announce");
  const { announce } = useAnnounce();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteAdminApp(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_APPS_QUERY_KEY] });
      toast.success(tToast("deleteSuccess"));
      if (target) announce(tAnnounce("deleted", { name: target.displayName }));
      onClose();
    },
    onError: () => toast.error(tToast("error"))
  });

  const handleConfirm = () => {
    if (target) mutation.mutate(target._id);
  };

  return (
    <Dialog open={target !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {target
              ? t("delete.title", { name: target.displayName })
              : t("delete.title", { name: "" })}
          </DialogTitle>
          <DialogDescription>{t("delete.description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <CustomButton
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            {tActions("cancel")}
          </CustomButton>
          <CustomButton
            type="button"
            variant="destructive"
            loading={mutation.isPending}
            onClick={handleConfirm}
          >
            {tActions("confirmDelete")}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAppsDeleteDialog;

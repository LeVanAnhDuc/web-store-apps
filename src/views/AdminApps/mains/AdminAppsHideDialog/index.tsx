"use client";

// libs
import { useTranslations } from "next-intl";
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
import useSetAdminAppStatus from "../../hooks/useSetAdminAppStatus";

const AdminAppsHideDialog = ({
  target,
  onClose
}: {
  target: WebApp | null;
  onClose: () => void;
}) => {
  const t = useTranslations("adminApps");
  const tActions = useTranslations("adminApps.actions");
  const tAnnounce = useTranslations("adminApps.announce");
  const { announce } = useAnnounce();
  const mutation = useSetAdminAppStatus();

  const handleConfirm = () => {
    if (!target) return;
    mutation.mutate(
      { id: target._id, status: "inactive" },
      {
        onSuccess: () => {
          announce(tAnnounce("hidden", { name: target.displayName }));
          onClose();
        }
      }
    );
  };

  return (
    <Dialog open={target !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("hide.title", { name: target?.displayName ?? "" })}
          </DialogTitle>
          <DialogDescription>{t("hide.description")}</DialogDescription>
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
            {tActions("confirmHide")}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAppsHideDialog;

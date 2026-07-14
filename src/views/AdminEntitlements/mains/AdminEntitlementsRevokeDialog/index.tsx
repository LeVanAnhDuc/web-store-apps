"use client";

// libs
import { useTranslations } from "next-intl";
// types
import type { AdminUser } from "@/types/AdminUsers";
import type { BulkEntitlementRow } from "@/types/AdminEntitlements";
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
import useRevokeBulk from "../../hooks/useRevokeBulk";

const AdminEntitlementsRevokeDialog = ({
  selectedUsers,
  target,
  onClose
}: {
  selectedUsers: AdminUser[];
  target: BulkEntitlementRow | null;
  onClose: () => void;
}) => {
  const t = useTranslations("adminEntitlements.revoke");
  const tActions = useTranslations("adminEntitlements.actions");
  const tAnnounce = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  const mutation = useRevokeBulk();
  const appName = target?.app.displayName ?? "";
  const count = selectedUsers.length;

  const handleConfirm = () => {
    if (!target) return;
    mutation.mutate(
      { appId: target.app._id, userIds: selectedUsers.map((user) => user._id) },
      {
        onSuccess: () => {
          announce(tAnnounce("revoked", { appName, count }));
          onClose();
        }
      }
    );
  };

  return (
    <Dialog open={target !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title", { appName })}</DialogTitle>
          <DialogDescription>
            {t("description", { appName, count })}
          </DialogDescription>
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
            {tActions("revokeAll")}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEntitlementsRevokeDialog;

"use client";

// libs
import { useTranslations } from "next-intl";
// types
import type { EntitlementRow } from "@/types/AdminEntitlements";
import type { AdminUserOption } from "@/types/AdminUsers";
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
import useRevokeEntitlement from "../../hooks/useRevokeEntitlement";

const AdminEntitlementsRevokeDialog = ({
  user,
  target,
  onClose
}: {
  user: AdminUserOption | null;
  target: EntitlementRow | null;
  onClose: () => void;
}) => {
  const t = useTranslations("adminEntitlements");
  const tActions = useTranslations("adminEntitlements.actions");
  const tAnnounce = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  const mutation = useRevokeEntitlement();

  const handleConfirm = () => {
    if (target && user) {
      mutation.mutate(
        { userId: user._id, webAppId: target.app._id },
        {
          onSuccess: () => {
            announce(
              tAnnounce("revoked", {
                appName: target.app.displayName,
                userName: user.fullName
              })
            );
            onClose();
          }
        }
      );
    }
  };

  return (
    <Dialog open={target !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {target
              ? t("revoke.title", { appName: target.app.displayName })
              : t("revoke.title", { appName: "" })}
          </DialogTitle>
          <DialogDescription>
            {t("revoke.description", {
              userName: user?.fullName ?? "",
              appName: target?.app.displayName ?? ""
            })}
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
            {tActions("confirmRevoke")}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEntitlementsRevokeDialog;

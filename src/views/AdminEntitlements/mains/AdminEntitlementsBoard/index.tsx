"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { AdminUser } from "@/types/AdminUsers";
import type { BulkEntitlementRow } from "@/types/AdminEntitlements";
// components
import PageShell from "@/components/PageContainer/PageShell";
import PageHeader from "@/components/PageContainer/PageHeader";
import UserMultiSelect from "../../components/UserMultiSelect";
import SelectedUserChips from "../../components/SelectedUserChips";
import UserNotSelectedEmpty from "../../components/UserNotSelectedEmpty";
import AdminEntitlementsMatrix from "../AdminEntitlementsMatrix";
import AdminEntitlementsRevokeDialog from "../AdminEntitlementsRevokeDialog";
// hooks
import { useAnnounce } from "@/hooks";

const AdminEntitlementsBoard = () => {
  const t = useTranslations("adminEntitlements");
  const tAnnounce = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  const [selectedUsers, setSelectedUsers] = useState<AdminUser[]>([]);
  const [revokeTarget, setRevokeTarget] = useState<BulkEntitlementRow | null>(
    null
  );

  const removeUser = (user: AdminUser) => {
    setSelectedUsers((prev) => prev.filter((item) => item._id !== user._id));
    announce(tAnnounce("deselected", { name: user.fullName }));
  };

  const toggleUser = (user: AdminUser) => {
    const isSelected = selectedUsers.some((item) => item._id === user._id);
    if (isSelected) {
      removeUser(user);
      return;
    }
    setSelectedUsers((prev) => [...prev, user]);
    announce(tAnnounce("selected", { name: user.fullName }));
  };

  return (
    <PageShell fullHeight>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <UserMultiSelect selectedUsers={selectedUsers} onToggle={toggleUser} />
      <SelectedUserChips users={selectedUsers} onRemove={removeUser} />
      <div>
        {selectedUsers.length === 0 ? (
          <UserNotSelectedEmpty />
        ) : (
          <AdminEntitlementsMatrix
            selectedUsers={selectedUsers}
            onRevokeRequest={setRevokeTarget}
          />
        )}
      </div>
      <AdminEntitlementsRevokeDialog
        selectedUsers={selectedUsers}
        target={revokeTarget}
        onClose={() => setRevokeTarget(null)}
      />
    </PageShell>
  );
};

export default AdminEntitlementsBoard;

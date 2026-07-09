"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { AdminUser } from "@/types/AdminUsers";
import type { BulkEntitlementRow } from "@/types/AdminEntitlements";
// components
import UserMultiSelect from "../../components/UserMultiSelect";
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
    <main className="mx-auto w-full max-w-3xl p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
      </div>
      <UserMultiSelect
        selectedUsers={selectedUsers}
        onToggle={toggleUser}
        onRemove={removeUser}
      />
      <div className="mt-6">
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
    </main>
  );
};

export default AdminEntitlementsBoard;

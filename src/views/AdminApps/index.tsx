"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { WebApp, AdminAppCreateResult } from "@/types/AdminApps";
// components
import AdminAppsHeader from "./mains/AdminAppsHeader";
import AdminAppsToolbar from "./mains/AdminAppsToolbar";
import AdminAppsTable from "./mains/AdminAppsTable";
import AdminAppsFormSheet from "./mains/AdminAppsFormSheet";
import AdminAppsHideDialog from "./mains/AdminAppsHideDialog";
import AdminAppsSecretDialog from "./mains/AdminAppsSecretDialog";
// hooks
import { useAnnounce } from "@/hooks";
import useSetAdminAppStatus from "./hooks/useSetAdminAppStatus";

const AdminApps = () => {
  const tAnnounce = useTranslations("adminApps.announce");
  const { announce } = useAnnounce();
  const setStatusMutation = useSetAdminAppStatus();

  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<WebApp | null>(null);
  const [hideTarget, setHideTarget] = useState<WebApp | null>(null);
  const [createdApp, setCreatedApp] = useState<AdminAppCreateResult | null>(
    null
  );

  const handleCreate = () => {
    setEditingApp(null);
    setFormOpen(true);
  };

  const handleEdit = (app: WebApp) => {
    setEditingApp(app);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingApp(null);
  };

  const handleHide = (app: WebApp) => setHideTarget(app);

  const handleCloseHide = () => setHideTarget(null);

  const handleUnhide = (app: WebApp) =>
    setStatusMutation.mutate(
      { id: app._id, status: "active" },
      {
        onSuccess: () =>
          announce(tAnnounce("reactivated", { name: app.displayName }))
      }
    );

  const handleCloseSecret = () => setCreatedApp(null);

  return (
    <div className="flex flex-col gap-6">
      <AdminAppsHeader onCreate={handleCreate} />
      <AdminAppsToolbar />
      <AdminAppsTable
        onEdit={handleEdit}
        onHide={handleHide}
        onUnhide={handleUnhide}
      />
      <AdminAppsFormSheet
        open={formOpen}
        editingApp={editingApp}
        onClose={handleCloseForm}
        onCreated={setCreatedApp}
      />
      <AdminAppsHideDialog target={hideTarget} onClose={handleCloseHide} />
      <AdminAppsSecretDialog app={createdApp} onClose={handleCloseSecret} />
    </div>
  );
};

export default AdminApps;

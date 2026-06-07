"use client";

// libs
import { useState } from "react";
// types
import type { WebApp, AdminAppCreateResult } from "@/types/AdminApps";
// components
import AdminAppsHeader from "./mains/AdminAppsHeader";
import AdminAppsToolbar from "./mains/AdminAppsToolbar";
import AdminAppsTable from "./mains/AdminAppsTable";
import AdminAppsFormSheet from "./mains/AdminAppsFormSheet";
import AdminAppsDeleteDialog from "./mains/AdminAppsDeleteDialog";
import AdminAppsSecretDialog from "./mains/AdminAppsSecretDialog";

const AdminApps = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<WebApp | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WebApp | null>(null);
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

  const handleDelete = (app: WebApp) => setDeleteTarget(app);

  const handleCloseDelete = () => setDeleteTarget(null);

  const handleCloseSecret = () => setCreatedApp(null);

  return (
    <div className="space-y-6">
      <AdminAppsHeader onCreate={handleCreate} />
      <AdminAppsToolbar />
      <AdminAppsTable onEdit={handleEdit} onDelete={handleDelete} />
      <AdminAppsFormSheet
        open={formOpen}
        editingApp={editingApp}
        onClose={handleCloseForm}
        onCreated={setCreatedApp}
      />
      <AdminAppsDeleteDialog
        target={deleteTarget}
        onClose={handleCloseDelete}
      />
      <AdminAppsSecretDialog app={createdApp} onClose={handleCloseSecret} />
    </div>
  );
};

export default AdminApps;

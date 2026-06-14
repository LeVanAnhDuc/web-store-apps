// components
import AdminUsersHeader from "./mains/AdminUsersHeader";
import AdminUsersTable from "./mains/AdminUsersTable";

const AdminUsers = () => (
  <div className="flex flex-col gap-6">
    <AdminUsersHeader />
    <AdminUsersTable />
  </div>
);

export default AdminUsers;

// components
import AdminLoginHistoryHeader from "./mains/AdminLoginHistoryHeader";
import AdminLoginHistoryTable from "./mains/AdminLoginHistoryTable";

const AdminLoginHistory = () => (
  <div className="flex flex-col gap-6">
    <AdminLoginHistoryHeader />
    <AdminLoginHistoryTable />
  </div>
);

export default AdminLoginHistory;

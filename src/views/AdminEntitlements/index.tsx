// components
import AdminEntitlementsHeader from "./mains/AdminEntitlementsHeader";
import AdminEntitlementsTable from "./mains/AdminEntitlementsTable";

const AdminEntitlements = () => (
  <div className="flex flex-col gap-6">
    <AdminEntitlementsHeader />
    <AdminEntitlementsTable />
  </div>
);

export default AdminEntitlements;

// components
import AdminContactHeader from "./mains/AdminContactHeader";
import AdminContactTable from "./mains/AdminContactTable";

const AdminContact = () => (
  <div className="flex flex-col gap-6">
    <AdminContactHeader />
    <AdminContactTable />
  </div>
);

export default AdminContact;

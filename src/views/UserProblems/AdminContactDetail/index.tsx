// components
import AdminContactDetailHeader from "./mains/AdminContactDetailHeader";
import ContactDetailCard from "./mains/ContactDetailCard";
import ContactAttachments from "./mains/ContactAttachments";

const AdminContactDetail = ({ id }: { id: string }) => (
  <div className="space-y-6">
    <AdminContactDetailHeader />
    <ContactDetailCard id={id} />
    <ContactAttachments id={id} />
  </div>
);

export default AdminContactDetail;

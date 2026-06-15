// components
import PageHeader from "./mains/PageHeader";
import ChangePasswordCard from "./mains/ChangePasswordCard";

const AccountSettings = () => (
  <div className="flex flex-col gap-6">
    <PageHeader />
    <ChangePasswordCard />
  </div>
);

export default AccountSettings;

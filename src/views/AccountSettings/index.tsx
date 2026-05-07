// components
import PageHeader from "./mains/PageHeader";
import ChangePasswordCard from "./mains/ChangePasswordCard";
import TwoFactorCard from "./mains/TwoFactorCard";
import ActiveSessionsCard from "./mains/ActiveSessionsCard";
import DangerZoneCard from "./mains/DangerZoneCard";

const AccountSettings = () => (
  <div className="flex flex-col gap-6 p-6 lg:p-8">
    <PageHeader />
    <ChangePasswordCard />
    <TwoFactorCard />
    <ActiveSessionsCard />
    <DangerZoneCard />
  </div>
);

export default AccountSettings;

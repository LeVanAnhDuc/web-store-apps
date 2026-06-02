// components
import PageHeader from "./mains/PageHeader";
import ChangePasswordCard from "./mains/ChangePasswordCard";
import LoginActivityCard from "./mains/LoginActivityCard";
import ApiKeysCard from "./mains/ApiKeysCard";
import DangerZoneCard from "./mains/DangerZoneCard";

const Security = () => (
  <div className="flex flex-col gap-6">
    <PageHeader />
    <ChangePasswordCard />
    <LoginActivityCard />
    <ApiKeysCard />
    <DangerZoneCard />
  </div>
);

export default Security;

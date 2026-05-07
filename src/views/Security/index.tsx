// components
import PageHeader from "./mains/PageHeader";
import LoginActivityCard from "./mains/LoginActivityCard";
import ApiKeysCard from "./mains/ApiKeysCard";
import DangerZoneCard from "./mains/DangerZoneCard";

const Security = () => (
  <div className="flex flex-col gap-6 p-6 lg:p-8">
    <PageHeader />
    <LoginActivityCard />
    <ApiKeysCard />
    <DangerZoneCard />
  </div>
);

export default Security;

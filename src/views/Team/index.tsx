// components
import PageHeader from "./mains/PageHeader";
import TeamMembersCard from "./mains/TeamMembersCard";
import PendingInvitationsCard from "./mains/PendingInvitationsCard";
import RolesCard from "./mains/RolesCard";

const Team = () => (
  <div className="flex flex-col gap-6">
    <PageHeader />
    <TeamMembersCard />
    <PendingInvitationsCard />
    <RolesCard />
  </div>
);

export default Team;

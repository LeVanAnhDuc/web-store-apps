"use client";

// types
import type { AdminUser } from "@/types/AdminUsers";
// components
import UserChip from "../UserChip";

const SelectedUserChips = ({
  users,
  onRemove,
  removeLabel
}: {
  users: AdminUser[];
  onRemove: (user: AdminUser) => void;
  removeLabel: (name: string) => string;
}) => {
  if (users.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {users.map((user) => (
        <UserChip
          key={user._id}
          user={user}
          removeLabel={removeLabel(user.fullName)}
          onRemove={() => onRemove(user)}
        />
      ))}
    </div>
  );
};

export default SelectedUserChips;

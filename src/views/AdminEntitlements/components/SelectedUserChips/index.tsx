"use client";

// libs
import { useTranslations } from "next-intl";
// types
import type { AdminUser } from "@/types/AdminUsers";
// components
import UserChip from "../UserChip";

const SelectedUserChips = ({
  users,
  onRemove
}: {
  users: AdminUser[];
  onRemove: (user: AdminUser) => void;
}) => {
  const t = useTranslations("adminEntitlements.picker");

  if (users.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {users.map((user) => (
        <UserChip
          key={user._id}
          user={user}
          removeLabel={t("removeUser", { name: user.fullName })}
          onRemove={() => onRemove(user)}
        />
      ))}
    </div>
  );
};

export default SelectedUserChips;

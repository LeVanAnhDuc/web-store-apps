"use client";

// types
import type { AdminUser } from "@/types/AdminEntitlements";
// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import CustomSelectTrigger from "@/components/CustomSelectTrigger";
// hooks
import useAdminUsers from "../../hooks/useAdminUsers";

const UserPickerSelect = ({
  value,
  onValueChange,
  placeholder
}: {
  value: string | undefined;
  onValueChange: (userId: string) => void;
  placeholder: string;
}) => {
  const { data: users = [] } = useAdminUsers();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <CustomSelectTrigger>
        <SelectValue placeholder={placeholder} />
      </CustomSelectTrigger>
      <SelectContent>
        {users.map((user: AdminUser) => (
          <SelectItem key={user._id} value={user._id}>
            <div className="flex items-center gap-2">
              <span className="text-foreground">{user.fullName}</span>
              <span className="text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserPickerSelect;

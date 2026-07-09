"use client";

// libs
import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { AdminUser } from "@/types/AdminUsers";
// components
import CustomInput from "@/components/CustomInput";
import {
  Popover,
  PopoverAnchor,
  PopoverContent
} from "@/components/ui/popover";
import UserChip from "../UserChip";
import UserResultsList from "../UserResultsList";
// ghosts
import PickerResultsAnnouncer from "../../ghosts/PickerResultsAnnouncer";
// hooks
import { useDebouncedValue } from "@/hooks";
import useAdminUsersSearch from "../../hooks/useAdminUsersSearch";

const UserMultiSelect = ({
  selectedUsers,
  onToggle,
  onRemove
}: {
  selectedUsers: AdminUser[];
  onToggle: (user: AdminUser) => void;
  onRemove: (user: AdminUser) => void;
}) => {
  const t = useTranslations("adminEntitlements.picker");
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const debounced = useDebouncedValue(search, 300);
  const hasQuery = debounced.trim().length > 0;
  const isOpen = isFocused && hasQuery;

  const { data, isFetching } = useAdminUsersSearch(debounced.trim(), isOpen);
  const users = data?.items ?? [];
  const total = data?.meta.total ?? 0;
  const selectedIds = selectedUsers.map((user) => user._id);

  return (
    <Popover open={isOpen} onOpenChange={(next) => setIsFocused(next)}>
      <PopoverAnchor asChild>
        <div className="border-input bg-input-background focus-within:ring-ring/20 flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border px-2 py-1.5 focus-within:ring-2">
          <Search
            className="text-muted-foreground ml-1 size-4 shrink-0"
            aria-hidden="true"
          />
          {selectedUsers.map((user) => (
            <UserChip
              key={user._id}
              user={user}
              removeLabel={t("removeUser", { name: user.fullName })}
              onRemove={() => onRemove(user)}
            />
          ))}
          <CustomInput
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-label={t("searchPlaceholder")}
            value={search}
            placeholder={t("searchPlaceholder")}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="h-8 min-w-[8rem] flex-1 border-0 bg-transparent px-1 shadow-none focus:border-0 focus-visible:ring-0"
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-[var(--radix-popover-trigger-width)] p-2"
      >
        <UserResultsList
          users={users}
          total={total}
          isLoading={isFetching}
          selectedIds={selectedIds}
          onToggle={onToggle}
        />
      </PopoverContent>
      <PickerResultsAnnouncer
        count={users.length}
        isOpen={isOpen}
        query={debounced.trim()}
      />
    </Popover>
  );
};

export default UserMultiSelect;

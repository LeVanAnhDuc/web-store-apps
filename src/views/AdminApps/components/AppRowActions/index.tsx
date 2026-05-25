"use client";

// libs
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { WebApp } from "@/types/AdminApps";
// components
import CustomButton from "@/components/CustomButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AppRowActions = ({
  app,
  onEdit,
  onDelete
}: {
  app: WebApp;
  onEdit: (app: WebApp) => void;
  onDelete: (app: WebApp) => void;
}) => {
  const t = useTranslations("adminApps.actions");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomButton
          variant="ghost"
          size="icon-sm"
          aria-label={t("rowMenuLabel")}
        >
          <MoreHorizontal className="size-4" aria-hidden="true" />
        </CustomButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onSelect={() => onEdit(app)}
        >
          <Edit className="size-4" aria-hidden="true" />
          <span>{t("edit")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-2"
          onSelect={() => onDelete(app)}
        >
          <Trash2 className="size-4" aria-hidden="true" />
          <span>{t("delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppRowActions;

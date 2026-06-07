"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { AdminAppFormValues, WebApp } from "@/types/AdminApps";
// components
import CustomButton from "@/components/CustomButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppFormFields from "../../components/AppFormFields";
// ghosts
import FormResetEffect from "../../ghosts/FormResetEffect";
// forms
import { adminAppFormProps } from "@/forms/AdminApp";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { getAdminAppCategories } from "@/requests/adminApps";
// others
import { createAdminApp, updateAdminApp } from "@/mocks/AdminApps";

const ADMIN_APPS_QUERY_KEY = "adminApps";
const ADMIN_APP_CATEGORIES_QUERY_KEY = "adminAppCategories";

const AdminAppsFormSheet = ({
  open,
  editingApp,
  onClose
}: {
  open: boolean;
  editingApp: WebApp | null;
  onClose: () => void;
}) => {
  const t = useTranslations("adminApps.form");
  const tActions = useTranslations("adminApps.actions");
  const tToast = useTranslations("adminApps.toast");
  const tAnnounce = useTranslations("adminApps.announce");
  const { announce } = useAnnounce();
  const queryClient = useQueryClient();
  const isEdit = editingApp !== null;

  const methods = useForm<AdminAppFormValues>(adminAppFormProps);

  const { data: categories = [] } = useQuery({
    queryKey: [ADMIN_APP_CATEGORIES_QUERY_KEY],
    queryFn: getAdminAppCategories,
    enabled: open
  });

  const createMutation = useMutation({
    mutationFn: createAdminApp,
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_APPS_QUERY_KEY] });
      toast.success(tToast("createSuccess"));
      announce(tAnnounce("created", { name: created.displayName }));
      onClose();
    },
    onError: () => toast.error(tToast("error"))
  });

  const updateMutation = useMutation({
    mutationFn: (values: AdminAppFormValues) => {
      if (!editingApp) throw new Error("No editing app");
      return updateAdminApp(editingApp._id, values);
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_APPS_QUERY_KEY] });
      toast.success(tToast("updateSuccess"));
      announce(tAnnounce("updated", { name: updated.displayName }));
      onClose();
    },
    onError: () => toast.error(tToast("error"))
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: AdminAppFormValues) => {
    if (isEdit) updateMutation.mutate(values);
    else createMutation.mutate(values);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        <FormProvider {...methods}>
          <FormResetEffect open={open} editingApp={editingApp} />
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <SheetHeader className="border-border border-b">
              <SheetTitle>
                {isEdit ? t("editTitle") : t("createTitle")}
              </SheetTitle>
              <SheetDescription>
                {isEdit ? t("editDescription") : t("createDescription")}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <AppFormFields categories={categories} disabled={isPending} />
              </div>
            </ScrollArea>
            <SheetFooter className="border-border flex-row justify-end gap-2 border-t">
              <CustomButton
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isPending}
              >
                {tActions("cancel")}
              </CustomButton>
              <CustomButton type="submit" loading={isPending}>
                {isEdit ? tActions("updateSubmit") : tActions("createSubmit")}
              </CustomButton>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default AdminAppsFormSheet;

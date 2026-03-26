"use client";

// libs
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// hooks
import { useAnnounce } from "@/hooks";
// types
import type { ContactStatus, ContactCategory } from "@/types/ContactAdmin";
// components
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
// requests
import {
  getAdminContactDetail,
  updateContactStatus,
  updateContactCategory
} from "@/requests/contactAdmin";
// dataSources
import {
  CONTACT_STATUS_VARIANT,
  CONTACT_CATEGORY_VALUES
} from "@/dataSources/ContactAdmin";
// others
import { formatDateTimeMedium } from "@/utils";

const ContactDetailCard = ({ id }: { id: string }) => {
  const t = useTranslations("contactAdmin.admin.detail");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const tAnnounce = useTranslations("contactAdmin.announce");
  const { announce } = useAnnounce();
  const queryClient = useQueryClient();

  const { data: contact, isLoading } = useQuery({
    queryKey: ["adminContactDetail", id],
    queryFn: () => getAdminContactDetail(id)
  });

  const { mutate: changeStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: (status: ContactStatus) => updateContactStatus(id, status),
    onMutate: () => {
      announce(tAnnounce("statusUpdating"));
    },
    onSuccess: () => {
      announce(tAnnounce("statusUpdated"));
      toast.success(t("updateStatus.success"));
      queryClient.invalidateQueries({ queryKey: ["adminContactDetail", id] });
      queryClient.invalidateQueries({ queryKey: ["adminContacts"] });
    },
    onError: () => {
      announce(tAnnounce("statusError"));
      toast.error(t("updateStatus.error"));
    }
  });

  const { mutate: changeCategory, isPending: isUpdatingCategory } = useMutation(
    {
      mutationFn: (category: ContactCategory) =>
        updateContactCategory(id, category),
      onMutate: () => {
        announce(tAnnounce("categoryUpdating"));
      },
      onSuccess: () => {
        announce(tAnnounce("categoryUpdated"));
        toast.success(t("updateCategory.success"));
        queryClient.invalidateQueries({
          queryKey: ["adminContactDetail", id]
        });
        queryClient.invalidateQueries({ queryKey: ["adminContacts"] });
      },
      onError: () => {
        announce(tAnnounce("categoryError"));
        toast.error(t("updateCategory.error"));
      }
    }
  );

  if (isLoading) {
    return (
      <div className="bg-card space-y-3 rounded-xl border p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="bg-muted h-8 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-lg font-bold">{contact.ticketNumber}</p>
          <p className="text-muted-foreground text-sm">
            {formatDateTimeMedium(contact.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={CONTACT_STATUS_VARIANT[contact.status]}
            className="text-sm"
          >
            {tStatus(contact.status)}
          </Badge>
          <div className="flex items-center gap-2">
            <Select
              value={contact.status}
              onValueChange={(v) => changeStatus(v as ContactStatus)}
              disabled={isUpdatingStatus}
            >
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder={t("updateStatus.label")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">{tStatus("new")}</SelectItem>
                <SelectItem value="processing">
                  {tStatus("processing")}
                </SelectItem>
                <SelectItem value="resolved">{tStatus("resolved")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contact.email && (
          <div>
            <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {t("fields.email")}
            </dt>
            <dd className="mt-1 text-sm">{contact.email}</dd>
          </div>
        )}
        {contact.userId && (
          <div>
            <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {t("fields.userId")}
            </dt>
            <dd className="mt-1 font-mono text-xs">{contact.userId}</dd>
          </div>
        )}
        <div>
          <dt className="text-muted-foreground mb-1 text-xs font-medium tracking-wide uppercase">
            {t("fields.category")}
          </dt>
          <dd>
            <Select
              value={contact.category}
              onValueChange={(v) => changeCategory(v as ContactCategory)}
              disabled={isUpdatingCategory}
            >
              <SelectTrigger className="h-8 w-full text-sm">
                <SelectValue placeholder={t("updateCategory.label")} />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_CATEGORY_VALUES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {tCategory(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {t("fields.ipAddress")}
          </dt>
          <dd className="mt-1 font-mono text-xs">{contact.ipAddress}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {t("fields.updatedAt")}
          </dt>
          <dd className="mt-1 text-sm">
            {formatDateTimeMedium(contact.updatedAt)}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {t("fields.subject")}
          </dt>
          <dd className="mt-1 text-sm font-medium">{contact.subject}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
            {t("fields.message")}
          </dt>
          <dd className="bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-wrap">
            {contact.message}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ContactDetailCard;

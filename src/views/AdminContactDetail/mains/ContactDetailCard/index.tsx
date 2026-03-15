"use client";

// libs
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { ContactStatus } from "@/types/ContactAdmin";
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
  updateContactStatus
} from "@/requests/contactAdmin";

const statusVariant: Record<
  ContactStatus,
  "default" | "secondary" | "outline"
> = {
  new: "default",
  processing: "secondary",
  resolved: "outline"
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

const ContactDetailCard = ({ id }: { id: string }) => {
  const t = useTranslations("contactAdmin.admin.detail");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ContactStatus | "">("");

  const { data: contact, isLoading } = useQuery({
    queryKey: ["adminContactDetail", id],
    queryFn: () => getAdminContactDetail(id)
  });

  useEffect(() => {
    if (contact) setSelectedStatus(contact.status);
  }, [contact]);

  const { mutate: changeStatus, isPending: isUpdating } = useMutation({
    mutationFn: (status: ContactStatus) => updateContactStatus(id, status),
    onSuccess: () => {
      toast.success(t("updateStatus.success"));
      queryClient.invalidateQueries({ queryKey: ["adminContactDetail", id] });
      queryClient.invalidateQueries({ queryKey: ["adminContacts"] });
    },
    onError: () => {
      toast.error(t("updateStatus.error"));
    }
  });

  if (isLoading) {
    return (
      <div className="bg-card space-y-3 rounded-xl border p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-muted h-8 animate-pulse rounded-lg" />
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
            {formatDate(contact.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant[contact.status]} className="text-sm">
            {tStatus(contact.status)}
          </Badge>
          <div className="flex items-center gap-2">
            <Select
              value={selectedStatus}
              onValueChange={(v) => {
                setSelectedStatus(v as ContactStatus);
                changeStatus(v as ContactStatus);
              }}
              disabled={isUpdating}
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
          <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {t("fields.category")}
          </dt>
          <dd className="mt-1 text-sm">{tCategory(contact.category)}</dd>
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
          <dd className="mt-1 text-sm">{formatDate(contact.updatedAt)}</dd>
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

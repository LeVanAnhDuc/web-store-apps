"use client";

// libs
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FileText, Download, X } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
// requests
import { getAdminContactDetail } from "@/requests/contactAdmin";

const ContactAttachments = ({ id }: { id: string }) => {
  const t = useTranslations("contactAdmin.admin.detail.attachments");
  const tFields = useTranslations("contactAdmin.admin.detail.fields");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: contact } = useQuery({
    queryKey: ["adminContactDetail", id],
    queryFn: () => getAdminContactDetail(id)
  });

  const attachments = contact?.attachments ?? [];

  if (attachments.length === 0) {
    return (
      <div className="bg-card rounded-xl border p-6">
        <p className="text-foreground mb-4 text-sm font-semibold">
          {tFields("attachments")}
        </p>
        <p className="text-muted-foreground text-sm">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border p-6">
      <p className="text-foreground mb-4 text-sm font-semibold">
        {tFields("attachments")} ({attachments.length})
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {attachments.map((att, i) => {
          const isImage = att.mimeType.startsWith("image/");
          return (
            <div
              key={i}
              className="bg-muted/50 group relative rounded-lg border p-3"
            >
              {isImage && att.previewUrl ? (
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setPreviewUrl(att.previewUrl)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={att.previewUrl}
                    alt={att.originalName}
                    width={200}
                    height={80}
                    className="mb-2 h-20 w-full rounded object-cover"
                  />
                </button>
              ) : (
                <div className="mb-2 flex h-20 items-center justify-center">
                  <FileText className="text-muted-foreground size-10" />
                </div>
              )}
              <p className="truncate text-xs font-medium">{att.originalName}</p>
              <p className="text-muted-foreground text-xs">
                {(att.size / 1024).toFixed(0)} KB
              </p>
              <a
                href={att.previewUrl ?? undefined}
                download={att.originalName}
                className="text-primary mt-2 flex items-center gap-1 text-xs hover:underline"
              >
                <Download className="size-3" />
                {t("download")}
              </a>
            </div>
          );
        })}
      </div>

      {previewUrl && (
        <button
          type="button"
          aria-label={t("closePreview")}
          className="bg-background/80 fixed inset-0 z-50 flex w-full cursor-default items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <CustomButton
              variant="outline"
              size="sm"
              aria-label={t("closePreview")}
              className="absolute -top-10 right-0"
              onClick={() => setPreviewUrl(null)}
            >
              <X className="size-4" aria-hidden="true" />
            </CustomButton>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview"
              width={1920}
              height={1080}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default ContactAttachments;

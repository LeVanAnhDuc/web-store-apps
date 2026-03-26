"use client";

// libs
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// hooks
import { useAnnounce } from "@/hooks";
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// requests
import { getMyProfile, uploadAvatar } from "@/requests/user";
// others
import { getInitials } from "@/utils";
import CONSTANTS from "@/constants";

const AvatarUpload = () => {
  const t = useTranslations("user.profile");
  const tAnnounce = useTranslations("user.profile.announce");
  const { announce } = useAnnounce();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadAvatar,
    onMutate: () => {
      announce(tAnnounce("uploading"));
    },
    onSuccess: () => {
      announce(tAnnounce("uploadSuccess"));
      void queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      toast.success(t("toast.avatarSuccess"));
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    },
    onError: () => {
      announce(tAnnounce("uploadError"));
      toast.error(t("toast.avatarError"));
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    }
  });

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const { ALLOWED_MIME_TYPES, MAX_SIZE_BYTES } =
      CONSTANTS.USER_PROFILE.AVATAR_UPLOAD;

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      toast.error(t("validation.avatar.type"));
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error(t("validation.avatar.size"));
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    mutate(file);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-muted size-24 animate-pulse rounded-full" />
          <div className="bg-muted h-8 w-28 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const displaySrc = previewUrl ?? profile.avatar ?? "";
  const initials = getInitials(profile.fullName);

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={handleClick}
          disabled={isPending}
          className="cursor-pointer rounded-full transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={t("fields.avatar")}
        >
          <Avatar className="ring-border size-24 ring-2">
            <AvatarImage src={displaySrc} alt={profile.fullName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="sr-only"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={isPending}
          >
            {profile.avatar
              ? t("button.changeAvatar")
              : t("button.uploadAvatar")}
          </Button>
          <p className="text-muted-foreground text-xs">{t("avatar.hint")}</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;

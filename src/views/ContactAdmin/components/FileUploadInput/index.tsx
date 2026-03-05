"use client";

// libs
import { useRef, useState } from "react";
import { Paperclip, X, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Label } from "@/components/ui/label";
import CustomButton from "@/components/CustomButton";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

const isImage = (file: File) => file.type.startsWith("image/");

const FileUploadInput = ({
  disabled,
  onFilesChange
}: {
  disabled: boolean;
  onFilesChange: (files: File[]) => void;
}) => {
  const t = useTranslations("contactAdmin.form.attachments");
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (incoming: FileList | File[]) => {
    const newErrors: string[] = [];
    const toAdd: File[] = [];

    Array.from(incoming).forEach((file) => {
      if (files.length + toAdd.length >= MAX_FILES) {
        newErrors.push(t("errors.maxFilesExceeded"));
        return;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(t("errors.typeNotSupported", { name: file.name }));
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        newErrors.push(t("errors.fileTooLarge", { name: file.name }));
        return;
      }
      toAdd.push(file);
    });

    setErrors(newErrors);
    if (toAdd.length > 0) {
      const updated = [...files, ...toAdd];
      setFiles(updated);
      onFilesChange(updated);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange(updated);
    setErrors([]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) addFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Label className="text-sm font-medium">{t("label")}</Label>
        <span className="text-muted-foreground text-xs">{t("labelNote")}</span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30 hover:border-muted-foreground/50"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <Paperclip className="text-muted-foreground mx-auto mb-2 size-5" />
        <p className="text-muted-foreground text-sm">
          {t("dragDrop")}{" "}
          <span className="text-primary font-medium">{t("browse")}</span>
        </p>
        <p className="text-muted-foreground mt-1 text-xs">{t("hint")}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
          className="hidden"
          disabled={disabled}
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {errors.length > 0 && (
        <ul className="space-y-0.5">
          {errors.map((err, i) => (
            <li key={i} className="text-destructive text-xs">
              {err}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={i}
              className="bg-muted/50 flex items-center gap-3 rounded-lg px-3 py-2"
            >
              {isImage(file) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="size-10 rounded object-cover"
                />
              ) : (
                <div className="bg-muted flex size-10 items-center justify-center rounded">
                  {file.type === "application/pdf" ? (
                    <FileText className="text-destructive size-5" />
                  ) : (
                    <FileText className="text-primary size-5" />
                  )}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-muted-foreground text-xs">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <CustomButton
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                className="text-muted-foreground hover:text-destructive size-7 p-0"
                onClick={() => removeFile(i)}
              >
                <X className="size-4" />
              </CustomButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploadInput;

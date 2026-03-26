export interface ContactAdminFormValues {
  email?: string;
  subject: string;
  message: string;
}

// ─── v2.0 Types ──────────────────────────────────────────────────────────────

export type ContactStatus = "new" | "processing" | "resolved";
export type ContactCategory =
  | "account"
  | "technical"
  | "feature"
  | "billing"
  | "security"
  | "other";
export type Priority = "low" | "medium" | "high";

export interface ContactAttachmentResponse {
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  previewUrl: string | null;
}

export interface ContactListItem {
  _id: string;
  ticketNumber: string;
  email: string | null;
  subject: string;
  category: ContactCategory;
  priority: Priority;
  status: ContactStatus;
  userId: string | null;
  attachmentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactDetailItem extends ContactListItem {
  message: string;
  ipAddress: string | null;
  attachments: ContactAttachmentResponse[];
}

export interface UserContactItem {
  _id: string;
  ticketNumber: string;
  subject: string;
  category: ContactCategory;
  priority: Priority;
  status: ContactStatus;
  attachmentCount: number;
  createdAt: string;
}

export interface ContactMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedContactsResponse {
  items: ContactListItem[];
  meta: ContactMeta;
}

export interface PaginatedUserContactsResponse {
  items: UserContactItem[];
  meta: ContactMeta;
}

export interface AdminContactQuery {
  page?: number;
  limit?: number;
  status?: ContactStatus;
  category?: ContactCategory;
  priority?: Priority;
  email?: string;
  ticketNumber?: string;
  userId?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: "createdAt" | "priority" | "status" | "category";
  sortOrder?: "asc" | "desc";
}

export interface MyContactsQuery {
  page?: number;
  limit?: number;
  sortBy?: "createdAt";
  sortOrder?: "asc" | "desc";
}

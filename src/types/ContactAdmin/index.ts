// types
import type { SortOrder } from "@/types/List";

export type ContactStatus = "new" | "processing" | "resolved";
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
  email: string | null;
  subject: string;
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
  subject: string;
  priority: Priority;
  status: ContactStatus;
  attachmentCount: number;
  createdAt: string;
}

export type PaginatedContactsResponse = Paginated<ContactListItem>;

export type PaginatedUserContactsResponse = Paginated<UserContactItem>;

export interface AdminContactQuery {
  page?: number;
  limit?: number;
  status?: ContactStatus;
  priority?: Priority;
  email?: string;
  userId?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: "createdAt" | "priority" | "status";
  sortOrder?: SortOrder;
}

export interface MyContactsQuery {
  page?: number;
  limit?: number;
  sortBy?: "createdAt";
  sortOrder?: SortOrder;
}

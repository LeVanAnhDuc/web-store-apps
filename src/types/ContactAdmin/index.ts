// types
import type { SortOrder } from "@/types/List";
// constants
import type CONTACT_STATUS from "@/constants/contactStatus";
import type PRIORITY from "@/constants/priority";

export type ContactStatus =
  (typeof CONTACT_STATUS)[keyof typeof CONTACT_STATUS];
export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];

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

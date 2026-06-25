// types
import type { LucideIcon } from "lucide-react";

export interface PaymentMethodMock {
  id: string;
  brand: "visa" | "mastercard";
  brandLabel: string;
  last4: string;
  expires: string;
  isDefault: boolean;
  icon: LucideIcon;
}

export type InvoiceStatus = "paid" | "pending" | "failed";

export interface InvoiceMock {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
}

export interface UsageStatMock {
  key: "totalPatches" | "totalBranches" | "apiCalls";
  value: string;
  ratio: number;
}

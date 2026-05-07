// types
import type { LucideIcon } from "lucide-react";
// libs
import { CreditCard } from "lucide-react";

export interface PaymentMethodMock {
  id: string;
  brand: "visa" | "mastercard";
  brandLabel: string;
  last4: string;
  expires: string;
  isDefault: boolean;
  icon: LucideIcon;
}

export const PAYMENT_METHODS_MOCK: readonly PaymentMethodMock[] = [
  {
    id: "pm-1",
    brand: "visa",
    brandLabel: "Visa",
    last4: "4242",
    expires: "08/2027",
    isDefault: true,
    icon: CreditCard
  },
  {
    id: "pm-2",
    brand: "mastercard",
    brandLabel: "Mastercard",
    last4: "1956",
    expires: "11/2026",
    isDefault: false,
    icon: CreditCard
  }
] as const;

export type InvoiceStatus = "paid" | "pending" | "failed";

export interface InvoiceMock {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
}

export const INVOICES_MOCK: readonly InvoiceMock[] = [
  {
    id: "inv-1",
    date: "May 1, 2026",
    description: "Pro Plan — Monthly",
    amount: "$12.00",
    status: "paid"
  },
  {
    id: "inv-2",
    date: "Apr 1, 2026",
    description: "Pro Plan — Monthly",
    amount: "$12.00",
    status: "paid"
  },
  {
    id: "inv-3",
    date: "Mar 1, 2026",
    description: "Pro Plan — Monthly",
    amount: "$12.00",
    status: "pending"
  },
  {
    id: "inv-4",
    date: "Feb 1, 2026",
    description: "Pro Plan — Monthly",
    amount: "$12.00",
    status: "paid"
  }
] as const;

export interface UsageStatMock {
  key: "totalPatches" | "totalBranches" | "apiCalls";
  value: string;
  ratio: number;
}

export const USAGE_STATS_MOCK: readonly UsageStatMock[] = [
  { key: "totalPatches", value: "8", ratio: 0.32 },
  { key: "totalBranches", value: "3", ratio: 0.6 },
  { key: "apiCalls", value: "8.4k", ratio: 0.84 }
] as const;

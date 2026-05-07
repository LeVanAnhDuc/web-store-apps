"use client";

// libs
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import PaymentMethodRow from "../../components/PaymentMethodRow";
// others
import { PAYMENT_METHODS_MOCK } from "@/mocks/Billing";

const PaymentMethodCard = () => {
  const t = useTranslations("billing.paymentMethod");

  return (
    <Card className="rounded-2xl border p-0" aria-labelledby="payment-title">
      <div className="border-border flex items-center justify-between gap-3 border-b px-6 py-5">
        <div className="flex flex-col gap-1">
          <h2
            id="payment-title"
            className="text-foreground text-base font-semibold"
          >
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>
        <CustomButton
          variant="outline"
          size="sm"
          iconLeft={<Plus className="size-3.5" aria-hidden="true" />}
        >
          {t("buttons.add")}
        </CustomButton>
      </div>
      <div className="flex flex-col">
        {PAYMENT_METHODS_MOCK.map((method) => (
          <PaymentMethodRow
            key={method.id}
            icon={method.icon}
            brandLabel={method.brandLabel}
            endingLabel={t("ending", { last4: method.last4 })}
            expiresLabel={t("expiresAt", { expires: method.expires })}
            defaultLabel={t("default")}
            isDefault={method.isDefault}
            editLabel={t("buttons.edit")}
            onEdit={() => {}}
          />
        ))}
      </div>
    </Card>
  );
};

export default PaymentMethodCard;

"use client";

// libs
import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import ApiKeyRow from "../../components/ApiKeyRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { API_KEYS_MOCK, type ApiKeyMock } from "@/mocks/Security";

const ApiKeysCard = () => {
  const t = useTranslations("security.apiKeys");
  const { announce } = useAnnounce();
  const [keys, setKeys] = useState<readonly ApiKeyMock[]>(API_KEYS_MOCK);

  const handleCopy = async (prefix: string) => {
    try {
      await navigator.clipboard.writeText(prefix);
    } catch {
      // ignore mock clipboard failures
    }
    announce(t("announce.copied"));
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    announce(t("announce.revoked"));
  };

  return (
    <Card className="rounded-2xl border p-0" aria-labelledby="api-keys-title">
      <div className="border-border flex items-center justify-between gap-3 border-b px-6 py-5">
        <div className="flex flex-col gap-1">
          <h3
            id="api-keys-title"
            className="text-foreground text-base font-semibold"
          >
            {t("title")}
          </h3>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>
        <CustomButton
          size="sm"
          iconLeft={<Plus className="size-3.5" aria-hidden="true" />}
        >
          {t("buttons.generate")}
        </CustomButton>
      </div>
      <div className="flex flex-col">
        {keys.map((item) => (
          <ApiKeyRow
            key={item.id}
            name={item.name}
            prefix={item.prefix}
            meta={t("preview", {
              date: item.createdAt,
              lastUsed: item.lastUsed
            })}
            copyLabel={t("buttons.copy")}
            revokeLabel={t("buttons.revoke")}
            onCopy={() => handleCopy(item.prefix)}
            onRevoke={() => handleRevoke(item.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default ApiKeysCard;

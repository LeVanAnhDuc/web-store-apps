"use client";

// libs
import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import CardSectionTitle from "@/components/CardSectionTitle";
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
    <Card aria-labelledby="api-keys-title">
      <CardHeader className="border-b">
        <CardSectionTitle id="api-keys-title">{t("title")}</CardSectionTitle>
        <CardDescription>{t("description")}</CardDescription>
        <CardAction>
          <CustomButton
            size="sm"
            iconLeft={<Plus className="size-3.5" aria-hidden="true" />}
          >
            {t("buttons.generate")}
          </CustomButton>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
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
      </CardContent>
    </Card>
  );
};

export default ApiKeysCard;

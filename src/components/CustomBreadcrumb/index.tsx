"use client";

// libs
import { Fragment } from "react";
import { useTranslations } from "next-intl";
// types
import type { CustomBreadcrumbItem } from "@/types/CustomBreadcrumb";
// components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
// others
import { Link } from "@/i18n/navigation";

type Namespace = NonNullable<Parameters<typeof useTranslations>[0]>;

const CustomBreadcrumb = ({
  items,
  namespace,
  className
}: {
  items: readonly CustomBreadcrumbItem[];
  namespace: Namespace;
  className?: string;
}) => {
  const t = useTranslations(namespace);
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = item.label ?? t(item.key as Parameters<typeof t>[0]);
          return (
            <Fragment key={item.key}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;

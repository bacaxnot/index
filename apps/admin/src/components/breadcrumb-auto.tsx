"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

type BreadcrumbItem = {
  name: string;
  href?: string;
};
type Props = {
  items: BreadcrumbItem[];
};
export function BreadcrumbAuto({ items }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key={"console"}>
          <BreadcrumbLink href={"/"}>console</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, index) => (
          <>
            <BreadcrumbItem key={`${item.name}`}>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index === items.length - 1 ? null : (
              <BreadcrumbSeparator key={`sp-${index}`} />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

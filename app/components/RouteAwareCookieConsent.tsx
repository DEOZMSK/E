"use client";

import { usePathname } from "next/navigation";
import { CookieConsent } from "./CookieConsent";

export function RouteAwareCookieConsent() {
  const pathname = usePathname();

  if (pathname?.startsWith("/trainers")) {
    return null;
  }

  return <CookieConsent />;
}

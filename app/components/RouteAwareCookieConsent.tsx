"use client";

import { usePathname } from "next/navigation";
import { CookieConsent } from "./CookieConsent";
import { isTrainersRoute } from "./route-guards";

export function RouteAwareCookieConsent() {
  const pathname = usePathname();

  if (isTrainersRoute(pathname)) {
    return null;
  }

  return <CookieConsent />;
}

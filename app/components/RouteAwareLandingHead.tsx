"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { isTrainersRoute } from "./route-guards";

interface RouteAwareLandingHeadProps {
  id: string;
  payload: string;
}

export function RouteAwareLandingHead({ id, payload }: RouteAwareLandingHeadProps) {
  const pathname = usePathname();

  if (isTrainersRoute(pathname)) {
    return null;
  }

  return (
    <Script id={id} type="application/ld+json" strategy="beforeInteractive">
      {payload}
    </Script>
  );
}

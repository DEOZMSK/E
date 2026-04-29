import type { ReactNode } from "react";

interface ResultCardProps {
  children: ReactNode;
}

export function ResultCard({ children }: ResultCardProps) {
  return <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4 text-base">{children}</div>;
}

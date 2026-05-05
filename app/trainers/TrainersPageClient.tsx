"use client";

import Link from "next/link";
import { useState } from "react";
import { TrainerToolsClient } from "./TrainerToolsClient";

interface ToolCardData { id: string; iconSrc: string; label: string; active: boolean }
interface TrainersPageClientProps { cards: ToolCardData[] }

export function TrainersPageClient({ cards }: TrainersPageClientProps) {
  const [activeTool, setActiveTool] = useState("anthropometry");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  if (selectedTool !== null) {
    return (
      <main className="relative min-h-[100dvh] overflow-y-auto bg-[#110813] px-4 pb-6 pt-6 text-neutral-100 sm:px-6 sm:pt-8">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[url('/foni.webp')] bg-cover bg-center bg-no-repeat" />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[#08040b]/38" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <TrainerToolsClient
            cards={cards}
            activeTool={activeTool}
            selectedTool={selectedTool}
            setActiveTool={setActiveTool}
            setSelectedTool={setSelectedTool}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-[#110813] px-4 pb-4 pt-6 text-neutral-100 sm:px-6 sm:pt-8">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[url('/foni.webp')] bg-cover bg-center bg-no-repeat" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[#08040b]/38" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col">
        <header className="relative overflow-hidden rounded-3xl border border-[#ffb280]/25">
          <img src="/fonapp.webp" alt="" aria-hidden="true" className="h-[390px] w-full object-cover object-top sm:h-[500px]" loading="eager" decoding="async" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#170818]/20 via-[#160816]/34 to-[#110813]/84" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,175,128,0.16),transparent_56%)]" />
          <div className="absolute inset-x-0 bottom-0 p-4 pb-20 sm:p-6 sm:pb-24">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Инструменты тренера</h1>
            <p className="mt-2 max-w-3xl text-sm text-neutral-100/90 sm:text-base">
              Профессиональные фитнес-расчёты для оценки клиента: антропометрия, состав тела, питание и тренировочные ориентиры.
            </p>
          </div>
        </header>

        <div className="-mt-16 relative z-10 flex min-h-0 flex-1 flex-col sm:-mt-24">
          <TrainerToolsClient
            cards={cards}
            activeTool={activeTool}
            selectedTool={selectedTool}
            setActiveTool={setActiveTool}
            setSelectedTool={setSelectedTool}
          />
          <div className="flex justify-center pt-2 pb-[calc(env(safe-area-inset-bottom)+10px)]">
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl border border-[#ffbb94]/40 bg-[#25132a]/70 px-5 py-2 text-sm font-medium text-[#ffe0cb] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:bg-[#2f1834]/85"
            >
              ← Назад на сайт
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

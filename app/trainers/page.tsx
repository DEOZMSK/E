import type { Metadata } from "next";
import { TrainerToolsClient } from "./TrainerToolsClient";

export const metadata: Metadata = {
  title: "🧰 Тесты для тренера",
  description:
    "Профессиональные фитнес-расчёты для оценки клиента: антропометрия, состав тела, питание и тренировочные ориентиры.",
  alternates: { canonical: "/trainers" }
};

const trainerCards = [
  { id: "anthropometry", emoji: "📐", label: "Антропометрия", active: true },
  { id: "calories", emoji: "🔥", label: "Калории и БЖУ", active: true },
  { id: "caliper", emoji: "🧴", label: "КЖС / состав тела", active: true },
  { id: "strength", emoji: "💪", label: "Силовые тесты", active: true },
  { id: "flexibility", emoji: "🧘", label: "Гибкость", active: true },
  { id: "functional", emoji: "❤️", label: "PWC170 / МПК", active: true },
  { id: "letunov", emoji: "🫀", label: "Тест Летунова", active: true },
  { id: "stress", emoji: "🧠", label: "Стресс", active: true },
  { id: "hypertrophy", emoji: "🏋️", label: "Гипертрофия", active: true }
];

export default function TrainersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 px-4 pb-10 pt-20 text-neutral-100 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 border border-cyan-400/25 shadow-[0_0_28px_rgba(34,211,238,0.22),inset_0_0_28px_rgba(34,211,238,0.12)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-400/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-fuchsia-500/12 to-transparent" />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-300/45 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-300/45 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">🧰 Инструменты тренера</h1>
          <p className="text-base text-neutral-300 sm:text-lg">
            Профессиональные фитнес-расчёты для оценки клиента: антропометрия, состав тела, питание и тренировочные
            ориентиры.
          </p>
        </header>

        <TrainerToolsClient cards={trainerCards} />
      </div>
    </main>
  );
}

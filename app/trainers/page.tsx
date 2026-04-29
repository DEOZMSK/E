import type { Metadata } from "next";
import { TrainerToolsClient } from "./TrainerToolsClient";

export const metadata: Metadata = {
  title: "🧰 Тесты для тренера",
  description:
    "Профессиональные фитнес-расчёты для оценки клиента: антропометрия, состав тела, питание и тренировочные ориентиры.",
  alternates: { canonical: "/trainers" }
};

const trainerCards = [
  { id: "anthropometry", title: "📐 Антропометрия", active: true },
  { id: "calories", title: "🔥 Калории и БЖУ", active: true },
  { id: "caliper", title: "🧴 КЖС / состав тела", active: true },
  { id: "strength", title: "💪 Силовые тесты", active: true },
  { id: "flexibility", title: "🧘 Гибкость", active: true },
  { id: "functional", title: "❤️ PWC170 / МПК", active: true },
  { id: "letunov", title: "🫀 Тест Летунова", active: true },
  { id: "stress", title: "🧠 Стресс", active: true },
  { id: "hypertrophy", title: "🏋️ Гипертрофия", active: true }
];

export default function TrainersPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-neutral-100 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">🧰 Тесты для тренера</h1>
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

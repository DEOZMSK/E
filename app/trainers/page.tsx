import type { Metadata } from "next";
import { TrainerToolsClient } from "./TrainerToolsClient";

export const metadata: Metadata = {
  title: "🧰 Тесты для тренера",
  description: "Калькуляторы и тесты для тренера: антропометрия, калории и БЖУ для работы с клиентами.",
  alternates: { canonical: "/trainers" }
};

const trainerCards = [
  { id: "anthropometry", title: "📐 Антропометрия", active: true },
  { id: "calories", title: "🔥 Калории и БЖУ", active: true },
  { id: "pulse-zones", title: "❤️ Пульсовые зоны", active: false },
  { id: "one-rep-max", title: "🏋️ 1RM калькулятор", active: false },
  { id: "water", title: "💧 Водный баланс", active: false },
  { id: "recovery", title: "🛌 Восстановление", active: false },
  { id: "cardio", title: "🚴 Кардио-нагрузка", active: false },
  { id: "steps", title: "👟 Шаги и NEAT", active: false }
];

export default function TrainersPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-neutral-100 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">🧰 Тесты для тренера</h1>
          <p className="text-base text-neutral-300 sm:text-lg">Профессиональные фитнес-расчёты...</p>
        </header>

        <TrainerToolsClient cards={trainerCards} />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { TrainerToolsClient } from "./TrainerToolsClient";

export const metadata: Metadata = {
  title: "Тесты для тренера",
  description:
    "Профессиональные фитнес-расчёты для оценки клиента: антропометрия, состав тела, питание и тренировочные ориентиры.",
  alternates: { canonical: "/trainers" }
};

const trainerCards = [
  { id: "anthropometry", iconSrc: "/icon/antropometriya.webp", label: "Антропометрия", active: true },
  { id: "calories", iconSrc: "/icon/kalorii i bju.webp", label: "Калории и БЖУ", active: true },
  { id: "caliper", iconSrc: "/icon/kjs sostav tela.webp", label: "КЖС / состав тела", active: true },
  { id: "strength", iconSrc: "/icon/silovie_testi.webp", label: "Силовые тесты", active: true },
  { id: "flexibility", iconSrc: "/icon/gibkost.webp", label: "Гибкость", active: true },
  { id: "functional", iconSrc: "/icon/pwc170_mpk.webp", label: "PWC170 / МПК", active: true },
  { id: "letunov", iconSrc: "/icon/test_letunova.webp", label: "Тест Летунова", active: true },
  { id: "stress", iconSrc: "/icon/stress.webp", label: "Стресс", active: true },
  { id: "hypertrophy", iconSrc: "/icon/gipertrophiya.webp", label: "Гипертрофия", active: true }
];

export default function TrainersPage() {
  return (
    <main className="relative overflow-hidden bg-[#110813] px-4 pb-5 pt-14 text-neutral-100 sm:px-6 sm:pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[48vh] min-h-[300px] bg-[url('/fonapp.webp')] bg-top bg-no-repeat bg-cover opacity-95" />
        <div className="absolute inset-x-0 top-0 h-[48vh] min-h-[300px] bg-gradient-to-b from-[#1a0a20]/20 via-[#150817]/38 to-[#110813]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,170,120,0.12),transparent_52%),radial-gradient(circle_at_bottom,rgba(190,120,255,0.07),transparent_58%)]" />
        <div className="absolute inset-0 border border-[#ffb280]/18 shadow-[0_0_28px_rgba(255,164,119,0.12),inset_0_0_28px_rgba(171,114,230,0.12)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-4 pb-1">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Инструменты тренера</h1>
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

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
    <main className="bg-[#110813] px-4 pb-5 pt-8 text-neutral-100 sm:px-6 sm:pt-10">
      <div className="mx-auto max-w-6xl space-y-3">
        <header className="relative overflow-hidden rounded-3xl border border-[#ffb280]/25">
          <img
            src="/fonapp.webp"
            alt=""
            aria-hidden="true"
            className="h-[280px] w-full object-cover object-top sm:h-[320px]"
            loading="eager"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#170818]/22 via-[#160816]/35 to-[#110813]/88" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,175,128,0.16),transparent_56%)]" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Инструменты тренера</h1>
            <p className="mt-2 max-w-3xl text-sm text-neutral-100/90 sm:text-base">
              Профессиональные фитнес-расчёты для оценки клиента: антропометрия, состав тела, питание и тренировочные
              ориентиры.
            </p>
          </div>
        </header>

        <TrainerToolsClient cards={trainerCards} />
      </div>
    </main>
  );
}

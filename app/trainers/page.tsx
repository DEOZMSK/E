import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="relative h-[100dvh] overflow-hidden bg-[#110813] px-4 pb-4 pt-6 text-neutral-100 sm:px-6 sm:pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[url('/foni.webp')] bg-cover bg-center bg-no-repeat"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[#08040b]/38" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col">
        <header className="relative overflow-hidden rounded-3xl border border-[#ffb280]/25">
          <img
            src="/fonapp.webp"
            alt=""
            aria-hidden="true"
            className="h-[420px] w-full object-cover object-top sm:h-[500px]"
            loading="eager"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#170818]/20 via-[#160816]/34 to-[#110813]/84" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,175,128,0.16),transparent_56%)]" />
          <div className="absolute inset-x-0 bottom-0 p-4 pb-24 sm:p-6 sm:pb-28">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Инструменты тренера</h1>
            <p className="mt-2 max-w-3xl text-sm text-neutral-100/90 sm:text-base">
              Профессиональные фитнес-расчёты для оценки клиента: антропометрия, состав тела, питание и тренировочные
              ориентиры.
            </p>
          </div>
        </header>

        <div className="-mt-20 relative z-10 flex min-h-0 flex-1 flex-col sm:-mt-24">
          <TrainerToolsClient cards={trainerCards} />
          <div className="flex justify-center pt-3 pb-[calc(env(safe-area-inset-bottom)+14px)]">
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl border border-[#ffbb94]/40 bg-[#25132a]/70 px-5 py-2.5 text-sm font-medium text-[#ffe0cb] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:bg-[#2f1834]/85"
            >
              ← Назад на сайт
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

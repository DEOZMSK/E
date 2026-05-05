import type { Metadata } from "next";
import { TrainersPageClient } from "./TrainersPageClient";

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
  return <TrainersPageClient cards={trainerCards} />;
}

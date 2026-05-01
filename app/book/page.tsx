import type { Metadata } from "next";

import { BOOKING_SERVICES } from "../../content/booking";
import { BOOKING_TIMEZONE } from "../../lib/booking/config";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Запись к Елене Ксорос",
  description:
    "Выберите фитнес-диагностику или персональное сопровождение на 4 недели, дату и удобное время для онлайн-встречи.",
  alternates: {
    canonical: "/book"
  },
  openGraph: {
    title: "Запись к Елене Ксорос",
    description: "Онлайн-запись к Елене Ксорос: фитнес-диагностика за 1500 RUB и персональное сопровождение на 4 недели за 12000 RUB.",
    url: "/book",
    images: [
      {
        url: "/photo.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Елена Ксорос, фитнес-тренер"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Запись к Елене Ксорос",
    description: "Онлайн-запись к Елене Ксорос: фитнес-диагностика за 1500 RUB и персональное сопровождение на 4 недели за 12000 RUB.",
    images: [
      {
        url: "/photo.png",
        alt: "Елена Ксорос, фитнес-тренер"
      }
    ]
  },
  keywords: ["Елена Ксорос", "персональная консультация", "онлайн-запись", "бронирование"]
};

export default function BookPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-[6px] rounded-[26px] border border-[#fff1bf]/25 shadow-[0_0_16px_rgba(255,241,191,0.14),inset_0_0_14px_rgba(255,248,231,0.1)]" />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#fff1bf]/36 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#fff8e7]/38 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffffff]/42 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f7d774]/34 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <header className="space-y-4 text-white">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/60">Онлайн-запись</p>
          <h1 className="text-3xl font-semibold leading-tight">Выберите услугу Елены Ксорос и удобное время</h1>
          <p className="max-w-3xl text-base text-white/75">
            Доступны два формата: фитнес-диагностика за 1500 RUB и персональное сопровождение на 4 недели за 12000 RUB. В календаре выбирается время для диагностики или стартовой онлайн-встречи перед сопровождением. Если не уверены, с чего начать — лучше начать с диагностики: она покажет, какая нагрузка и формат сейчас подходят.
          </p>
        </header>

        <div className="mt-10">
          <BookingForm services={BOOKING_SERVICES} timezone={BOOKING_TIMEZONE} />
        </div>
      </div>
    </main>
  );
}

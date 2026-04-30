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
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
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
    </main>
  );
}

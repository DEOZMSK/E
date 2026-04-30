import type { Metadata } from "next";

import { BOOKING_SERVICES } from "../../content/booking";
import { BOOKING_TIMEZONE } from "../../lib/booking/config";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Запись к Елене Ксорос",
  description:
    "Выберите услугу Елены Ксорос, дату и удобное время. Запись подтверждается сразу после бронирования.",
  alternates: {
    canonical: "/book"
  },
  openGraph: {
    title: "Запись к Елене Ксорос",
    description: "Онлайн-запись к Елене Ксорос: персональная консультация за 1 500 ₽ и расширенная консультация за 12 000 ₽.",
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
    description: "Онлайн-запись к Елене Ксорос: персональная консультация за 1 500 ₽ и расширенная консультация за 12 000 ₽.",
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
      <header className="space-y-4 text-neutral-900">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-400">Онлайн-запись</p>
        <h1 className="text-3xl font-semibold leading-tight">Выберите услугу Елены Ксорос и удобное время</h1>
        <p className="max-w-3xl text-base text-neutral-600">
          Доступны две услуги: персональная консультация за 1 500 ₽ и расширенная консультация за 12 000 ₽.
          Выберите удобный слот, а подтверждение записи придёт сразу после бронирования.
        </p>
      </header>

      <div className="mt-10">
        <BookingForm services={BOOKING_SERVICES} timezone={BOOKING_TIMEZONE} />
      </div>
    </main>
  );
}

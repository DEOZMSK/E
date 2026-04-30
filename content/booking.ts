export interface BookingService {
  id: string;
  title: string;
  durationMinutes: number;
  price: string;
  description: string;
}

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: "consultation-basic",
    title: "✨ Персональная консультация",
    durationMinutes: 45,
    price: "1 500 ₽",
    description: "Короткая личная встреча с Еленой Ксорос: запрос, рекомендации и понятный план следующих шагов."
  },
  {
    id: "consultation-pro",
    title: "💎 Расширенная консультация",
    durationMinutes: 90,
    price: "12 000 ₽",
    description: "Глубокий персональный разбор с Еленой Ксорос и подробной стратегией под вашу ситуацию."
  }
];

export function getBookingService(id: string): BookingService | undefined {
  return BOOKING_SERVICES.find((service) => service.id === id);
}

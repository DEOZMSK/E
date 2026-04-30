export interface BookingService {
  id: string;
  title: string;
  durationMinutes: number;
  price: string;
  description: string;
}

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: "fitness-diagnostics",
    title: "Фитнес-диагностика",
    durationMinutes: 50,
    price: "1500 RUB",
    description:
      "Разбор текущей формы, целей и ограничений + расчёт стартовых ориентиров. Результат: пошаговый план старта на 2 недели."
  },
  {
    id: "personal-support",
    title: "Персональное сопровождение",
    durationMinutes: 60,
    price: "12000 RUB",
    description:
      "Индивидуальная программа тренировок и питания с регулярной обратной связью. Результат: план, контроль прогресса и корректировки каждую неделю."
  }
];

export function getBookingService(id: string): BookingService | undefined {
  return BOOKING_SERVICES.find((service) => service.id === id);
}

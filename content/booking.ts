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
      "Разбор текущей формы, целей и ограничений + расчёт стартовых ориентиров. Формат: онлайн, 40–50 минут. Результат: пошаговый план старта на 2 недели."
  },
  {
    id: "personal-support",
    title: "Персональное сопровождение",
    durationMinutes: 60,
    price: "12000 RUB",
    description:
      "Сопровождение 4 недели: индивидуальная программа тренировок и питания, регулярная обратная связь, контроль прогресса и корректировки каждую неделю. Старт — онлайн-встреча до 60 минут."
  }
];

export function getBookingService(id: string): BookingService | undefined {
  return BOOKING_SERVICES.find((service) => service.id === id);
}

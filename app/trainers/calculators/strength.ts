export const calculateStrength = (pushUps: number, squats: number, plankSec: number, weightKg: number) => {
  if (![pushUps, squats, plankSec, weightKg].every((value) => Number.isFinite(value))) {
    return { valid: false, warning: "Проверьте вводные: все значения должны быть конечными числами." };
  }

  if (weightKg <= 0) {
    return { valid: false, warning: "Вес должен быть больше 0 кг." };
  }

  if (pushUps < 0 || squats < 0 || plankSec < 0) {
    return { valid: false, warning: "Значения повторений и времени не могут быть отрицательными." };
  }

  const score = (pushUps / weightKg) * 35 + squats * 0.7 + plankSec * 0.08;
  return { valid: true, score: +score.toFixed(1), level: score < 40 ? "ниже среднего" : score < 70 ? "средний" : "выше среднего" };
};

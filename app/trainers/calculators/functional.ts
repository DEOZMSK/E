const hasContraindicationsWarning =
  "Перед тестом проверьте противопоказания: повышенное давление, плохое самочувствие, беременность, сердечно‑сосудистые жалобы, острые травмы.";

const severeBpWarning =
  "Давление выше ориентировочных порогов Formula/10. Нужна отмена/перенос теста и консультация врача.";

const round = (value: number, digits: number) => Number(value.toFixed(digits));

export const calculateFunctional = (power1: number, power2: number, hr1: number, hr2: number, weightKg: number) => {
  if ([power1, power2, hr1, hr2, weightKg].some((value) => !Number.isFinite(value))) {
    return { valid: false, warning: "Проверьте вводные: значения должны быть конечными числами." };
  }

  if (weightKg <= 0) {
    return { valid: false, warning: "Вес должен быть больше 0 кг." };
  }

  if (power2 <= power1) {
    return { valid: false, warning: "Для расчёта PWC/VO2 требуется W2 > W1." };
  }

  if (hr2 === hr1) {
    return { valid: false, warning: "Для расчёта PWC/VO2 требуется HR2 ≠ HR1." };
  }

  if (hr2 < hr1) {
    return { valid: false, warning: "Для расчёта PWC/VO2 требуется HR2 > HR1." };
  }

  const denominator = hr2 - hr1;
  if (denominator === 0) {
    return { valid: false, warning: "Деление на 0 недопустимо: проверьте HR1 и HR2." };
  }

  const pwc170 = power1 + ((170 - hr1) * (power2 - power1)) / denominator;
  const vo2 = (1.7 * pwc170 + 1240) / weightKg;

  if (!Number.isFinite(pwc170) || !Number.isFinite(vo2)) {
    return { valid: false, warning: "Не удалось рассчитать результат: проверьте вводные значения." };
  }

  const warningParts = [hasContraindicationsWarning];
  if (hr1 >= 140 || hr2 >= 180) {
    warningParts.push(severeBpWarning);
  }

  return {
    valid: true,
    pwc170: round(pwc170, 0),
    vo2max: round(vo2, 1),
    warning: warningParts.join(" ")
  };
};

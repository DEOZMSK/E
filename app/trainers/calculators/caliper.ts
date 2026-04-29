export const calculateCaliper = (folds: number[], weightKg: number) => {
  if (!Array.isArray(folds) || folds.length === 0) {
    return { valid: false, warning: "Добавьте хотя бы одну кожную складку для расчёта." };
  }

  if (![...folds, weightKg].every((value) => Number.isFinite(value))) {
    return { valid: false, warning: "Проверьте вводные: все значения должны быть числами." };
  }

  if (weightKg <= 0 || folds.some((v) => v <= 0)) {
    return { valid: false, warning: "Вес и значения складок должны быть больше 0." };
  }

  const sumFolds = folds.reduce((a, b) => a + b, 0);
  const averageSkinfold = sumFolds / folds.length;
  const fatPercent = Math.max(4, Math.min(45, 8 + averageSkinfold * 0.55));
  const fatMassKg = (weightKg * fatPercent) / 100;
  const lbmKg = weightKg - fatMassKg;

  return {
    valid: true,
    sumFolds: +sumFolds.toFixed(1),
    averageSkinfold: +averageSkinfold.toFixed(1),
    fatPercent: +fatPercent.toFixed(1),
    fatMassKg: +fatMassKg.toFixed(1),
    lbmKg: +lbmKg.toFixed(1)
  };
};

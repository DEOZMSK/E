import { ActivityLevel, CaloriesInput, Goal } from "../types";

const r = (v: number) => Number(v.toFixed(0));

const activityFactor: Record<ActivityLevel, number> = {
  low: 1.2,
  light: 1.3,
  light_training: 1.4,
  moderate: 1.5,
  hard: 1.6,
  very_hard: 1.7
};

const goalFactor: Record<Goal, number> = {
  fat_loss: 0.85,
  recomposition: 0.95,
  maintenance: 1,
  muscle_gain: 1.1
};

const macroPerKg: Record<Goal, { protein: number; fat: number }> = {
  muscle_gain: { protein: 1.8, fat: 0.9 },
  fat_loss: { protein: 2.0, fat: 0.8 },
  recomposition: { protein: 2.0, fat: 0.8 },
  maintenance: { protein: 1.6, fat: 0.9 }
};

export const calculateCalories = (i: CaloriesInput) => {
  if (![i.weightKg, i.heightCm, i.age].every((value) => Number.isFinite(value))) {
    return { valid: false, warning: "Проверьте вводные: вес, рост и возраст должны быть числами." };
  }

  if (i.weightKg <= 0 || i.heightCm <= 0 || i.age <= 0) {
    return { valid: false, warning: "Вес, рост и возраст должны быть больше 0." };
  }

  const bmr = r(10 * i.weightKg + 6.25 * i.heightCm - 5 * i.age + (i.sex === "male" ? 5 : -161));
  const tdee = r(bmr * activityFactor[i.activity]);
  const targetCalories = r(tdee * goalFactor[i.goal]);

  const proteinG = r(i.weightKg * macroPerKg[i.goal].protein);
  const fatG = r(i.weightKg * macroPerKg[i.goal].fat);

  let carbsG = r((targetCalories - proteinG * 4 - fatG * 9) / 4);
  let warning: string | undefined;

  if (carbsG < 30) {
    carbsG = 30;
    warning = "Целевые калории слишком низкие для выбранных белков/жиров. Проверьте вводные.";
  }

  return { valid: true, bmr, tdee, targetCalories, proteinG, fatG, carbsG, warning };
};

import {
  ActivityLevel,
  AnthropometryInput,
  AnthropometryResult,
  CaloriesInput,
  CaloriesResult,
  Goal,
  Sex
} from "./types";

const activityFactorMap: Record<ActivityLevel, number> = {
  low: 1.2,
  light: 1.375,
  light_training: 1.46,
  moderate: 1.55,
  hard: 1.725,
  very_hard: 1.9
};

const goalCaloriesFactor: Record<Goal, number> = {
  fat_loss: 0.85,
  recomposition: 0.95,
  maintenance: 1,
  muscle_gain: 1.12
};

const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));

const getBodyType = (sex: Sex, heightCm: number, wristCm: number): AnthropometryResult["bodyType"] => {
  const ratio = heightCm / wristCm;

  if (sex === "female") {
    if (ratio > 10.9) return "астеник";
    if (ratio >= 9.9) return "нормостеник";
    return "гиперстеник";
  }

  if (ratio > 10.4) return "астеник";
  if (ratio >= 9.6) return "нормостеник";
  return "гиперстеник";
};

const getIdealWeight = (sex: Sex, heightCm: number) => {
  // Унифицированная Robinson-подобная формула (рост в дюймах сверх 5 ft)
  const heightInches = heightCm / 2.54;
  const inchesOver5ft = Math.max(0, heightInches - 60);
  const base = sex === "male" ? 52 : 49;
  const perInch = sex === "male" ? 1.9 : 1.7;

  return base + perInch * inchesOver5ft;
};

export const calculateAnthropometry = (input: AnthropometryInput): AnthropometryResult => {
  const heightM = input.heightCm / 100;

  return {
    valid: true,
    bmi: round(input.weightKg / (heightM * heightM)),
    whr: round(input.waistCm / input.hipCm),
    whtr: round(input.waistCm / input.heightCm),
    bodyType: getBodyType(input.sex, input.heightCm, input.wristCm),
    idealWeightKg: round(getIdealWeight(input.sex, input.heightCm), 1)
  };
};

export const calculateCalories = (input: CaloriesInput): CaloriesResult => {
  const base =
    10 * input.weightKg +
    6.25 * input.heightCm -
    5 * input.age +
    (input.sex === "male" ? 5 : -161);

  const bmr = round(base, 0);
  const tdee = round(bmr * activityFactorMap[input.activity], 0);
  const targetCalories = round(tdee * goalCaloriesFactor[input.goal], 0);

  const proteinCalories = targetCalories * 0.3;
  const fatCalories = targetCalories * 0.27;
  const carbsCalories = targetCalories - proteinCalories - fatCalories;

  return {
    valid: true,
    bmr,
    tdee,
    targetCalories,
    proteinG: round(proteinCalories / 4, 0),
    fatG: round(fatCalories / 9, 0),
    carbsG: round(carbsCalories / 4, 0)
  };
};

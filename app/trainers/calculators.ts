import {
  ActivityLevel,
  AnthropometryInput,
  AnthropometryResult,
  CaliperInput,
  CaliperResult,
  CaloriesInput,
  CaloriesResult,
  Goal,
  Sex
} from "./types";

const activityFactorMap: Record<ActivityLevel, number> = {
  low: 1.2,
  light: 1.3,
  light_training: 1.4,
  moderate: 1.5,
  hard: 1.6,
  very_hard: 1.7
};

const goalCaloriesFactor: Record<Goal, number> = {
  fat_loss: 0.85,
  recomposition: 0.95,
  maintenance: 1.0,
  muscle_gain: 1.1
};

const proteinPerKgMap: Record<Goal, number> = {
  fat_loss: 2.2,
  recomposition: 2.0,
  maintenance: 1.8,
  muscle_gain: 2.0
};

const fatPerKgMap: Record<Goal, number> = {
  fat_loss: 0.8,
  recomposition: 0.9,
  maintenance: 1.0,
  muscle_gain: 1.1
};

const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));

const getBodyType = (sex: Sex, wristCm: number): AnthropometryResult["bodyType"] => {
  if (sex === "female") {
    if (wristCm < 15) return "астеник";
    if (wristCm <= 17) return "нормостеник";
    return "гиперстеник";
  }

  if (wristCm < 17) return "астеник";
  if (wristCm <= 19) return "нормостеник";
  return "гиперстеник";
};

const estimatedWeightFactors: Record<Sex, Record<NonNullable<AnthropometryResult["bodyType"]>, number>> = {
  male: {
    астеник: 0.9,
    нормостеник: 1,
    гиперстеник: 1.1
  },
  female: {
    астеник: 0.85,
    нормостеник: 0.95,
    гиперстеник: 1.05
  }
};

const getBmiComment = (bmi: number) => {
  if (bmi < 18.5) return "Дефицит массы тела";
  if (bmi < 25) return "Нормальная масса тела";
  if (bmi < 30) return "Избыточная масса тела";
  return "Ожирение";
};

const getWhrComment = (sex: Sex, whr: number) => {
  if (sex === "male") {
    if (whr < 0.9) return "Низкий кардиометаболический риск";
    if (whr < 1) return "Умеренный кардиометаболический риск";
    return "Высокий кардиометаболический риск";
  }

  if (whr < 0.8) return "Низкий кардиометаболический риск";
  if (whr < 0.85) return "Умеренный кардиометаболический риск";
  return "Высокий кардиометаболический риск";
};

const getWhtrComment = (whtr: number) => {
  if (whtr < 0.4) return "Недостаточная масса/низкие запасы";
  if (whtr < 0.5) return "Оптимальный диапазон";
  if (whtr < 0.6) return "Повышенный риск";
  return "Высокий риск";
};

export const calculateAnthropometry = (input: AnthropometryInput): AnthropometryResult => {
  if (input.heightCm <= 0) return { valid: false, warning: "Рост должен быть больше 0 см." };
  if (input.weightKg <= 0) return { valid: false, warning: "Вес должен быть больше 0 кг." };
  if (input.waistCm <= 0) return { valid: false, warning: "Талия должна быть больше 0 см." };
  if (input.hipCm <= 0) return { valid: false, warning: "Бёдра должны быть больше 0 см." };
  if (input.wristCm <= 0) return { valid: false, warning: "Запястье должно быть больше 0 см." };

  const heightM = input.heightCm / 100;
  const bmi = input.weightKg / (heightM * heightM);
  const whr = input.waistCm / input.hipCm;
  const whtr = input.waistCm / input.heightCm;
  const bodyType = getBodyType(input.sex, input.wristCm);
  const estimatedWeightKg = (input.heightCm - 100) * estimatedWeightFactors[input.sex][bodyType];

  return {
    valid: true,
    bmi: round(bmi, 2),
    whr: round(whr, 2),
    whtr: round(whtr, 2),
    bodyType,
    estimatedWeightKg: round(estimatedWeightKg, 1),
    bmiComment: getBmiComment(bmi),
    whrComment: getWhrComment(input.sex, whr),
    whtrComment: getWhtrComment(whtr)
  };
};

export const calculateCalories = (input: CaloriesInput): CaloriesResult => {
  if (input.age <= 0) return { valid: false, warning: "Возраст должен быть больше 0 лет." };
  if (input.heightCm <= 0) return { valid: false, warning: "Рост должен быть больше 0 см." };
  if (input.weightKg <= 0) return { valid: false, warning: "Вес должен быть больше 0 кг." };

  const bmrRaw = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + (input.sex === "male" ? 5 : -161);
  const tdeeRaw = bmrRaw * activityFactorMap[input.activity];
  const targetCaloriesRaw = tdeeRaw * goalCaloriesFactor[input.goal];

  const proteinG = input.weightKg * proteinPerKgMap[input.goal];
  const fatG = input.weightKg * fatPerKgMap[input.goal];

  let carbsG = (targetCaloriesRaw - proteinG * 4 - fatG * 9) / 4;
  let warning: string | undefined;

  if (carbsG < 30) {
    carbsG = 30;
    warning = "Углеводы рассчитаны ниже 30 г, установлено минимальное значение 30 г.";
  }

  return {
    valid: true,
    warning,
    bmr: round(bmrRaw, 0),
    tdee: round(tdeeRaw, 0),
    targetCalories: round(targetCaloriesRaw, 0),
    proteinG: round(proteinG, 0),
    fatG: round(fatG, 0),
    carbsG: round(carbsG, 0)
  };
};

const getCaliperComment = (sex: Sex, age: number, fatPercent: number): string => {
  if (age < 18 || age > 59) return "Возраст вне шкалы, нужна дополнительная оценка.";

  if (sex === "male") {
    if (age <= 39) {
      if (fatPercent < 8) return "Низкий процент жира для мужчин 18–39 лет.";
      if (fatPercent <= 20) return "Норма для мужчин 18–39 лет.";
      return "Повышенный процент жира для мужчин 18–39 лет.";
    }

    if (fatPercent < 11) return "Низкий процент жира для мужчин 40–59 лет.";
    if (fatPercent <= 22) return "Норма для мужчин 40–59 лет.";
    return "Повышенный процент жира для мужчин 40–59 лет.";
  }

  if (age <= 39) {
    if (fatPercent < 21) return "Низкий процент жира для женщин 18–39 лет.";
    if (fatPercent <= 33) return "Норма для женщин 18–39 лет.";
    return "Повышенный процент жира для женщин 18–39 лет.";
  }

  if (fatPercent < 23) return "Низкий процент жира для женщин 40–59 лет.";
  if (fatPercent <= 34) return "Норма для женщин 40–59 лет.";
  return "Повышенный процент жира для женщин 40–59 лет.";
};

export const calculateCaliper = (input: CaliperInput): CaliperResult => {
  if (input.heightCm <= 0) return { valid: false, warning: "Рост должен быть больше 0 см." };
  if (input.weightKg <= 0) return { valid: false, warning: "Вес должен быть больше 0 кг." };
  if (input.age <= 0) return { valid: false, warning: "Возраст должен быть больше 0 лет." };

  const foldValues: number[] = [
    input.forearm,
    input.armFront,
    input.armBack,
    input.scapula,
    input.abdomen,
    input.thigh,
    input.calf
  ];

  if (input.sex === "male") {
    if (input.chest === undefined) {
      return { valid: false, warning: "Для мужчин поле chest обязательно." };
    }
    foldValues.push(input.chest);
  }

  if (foldValues.some((value) => value < 0)) {
    return { valid: false, warning: "Кожные складки не могут быть отрицательными." };
  }

  const bodySurfaceArea = Math.sqrt((input.heightCm * input.weightKg) / 3600);
  const sumFolds = foldValues.reduce((acc, value) => acc + value, 0);
  const averageSkinfold = input.sex === "female" ? sumFolds / 14 : sumFolds / 16;
  const fatMassKg = averageSkinfold * bodySurfaceArea * 1.3;
  const fatPercent = (fatMassKg / input.weightKg) * 100;
  const lbmKg = input.weightKg - fatMassKg;

  return {
    valid: true,
    sumFolds: round(sumFolds, 1),
    averageSkinfold: round(averageSkinfold, 2),
    bodySurfaceArea: round(bodySurfaceArea, 3),
    fatMassKg: round(fatMassKg, 1),
    fatPercent: round(fatPercent, 1),
    lbmKg: round(lbmKg, 1),
    comment: getCaliperComment(input.sex, input.age, fatPercent)
  };
};

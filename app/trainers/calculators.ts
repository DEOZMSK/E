import {
  ActivityLevel,
  AnthropometryInput,
  AnthropometryResult,
  CaliperInput,
  CaliperResult,
  CaloriesInput,
  CaloriesResult,
  FlexibilityInput,
  FlexibilityResult,
  Goal,
  Sex,
  StrengthInput,
  StrengthResult
} from "./types";

const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));
const isPositive = (value: number) => Number.isFinite(value) && value > 0;

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
  maintenance: 1,
  muscle_gain: 1.1
};

const macrosMap: Record<Goal, { protein: number; fat: number }> = {
  muscle_gain: { protein: 1.8, fat: 0.9 },
  fat_loss: { protein: 2, fat: 0.8 },
  recomposition: { protein: 2, fat: 0.8 },
  maintenance: { protein: 1.6, fat: 0.9 }
};

const bodyTypeByWrist = (sex: Sex, wristCm: number): AnthropometryResult["bodyType"] => {
  if (sex === "male") {
    if (wristCm < 17) return "астеник";
    if (wristCm <= 20) return "нормостеник";
    return "гиперстеник";
  }
  if (wristCm < 15) return "астеник";
  if (wristCm <= 18) return "нормостеник";
  return "гиперстеник";
};

export const calculateAnthropometry = (input: AnthropometryInput): AnthropometryResult => {
  if (![input.heightCm, input.weightKg, input.hipCm, input.wristCm, input.waistCm].every(isPositive)) {
    return { valid: false, warning: "Проверьте вводные: рост, вес, талия, бёдра и запястье должны быть больше 0." };
  }

  const heightM = input.heightCm / 100;
  const bmi = input.weightKg / (heightM * heightM);
  const whr = input.waistCm / input.hipCm;
  const whtr = input.waistCm / input.heightCm;
  const bodyType = bodyTypeByWrist(input.sex, input.wristCm);

  const estimatedWeightFactors = input.sex === "male" ? { астеник: 0.375, нормостеник: 0.39, гиперстеник: 0.41 } : { астеник: 0.325, нормостеник: 0.34, гиперстеник: 0.355 };

  const bmiComment =
    bmi < 18.5 ? "По введённым данным BMI ниже ориентировочного диапазона." : bmi < 25 ? "По введённым данным BMI в ориентировочном диапазоне." : bmi < 30 ? "По введённым данным BMI повышен, стоит учесть тренировочные ориентиры." : "По введённым данным BMI значительно повышен, нужна осторожность в прогрессии нагрузки.";

  const whrLimit = input.sex === "male" ? 0.9 : 0.85;
  const whrComment =
    whr > whrLimit + 0.02
      ? "По введённым данным WHR указывает на абдоминальный тип, повышенное внимание."
      : whr >= whrLimit - 0.02
        ? "По введённым данным WHR — пограничное значение."
        : "По введённым данным WHR без повышенного внимания.";

  const whtrComment =
    whtr < 0.4
      ? "По введённым данным WHtR ниже стандартного диапазона."
      : whtr < 0.5
        ? "По введённым данным WHtR без повышенного риска."
        : whtr < 0.6
          ? "По введённым данным WHtR: повышенное внимание."
          : "По введённым данным WHtR высокий риск, нужна осторожность.";

  return {
    valid: true,
    bmi: round(bmi),
    whr: round(whr),
    whtr: round(whtr),
    bodyType,
    estimatedWeightKg: round(input.heightCm * estimatedWeightFactors[bodyType], 1),
    bmiComment,
    whrComment,
    whtrComment
  };
};

export const calculateCalories = (input: CaloriesInput): CaloriesResult => {
  if (![input.heightCm, input.weightKg, input.age].every(isPositive)) {
    return { valid: false, warning: "Проверьте вводные: возраст, рост и вес должны быть больше 0." };
  }

  const bmrRaw = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + (input.sex === "male" ? 5 : -161);
  const tdeeRaw = bmrRaw * activityFactorMap[input.activity];
  const targetCaloriesRaw = tdeeRaw * goalCaloriesFactor[input.goal];

  const proteinG = macrosMap[input.goal].protein * input.weightKg;
  const fatG = macrosMap[input.goal].fat * input.weightKg;
  let carbsG = (targetCaloriesRaw - proteinG * 4 - fatG * 9) / 4;
  let warning: string | undefined;

  if (carbsG < 30) {
    carbsG = 30;
    warning = "Целевые калории слишком низкие для выбранных белков/жиров. Проверьте вводные.";
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

export const calculateCaliper = (input: CaliperInput): CaliperResult => {
  const common = [input.heightCm, input.weightKg, input.forearm, input.armFront, input.armBack, input.scapula, input.abdomen, input.thigh, input.calf];
  if (!common.every((x) => Number.isFinite(x) && x >= 0) || !isPositive(input.heightCm) || !isPositive(input.weightKg)) {
    return { valid: false, warning: "Проверьте вводные: рост/вес должны быть больше 0, складки не могут быть отрицательными." };
  }
  if (input.sex === "male" && !(Number.isFinite(input.chest) && (input.chest as number) >= 0)) {
    return { valid: false, warning: "Для мужского расчёта добавьте складку груди." };
  }

  const bsa = Math.sqrt((input.heightCm * input.weightKg) / 3600);
  const sumFolds =
    input.sex === "female"
      ? input.forearm + input.armFront + input.armBack + input.scapula + input.abdomen + input.thigh + input.calf
      : input.forearm + input.armFront + input.armBack + (input.chest ?? 0) + input.scapula + input.abdomen + input.thigh + input.calf;
  const averageSkinfold = sumFolds / (input.sex === "female" ? 14 : 16);
  const fatMassKg = averageSkinfold * bsa * 1.3;
  const fatPercent = (fatMassKg / input.weightKg) * 100;
  const lbmKg = input.weightKg - fatMassKg;

  let comment = "Возраст вне шкалы, нужна дополнительная оценка.";
  if (input.age >= 18 && input.age <= 59) {
    if (input.sex === "female") {
      const upper = input.age < 30 ? 28 : input.age < 40 ? 30 : input.age < 50 ? 32 : 35;
      comment = fatPercent > upper ? "По введённым данным процент жира повышен." : "По введённым данным процент жира в ориентировочном диапазоне.";
    } else {
      const upper = input.age < 30 ? 19 : input.age < 40 ? 26 : input.age < 50 ? 28 : 30;
      comment = fatPercent > upper ? "По введённым данным процент жира повышен." : "По введённым данным процент жира в ориентировочном диапазоне.";
    }
  }

  return { valid: true, sumFolds: round(sumFolds, 1), averageSkinfold: round(averageSkinfold, 2), fatMassKg: round(fatMassKg, 1), fatPercent: round(fatPercent, 1), lbmKg: round(lbmKg, 1), comment };
};

export const scorePushups = (_sex: Sex, age: number, reps: number): StrengthResult => {
  if (!isPositive(age) || reps < 0 || !Number.isFinite(reps)) return { valid: false, warning: "Проверьте вводные данные теста." };
  if (age < 18 || age > 59) return { valid: false, warning: "Для этого возраста нет шкалы в таблице." };
  const category = reps >= 40 ? "отлично" : reps >= 30 ? "хорошо" : reps >= 20 ? "удовлетворительно" : reps >= 10 ? "плохо" : "очень плохо";
  return { valid: true, category, comment: category.includes("пло") ? "Это стартовая точка для прогресса." : "Хорошая база, можно прогрессировать дальше." };
};

export const scoreSitups = (_sex: Sex, age: number, repsPerMinute: number): StrengthResult => {
  if (!isPositive(age) || repsPerMinute < 0 || !Number.isFinite(repsPerMinute)) return { valid: false, warning: "Проверьте вводные данные теста." };
  if (age < 18 || age > 59) return { valid: false, warning: "Для этого возраста нет шкалы в таблице." };
  const r = repsPerMinute;
  const category = r >= 50 ? "очень хорошо" : r >= 43 ? "хорошо" : r >= 36 ? "выше среднего" : r >= 30 ? "средний" : r >= 24 ? "ниже среднего" : r >= 18 ? "плохо" : "очень плохо";
  return { valid: true, category, comment: category.includes("пло") ? "Это стартовая точка для прогресса." : "Результат подходит для текущего этапа подготовки." };
};

export const scoreFlexibility = (input: FlexibilityInput): FlexibilityResult => {
  if (!isPositive(input.age) || !Number.isFinite(input.reachCm)) return { valid: false, warning: "Проверьте вводные данные теста." };
  const { age, reachCm } = input;
  if (age > 60 || age < 1) return { valid: false, warning: "Для этого возраста нет шкалы в таблице." };

  let min = 0;
  let max = Number.POSITIVE_INFINITY;
  if (age < 25) min = 36;
  else if (age <= 30) {
    min = 33;
    max = 35;
  } else if (age <= 45) {
    min = 29;
    max = 33;
  } else {
    min = 21;
    max = 29;
  }

  const status = reachCm < min ? "ниже ориентира" : reachCm > max ? "выше ориентира" : "в ориентире";
  const comment = status === "ниже ориентира" ? "Есть смысл добавить мягкую мобилизацию и растяжку без боли." : "Поддерживайте регулярную работу над мобильностью.";
  return { valid: true, reachCm: round(reachCm, 1), status, comment };
};

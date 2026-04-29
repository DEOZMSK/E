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
  StrengthResult
} from "./types";

const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));
const isPositive = (value: number) => Number.isFinite(value) && value > 0;

const activityFactorMap: Record<ActivityLevel, number> = { low: 1.2, light: 1.3, light_training: 1.4, moderate: 1.5, hard: 1.6, very_hard: 1.7 };
const goalCaloriesFactor: Record<Goal, number> = { fat_loss: 0.85, recomposition: 0.95, maintenance: 1, muscle_gain: 1.1 };
const macrosMap: Record<Goal, { protein: number; fat: number }> = { muscle_gain: { protein: 1.8, fat: 0.9 }, fat_loss: { protein: 2, fat: 0.8 }, recomposition: { protein: 2, fat: 0.8 }, maintenance: { protein: 1.6, fat: 0.9 } };

const bodyTypeByWrist = (sex: Sex, wristCm: number): AnthropometryResult["bodyType"] => {
  if (sex === "male") return wristCm < 17 ? "астеник" : wristCm <= 20 ? "нормостеник" : "гиперстеник";
  return wristCm < 15 ? "астеник" : wristCm <= 18 ? "нормостеник" : "гиперстеник";
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
  const factors = input.sex === "male" ? { астеник: 0.375, нормостеник: 0.39, гиперстеник: 0.41 } : { астеник: 0.325, нормостеник: 0.34, гиперстеник: 0.355 };

  const bmiComment = bmi < 18.5 ? "По введённым данным BMI ниже ориентировочного диапазона." : bmi < 25 ? "По введённым данным BMI в ориентировочном диапазоне." : bmi < 30 ? "По введённым данным BMI повышен, стоит учесть тренировочные ориентиры." : "По введённым данным BMI значительно повышен, нужна осторожность в прогрессии нагрузки.";
  const whrLimit = input.sex === "male" ? 0.9 : 0.85;
  const whrComment = whr > whrLimit + 0.02 ? "По введённым данным WHR указывает на абдоминальный тип, повышенное внимание." : whr >= whrLimit - 0.02 ? "По введённым данным WHR — пограничное значение." : "По введённым данным WHR без повышенного внимания.";
  const whtrComment = whtr < 0.4 ? "По введённым данным WHtR ниже стандартного диапазона." : whtr < 0.5 ? "По введённым данным WHtR без повышенного риска." : whtr < 0.6 ? "По введённым данным WHtR: повышенное внимание." : "По введённым данным WHtR высокий риск, нужна осторожность.";

  return { valid: true, bmi: round(bmi), whr: round(whr), whtr: round(whtr), bodyType, estimatedWeightKg: round(input.heightCm * factors[bodyType], 1), bmiComment, whrComment, whtrComment };
};

export const calculateCalories = (input: CaloriesInput): CaloriesResult => {
  if (![input.heightCm, input.weightKg, input.age].every(isPositive)) return { valid: false, warning: "Проверьте вводные: возраст, рост и вес должны быть больше 0." };
  const bmrRaw = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + (input.sex === "male" ? 5 : -161);
  const tdeeRaw = bmrRaw * activityFactorMap[input.activity];
  const targetCaloriesRaw = tdeeRaw * goalCaloriesFactor[input.goal];
  const proteinG = macrosMap[input.goal].protein * input.weightKg;
  const fatG = macrosMap[input.goal].fat * input.weightKg;
  let carbsG = (targetCaloriesRaw - proteinG * 4 - fatG * 9) / 4;
  let warning: string | undefined;
  if (carbsG < 30) { carbsG = 30; warning = "Целевые калории слишком низкие для выбранных белков/жиров. Проверьте вводные."; }
  return { valid: true, warning, bmr: round(bmrRaw, 0), tdee: round(tdeeRaw, 0), targetCalories: round(targetCaloriesRaw, 0), proteinG: round(proteinG, 0), fatG: round(fatG, 0), carbsG: round(carbsG, 0) };
};

export const calculateCaliper = (input: CaliperInput): CaliperResult => {
  const common = [input.heightCm, input.weightKg, input.forearm, input.armFront, input.armBack, input.scapula, input.abdomen, input.thigh, input.calf];
  if (!common.every((x) => Number.isFinite(x) && x >= 0) || !isPositive(input.heightCm) || !isPositive(input.weightKg)) return { valid: false, warning: "Проверьте вводные: рост/вес должны быть больше 0, складки не могут быть отрицательными." };
  if (input.sex === "male" && !(Number.isFinite(input.chest) && (input.chest as number) >= 0)) return { valid: false, warning: "Для мужского расчёта добавьте складку груди." };

  const bsa = Math.sqrt((input.heightCm * input.weightKg) / 3600);
  const sumFolds = input.sex === "female" ? input.forearm + input.armFront + input.armBack + input.scapula + input.abdomen + input.thigh + input.calf : input.forearm + input.armFront + input.armBack + (input.chest ?? 0) + input.scapula + input.abdomen + input.thigh + input.calf;
  const averageSkinfold = sumFolds / (input.sex === "female" ? 14 : 16);
  const fatMassKg = averageSkinfold * bsa * 1.3;
  const fatPercent = (fatMassKg / input.weightKg) * 100;
  const lbmKg = input.weightKg - fatMassKg;

  let comment = "Возраст вне шкалы, нужна дополнительная оценка.";
  if (input.age >= 18 && input.age <= 59) {
    const ranges = input.sex === "female" ? [[18,29,20,28,29],[30,39,22,30,30],[40,49,24,32,32],[50,59,26,35,35]] : [[18,29,8,18,19],[30,39,11,20,26],[40,49,13,22,28],[50,59,15,24,30]];
    const row = ranges.find(([a,b]) => input.age >= a && input.age <= b);
    if (row) {
      const [, , low, high, highRisk] = row;
      if (fatPercent < low) comment = "По введённым данным процент жира ниже ориентировочного диапазона.";
      else if (fatPercent <= high) comment = "По введённым данным процент жира в ориентировочном диапазоне.";
      else if (fatPercent < highRisk) comment = "По введённым данным процент жира выше нормы / погранично.";
      else comment = "По введённым данным процент жира повышен.";
    }
  }
  return { valid: true, sumFolds: round(sumFolds, 1), averageSkinfold: round(averageSkinfold, 2), fatMassKg: round(fatMassKg, 1), fatPercent: round(fatPercent, 1), lbmKg: round(lbmKg, 1), comment };
};

const pushupCategory = (reps: number, limits: [number, number, number, number]) => reps > limits[0] ? "отлично" : reps >= limits[1] ? "хорошо" : reps >= limits[2] ? "удовлетворительно" : reps >= limits[3] ? "плохо" : "очень плохо";

export const scorePushups = (sex: Sex, age: number, reps: number): StrengthResult => {
  if (!isPositive(age) || reps < 0 || !Number.isFinite(reps)) return { valid: false, warning: "Проверьте вводные данные теста." };
  const male: [number, number, [number, number, number, number]][] = [[17,19,[51,35,19,4]],[20,29,[43,30,17,4]],[30,39,[37,25,13,2]],[40,49,[31,21,11,1]],[50,59,[28,18,9,0]],[60,65,[27,17,6,0]]];
  const female: [number, number, [number, number, number, number]][] = [[17,19,[32,21,11,1]],[20,29,[33,23,12,1]],[30,39,[34,22,10,1]],[40,49,[28,18,8,1]],[50,59,[23,15,7,1]],[60,65,[21,13,5,1]]];
  const row = (sex === "male" ? male : female).find(([a,b]) => age >= a && age <= b);
  if (!row) return { valid: false, warning: "Для этого возраста нет шкалы в таблице." };
  const category = pushupCategory(reps, row[2]);
  const comment = ["плохо", "очень плохо"].includes(category) ? "Это стартовая точка для прогресса." : "Хорошая база для дальнейшего прогресса.";
  return { valid: true, category, comment };
};

const situpCategory = (r: number, t:[number,number,number,number,number,number]) => r > t[0] ? "очень хорошо" : r >= t[1] ? "хорошо" : r >= t[2] ? "выше среднего" : r >= t[3] ? "средний" : r >= t[4] ? "ниже среднего" : r >= t[5] ? "плохо" : "очень плохо";

export const scoreSitups = (sex: Sex, age: number, repsPerMinute: number): StrengthResult => {
  if (!isPositive(age) || repsPerMinute < 0 || !Number.isFinite(repsPerMinute)) return { valid: false, warning: "Проверьте вводные данные теста." };
  const male: [number, number, [number,number,number,number,number,number]][] = [[18,25,[49,44,39,35,31,25]],[26,35,[45,40,35,31,29,22]],[36,45,[41,35,30,27,23,17]],[46,55,[35,29,25,22,18,13]],[56,65,[31,25,21,17,13,9]],[66,200,[28,22,19,15,11,7]]];
  const female: [number, number, [number,number,number,number,number,number]][] = [[18,25,[43,37,33,29,25,18]],[26,35,[39,33,29,25,21,13]],[36,45,[33,27,23,19,15,7]],[46,55,[27,22,18,14,10,5]],[56,65,[24,18,13,10,7,3]],[66,200,[23,17,14,11,5,2]]];
  const row = (sex === "male" ? male : female).find(([a,b]) => age >= a && age <= b);
  if (!row) return { valid: false, warning: "Для этого возраста нет шкалы в таблице." };
  const category = situpCategory(repsPerMinute, row[2]);
  const comment = ["плохо", "очень плохо", "ниже среднего"].includes(category) ? "Это стартовая точка для прогресса." : "Хорошая база для дальнейшего прогресса.";
  return { valid: true, category, comment };
};

export const scoreFlexibility = (input: FlexibilityInput): FlexibilityResult => {
  if (!isPositive(input.age) || !Number.isFinite(input.reachCm)) return { valid: false, warning: "Проверьте вводные данные теста." };
  const { age, reachCm } = input;
  if (age > 60 || age < 1) return { valid: false, warning: "Для этого возраста нет шкалы в таблице." };
  let min = 0; let max = Number.POSITIVE_INFINITY;
  if (age < 25) min = 36; else if (age <= 30) { min = 33; max = 35; } else if (age <= 45) { min = 29; max = 33; } else { min = 21; max = 29; }
  const status = reachCm < min ? "ниже ориентира" : reachCm > max ? "выше ориентира" : "в ориентире";
  const comment = status === "ниже ориентира" ? "Есть смысл добавить мягкую мобилизацию и растяжку без боли." : "Поддерживайте регулярную работу над мобильностью.";
  return { valid: true, reachCm: round(reachCm, 1), status, comment };
};

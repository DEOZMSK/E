import { AnthropometryInput, AnthropometryResult } from "../types";

const round = (value: number, digits = 2) => Number(value.toFixed(digits));

const getBmiComment = (bmi: number): string => {
  if (bmi < 18.5) return "По введённым данным BMI ниже ориентировочного диапазона.";
  if (bmi < 25) return "По введённым данным BMI в ориентировочном диапазоне.";
  if (bmi < 30) return "По введённым данным BMI выше ориентировочного диапазона.";
  return "По введённым данным BMI значительно выше ориентировочного диапазона, нужна осторожность в прогрессии нагрузки.";
};

const getWhrComment = (sex: AnthropometryInput["sex"], whr: number): string => {
  if (sex === "male") {
    if (whr > 0.9) return "По введённым данным WHR указывает на абдоминальный тип, повышенное внимание.";
    if (whr >= 0.88) return "По введённым данным WHR — пограничное значение.";
    return "По введённым данным WHR без повышенного внимания.";
  }

  if (whr > 0.85) return "По введённым данным WHR указывает на абдоминальный тип, повышенное внимание.";
  if (whr >= 0.83) return "По введённым данным WHR — пограничное значение.";
  return "По введённым данным WHR без повышенного внимания.";
};

const getWhtrComment = (whtr: number): string => {
  if (whtr < 0.4) return "По введённым данным WHtR ниже стандартного диапазона.";
  if (whtr < 0.5) return "По введённым данным WHtR без повышенного риска.";
  if (whtr < 0.6) return "По введённым данным WHtR: повышенное внимание.";
  return "По введённым данным WHtR высокий риск, нужна осторожность.";
};

const getBodyType = (sex: AnthropometryInput["sex"], wristCm: number): AnthropometryResult["bodyType"] => {
  if (sex === "male") {
    if (wristCm < 17) return "астеник";
    if (wristCm <= 20) return "нормостеник";
    return "гиперстеник";
  }

  if (wristCm < 15) return "астеник";
  if (wristCm <= 18) return "нормостеник";
  return "гиперстеник";
};

const getEstimatedWeightKg = (sex: AnthropometryInput["sex"], bodyType: NonNullable<AnthropometryResult["bodyType"]>, heightCm: number): number => {
  const coefficients = sex === "male"
    ? { астеник: 0.375, нормостеник: 0.39, гиперстеник: 0.41 }
    : { астеник: 0.325, нормостеник: 0.34, гиперстеник: 0.355 };

  return round(heightCm * coefficients[bodyType], 1);
};

export const calculateAnthropometry = (input: AnthropometryInput): AnthropometryResult => {
  if (
    input.heightCm <= 0 ||
    input.weightKg <= 0 ||
    input.waistCm <= 0 ||
    input.hipCm <= 0 ||
    input.wristCm <= 0
  ) {
    return {
      valid: false,
      warning: "Проверьте вводные: рост, вес, талия, бёдра и запястье должны быть больше 0."
    };
  }

  const heightM = input.heightCm / 100;
  const bmi = round(input.weightKg / (heightM * heightM));
  const whr = round(input.waistCm / input.hipCm);
  const whtr = round(input.waistCm / input.heightCm);
  const bodyType = getBodyType(input.sex, input.wristCm);

  return {
    valid: true,
    bmi,
    whr,
    whtr,
    bodyType,
    estimatedWeightKg: getEstimatedWeightKg(input.sex, bodyType, input.heightCm),
    bmiComment: getBmiComment(bmi),
    whrComment: getWhrComment(input.sex, whr),
    whtrComment: getWhtrComment(whtr)
  };
};

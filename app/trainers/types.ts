export const sexOptions = ["female", "male"] as const;
export type Sex = (typeof sexOptions)[number];

export const activityOptions = [
  "sedentary",
  "light",
  "moderate",
  "high",
  "veryHigh"
] as const;
export type ActivityLevel = (typeof activityOptions)[number];

export const goalOptions = ["lose", "maintain", "gain"] as const;
export type Goal = (typeof goalOptions)[number];

export interface AnthropometryInput {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  waistCm: number;
  hipCm: number;
  wristCm: number;
}

export interface AnthropometryResult {
  bmi: number;
  whr: number;
  whtr: number;
  bodyType: "астеник" | "нормостеник" | "гиперстеник";
  idealWeightKg: number;
}

export interface CaloriesInput {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: ActivityLevel;
  goal: Goal;
}

export interface CaloriesResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
}

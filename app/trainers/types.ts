export const sexOptions = ["female", "male"] as const;
export type Sex = (typeof sexOptions)[number];

export const activityOptions = [
  "low",
  "light",
  "light_training",
  "moderate",
  "hard",
  "very_hard"
] as const;
export type ActivityLevel = (typeof activityOptions)[number];

export const goalOptions = ["fat_loss", "recomposition", "maintenance", "muscle_gain"] as const;
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
  valid: boolean;
  warning?: string;
  bmi?: number;
  whr?: number;
  whtr?: number;
  bodyType?: "астеник" | "нормостеник" | "гиперстеник";
  estimatedWeightKg?: number;
  bmiComment?: string;
  whrComment?: string;
  whtrComment?: string;
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
  valid: boolean;
  warning?: string;
  bmr?: number;
  tdee?: number;
  targetCalories?: number;
  proteinG?: number;
  fatG?: number;
  carbsG?: number;
}

export interface CaliperInput {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  forearm: number;
  armFront: number;
  armBack: number;
  chest?: number;
  scapula: number;
  abdomen: number;
  thigh: number;
  calf: number;
}

export interface CaliperResult {
  valid: boolean;
  warning?: string;
  sumFolds?: number;
  averageSkinfold?: number;
  bodySurfaceArea?: number;
  fatMassKg?: number;
  fatPercent?: number;
  lbmKg?: number;
  comment?: string;
}

import { ActivityLevel, CaloriesInput, Goal } from "../types";
const r=(v:number)=>Number(v.toFixed(0));
const a:Record<ActivityLevel,number>={low:1.2,light:1.375,light_training:1.46,moderate:1.55,hard:1.725,very_hard:1.9};
const g:Record<Goal,number>={fat_loss:0.85,recomposition:0.95,maintenance:1,muscle_gain:1.12};
export const calculateCalories=(i:CaloriesInput)=>{const bmr=r(10*i.weightKg+6.25*i.heightCm-5*i.age+(i.sex==="male"?5:-161));const tdee=r(bmr*a[i.activity]);const targetCalories=r(tdee*g[i.goal]);return{bmr,tdee,targetCalories,proteinG:r((targetCalories*0.3)/4),fatG:r((targetCalories*0.27)/9),carbsG:r((targetCalories*0.43)/4)}};

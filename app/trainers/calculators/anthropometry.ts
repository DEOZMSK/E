import { AnthropometryInput } from "../types";
const r=(v:number,d=2)=>Number(v.toFixed(d));
export const calculateAnthropometry=(i:AnthropometryInput)=>{const h=i.heightCm/100;const ratio=i.heightCm/i.wristCm;const bodyType=i.sex==="female"?(ratio>10.9?"астеник":ratio>=9.9?"нормостеник":"гиперстеник"):(ratio>10.4?"астеник":ratio>=9.6?"нормостеник":"гиперстеник");const ideal=(i.sex==="male"?52:49)+Math.max(0,i.heightCm/2.54-60)*(i.sex==="male"?1.9:1.7);return{bmi:r(i.weightKg/(h*h)),whr:r(i.waistCm/i.hipCm),whtr:r(i.waistCm/i.heightCm),bodyType,idealWeightKg:r(ideal,1)}};

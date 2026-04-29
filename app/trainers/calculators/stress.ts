export const calculateStress=(answers:number[])=>{const score=answers.reduce((a,b)=>a+b,0);return{score,zone:score<=8?"низкий":score<=16?"умеренный":"высокий"}};

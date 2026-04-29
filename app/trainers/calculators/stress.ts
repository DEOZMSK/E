export const calculateStress = (answers: number[]) => {
  if (!Array.isArray(answers) || answers.length === 0) {
    return { valid: false, warning: "Добавьте ответы для расчёта уровня стресса." };
  }

  if (!answers.every((value) => Number.isFinite(value))) {
    return { valid: false, warning: "Проверьте ответы: значения должны быть числами." };
  }

  const score = answers.reduce((a, b) => a + b, 0);
  return { valid: true, score, zone: score <= 8 ? "низкий" : score <= 16 ? "умеренный" : "высокий" };
};

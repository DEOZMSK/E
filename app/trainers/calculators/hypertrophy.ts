export const calculateHypertrophy = (sets: number, reps: number, weightKg: number, rm1Kg: number) => {
  if (![sets, reps, weightKg, rm1Kg].every((value) => Number.isFinite(value))) {
    return { valid: false, warning: "Проверьте вводные: все поля должны быть числами." };
  }

  if (sets <= 0 || reps <= 0 || weightKg <= 0 || rm1Kg <= 0) {
    return { valid: false, warning: "Подходы, повторения, рабочий вес и 1ПМ должны быть больше 0." };
  }

  const tonnage = sets * reps * weightKg;
  const intensity = (weightKg / rm1Kg) * 100;
  const volumeIndex = tonnage * (intensity / 100);

  return {
    valid: true,
    tonnage: +tonnage.toFixed(0),
    intensity: +intensity.toFixed(1),
    volumeIndex: +volumeIndex.toFixed(0)
  };
};

export const calculateFlexibility = (sitAndReachCm: number) => {
  if (!Number.isFinite(sitAndReachCm)) {
    return { valid: false, warning: "Проверьте вводные: значение наклона должно быть числом." };
  }

  return {
    valid: true,
    sitAndReachCm,
    level: sitAndReachCm < 0 ? "низкая" : sitAndReachCm < 10 ? "средняя" : "хорошая"
  };
};

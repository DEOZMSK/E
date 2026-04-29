const baseContraindicationsWarning =
  "Проверьте противопоказания: давление, самочувствие, беременность, СС‑жалобы и травмы.";
const severeBpWarning =
  "Давление выше ориентировочных порогов Formula/10 — требуется прекращение теста и консультация врача.";

const isHighBp = (sys: number, dia: number) => sys >= 180 || dia >= 110;

export const calculateLetunov = (
  baseSys: number,
  baseDia: number,
  afterLoadSys: number,
  afterLoadDia: number,
  after3minSys: number,
  after3minDia: number
) => {
  const values = [baseSys, baseDia, afterLoadSys, afterLoadDia, after3minSys, after3minDia];
  if (values.some((value) => !Number.isFinite(value))) {
    return { valid: false, warning: "Проверьте вводные: значения давления должны быть конечными числами." };
  }

  if (values.some((value) => value <= 0)) {
    return { valid: false, warning: "Показатели давления должны быть больше 0." };
  }

  if (baseDia >= baseSys || afterLoadDia >= afterLoadSys || after3minDia >= after3minSys) {
    return { valid: false, warning: "Для каждого замера требуется DIA < SYS." };
  }

  const sysRise = afterLoadSys - baseSys;
  const sysRecovery = after3minSys - baseSys;
  const diaShift = afterLoadDia - baseDia;
  const recoveryDenominator = afterLoadSys - baseSys;

  if (recoveryDenominator === 0) {
    return { valid: false, warning: "Невозможно посчитать реакцию: знаменатель равен 0 (SYS после нагрузки = SYS покоя)." };
  }

  const recoveryRatio = (afterLoadSys - after3minSys) / recoveryDenominator;
  if (!Number.isFinite(recoveryRatio)) {
    return { valid: false, warning: "Невозможно посчитать реакцию: проверьте значения давления." };
  }

  const type =
    sysRise < 25 && sysRecovery < 10 && diaShift <= 5
      ? "нормотоническая"
      : sysRecovery >= 20 || diaShift > 10
        ? "гипертоническая"
        : "дистоническая";

  const warnings = [baseContraindicationsWarning];
  if (isHighBp(baseSys, baseDia) || isHighBp(afterLoadSys, afterLoadDia) || isHighBp(after3minSys, after3minDia)) {
    warnings.push(severeBpWarning);
  }

  return {
    valid: true,
    sysRise,
    sysRecovery,
    diaShift,
    recoveryRatio: Number(recoveryRatio.toFixed(2)),
    type,
    warning: warnings.join(" ")
  };
};

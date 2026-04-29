"use client";

import { useMemo, useState } from "react";

import {
  calculateAnthropometry,
  calculateCalories,
  calculateCaliper,
  calculateFlexibility,
  calculateFunctional,
  calculateHypertrophy,
  calculateLetunov,
  calculateStrength,
  calculateStress
} from "./calculators";
import { DisclaimerBox } from "./components/DisclaimerBox";
import { NumberField } from "./components/NumberField";
import { ResultCard } from "./components/ResultCard";
import { SectionHeader } from "./components/SectionHeader";
import { SelectField } from "./components/SelectField";
import { ToolCard } from "./components/ToolCard";
import { WarningBox } from "./components/WarningBox";
import { ActivityLevel, Goal, Sex } from "./types";

interface ToolCardData { id: string; title: string; active: boolean }
interface TrainerToolsClientProps { cards: ToolCardData[] }

const descriptions: Record<string, string> = {
  anthropometry: "Оценка базовых пропорций тела и расчётного ориентира веса.",
  calories: "Расчёт калорийности и макросов по цели.",
  caliper: "Оценка процента жира по сумме кожных складок.",
  strength: "Суммарный скоринг по базовым силовым тестам.",
  flexibility: "Оценка мобильности по наклону сидя.",
  functional: "Функциональная работоспособность (PWC170/МПК).",
  letunov: "Реакция сердечно‑сосудистой системы на нагрузку.",
  stress: "Скрининг уровня стресса по чек‑листу.",
  hypertrophy: "Оценка тренировочного объёма для гипертрофии."
};

export function TrainerToolsClient({ cards }: TrainerToolsClientProps) {
  const [activeTool, setActiveTool] = useState("anthropometry");
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState(30);
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(68);
  const [waistCm, setWaistCm] = useState(76);
  const [hipCm, setHipCm] = useState(98);
  const [wristCm, setWristCm] = useState(16);
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintenance");
  const [folds, setFolds] = useState([12, 15, 18, 16]);
  const [pushUps, setPushUps] = useState(25);
  const [squats, setSquats] = useState(40);
  const [plankSec, setPlankSec] = useState(90);
  const [sitReach, setSitReach] = useState(8);
  const [p1, setP1] = useState(600);
  const [p2, setP2] = useState(900);
  const [hr1, setHr1] = useState(120);
  const [hr2, setHr2] = useState(150);
  const [bpBaseSys, setBpBaseSys] = useState(120);
  const [bpBaseDia, setBpBaseDia] = useState(80);
  const [bpAfterSys, setBpAfterSys] = useState(145);
  const [bpAfterDia, setBpAfterDia] = useState(86);
  const [bpRecSys, setBpRecSys] = useState(126);
  const [bpRecDia, setBpRecDia] = useState(82);
  const [stressAnswers, setStressAnswers] = useState([1, 1, 1, 1, 1, 1]);
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(10);
  const [workWeight, setWorkWeight] = useState(60);
  const [rm1, setRm1] = useState(90);

  const anthropometry = useMemo(() => calculateAnthropometry({ sex, age, heightCm, weightKg, waistCm, hipCm, wristCm }), [sex, age, heightCm, weightKg, waistCm, hipCm, wristCm]);
  const calories = useMemo(() => calculateCalories({ sex, age, heightCm, weightKg, activity, goal }), [sex, age, heightCm, weightKg, activity, goal]);
  const caliper = useMemo(() => calculateCaliper(folds, weightKg), [folds, weightKg]);
  const strength = useMemo(() => calculateStrength(pushUps, squats, plankSec, weightKg), [pushUps, squats, plankSec, weightKg]);
  const flexibility = useMemo(() => calculateFlexibility(sitReach), [sitReach]);
  const functional = useMemo(() => calculateFunctional(p1, p2, hr1, hr2, weightKg), [p1, p2, hr1, hr2, weightKg]);
  const letunov = useMemo(() => calculateLetunov(bpBaseSys, bpBaseDia, bpAfterSys, bpAfterDia, bpRecSys, bpRecDia), [bpBaseSys, bpBaseDia, bpAfterSys, bpAfterDia, bpRecSys, bpRecDia]);
  const stress = useMemo(() => calculateStress(stressAnswers), [stressAnswers]);
  const hypertrophy = useMemo(() => calculateHypertrophy(sets, reps, workWeight, rm1), [sets, reps, workWeight, rm1]);

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <ToolCard key={card.id} title={card.title} active={activeTool === card.id} onClick={() => setActiveTool(card.id)} />
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 space-y-4">
        <SectionHeader text={descriptions[activeTool] ?? ""} />

        <div className="grid gap-3 sm:grid-cols-2">
          <SelectField label="Пол" value={sex} onChange={(v) => setSex(v as Sex)} options={[{ value: "female", label: "Женский" }, { value: "male", label: "Мужской" }]} />
          <NumberField label="Возраст" value={age} onChange={setAge} />
          <NumberField label="Рост, см" value={heightCm} onChange={setHeightCm} />
          <NumberField label="Вес, кг" value={weightKg} onChange={setWeightKg} />

          {activeTool === "anthropometry" && (
            <>
              <NumberField label="Талия" value={waistCm} onChange={setWaistCm} />
              <NumberField label="Бёдра" value={hipCm} onChange={setHipCm} />
              <NumberField label="Запястье" value={wristCm} onChange={setWristCm} className="sm:col-span-2" />
            </>
          )}

          {activeTool === "calories" && (
            <>
              <SelectField label="Активность" value={activity} onChange={(v) => setActivity(v as ActivityLevel)} options={[{ value: "low", label: "Низкая" }, { value: "light", label: "Лёгкая" }, { value: "light_training", label: "Лёгкая + трен." }, { value: "moderate", label: "Средняя" }, { value: "hard", label: "Высокая" }, { value: "very_hard", label: "Очень высокая" }]} />
              <SelectField label="Цель" value={goal} onChange={(v) => setGoal(v as Goal)} options={[{ value: "fat_loss", label: "Снижение жира" }, { value: "recomposition", label: "Рекомпозиция" }, { value: "maintenance", label: "Поддержание" }, { value: "muscle_gain", label: "Набор мышц" }]} />
            </>
          )}

          {activeTool === "caliper" && folds.map((value, idx) => (
            <NumberField key={idx} label={`Складка ${idx + 1}, мм`} value={value} onChange={(next) => setFolds((prev) => prev.map((v, i) => i === idx ? next : v))} />
          ))}

          {activeTool === "strength" && (
            <>
              <NumberField label="Отжимания" value={pushUps} onChange={setPushUps} />
              <NumberField label="Приседания" value={squats} onChange={setSquats} />
              <NumberField label="Планка, сек" value={plankSec} onChange={setPlankSec} className="sm:col-span-2" />
            </>
          )}

          {activeTool === "flexibility" && <NumberField label="Наклон сидя, см" value={sitReach} onChange={setSitReach} className="sm:col-span-2" />}

          {activeTool === "functional" && (
            <>
              <NumberField label="P1" value={p1} onChange={setP1} />
              <NumberField label="P2" value={p2} onChange={setP2} />
              <NumberField label="HR1" value={hr1} onChange={setHr1} />
              <NumberField label="HR2" value={hr2} onChange={setHr2} />
            </>
          )}

          {activeTool === "letunov" && (
            <>
              <NumberField label="АД покой SYS" value={bpBaseSys} onChange={setBpBaseSys} />
              <NumberField label="АД покой DIA" value={bpBaseDia} onChange={setBpBaseDia} />
              <NumberField label="АД после SYS" value={bpAfterSys} onChange={setBpAfterSys} />
              <NumberField label="АД после DIA" value={bpAfterDia} onChange={setBpAfterDia} />
              <NumberField label="АД 3 мин SYS" value={bpRecSys} onChange={setBpRecSys} />
              <NumberField label="АД 3 мин DIA" value={bpRecDia} onChange={setBpRecDia} />
            </>
          )}

          {activeTool === "stress" && stressAnswers.map((value, idx) => (
            <NumberField key={idx} label={`Вопрос ${idx + 1}`} value={value} onChange={(next) => setStressAnswers((prev) => prev.map((v, i) => i === idx ? next : v))} />
          ))}

          {activeTool === "hypertrophy" && (
            <>
              <NumberField label="Подходы" value={sets} onChange={setSets} />
              <NumberField label="Повторения" value={reps} onChange={setReps} />
              <NumberField label="Рабочий вес, кг" value={workWeight} onChange={setWorkWeight} />
              <NumberField label="1ПМ, кг" value={rm1} onChange={setRm1} />
            </>
          )}
        </div>

        <ResultCard>
          {activeTool === "anthropometry" && <p>{anthropometry.valid ? `BMI ${anthropometry.bmi}, WHR ${anthropometry.whr}, WHtR ${anthropometry.whtr}, ${anthropometry.bodyType}, расчётный ориентир: ${anthropometry.estimatedWeightKg} кг` : "—"}</p>}
          {activeTool === "calories" && <p>{calories.valid ? `BMR ${calories.bmr}, TDEE ${calories.tdee}, цель ${calories.targetCalories} ккал / Б${calories.proteinG} Ж${calories.fatG} У${calories.carbsG}` : "—"}</p>}
          {activeTool === "caliper" && <p>{caliper.valid ? `Σ складок ${caliper.sumFolds} мм, жир ${caliper.fatPercent}% (${caliper.fatMassKg} кг), БМТ ${caliper.lbmKg} кг` : "—"}</p>}
          {activeTool === "strength" && <p>{strength.valid ? `Индекс силы: ${strength.score} (${strength.level})` : "—"}</p>}
          {activeTool === "flexibility" && <p>{flexibility.valid ? `Наклон: ${flexibility.sitAndReachCm} см, уровень: ${flexibility.level}` : "—"}</p>}
          {activeTool === "functional" && <p>{functional.valid ? `PWC170: ${functional.pwc170} кгм/мин, МПК: ${functional.vo2max} мл/кг/мин` : "—"}</p>}
          {activeTool === "letunov" && <p>{letunov.valid ? `Подъём SYS: ${letunov.sysRise}, восстановление SYS: ${letunov.sysRecovery}, сдвиг DIA: ${letunov.diaShift}, тип реакции: ${letunov.type}` : "—"}</p>}
          {activeTool === "stress" && <p>{stress.valid ? `Балл: ${stress.score}, зона: ${stress.zone}` : "—"}</p>}
          {activeTool === "hypertrophy" && <p>{hypertrophy.valid ? `Тоннаж: ${hypertrophy.tonnage}, интенсивность: ${hypertrophy.intensity}%, индекс объёма: ${hypertrophy.volumeIndex}` : "—"}</p>}
        </ResultCard>

        <WarningBox text={anthropometry.warning || calories.warning || caliper.warning || strength.warning || flexibility.warning || functional.warning || letunov.warning || stress.warning || hypertrophy.warning || ""} />
        <DisclaimerBox />
      </div>
    </section>
  );
}

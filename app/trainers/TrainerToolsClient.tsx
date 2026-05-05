"use client";

import { ReactNode, useMemo, useState } from "react";

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
import { WarningBox } from "./components/WarningBox";
import { ActivityLevel, Goal, Sex } from "./types";

interface ToolCardData { id: string; iconSrc: string; label: string; active: boolean }
interface TrainerToolsClientProps { cards: ToolCardData[] }
const descriptions: Record<string, string> = {
  anthropometry: "Оценка базовых пропорций тела и расчётного ориентира веса.",
  calories: "Расчёт калорийности и макросов по цели.",
  caliper: "Оценка процента жира по сумме кожных складок.",
  strength: "Суммарный скоринг по базовым силовым тестам.",
  flexibility: "Оценка мобильности по наклону сидя.",
  functional: "Функциональная работоспособность (PWC170/МПК).",
  letunov: "Реакция сердечно‑сосудистой системы на нагрузку.",
  stress: "Экспресс-скрининг стресса за последние 7 дней. Оцени каждый пункт по шкале от 0 до 4.",
  hypertrophy: "Оценка тренировочного объёма для гипертрофии."
};

const fieldHints: Record<string, ReactNode> = {
  sex: "Используется для корректной интерпретации части расчётов и ориентиров. Выбирай биологический пол, если расчёт связан с физиологическими нормами.",
  age: "Нужен для расчёта обмена веществ, оценки нагрузки и общей интерпретации результата.",
  heightCm: "Используется в расчётах BMI, WHtR, калорийности и других базовых показателей. Вводи рост в сантиметрах.",
  weightKg: "Нужен для расчёта BMI, калорий, силовых и функциональных показателей. Вводи текущий вес в килограммах.",
  waistCm: "Измеряй по средней линии живота, без втягивания. Полезно для оценки WHR и WHtR — показателей распределения объёма.",
  hipCm: "Измеряй по самой широкой части бёдер. Значение используется для соотношения талии к бёдрам.",
  wristCm: "Помогает грубо оценить тип телосложения. Измеряй окружность запястья без сильного натяжения ленты.",
  activity: "Выбирай не “как хочется”, а как есть в реальности: шаги, тренировки, работа и бытовая активность. От этого сильно зависит TDEE.",
  goal: "Выбери текущую задачу: снижение жира, рекомпозиция, поддержание или набор мышц. От цели зависит итоговая калорийность.",
  fold: "Введи толщину кожно-жировой складки в миллиметрах. Важно делать замеры одинаковой техникой.",
  pushUps: "Количество технически нормальных повторений. Не засчитывай повторения с провалом корпуса или неполной амплитудой.",
  squats: "Количество повторений с контролем техники. Важно сохранять стабильность корпуса и коленей.",
  plankSec: "Время удержания планки в секундах. Засекай только время с ровным корпусом без провала поясницы.",
  sitReach: "Результат теста наклона сидя. Не нужно тянуться через боль. Это ориентир мобильности, а не соревнование.",
  p1: "Мощность первой нагрузки. Обычно это более лёгкая ступень теста.",
  p2: "Мощность второй нагрузки. Она должна быть выше первой, чтобы расчёт был корректным.",
  hr1: "Пульс после первой нагрузки. Вводи фактическое значение пульса.",
  hr2: "Пульс после второй нагрузки. Должен быть выше HR1. Если значения странные, тест лучше перепроверить.",
  bpBaseSys: "Верхнее давление до нагрузки.",
  bpBaseDia: "Нижнее давление до нагрузки.",
  bpAfterSys: "Верхнее давление сразу после нагрузки.",
  bpAfterDia: "Нижнее давление сразу после нагрузки.",
  bpRecSys: "Верхнее давление после трёх минут восстановления.",
  bpRecDia: "Нижнее давление после трёх минут восстановления.",
  stress: "Оцени состояние за последние 7 дней: 0 — никогда, 1 — редко, 2 — иногда, 3 — часто, 4 — почти постоянно.",
  sets: "Количество рабочих подходов. Разминочные подходы лучше не считать.",
  reps: "Количество повторений в одном рабочем подходе.",
  workWeight: "Вес, с которым выполняется рабочий подход. Вводи фактический вес снаряда.",
  rm1: "Примерный максимум на одно повторение. Если точного 1ПМ нет, его можно оценить приблизительно."
};

const stressQuestions = [
  "За последнюю неделю часто ощущала напряжение или внутреннюю тревогу?",
  "Было сложно расслабиться даже после отдыха?",
  "Замечала раздражительность или резкие перепады настроения?",
  "Сон стал хуже: труднее заснуть, просыпаешься ночью или встаёшь без восстановления?",
  "Часто чувствовала усталость, даже если нагрузка была обычной?",
  "Было сложнее концентрироваться и держать внимание на делах?"
];

const stressOptions = [
  { value: "0", label: "0 — никогда" },
  { value: "1", label: "1 — редко" },
  { value: "2", label: "2 — иногда" },
  { value: "3", label: "3 — часто" },
  { value: "4", label: "4 — почти постоянно" }
];

export function TrainerToolsClient({ cards }: TrainerToolsClientProps) {
  const [activeTool, setActiveTool] = useState("anthropometry");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
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
  const [stressAnswers, setStressAnswers] = useState([0, 0, 0, 0, 0, 0]);
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
  const selectedCard = cards.find((card) => card.id === selectedTool);

  return (
    <section className="space-y-4">
      {selectedTool === null ? (
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                setActiveTool(card.id);
                setSelectedTool(card.id);
              }}
              aria-label={card.label}
              className="aspect-square relative overflow-hidden rounded-2xl border border-[#ffb07f]/35 bg-[#26142b]/75 p-0 text-center text-white shadow-[0_8px_22px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(255,160,116,0.16)] transition hover:border-[#ffc49b]/65 hover:bg-[#311935]/90 hover:shadow-[0_0_18px_rgba(255,156,110,0.3)] active:scale-[0.995]"
            >
              <img src={card.iconSrc} alt={card.label} className="toolIconImage" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      ) : (
      <div className="rounded-3xl border border-[#ffb07f]/30 bg-[linear-gradient(145deg,rgba(39,21,44,0.95),rgba(21,11,26,0.96))] p-4 sm:p-6 space-y-4 shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#ffb07f]/25 bg-[#1d1022]/70 px-3 py-2">
          <button
            type="button"
            onClick={() => setSelectedTool(null)}
            className="rounded-xl border border-[#ffbe93]/40 bg-[#2a152f] px-3 py-1.5 text-sm font-medium text-[#ffd6bd] transition hover:bg-[#341b39]"
          >
            ← Назад
          </button>
          <p className="text-sm font-medium text-[#ffe7d6]">{selectedCard?.label}</p>
        </div>
        <SectionHeader text={descriptions[activeTool] ?? ""} />

        <div className="grid gap-3 sm:grid-cols-2">
          <SelectField label="Пол" value={sex} onChange={(v) => setSex(v as Sex)} options={[{ value: "female", label: "Женский" }, { value: "male", label: "Мужской" }]} hint={fieldHints.sex} />
          <NumberField label="Возраст" value={age} onChange={setAge} hint={fieldHints.age} />
          <NumberField label="Рост, см" value={heightCm} onChange={setHeightCm} hint={fieldHints.heightCm} />
          <NumberField label="Вес, кг" value={weightKg} onChange={setWeightKg} hint={fieldHints.weightKg} />

          {activeTool === "anthropometry" && (
            <>
              <NumberField label="Талия" value={waistCm} onChange={setWaistCm} hint={fieldHints.waistCm} />
              <NumberField label="Бёдра" value={hipCm} onChange={setHipCm} hint={fieldHints.hipCm} />
              <NumberField label="Запястье" value={wristCm} onChange={setWristCm} className="sm:col-span-2" hint={fieldHints.wristCm} />
            </>
          )}

          {activeTool === "calories" && (
            <>
              <SelectField label="Активность" value={activity} onChange={(v) => setActivity(v as ActivityLevel)} options={[{ value: "low", label: "Низкая" }, { value: "light", label: "Лёгкая" }, { value: "light_training", label: "Лёгкая + трен." }, { value: "moderate", label: "Средняя" }, { value: "hard", label: "Высокая" }, { value: "very_hard", label: "Очень высокая" }]} hint={fieldHints.activity} />
              <SelectField label="Цель" value={goal} onChange={(v) => setGoal(v as Goal)} options={[{ value: "fat_loss", label: "Снижение жира" }, { value: "recomposition", label: "Рекомпозиция" }, { value: "maintenance", label: "Поддержание" }, { value: "muscle_gain", label: "Набор мышц" }]} hint={fieldHints.goal} />
            </>
          )}

          {activeTool === "caliper" && folds.map((value, idx) => (
            <NumberField key={idx} label={`Складка ${idx + 1}, мм`} value={value} onChange={(next) => setFolds((prev) => prev.map((v, i) => i === idx ? next : v))} hint={fieldHints.fold} />
          ))}

          {activeTool === "strength" && (
            <>
              <NumberField label="Отжимания" value={pushUps} onChange={setPushUps} hint={fieldHints.pushUps} />
              <NumberField label="Приседания" value={squats} onChange={setSquats} hint={fieldHints.squats} />
              <NumberField label="Планка, сек" value={plankSec} onChange={setPlankSec} className="sm:col-span-2" hint={fieldHints.plankSec} />
            </>
          )}

          {activeTool === "flexibility" && <NumberField label="Наклон сидя, см" value={sitReach} onChange={setSitReach} className="sm:col-span-2" hint={fieldHints.sitReach} />}

          {activeTool === "functional" && (
            <>
              <NumberField label="P1" value={p1} onChange={setP1} hint={fieldHints.p1} />
              <NumberField label="P2" value={p2} onChange={setP2} hint={fieldHints.p2} />
              <NumberField label="HR1" value={hr1} onChange={setHr1} hint={fieldHints.hr1} />
              <NumberField label="HR2" value={hr2} onChange={setHr2} hint={fieldHints.hr2} />
            </>
          )}

          {activeTool === "letunov" && (
            <>
              <NumberField label="АД покой SYS" value={bpBaseSys} onChange={setBpBaseSys} hint={fieldHints.bpBaseSys} />
              <NumberField label="АД покой DIA" value={bpBaseDia} onChange={setBpBaseDia} hint={fieldHints.bpBaseDia} />
              <NumberField label="АД после SYS" value={bpAfterSys} onChange={setBpAfterSys} hint={fieldHints.bpAfterSys} />
              <NumberField label="АД после DIA" value={bpAfterDia} onChange={setBpAfterDia} hint={fieldHints.bpAfterDia} />
              <NumberField label="АД 3 мин SYS" value={bpRecSys} onChange={setBpRecSys} hint={fieldHints.bpRecSys} />
              <NumberField label="АД 3 мин DIA" value={bpRecDia} onChange={setBpRecDia} hint={fieldHints.bpRecDia} />
            </>
          )}

          {activeTool === "stress" && stressAnswers.map((value, idx) => (
            <SelectField
              key={idx}
              label={stressQuestions[idx]}
              value={String(value)}
              onChange={(next) =>
                setStressAnswers((prev) =>
                  prev.map((v, i) => (i === idx ? Number(next) : v))
                )
              }
              options={stressOptions}
              hint={fieldHints.stress}
            />
          ))}

          {activeTool === "hypertrophy" && (
            <>
              <NumberField label="Подходы" value={sets} onChange={setSets} hint={fieldHints.sets} />
              <NumberField label="Повторения" value={reps} onChange={setReps} hint={fieldHints.reps} />
              <NumberField label="Рабочий вес, кг" value={workWeight} onChange={setWorkWeight} hint={fieldHints.workWeight} />
              <NumberField label="1ПМ, кг" value={rm1} onChange={setRm1} hint={fieldHints.rm1} />
            </>
          )}
        </div>

        {activeTool === "stress" && (
          <p className="text-xs text-white/70">
            Шкала: 0 — никогда, 4 — почти постоянно. Это не диагноз, а ориентир для тренера, чтобы учитывать восстановление и нагрузку.
          </p>
        )}

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
      )}
    </section>
  );
}

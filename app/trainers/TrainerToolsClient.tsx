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
import { ActivityLevel, Goal, Sex } from "./types";

interface ToolCard { id: string; title: string; active: boolean }
interface TrainerToolsClientProps { cards: ToolCard[] }

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
  const [p1, setP1] = useState(600); const [p2, setP2] = useState(900); const [hr1, setHr1] = useState(120); const [hr2, setHr2] = useState(150);
  const [bpBaseSys, setBpBaseSys] = useState(120); const [bpBaseDia, setBpBaseDia] = useState(80);
  const [bpAfterSys, setBpAfterSys] = useState(145); const [bpAfterDia, setBpAfterDia] = useState(86);
  const [bpRecSys, setBpRecSys] = useState(126); const [bpRecDia, setBpRecDia] = useState(82);
  const [stressAnswers, setStressAnswers] = useState([1, 1, 1, 1, 1, 1]);
  const [sets, setSets] = useState(4); const [reps, setReps] = useState(10); const [workWeight, setWorkWeight] = useState(60); const [rm1, setRm1] = useState(90);

  const anthropometry = useMemo(() => calculateAnthropometry({ sex, age, heightCm, weightKg, waistCm, hipCm, wristCm }), [sex, age, heightCm, weightKg, waistCm, hipCm, wristCm]);
  const calories = useMemo(() => calculateCalories({ sex, age, heightCm, weightKg, activity, goal }), [sex, age, heightCm, weightKg, activity, goal]);
  const caliper = useMemo(() => calculateCaliper(folds, weightKg), [folds, weightKg]);
  const strength = useMemo(() => calculateStrength(pushUps, squats, plankSec, weightKg), [pushUps, squats, plankSec, weightKg]);
  const flexibility = useMemo(() => calculateFlexibility(sitReach), [sitReach]);
  const functional = useMemo(() => calculateFunctional(p1, p2, hr1, hr2, weightKg), [p1, p2, hr1, hr2, weightKg]);
  const letunov = useMemo(() => calculateLetunov(bpBaseSys, bpBaseDia, bpAfterSys, bpAfterDia, bpRecSys, bpRecDia), [bpBaseSys, bpBaseDia, bpAfterSys, bpAfterDia, bpRecSys, bpRecDia]);
  const stress = useMemo(() => calculateStress(stressAnswers), [stressAnswers]);
  const hypertrophy = useMemo(() => calculateHypertrophy(sets, reps, workWeight, rm1), [sets, reps, workWeight, rm1]);

  return <section className="space-y-5">{/* cards */}
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{cards.map((card) => <button key={card.id} type="button" onClick={() => setActiveTool(card.id)} className={`rounded-2xl border px-4 py-4 text-left ${activeTool===card.id?"border-cyan-400/80 bg-white/15":"border-white/15 bg-white/5"}`}>{card.title}</button>)}</div>
    <div className="rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 space-y-4">
      <p className="text-sm text-neutral-300">{activeTool==="anthropometry"?"Оценка базовых пропорций тела и расчётного ориентира веса.":activeTool==="calories"?"Расчёт калорийности и макросов по цели.":activeTool==="caliper"?"Оценка процента жира по сумме кожных складок.":activeTool==="strength"?"Суммарный скоринг по базовым силовым тестам.":activeTool==="flexibility"?"Оценка мобильности по наклону сидя.":activeTool==="functional"?"Функциональная работоспособность (PWC170/МПК).":activeTool==="letunov"?"Реакция сердечно‑сосудистой системы на нагрузку.":activeTool==="stress"?"Скрининг уровня стресса по чек‑листу.":"Оценка тренировочного объёма для гипертрофии."}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>Пол<select value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"><option value="female">Женский</option><option value="male">Мужской</option></select></label>
        <label>Возраст<input type="number" value={age} onChange={(e)=>setAge(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
        <label>Рост, см<input type="number" value={heightCm} onChange={(e)=>setHeightCm(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
        <label>Вес, кг<input type="number" value={weightKg} onChange={(e)=>setWeightKg(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
        {activeTool==="anthropometry" && <><label>Талия<input type="number" value={waistCm} onChange={(e)=>setWaistCm(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label><label>Бёдра<input type="number" value={hipCm} onChange={(e)=>setHipCm(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label><label className="sm:col-span-2">Запястье<input type="number" value={wristCm} onChange={(e)=>setWristCm(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label></>}
        {activeTool==="calories" && <><label>Активность<select value={activity} onChange={(e)=>setActivity(e.target.value as ActivityLevel)} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"><option value="low">Низкая</option><option value="light">Лёгкая</option><option value="light_training">Лёгкая + трен.</option><option value="moderate">Средняя</option><option value="hard">Высокая</option><option value="very_hard">Очень высокая</option></select></label><label>Цель<select value={goal} onChange={(e)=>setGoal(e.target.value as Goal)} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"><option value="fat_loss">Снижение жира</option><option value="recomposition">Рекомпозиция</option><option value="maintenance">Поддержание</option><option value="muscle_gain">Набор мышц</option></select></label></>}
        {activeTool==="letunov" && <>
          <label>АД покой SYS<input type="number" value={bpBaseSys} onChange={(e)=>setBpBaseSys(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
          <label>АД покой DIA<input type="number" value={bpBaseDia} onChange={(e)=>setBpBaseDia(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
          <label>АД после SYS<input type="number" value={bpAfterSys} onChange={(e)=>setBpAfterSys(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
          <label>АД после DIA<input type="number" value={bpAfterDia} onChange={(e)=>setBpAfterDia(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
          <label>АД 3 мин SYS<input type="number" value={bpRecSys} onChange={(e)=>setBpRecSys(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
          <label>АД 3 мин DIA<input type="number" value={bpRecDia} onChange={(e)=>setBpRecDia(Number(e.target.value))} className="mt-1 w-full rounded-xl bg-neutral-900/80 p-3"/></label>
        </>}

      </div>
      <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">{activeTool==="anthropometry"&&<p>{anthropometry.valid ? `BMI ${anthropometry.bmi}, WHR ${anthropometry.whr}, WHtR ${anthropometry.whtr}, ${anthropometry.bodyType}, расчётный ориентир: ${anthropometry.estimatedWeightKg} кг` : "—"}</p>}{activeTool==="calories"&&<p>{calories.valid ? `BMR ${calories.bmr}, TDEE ${calories.tdee}, цель ${calories.targetCalories} ккал / Б${calories.proteinG} Ж${calories.fatG} У${calories.carbsG}` : "—"}</p>}{activeTool==="caliper"&&<p>{caliper.valid ? `Σ складок ${caliper.sumFolds} мм, жир ${caliper.fatPercent}% (${caliper.fatMassKg} кг), БМТ ${caliper.lbmKg} кг` : "—"}</p>}{activeTool==="strength"&&<p>{strength.valid ? `Индекс силы: ${strength.score} (${strength.level})` : "—"}</p>}{activeTool==="flexibility"&&<p>{flexibility.valid ? `Наклон: ${flexibility.sitAndReachCm} см, уровень: ${flexibility.level}` : "—"}</p>}{activeTool==="functional"&&<p>{functional.valid ? `PWC170: ${functional.pwc170} кгм/мин, МПК: ${functional.vo2max} мл/кг/мин` : "—"}</p>}{activeTool==="letunov"&&<p>{letunov.valid ? `Подъём SYS: ${letunov.sysRise}, восстановление SYS: ${letunov.sysRecovery}, сдвиг DIA: ${letunov.diaShift}, тип реакции: ${letunov.type}` : "—"}</p>}{activeTool==="stress"&&<p>{stress.valid ? `Балл: ${stress.score}, зона: ${stress.zone}` : "—"}</p>}{activeTool==="hypertrophy"&&<p>{hypertrophy.valid ? `Тоннаж: ${hypertrophy.tonnage}, интенсивность: ${hypertrophy.intensity}%, индекс объёма: ${hypertrophy.volumeIndex}` : "—"}</p>}</div>
      <p className="text-sm text-amber-200">{anthropometry.warning || calories.warning || caliper.warning || strength.warning || flexibility.warning || functional.warning || letunov.warning || stress.warning || hypertrophy.warning || ""}</p>
      <div className="rounded-2xl border border-amber-300/30 bg-amber-950/30 p-4 text-sm text-amber-100">Предупреждение: расчёты ориентировочные и не заменяют медицинскую диагностику.</div>
    </div>
  </section>;
}

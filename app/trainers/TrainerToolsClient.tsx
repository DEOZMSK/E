"use client";

import { useMemo, useState } from "react";

import {
  calculateAnthropometry,
  calculateCalories,
  calculateCaliper,
  scoreFlexibility,
  scorePushups,
  scoreSitups
} from "./calculators";
import { ActivityLevel, Goal, Sex } from "./types";

interface ToolCard {
  id: string;
  title: string;
  active: boolean;
}

interface TrainerToolsClientProps {
  cards: ToolCard[];
}

const NumberField = ({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) => (
  <label className="text-sm text-neutral-200">
    {label}
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100"
    />
  </label>
);

const ResultWarning = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <p className="rounded-xl border border-amber-300/30 bg-amber-200/10 px-3 py-2 text-amber-200">{text}</p>;
};

const DisclaimerBox = () => (
  <p className="mt-4 text-sm text-neutral-300">
    Расчёт является ориентиром для тренерской оценки и не заменяет медицинскую диагностику.
  </p>
);

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

  const [forearm, setForearm] = useState(10);
  const [armFront, setArmFront] = useState(12);
  const [armBack, setArmBack] = useState(14);
  const [chest, setChest] = useState(12);
  const [scapula, setScapula] = useState(14);
  const [abdomen, setAbdomen] = useState(18);
  const [thigh, setThigh] = useState(20);
  const [calf, setCalf] = useState(14);

  const [strengthMode, setStrengthMode] = useState<"pushups" | "situps">("pushups");
  const [strengthReps, setStrengthReps] = useState(20);
  const [reachCm, setReachCm] = useState(30);

  const anthropometry = useMemo(() => calculateAnthropometry({ sex, age, heightCm, weightKg, waistCm, hipCm, wristCm }), [sex, age, heightCm, weightKg, waistCm, hipCm, wristCm]);
  const calories = useMemo(() => calculateCalories({ sex, age, heightCm, weightKg, activity, goal }), [sex, age, heightCm, weightKg, activity, goal]);
  const caliper = useMemo(() => calculateCaliper({ sex, age, heightCm, weightKg, forearm, armFront, armBack, chest, scapula, abdomen, thigh, calf }), [sex, age, heightCm, weightKg, forearm, armFront, armBack, chest, scapula, abdomen, thigh, calf]);
  const strength = useMemo(() => (strengthMode === "pushups" ? scorePushups(sex, age, strengthReps) : scoreSitups(sex, age, strengthReps)), [strengthMode, sex, age, strengthReps]);
  const flexibility = useMemo(() => scoreFlexibility({ age, reachCm }), [age, reachCm]);

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const isSelected = activeTool === card.id;
          return (
            <button
              key={card.id}
              type="button"
              disabled={!card.active}
              onClick={() => card.active && setActiveTool(card.id)}
              className={`min-h-[6.5rem] rounded-2xl border px-4 py-5 text-left text-lg transition ${
                card.active
                  ? isSelected
                    ? "border-cyan-400/80 bg-white/15 shadow-lg shadow-cyan-900/20 backdrop-blur"
                    : "border-white/15 bg-white/5 hover:border-cyan-300/60 hover:bg-white/10"
                  : "cursor-not-allowed border-white/10 bg-neutral-900/60 text-neutral-500"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold leading-snug">{card.title}</p>
                {!card.active && (
                  <span className="rounded-full border border-white/10 bg-neutral-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-300">
                    Скоро
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl shadow-black/20 backdrop-blur-md sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-neutral-200">
            Пол
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100"
            >
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </label>

          <NumberField label="Возраст" value={age} onChange={setAge} />

          {["anthropometry", "calories", "caliper"].includes(activeTool) && (
            <>
              <NumberField label="Рост, см" value={heightCm} onChange={setHeightCm} />
              <NumberField label="Вес, кг" value={weightKg} onChange={setWeightKg} />
            </>
          )}

          {activeTool === "anthropometry" && (
            <>
              <NumberField label="Талия, см" value={waistCm} onChange={setWaistCm} />
              <NumberField label="Бёдра, см" value={hipCm} onChange={setHipCm} />
              <NumberField label="Запястье, см" value={wristCm} onChange={setWristCm} />
            </>
          )}

          {activeTool === "calories" && (
            <>
              <label className="text-sm text-neutral-200">
                Активность
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                  className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100"
                >
                  <option value="low">Низкая</option>
                  <option value="light">Лёгкая</option>
                  <option value="light_training">Лёгкая + тренировки</option>
                  <option value="moderate">Средняя</option>
                  <option value="hard">Тяжёлая</option>
                  <option value="very_hard">Очень тяжёлая</option>
                </select>
              </label>

              <label className="text-sm text-neutral-200">
                Цель
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as Goal)}
                  className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100"
                >
                  <option value="fat_loss">Снижение жира</option>
                  <option value="recomposition">Рекомпозиция</option>
                  <option value="maintenance">Поддержание</option>
                  <option value="muscle_gain">Набор мышц</option>
                </select>
              </label>
            </>
          )}

          {activeTool === "caliper" && (
            <>
              <NumberField label="Предплечье" value={forearm} onChange={setForearm} />
              <NumberField label="Плечо спереди" value={armFront} onChange={setArmFront} />
              <NumberField label="Плечо сзади" value={armBack} onChange={setArmBack} />
              {sex === "male" && <NumberField label="Грудь" value={chest} onChange={setChest} />}
              <NumberField label="Лопатка" value={scapula} onChange={setScapula} />
              <NumberField label="Живот" value={abdomen} onChange={setAbdomen} />
              <NumberField label="Бедро" value={thigh} onChange={setThigh} />
              <NumberField label="Икра" value={calf} onChange={setCalf} />
            </>
          )}

          {activeTool === "strength" && (
            <>
              <label className="text-sm text-neutral-200">
                Тест
                <select
                  value={strengthMode}
                  onChange={(e) => setStrengthMode(e.target.value as "pushups" | "situps")}
                  className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100"
                >
                  <option value="pushups">Push-up test</option>
                  <option value="situps">Sit-up test</option>
                </select>
              </label>

              <NumberField
                label={strengthMode === "pushups" ? "Повторения" : "Повторения за 1 минуту"}
                value={strengthReps}
                onChange={setStrengthReps}
              />
            </>
          )}

          {activeTool === "flexibility" && (
            <NumberField label="Наклон вперёд (sit-and-reach), см" value={reachCm} onChange={setReachCm} />
          )}
        </div>

        <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
          {activeTool === "anthropometry" && (
            anthropometry.valid ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <p>BMI: {anthropometry.bmi}</p>
                <p>WHR: {anthropometry.whr}</p>
                <p>WHtR: {anthropometry.whtr}</p>
                <p>Тип телосложения: {anthropometry.bodyType}</p>
                <p className="sm:col-span-2">Ориентировочно вес: {anthropometry.estimatedWeightKg} кг</p>
                <p className="sm:col-span-2 text-sm text-neutral-300">
                  {anthropometry.bmiComment} {anthropometry.whrComment} {anthropometry.whtrComment}
                </p>
              </div>
            ) : (
              <ResultWarning text={anthropometry.warning} />
            )
          )}

          {activeTool === "calories" && (
            calories.valid ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <p>BMR: {calories.bmr} ккал</p>
                <p>TDEE: {calories.tdee} ккал</p>
                <p>Целевые калории: {calories.targetCalories} ккал</p>
                <p>Белки: {calories.proteinG} г</p>
                <p>Жиры: {calories.fatG} г</p>
                <p>Углеводы: {calories.carbsG} г</p>
                <div className="sm:col-span-2">
                  <ResultWarning text={calories.warning} />
                </div>
              </div>
            ) : (
              <ResultWarning text={calories.warning} />
            )
          )}

          {activeTool === "caliper" && (
            caliper.valid ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <p>Сумма складок: {caliper.sumFolds} мм</p>
                <p>Средняя складка: {caliper.averageSkinfold} мм</p>
                <p>Жировая масса: {caliper.fatMassKg} кг</p>
                <p>Процент жира: {caliper.fatPercent}%</p>
                <p>Безжировая масса: {caliper.lbmKg} кг</p>
                <p className="sm:col-span-2 text-sm text-neutral-300">{caliper.comment}</p>
                <p className="sm:col-span-2 text-xs text-neutral-400">
                  Точность зависит от правильности замеров КЖС. Это тренерская оценка, не медицинская диагностика.
                </p>
              </div>
            ) : (
              <ResultWarning text={caliper.warning} />
            )
          )}

          {activeTool === "strength" && (
            strength.valid ? (
              <div>
                <p>Категория: {strength.category}</p>
                <p className="text-sm text-neutral-300">{strength.comment}</p>
              </div>
            ) : (
              <ResultWarning text={strength.warning} />
            )
          )}

          {activeTool === "flexibility" && (
            flexibility.valid ? (
              <div>
                <p>Результат: {flexibility.reachCm} см</p>
                <p>Статус: {flexibility.status}</p>
                <p className="text-sm text-neutral-300">{flexibility.comment}</p>
              </div>
            ) : (
              <ResultWarning text={flexibility.warning} />
            )
          )}

          <DisclaimerBox />
        </div>
      </div>
    </section>
  );
}

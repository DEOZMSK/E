"use client";

import { useMemo, useState } from "react";

import { calculateAnthropometry, calculateCalories } from "./calculators";
import { ActivityLevel, Goal, Sex } from "./types";

interface ToolCard {
  id: string;
  title: string;
  active: boolean;
}

interface TrainerToolsClientProps {
  cards: ToolCard[];
}

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

  const anthropometry = useMemo(
    () => calculateAnthropometry({ sex, age, heightCm, weightKg, waistCm, hipCm, wristCm }),
    [sex, age, heightCm, weightKg, waistCm, hipCm, wristCm]
  );

  const calories = useMemo(
    () => calculateCalories({ sex, age, heightCm, weightKg, activity, goal }),
    [sex, age, heightCm, weightKg, activity, goal]
  );

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
            <select value={sex} onChange={(e) => setSex(e.target.value as Sex)} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100">
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </label>
          <label className="text-sm text-neutral-200">
            Возраст
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100" />
          </label>
          <label className="text-sm text-neutral-200">
            Рост, см
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100" />
          </label>
          <label className="text-sm text-neutral-200">
            Вес, кг
            <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100" />
          </label>

          {activeTool === "anthropometry" && (
            <>
              <label className="text-sm text-neutral-200">
                Талия, см
                <input type="number" value={waistCm} onChange={(e) => setWaistCm(Number(e.target.value))} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100" />
              </label>
              <label className="text-sm text-neutral-200">
                Бёдра, см
                <input type="number" value={hipCm} onChange={(e) => setHipCm(Number(e.target.value))} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100" />
              </label>
              <label className="text-sm text-neutral-200 sm:col-span-2">
                Запястье, см
                <input type="number" value={wristCm} onChange={(e) => setWristCm(Number(e.target.value))} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100" />
              </label>
            </>
          )}

          {activeTool === "calories" && (
            <>
              <label className="text-sm text-neutral-200">
                Активность
                <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100">
                  <option value="low">Низкая</option>
                  <option value="light">Лёгкая</option>
                  <option value="light_training">Лёгкая с тренировками</option>
                  <option value="moderate">Средняя</option>
                  <option value="hard">Высокая</option>
                  <option value="very_hard">Очень высокая</option>
                </select>
              </label>
              <label className="text-sm text-neutral-200">
                Цель
                <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="mt-2 min-h-14 w-full rounded-xl border border-white/15 bg-neutral-900/80 px-4 py-3 text-xl text-neutral-100">
                  <option value="fat_loss">Снижение жира</option>
                  <option value="recomposition">Рекомпозиция</option>
                  <option value="maintenance">Поддержание</option>
                  <option value="muscle_gain">Набор мышц</option>
                </select>
              </label>
            </>
          )}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-neutral-900/70 p-4 text-base text-neutral-100">
          {activeTool === "anthropometry" ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <p>BMI: {anthropometry.bmi}</p>
              <p>WHR: {anthropometry.whr}</p>
              <p>WHtR: {anthropometry.whtr}</p>
              <p>Тип: {anthropometry.bodyType}</p>
              <p className="sm:col-span-2">Ориентир веса: {anthropometry.idealWeightKg} кг</p>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              <p>BMR: {calories.bmr} ккал</p>
              <p>TDEE: {calories.tdee} ккал</p>
              <p>Целевые ккал: {calories.targetCalories}</p>
              <p>Белки: {calories.proteinG} г</p>
              <p>Жиры: {calories.fatG} г</p>
              <p>Углеводы: {calories.carbsG} г</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

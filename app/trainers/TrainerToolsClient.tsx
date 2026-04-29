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
  const [goal, setGoal] = useState<Goal>("maintain");

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
              className={`rounded-2xl border p-4 text-left transition ${
                card.active
                  ? isSelected
                    ? "border-accent bg-surface"
                    : "border-outline/80 bg-white/80 hover:border-accent/70"
                  : "cursor-not-allowed border-outline/60 bg-neutral-200/50 text-neutral-500"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-base font-semibold">{card.title}</p>
                {!card.active && (
                  <span className="rounded-full bg-neutral-500 px-2 py-1 text-xs font-semibold uppercase text-white">
                    Скоро
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-outline/70 bg-white/85 p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Пол
            <select value={sex} onChange={(e) => setSex(e.target.value as Sex)} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg">
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </label>
          <label className="text-sm">
            Возраст
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg" />
          </label>
          <label className="text-sm">
            Рост, см
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg" />
          </label>
          <label className="text-sm">
            Вес, кг
            <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg" />
          </label>

          {activeTool === "anthropometry" && (
            <>
              <label className="text-sm">
                Талия, см
                <input type="number" value={waistCm} onChange={(e) => setWaistCm(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg" />
              </label>
              <label className="text-sm">
                Бёдра, см
                <input type="number" value={hipCm} onChange={(e) => setHipCm(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg" />
              </label>
              <label className="text-sm sm:col-span-2">
                Запястье, см
                <input type="number" value={wristCm} onChange={(e) => setWristCm(Number(e.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg" />
              </label>
            </>
          )}

          {activeTool === "calories" && (
            <>
              <label className="text-sm">
                Активность
                <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg">
                  <option value="sedentary">Низкая</option>
                  <option value="light">Лёгкая</option>
                  <option value="moderate">Средняя</option>
                  <option value="high">Высокая</option>
                  <option value="veryHigh">Очень высокая</option>
                </select>
              </label>
              <label className="text-sm">
                Цель
                <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="mt-1 w-full rounded-xl border px-4 py-3 text-lg">
                  <option value="lose">Снижение</option>
                  <option value="maintain">Поддержание</option>
                  <option value="gain">Набор</option>
                </select>
              </label>
            </>
          )}
        </div>

        <div className="mt-5 rounded-2xl bg-surface/70 p-4 text-sm">
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

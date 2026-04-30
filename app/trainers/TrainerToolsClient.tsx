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

interface ToolCardData { id: string; title: string; active: boolean }
interface TrainerToolsClientProps { cards: ToolCardData[] }
interface ToolInfo { title: string; body: ReactNode }
interface ToolActionCardProps {
  title: string;
  active: boolean;
  infoActive: boolean;
  onOpenTool: () => void;
  onToggleInfo: () => void;
}

function ToolActionCard({ title, active, infoActive, onOpenTool, onToggleInfo }: ToolActionCardProps) {
  return (
    <div
      className={`flex overflow-hidden rounded-2xl border transition ${
        active || infoActive
          ? "border-cyan-400/80 bg-cyan-500/15 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
          : "border-white/15 bg-white/5"
      }`}
    >
      <button
        type="button"
        onClick={onOpenTool}
        className="min-w-0 flex-1 px-4 py-4 text-left text-base font-medium text-white transition hover:bg-white/5 active:scale-[0.995]"
      >
        <span className="block truncate">{title}</span>
      </button>
      <button
        type="button"
        onClick={onToggleInfo}
        className={`w-14 shrink-0 border-l px-3 text-lg transition hover:bg-white/10 sm:w-16 ${
          infoActive
            ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-100"
            : "border-white/10 bg-white/[0.03] text-white/80"
        }`}
        aria-label={`Открыть памятку: ${title}`}
        aria-pressed={infoActive}
      >
        ℹ️
      </button>
    </div>
  );
}

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

const toolInfos: Record<string, ToolInfo> = {
  anthropometry: {
    title: "📐 Антропометрия — как пользоваться",
    body: (
      <div className="space-y-3">
        <p>Антропометрия помогает быстро оценить базовые пропорции клиента: вес, рост, талию, бёдра и общий риск по распределению объёмов.</p>
        <p>Это не диагноз и не “оценка внешности”, а рабочий инструмент тренера для первичного понимания ситуации.</p>
        <div><h3 className="font-semibold text-white">Что вводить:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Пол</strong> — нужен для корректной интерпретации некоторых ориентиров.</li><li><strong>Возраст</strong> — помогает учитывать общий контекст клиента.</li><li><strong>Рост и вес</strong> — используются для расчёта BMI.</li><li><strong>Талия</strong> — измеряется по средней линии живота, без втягивания.</li><li><strong>Бёдра</strong> — измеряются по самой широкой части.</li><li><strong>Запястье</strong> — помогает грубо оценить тип телосложения.</li></ul></div>
        <div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>BMI</strong> — общий индекс массы тела. Он не показывает состав тела, но даёт первичный ориентир.</li><li><strong>WHR</strong> — соотношение талии к бёдрам.</li><li><strong>WHtR</strong> — соотношение талии к росту. Часто полезнее BMI, потому что показывает центральное распределение объёма.</li><li><strong>Расчётный ориентир веса</strong> — не цель любой ценой, а примерная точка для анализа.</li></ul></div>
        <div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Используй результат как стартовую карту клиента: где есть риски, где нужна осторожность, где можно строить обычный план.</p></div>
      </div>
    )
  },
  calories: { title: "🔥 Калории и БЖУ — как пользоваться", body: (<div className="space-y-3"><p>Этот расчёт помогает получить ориентир по калориям и макронутриентам под цель клиента.</p><p>Он нужен не для жёсткой диеты, а для понимания рамок: сколько энергии примерно нужно человеку и как распределить белки, жиры и углеводы.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Пол, возраст, рост, вес</strong> — база для расчёта обмена веществ.</li><li><strong>Активность</strong> — чем выше реальная активность, тем выше расход.</li><li><strong>Цель</strong> — снижение жира, рекомпозиция, поддержание или набор мышц.</li></ul></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>BMR</strong> — базовый обмен, то есть примерный расход организма в покое.</li><li><strong>TDEE</strong> — примерный расход с учётом активности.</li><li><strong>Целевые калории</strong> — ориентир под выбранную цель.</li><li><strong>Б/Ж/У</strong> — примерное распределение белков, жиров и углеводов.</li></ul></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Для снижения веса не надо сразу ставить экстремально низкие калории. Для набора мышц не надо делать огромный профицит. Для рекомпозиции важны умеренность, белок, силовые тренировки и восстановление.</p></div></div>) },
  caliper: { title: "🧴 КЖС / состав тела — как пользоваться", body: (<div className="space-y-3"><p>Этот расчёт помогает оценить процент жира по кожно-жировым складкам.</p><p>Он полезен для отслеживания динамики, если замеры делает один и тот же человек, в одних и тех же точках, примерно в одинаковых условиях.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><p>В поля “Складка 1–4” вводятся значения кожно-жировых складок в миллиметрах.</p><p>Важно измерять аккуратно, без спешки, и не сравнивать результаты, если замеры делали разные люди разной техникой.</p></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Σ складок</strong> — сумма всех складок.</li><li><strong>Процент жира</strong> — ориентировочная оценка.</li><li><strong>Жировая масса</strong> — примерный вес жира в килограммах.</li><li><strong>БМТ / LBM</strong> — безжировая масса тела.</li></ul></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Главная ценность — не один разовый результат, а динамика. Если сумма складок снижается, а силовые и самочувствие не падают — обычно это хороший знак.</p></div></div>) },
  strength: { title: "💪 Силовые тесты — как пользоваться", body: (<div className="space-y-3"><p>Силовые тесты помогают быстро оценить общий уровень физической подготовки клиента.</p><p>Это не соревнование, а скрининг: понять стартовый уровень и подобрать адекватную нагрузку.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Отжимания</strong> — количество технически нормальных повторений.</li><li><strong>Приседания</strong> — количество повторений с контролем техники.</li><li><strong>Планка</strong> — время удержания в секундах.</li><li><strong>Вес</strong> — нужен для общей интерпретации результата.</li></ul></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Индекс силы</strong> — общий балл по тестам.</li><li><strong>Уровень</strong> — примерная категория подготовки.</li></ul></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Если результат низкий — не давить клиента сложными схемами. Если результат средний — можно строить прогрессию постепенно. Если результат высокий — можно точнее подбирать силовые задачи и отслеживать прогресс.</p></div></div>) },
  flexibility: { title: "🧘 Гибкость — как пользоваться", body: (<div className="space-y-3"><p>Тест гибкости помогает оценить мобильность задней поверхности бедра, поясницы и общий диапазон движения в наклоне.</p><p>Это простой ориентир, а не полноценная диагностика опорно-двигательного аппарата.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Наклон сидя, см</strong> — результат теста.</li><li>Если человек не дотягивается до условной нулевой линии, значение может быть отрицательным, если интерфейс это поддерживает.</li><li>Если отрицательные значения сейчас не поддерживаются — фиксируй фактический доступный результат по вашей системе измерения.</li></ul></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><p>Результат показывает примерный уровень гибкости: низкий, средний или хороший.</p></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Не используй тест как повод “тянуть любой ценой”. Если есть боль, резкое ограничение движения или травмы — нужна осторожность. Для прогресса важны регулярность, мягкая амплитуда и контроль дыхания.</p></div></div>) },
  functional: { title: "❤️ PWC170 / МПК — как пользоваться", body: (<div className="space-y-3"><p>Этот расчёт помогает оценить функциональную работоспособность и примерный уровень аэробной подготовки.</p><p>Он больше подходит для тренерского контроля выносливости, а не для новичков с жалобами на сердце или давление.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>P1</strong> — мощность первой нагрузки.</li><li><strong>P2</strong> — мощность второй нагрузки.</li><li><strong>HR1</strong> — пульс после первой нагрузки.</li><li><strong>HR2</strong> — пульс после второй нагрузки.</li><li><strong>Вес</strong> — нужен для расчёта относительных показателей.</li></ul></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>PWC170</strong> — ориентир физической работоспособности при пульсе 170.</li><li><strong>МПК / VO2max</strong> — примерная оценка максимального потребления кислорода.</li></ul></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Чем выше показатель, тем лучше аэробная работоспособность. Но результат зависит от протокола, техники проведения теста, пульса, усталости и состояния клиента в день теста.</p></div><div><h3 className="font-semibold text-white">Важно:</h3><p>При сердечно-сосудистых жалобах, высоком давлении или плохом самочувствии тест не проводить.</p></div></div>) },
  letunov: { title: "🫀 Тест Летунова — как пользоваться", body: (<div className="space-y-3"><p>Тест Летунова помогает оценить реакцию сердечно-сосудистой системы на нагрузку и восстановление после неё.</p><p>Это не медицинская диагностика, а тренерский скрининг.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>АД покой SYS/DIA</strong> — давление до нагрузки.</li><li><strong>АД после SYS/DIA</strong> — давление сразу после нагрузки.</li><li><strong>АД 3 мин SYS/DIA</strong> — давление после восстановления.</li><li><strong>SYS</strong> — верхнее давление.</li><li><strong>DIA</strong> — нижнее давление.</li></ul></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Подъём SYS</strong> — как изменилось верхнее давление.</li><li><strong>Восстановление SYS</strong> — насколько давление вернулось ближе к исходному.</li><li><strong>Сдвиг DIA</strong> — изменение нижнего давления.</li><li><strong>Тип реакции</strong> — ориентировочная оценка реакции организма.</li></ul></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Если реакция выглядит неблагоприятной, нагрузку не усиливать. Если есть жалобы, головокружение, боль, сильная одышка или высокое давление — тест прекращается, клиенту лучше обратиться к врачу.</p></div></div>) },
  stress: { title: "🧠 Стресс — как пользоваться", body: (<div className="space-y-3"><p>Этот блок помогает быстро оценить уровень стресса и восстановления за последние 7 дней.</p><p>Он нужен тренеру, чтобы не давать одинаковую нагрузку человеку в нормальном состоянии и человеку в сильном переутомлении.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><p>По каждому вопросу выбери оценку от 0 до 4:</p><ul className="list-disc space-y-1 pl-5"><li>0 — никогда</li><li>1 — редко</li><li>2 — иногда</li><li>3 — часто</li><li>4 — почти постоянно</li></ul></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Балл</strong> — сумма ответов.</li><li><strong>Зона</strong> — примерный уровень стресса.</li></ul></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Если стресс низкий — можно работать по обычному плану. Если стресс средний — лучше следить за восстановлением. Если стресс высокий — нагрузку стоит смягчить, особенно интенсивность и объём.</p></div><div><h3 className="font-semibold text-white">Важно:</h3><p>Это не психологический диагноз, а тренерский ориентир.</p></div></div>) },
  hypertrophy: { title: "🏋️ Гипертрофия — как пользоваться", body: (<div className="space-y-3"><p>Этот расчёт помогает примерно оценить тренировочный объём и интенсивность для работы на мышечный рост.</p><p>Он не заменяет тренерское решение, но помогает быстро понять: нагрузка выглядит слишком лёгкой, рабочей или потенциально перегруженной.</p><div><h3 className="font-semibold text-white">Что вводить:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Подходы</strong> — сколько рабочих подходов выполняется в упражнении или блоке.</li><li><strong>Повторения</strong> — сколько повторений в одном подходе.</li><li><strong>Рабочий вес</strong> — вес, с которым человек реально выполняет подходы.</li><li><strong>1ПМ</strong> — примерный максимум на одно повторение. Если точного 1ПМ нет, его можно оценить приблизительно.</li></ul></div><div><h3 className="font-semibold text-white">Как читать результат:</h3><ul className="list-disc space-y-1 pl-5"><li><strong>Тоннаж</strong> — общий объём работы.</li><li><strong>Формула тоннажа</strong>: подходы × повторения × рабочий вес.</li><li><strong>Интенсивность</strong> — насколько рабочий вес близок к 1ПМ.</li><li>Например, если рабочий вес 60 кг, а 1ПМ 90 кг, интенсивность будет около 66,7%.</li><li><strong>Индекс объёма</strong> — вспомогательный показатель, который помогает сравнивать нагрузку между разными вариантами тренировки.</li></ul></div><div><h3 className="font-semibold text-white">Как применять тренеру:</h3><p>Если объём слишком маленький — возможно, стимула для роста недостаточно. Если объём слишком большой — клиент может не успевать восстанавливаться. Если интенсивность слишком высокая — упражнение может быть ближе к силовой работе, а не к спокойной гипертрофии.</p></div></div>) }
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
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
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

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          return (
            <ToolActionCard
              key={card.id}
              title={card.title}
              active={activeTool === card.id}
              infoActive={activeInfo === card.id}
              onOpenTool={() => {
                setActiveTool(card.id);
                setActiveInfo(null);
              }}
              onToggleInfo={() => setActiveInfo((prev) => (prev === card.id ? null : card.id))}
            />
          );
        })}
      </div>

      {activeInfo && toolInfos[activeInfo] && (
        <div className="rounded-3xl border border-cyan-300/20 bg-neutral-900/80 p-4 text-sm text-white/85 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6">
          <h2 className="mb-3 text-base font-semibold text-white sm:text-lg">{toolInfos[activeInfo].title}</h2>
          <div className="space-y-3 leading-relaxed text-white/80">{toolInfos[activeInfo].body}</div>
        </div>
      )}

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
            />
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
    </section>
  );
}

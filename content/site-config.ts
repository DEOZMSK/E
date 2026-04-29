export interface SiteConfig {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaLabel: string;
    note: string;
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  chatPreview: {
    title: string;
    messages: {
      sender: "user" | "bot";
      text: string;
    }[];
  };
  flow: {
    title: string;
    description: string;
    steps?: string[];
    ctaLabel: string;
    hint: string;
  };
  closingNote: string;
  telegramLink: string;
}

export const siteConfig: SiteConfig = {
  meta: {
    title: process.env.NEXT_PUBLIC_SITE_TITLE ?? "Фитнес-диагностика для женщин с Еленой",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
      "Персональная фитнес-диагностика для женщин: оценка текущего состояния, понятный план тренировок и питания, сопровождение с Еленой в Telegram."
  },
  hero: {
    eyebrow: process.env.NEXT_PUBLIC_HERO_EYEBROW ?? "Женский фитнес · персональная работа",
    headline: process.env.NEXT_PUBLIC_HERO_HEADLINE ?? "Верни энергию и форму без перегруза",
    subheadline:
      process.env.NEXT_PUBLIC_HERO_SUBHEADLINE ??
      "Начинаем с фитнес-диагностики, собираем индивидуальный план и идём с персональным сопровождением Елены до стабильного результата.",
    ctaLabel: process.env.NEXT_PUBLIC_HERO_CTA_LABEL ?? "Пройти диагностику в Telegram",
    note:
      process.env.NEXT_PUBLIC_HERO_NOTE ??
      "Пиши в бот: получишь стартовые вопросы, после чего Елена подключится лично и предложит формат работы."
  },
  features: [
    {
      icon: "🧪",
      title: "Фитнес-диагностика",
      description: "Разбираем твою текущую нагрузку, режим, питание, восстановление и ограничения, чтобы понять, что реально мешает прогрессу."
    },
    {
      icon: "📝",
      title: "Индивидуальный план",
      description: "Составляем пошаговый план тренировок, активности и питания под твой график, уровень подготовки и цель."
    },
    {
      icon: "🤝",
      title: "Сопровождение Елены",
      description: "Елена ведёт тебя персонально: корректирует план, поддерживает в сложные недели и помогает закрепить результат."
    }
  ],
  chatPreview: {
    title: process.env.NEXT_PUBLIC_CHAT_PREVIEW_TITLE ?? "💬 Как проходит старт",
    messages: [
      { sender: "user", text: "Хочу подтянуть тело и убрать усталость, но не понимаю, с чего начать." },
      { sender: "bot", text: "Отлично, начнём с короткой диагностики. Сколько тренировок сейчас в неделю и как со сном?" },
      { sender: "user", text: "Тренировок почти нет, сон 6 часов, к вечеру нет сил." },
      { sender: "bot", text: "Поняла. Елена соберёт для тебя мягкий старт: нагрузка, питание и восстановление без жёстких ограничений." }
    ]
  },
  flow: {
    title: process.env.NEXT_PUBLIC_FLOW_TITLE ?? "Схема работы: диагностика → план → сопровождение",
    description:
      process.env.NEXT_PUBLIC_FLOW_DESCRIPTION ??
      "Ты точно понимаешь, что делать каждый день, и не остаёшься один на один с вопросами.",
    steps:
      (process.env.NEXT_PUBLIC_FLOW_STEPS?.split("\n").filter(Boolean) ?? [
        "Диагностика: фиксируем цель, привычки, ограничения и стартовые показатели.",
        "План: получаешь персональную стратегию тренировок, активности, питания и восстановления.",
        "Сопровождение: Елена отслеживает прогресс, даёт обратную связь и вносит корректировки."
      ]) as string[],
    ctaLabel: process.env.NEXT_PUBLIC_FLOW_CTA_LABEL ?? "Записаться на персональную работу",
    hint: process.env.NEXT_PUBLIC_FLOW_HINT ?? "Можно начать через бот или сразу выбрать слот на странице записи."
  },
  closingNote:
    process.env.NEXT_PUBLIC_CLOSING_NOTE ??
    "Основной канал — Telegram. Также можно написать Елене напрямую или перейти в Instagram как дополнительный канал связи.",
  telegramLink: process.env.NEXT_PUBLIC_TELEGRAM_LINK ?? "https://t.me/EFITNES_BOT"
};

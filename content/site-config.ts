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
      "Фитнес-диагностика для женщин с Еленой: разбор текущего состояния, персональный план тренировок, питания и восстановления без перегруза."
  },
  hero: {
    eyebrow: process.env.NEXT_PUBLIC_HERO_EYEBROW ?? "Женский фитнес · персональная работа",
    headline: process.env.NEXT_PUBLIC_HERO_HEADLINE ?? "Верни энергию и форму без перегруза",
    subheadline:
      process.env.NEXT_PUBLIC_HERO_SUBHEADLINE ??
      "Я не даю универсальные программы. Сначала разбираю твою ситуацию, а потом собираю план под тебя — с учётом тела, режима, уровня подготовки и цели.",
    ctaLabel: process.env.NEXT_PUBLIC_HERO_CTA_LABEL ?? "Пройти диагностику в Telegram",
    note:
      process.env.NEXT_PUBLIC_HERO_NOTE ??
      "Напиши в бот: ответишь на несколько стартовых вопросов, а после я лично посмотрю ответы и подскажу, с чего тебе лучше начать."
  },
  features: [
    {
      icon: "🧪",
      title: "Фитнес-диагностика",
      description: "Я разберу, что у тебя сейчас происходит: нагрузку, питание, сон, восстановление и ограничения — чтобы понять, где именно теряется результат."
    },
    {
      icon: "📝",
      title: "Индивидуальный план",
      description: "Соберу тебе понятный план тренировок, активности, питания и восстановления — без хаоса, перегруза и жёстких ограничений."
    },
    {
      icon: "🤝",
      title: "Сопровождение Елены",
      description: "Я веду тебя лично: отслеживаю прогресс, корректирую план и поддерживаю в сложные недели, чтобы результат не сорвался."
    }
  ],
  chatPreview: {
    title: process.env.NEXT_PUBLIC_CHAT_PREVIEW_TITLE ?? "💬 Как начинается работа",
    messages: [
      { sender: "user", text: "Хочу подтянуть тело и вернуть энергию, но не понимаю, с чего начать." },
      { sender: "bot", text: "Начнём с короткой диагностики. Я задам несколько вопросов про режим, тренировки, питание и самочувствие." },
      { sender: "user", text: "Тренировок почти нет, сон 6 часов, к вечеру совсем нет сил." },
      { sender: "bot", text: "Поняла. Елена посмотрит ответы и подскажет мягкий старт: нагрузку, питание и восстановление без перегруза." }
    ]
  },
  flow: {
    title: process.env.NEXT_PUBLIC_FLOW_TITLE ?? "Как мы идём к результату",
    description:
      process.env.NEXT_PUBLIC_FLOW_DESCRIPTION ??
      "Ты не остаёшься одна с вопросами. Я веду тебя по шагам: от диагностики к понятному плану и стабильному результату.",
    steps:
      (process.env.NEXT_PUBLIC_FLOW_STEPS?.split("\n").filter(Boolean) ?? [
        "Диагностика: фиксируем цель, привычки, ограничения, режим и стартовые показатели.",
        "План: собираю персональную стратегию тренировок, активности, питания и восстановления.",
        "Сопровождение: отслеживаю прогресс, даю обратную связь и вношу корректировки по твоей ситуации."
      ]) as string[],
    ctaLabel: process.env.NEXT_PUBLIC_FLOW_CTA_LABEL ?? "Пройти диагностику",
    hint: process.env.NEXT_PUBLIC_FLOW_HINT ?? "Можно начать через бот: диагностика займёт несколько минут, а дальше я подскажу следующий шаг."
  },
  closingNote:
    process.env.NEXT_PUBLIC_CLOSING_NOTE ??
    "Основной канал связи — Telegram. Через бот можно пройти диагностику, а дальше я лично подскажу подходящий формат работы.",
  telegramLink: process.env.NEXT_PUBLIC_TELEGRAM_LINK ?? "https://t.me/EFITNES_BOT"
};

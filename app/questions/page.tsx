import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { fitnessFaqCategories } from "../../content/fitness-faq";
import { siteConfig } from "../../content/site-config";
import { CTAButton } from "../components/CTAButton";
import { LegalFooter } from "../components/LegalFooter";
import { QuestionCategory, QuestionsAccordion } from "./QuestionsAccordion";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const createTelegramLinkWithText = (baseLink: string, text: string) => {
  try {
    const url = new URL(baseLink);
    url.searchParams.set("text", text);
    return url.toString();
  } catch (error) {
    const separator = baseLink.includes("?") ? "&" : "?";
    return `${baseLink}${separator}text=${encodeURIComponent(text)}`;
  }
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();

const createUniqueSlug = (base: string, used: Set<string>) => {
  let candidate = base || "item";
  let counter = 1;

  while (used.has(candidate)) {
    candidate = `${base || "item"}-${counter}`;
    counter += 1;
  }

  used.add(candidate);
  return candidate;
};

const categories: QuestionCategory[] = (() => {
  const usedCategoryAnchors = new Set<string>();
  const usedQuestionAnchors = new Set<string>();

  return fitnessFaqCategories.map((category) => ({
    name: category.name,
    anchor: createUniqueSlug(`category-${slugify(category.name)}`, usedCategoryAnchors),
    entries: category.entries.map((entry) => ({
      ...entry,
      anchor: createUniqueSlug(
        `${slugify(category.name) || "category"}-${slugify(entry.question) || "question"}`,
        usedQuestionAnchors
      )
    }))
  }));
})();

export const metadata: Metadata = {
  title: "Вопросы к EFITNES — Елена Ксорос",
  description:
    "Частые вопросы по программе EFITNES: старт, похудение, тренировки, питание, восстановление, диагностика и персональная работа с Еленой Ксорос.",
  alternates: {
    canonical: "/questions"
  },
  keywords: [
    "EFITNES",
    "Елена Ксорос",
    "фитнес FAQ",
    "похудение",
    "тренировки",
    "питание",
    "восстановление",
    "диагностика"
  ],
  openGraph: {
    title: "Вопросы к EFITNES — Елена Ксорос",
    description:
      "Раздел вопросов EFITNES: Елена Ксорос, фитнес-тренер, объясняет старт, безопасный прогресс и персональное сопровождение.",
    url: "/questions",
    images: [
      {
        url: "/photo.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Елена Ксорос, фитнес-тренер"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Вопросы к EFITNES — Елена Ксорос, фитнес-тренер",
    description:
      "FAQ по EFITNES: старт, питание, тренировки, восстановление и формат работы с Еленой.",
    images: [
      {
        url: "/photo.png",
        alt: "Елена Ксорос, фитнес-тренер"
      }
    ]
  }
};

export default function QuestionsPage() {
  const defaultTelegramMessage =
    "Здравствуйте! Хочу начать с EFITNES. Подскажите, какой формат сопровождения мне подойдёт?";
  const heroTelegramLink = createTelegramLinkWithText(
    siteConfig.telegramLink,
    defaultTelegramMessage
  );
  const heroCtaLabel = siteConfig.hero.ctaLabel?.trim() || "Написать Елене";
  const snippetText =
    "EFITNES — система персонального фитнес-сопровождения Елены Ксорос. Здесь собраны вопросы, с которых удобно начать диалог и подобрать рабочий план под твою цель.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.entries.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer
        }
      }))
    )
  };

  return (
    <main className={`${inter.className} min-h-screen overflow-hidden bg-background text-neutral-100`}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-14 sm:gap-14 sm:px-6 lg:px-8">
        <CTAButton href="/" variant="secondary" newTab={false} analyticsEvent="click_questions_back" className="w-full justify-center px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] sm:w-auto sm:justify-start">
          Назад
        </CTAButton>

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Вопросы по EFITNES
          </h1>
          <p className="mt-3 text-base text-neutral-300 sm:text-lg">
            Категории вопросов по старту, снижению веса, тренировкам, питанию и восстановлению — чтобы быстро понять, с чего начать.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-neutral-400 sm:text-sm">
            EFITNES · Елена Ксорос · фитнес-сопровождение · диагностика · поддержка
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">{snippetText}</p>

          <div className="mt-6 rounded-3xl border border-outline/70 bg-surface/85 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-400 sm:text-xs">Навигация по категориям</div>
            <nav className="mt-3 grid gap-2 text-sm text-neutral-200 sm:grid-cols-2">
              {categories.map((category) => (
                <a key={category.name} href={`#${category.anchor}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-medium transition hover:border-accent/45 hover:bg-white/10">
                  {category.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-neutral-300 sm:grid-cols-2 sm:gap-5 sm:text-base">
            {fitnessFaqCategories.map(({ name, description }) => (
              <div key={name} className="rounded-2xl border border-outline/70 bg-surface/85 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
                <div className="text-base font-semibold text-white sm:text-lg">{name}</div>
                <p className="mt-2 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <QuestionsAccordion categories={categories} />

        <div className="pb-14 text-center text-sm text-neutral-300 sm:text-base">
          <p className="mx-auto max-w-2xl leading-relaxed text-neutral-300">
            Если хочешь разобрать цель глубже, напиши Елене Ксорос в Telegram — она поможет собрать персональный маршрут по тренировкам, питанию и восстановлению.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4">
            <CTAButton href={heroTelegramLink} variant="glow" className="px-8 py-3.5 text-lg shadow-[0_22px_70px_rgba(125,84,25,0.22)]">
              {heroCtaLabel}
            </CTAButton>
          </div>
        </div>
      </div>
      <LegalFooter />
    </main>
  );
}

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
      "Раздел вопросов EFITNES: как начать, как безопасно прогрессировать и как проходит персональное сопровождение с Еленой Ксорос.",
    url: "/questions",
    images: [
      {
        url: "/kcopoc.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Елена Ксорос"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Вопросы к EFITNES — Елена Ксорос",
    description:
      "FAQ по EFITNES: старт, питание, тренировки, восстановление и формат работы с Еленой.",
    images: [
      {
        url: "/kcopoc.jpeg",
        alt: "Елена Ксорос"
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
    <main className={`${inter.className} relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fdf6e8] via-[#f8e6c9] to-[#f3d9aa] text-neutral-900`}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-14 sm:gap-14 sm:px-10 lg:px-12">
        <CTAButton href="/" variant="secondary" newTab={false} analyticsEvent="click_questions_back" className="w-full justify-center px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] border-[#c59a58]/20 bg-[#fff8eb] text-neutral-900 hover:bg-[#fbe9c7] shadow-none hover:shadow-none sm:w-auto sm:justify-start">
          Назад
        </CTAButton>

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            Вопросы по EFITNES
          </h1>
          <p className="mt-3 text-base text-neutral-600 sm:text-lg">
            Категории вопросов по старту, снижению веса, тренировкам, питанию и восстановлению — чтобы быстро понять, с чего начать.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500 sm:text-sm">
            EFITNES · Елена Ксорос · фитнес-сопровождение · диагностика · безопасность
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">{snippetText}</p>

          <div className="mt-6 rounded-3xl border border-[#d9b16f]/35 bg-white/60 p-5 shadow-[0_18px_46px_rgba(125,84,25,0.08)]">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:text-xs">Навигация по категориям</div>
            <nav className="mt-3 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
              {categories.map((category) => (
                <a key={category.name} href={`#${category.anchor}`} className="rounded-2xl border border-transparent bg-white/70 px-4 py-2 font-medium transition hover:border-[#c59a58]/35 hover:bg-[#fff0d6]">
                  {category.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-neutral-600 sm:grid-cols-2 sm:gap-5 sm:text-base">
            {fitnessFaqCategories.map(({ name, description }) => (
              <div key={name} className="rounded-2xl border border-[#d9b16f]/35 bg-white/60 p-4 shadow-[0_10px_24px_rgba(125,84,25,0.08)]">
                <div className="text-base font-semibold text-neutral-900 sm:text-lg">{name}</div>
                <p className="mt-2 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <QuestionsAccordion categories={categories} />

        <div className="pb-14 text-center text-sm text-neutral-600 sm:text-base">
          <p className="mx-auto max-w-2xl leading-relaxed text-neutral-600">
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

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
    <main className={`${inter.className} relative min-h-screen overflow-hidden bg-[#0f1115] text-neutral-100`}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-[6px] rounded-[26px] border border-[#3ddc73]/20 shadow-[0_0_16px_rgba(61,220,115,0.16),inset_0_0_14px_rgba(15,169,88,0.10)]" />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#3ddc73]/35 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#3ddc73]/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#59f08d]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#24c763]/35 to-transparent" />
      </div>
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
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#f8fafc] sm:text-4xl">
            Вопросы по EFITNES
          </h1>
          <p className="mt-3 text-base text-[#cbd5e1] sm:text-lg">
            Категории вопросов по старту, снижению веса, тренировкам, питанию и восстановлению — чтобы быстро понять, с чего начать.
          </p>
          <div className="mx-auto mt-4 max-w-sm overflow-hidden rounded-2xl border border-[#2f3745] bg-[#171b22] shadow-[0_14px_40px_rgba(0,0,0,0.2)] sm:mx-0">
            <Image
              src="/efit.jpg"
              alt="EFITNES"
              width={1200}
              height={675}
              className="h-full w-full object-cover"
              sizes="(min-width: 640px) 24rem, 100vw"
            />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-[#94a3b8] sm:text-sm">
            EFITNES · Елена Ксорос · фитнес-сопровождение · диагностика · поддержка
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#cbd5e1] sm:text-base">{snippetText}</p>

        </div>

        <QuestionsAccordion categories={categories} />

        <div className="pb-14 text-center text-sm text-[#cbd5e1] sm:text-base">
          <p className="mx-auto max-w-2xl leading-relaxed text-[#cbd5e1]">
            Если хочешь разобрать цель глубже, напиши Елене Ксорос в Telegram — она поможет собрать персональный маршрут по тренировкам, питанию и восстановлению.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4">
            <CTAButton href={heroTelegramLink} variant="glow" className="px-8 py-3.5 text-lg shadow-[0_22px_70px_rgba(125,84,25,0.22)]">
              {heroCtaLabel}
            </CTAButton>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <LegalFooter />
      </div>
    </main>
  );
}

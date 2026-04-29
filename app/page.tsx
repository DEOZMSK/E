import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CTAButton } from "./components/CTAButton";
import { LegalFooter } from "./components/LegalFooter";
import { siteConfig } from "../content/site-config";

const elenaTelegramLink = "https://t.me/Al0PBEDA";
const instagramLink = "https://www.instagram.com/soroskanele/";

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [
      {
        url: "/photo.png",
        width: 1200,
        height: 630,
        alt: "Елена Ксорос, фитнес-тренер EFITNES"
      }
    ]
  }
};

export default function HomePage() {
  const { hero, features, flow, telegramLink } = siteConfig;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-neutral-100">
      <section className="relative mx-auto grid min-h-[calc(100vh-40px)] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-[-18%] right-[-8%] h-96 w-96 rounded-full bg-[#ff9f5a]/20 blur-3xl" />
        </div>

        <div className="relative z-10 rounded-[2rem] border border-outline/70 bg-surface/85 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffb36b]">{hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.55rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href={telegramLink} variant="glow">
              {hero.ctaLabel}
            </CTAButton>
            <CTAButton href="/book" variant="secondary" newTab={false}>
              Записаться к Елене
            </CTAButton>
            <CTAButton href={elenaTelegramLink} variant="secondary">
              Написать Елене
            </CTAButton>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-400">
            <Link href="/questions" className="text-[#ffb36b] no-underline hover:text-white">
              Частые вопросы
            </Link>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-[#ffb36b] no-underline hover:text-white">
              Instagram*
            </a>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-neutral-400">{hero.note}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-[#ff7a59]/20 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <Image
              src="/photo.png"
              alt="Елена Ксорос, фитнес-тренер EFITNES"
              priority
              width={960}
              height={1440}
              sizes="(min-width: 1024px) 520px, 92vw"
              className="h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-10 sm:px-6 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-3xl border border-outline/70 bg-surface/85 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <p className="text-3xl">{feature.icon}</p>
            <h2 className="mt-3 text-xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 leading-relaxed text-neutral-300">{feature.description}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="rounded-[2rem] border border-outline/70 bg-surface/85 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <h2 className="text-2xl font-semibold text-white">{flow.title}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-neutral-300">{flow.description}</p>
          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {(flow.steps ?? []).map((step, idx) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {idx + 1}
                </span>
                <span className="text-sm leading-relaxed text-neutral-300">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAButton href={telegramLink} variant="glow">
              {flow.ctaLabel}
            </CTAButton>
            <Link className="text-sm text-[#ffb36b] no-underline hover:text-white" href="/questions">
              Посмотреть FAQ
            </Link>
          </div>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}

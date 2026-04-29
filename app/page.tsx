import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CTAButton } from "./components/CTAButton";
import { LegalFooter } from "./components/LegalFooter";
import { siteConfig } from "../content/site-config";

const elenaTelegramLink = "https://t.me/Al0PBEDA";
const instagramLink = "https://www.instagram.com/soroskanele/";

const featureImages = ["/2.png", "/3.png", "/1.png"] as const;

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
      <section className="relative mx-auto min-h-[100svh] overflow-hidden max-w-6xl px-0 pt-0 sm:min-h-[92vh] sm:px-6 sm:pt-14 lg:grid lg:min-h-[calc(100vh-40px)] lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-10 lg:px-4 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-[-18%] right-[-8%] h-96 w-96 rounded-full bg-[#ff9f5a]/20 blur-3xl" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[clamp(640px,96svh,860px)] overflow-hidden lg:hidden">
          <Image
            src="/photo.png"
            alt="Елена Ксорос, фитнес-тренер EFITNES"
            priority
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/42 to-[#090911]/95" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#090911]" />
        </div>

        <div className="relative z-10 mt-auto overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-black/20 via-black/35 to-black/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:mt-0 sm:border-outline/70 sm:bg-surface/80 sm:p-9">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffb36b]">{hero.eyebrow}</p>
            <h1 className="hero-gradient-title mt-4 text-[2.45rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.55rem]">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">{hero.subheadline}</p>

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
        </div>

        <div className="relative hidden justify-center md:flex">
          <div className="relative w-[min(88vw,520px)] max-w-[520px]">
            <Image
              src="/photo.png"
              alt="Елена Ксорос, фитнес-тренер EFITNES"
              priority
              width={960}
              height={1440}
              sizes="(min-width: 1280px) 520px, (min-width: 768px) 460px, (min-width: 640px) 420px, 88vw"
              className="w-full origin-top scale-[0.97] transform-gpu rounded-[36px] object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-[8vh] grid max-w-6xl gap-4 px-4 pb-10 sm:mt-0 sm:px-6 md:grid-cols-3">
        {features.map((feature, idx) => (
          <article
            key={feature.title}
            className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#141423]/95 via-[#10101c]/93 to-[#090914]/95 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="relative h-44 w-full overflow-hidden sm:h-48">
              <Image src={featureImages[idx] ?? "/2.png"} alt={feature.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-center opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-[#0b0b15]/35 to-[#0b0b15]/88" />
            </div>
            <div className="relative z-10 p-6 pt-4">
              <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-3 leading-relaxed text-neutral-300">{feature.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-outline/70 bg-surface/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="pointer-events-none relative mb-5 h-36 w-full overflow-hidden rounded-[1.5rem] border border-white/10 sm:mb-6 sm:h-44">
            <Image src="/stat.png" alt="Статистика прогресса" fill sizes="(min-width: 768px) 70vw, 100vw" className="object-cover object-center opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090911]/68 via-[#090911]/34 to-[#090911]/78" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,179,107,0.2),transparent_55%)]" />
          </div>

          <h2 className="relative z-10 text-2xl font-semibold text-white">{flow.title}</h2>
          <p className="relative z-10 mt-3 max-w-3xl leading-relaxed text-neutral-300">{flow.description}</p>
          <ol className="relative z-10 mt-6 grid gap-3 md:grid-cols-3">
            {(flow.steps ?? []).map((step, idx) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {idx + 1}
                </span>
                <span className="text-sm leading-relaxed text-neutral-300">{step}</span>
              </li>
            ))}
          </ol>

          <div className="relative z-10 mt-8 flex flex-col gap-3">
            <CTAButton href={telegramLink} variant="glow" className="w-full sm:w-fit">
              {flow.ctaLabel}
            </CTAButton>
            <div className="flex gap-2 sm:max-w-[420px]">
              <CTAButton href={elenaTelegramLink} variant="secondary" className="flex-1 rounded-2xl border-white/15 bg-white/5 px-5 py-3 text-sm shadow-none hover:bg-white/10">
                Написать в Telegram
              </CTAButton>
              <Link
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-[#ffb36b] no-underline transition hover:bg-white/10 hover:text-white"
                href="/questions"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}

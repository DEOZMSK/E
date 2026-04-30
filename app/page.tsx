import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CTAButton } from "./components/CTAButton";
import { LegalFooter } from "./components/LegalFooter";
import { siteConfig } from "../content/site-config";

const elenaTelegramLink = "https://t.me/Al0PBEDA";
const instagramLink = "https://www.instagram.com/soroskanele/";
const trainersLink = "https://efitnes.site/trainers";

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
      <section className="relative mx-auto overflow-hidden max-w-6xl px-0 pt-0 sm:px-6 sm:pt-8 lg:grid lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:gap-8 lg:px-4 lg:pb-8 lg:pt-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-[-18%] right-[-8%] h-96 w-96 rounded-full bg-[#ff9f5a]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mt-auto overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:mt-0 sm:border-outline/70 sm:p-9 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:bg-surface/70">
          <div className="pointer-events-none absolute inset-0 lg:hidden">
            <Image src="/photo.png" alt="Елена Ксорос, фитнес-тренер EFITNES" priority fill sizes="100vw" className="absolute inset-0 z-0 object-cover object-[52%_12%] brightness-50" />
            <div className="absolute inset-0 z-10 bg-black/35" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(255,174,120,0.22),transparent_48%)]" />
          </div>

          <div className="relative z-20 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffb36b]">{hero.eyebrow}</p>
            <h1 className="hero-gradient-title mt-4 max-w-3xl text-[2.45rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.55rem]">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">{hero.subheadline}</p>

            <div className="mt-5 flex flex-col gap-2 sm:max-w-[420px] sm:flex-row sm:flex-wrap">
              <Link
                href="/questions"
                className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[#ffb36b] no-underline transition hover:bg-white/10 hover:text-white"
              >
                Новичкам
              </Link>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[#ffb36b] no-underline transition hover:bg-white/10 hover:text-white"
              >
                Instagram
              </a>
              <a
                href={trainersLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[#ffb36b] no-underline transition hover:bg-white/10 hover:text-white"
              >
                Тренерам
              </a>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-300">{hero.note}</p>
          </div>
          <div className="relative hidden overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20 lg:col-span-5 lg:block">
            <Image
              src="/photo.png"
              alt="Елена Ксорос, фитнес-тренер EFITNES"
              priority
              fill
              sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 36vw, 100vw"
              className="absolute inset-0 z-0 object-cover object-[54%_14%] brightness-50"
            />
            <div className="absolute inset-0 z-10 bg-black/35" />
          </div>

        </div>
      </section>

      <section className="relative z-20 mx-auto mt-4 grid max-w-6xl gap-4 px-4 pb-8 sm:mt-6 sm:px-6 md:grid-cols-3 lg:mt-0">
        {features.map((feature, idx) => (
          <article
            key={feature.title}
            className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#141423]/95 via-[#10101c]/93 to-[#090914]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="pointer-events-none absolute inset-0">
              <Image
                src={featureImages[idx] ?? "/2.png"}
                alt={feature.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="absolute inset-0 z-0 object-cover object-center brightness-50"
              />
              <div className="absolute inset-0 z-10 bg-black/35" />
            </div>
            <div className="relative z-20 min-h-[188px]">
              <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-3 leading-relaxed text-neutral-300">{feature.description}</p>
              {idx === 1 && (
                <div className="mt-4">
                  <CTAButton href="/book" variant="secondary" newTab={false} className="rounded-xl px-3 py-1.5 text-xs shadow-none">
                    Записаться к Елене
                  </CTAButton>
                </div>
              )}
              {idx === 2 && (
                <div className="mt-4">
                  <CTAButton href={elenaTelegramLink} variant="secondary" className="px-3 py-1.5 text-xs shadow-none">
                    Написать Елене
                  </CTAButton>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-4 max-w-6xl px-4 pb-10 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-outline/70 bg-surface/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/stat.png"
              alt="Статистика прогресса"
              fill
              sizes="(min-width: 768px) 70vw, 100vw"
              className="absolute inset-0 z-0 object-cover object-center brightness-50"
            />
            <div className="absolute inset-0 z-10 bg-black/35" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,179,107,0.2),transparent_48%)]" />
          </div>

          <h2 className="relative z-20 text-2xl font-semibold text-white">{flow.title}</h2>
          <p className="relative z-20 mt-3 max-w-3xl leading-relaxed text-neutral-300">{flow.description}</p>
          <ol className="relative z-20 mt-6 grid gap-3 md:grid-cols-3">
            {(flow.steps ?? []).map((step, idx) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {idx + 1}
                </span>
                <span className="text-sm leading-relaxed text-neutral-300">{step}</span>
              </li>
            ))}
          </ol>

          <div className="relative z-20 mt-8 flex flex-col gap-3">
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

import type { Metadata } from "next";
import Link from "next/link";

import { CTAButton } from "./components/CTAButton";
import { LegalFooter } from "./components/LegalFooter";
import { siteConfig } from "../content/site-config";

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const { hero, features, flow } = siteConfig;

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 text-neutral-900 sm:px-6">
      <section className="rounded-3xl border border-outline/60 bg-white/80 p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.26em] text-neutral-500">{hero.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">{hero.headline}</h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-600">{hero.subheadline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="https://t.me/EFITNES_BOT" variant="glow">{hero.ctaLabel}</CTAButton>
          <CTAButton href="/book" variant="secondary" newTab={false}>Выбрать слот на /book</CTAButton>
          <CTAButton href="https://t.me/Al0PBEDA" variant="secondary">Написать Елене</CTAButton>
          <CTAButton href="https://instagram.com" variant="secondary">Instagram</CTAButton>
        </div>
        <p className="mt-4 text-sm text-neutral-500">{hero.note}</p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-3xl border border-outline/60 bg-white/80 p-6 shadow-sm">
            <p className="text-3xl">{feature.icon}</p>
            <h2 className="mt-3 text-xl font-semibold">{feature.title}</h2>
            <p className="mt-2 text-neutral-600">{feature.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-outline/60 bg-white/80 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold">{flow.title}</h2>
        <p className="mt-3 text-neutral-600">{flow.description}</p>
        <ol className="mt-6 space-y-3">
          {(flow.steps ?? []).map((step, idx) => (
            <li key={step} className="flex gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">{idx + 1}</span>
              <span className="text-neutral-700">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="https://t.me/EFITNES_BOT" variant="glow">{flow.ctaLabel}</CTAButton>
          <Link className="text-sm text-accent hover:text-accent-hover" href="/questions">Частые вопросы</Link>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}

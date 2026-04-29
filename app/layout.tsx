import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "./components/CookieConsent";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body"
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heading"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://efitnes.ru";
const defaultTitle = "EFITNES — персональное фитнес-сопровождение для женщин";
const defaultDescription =
  "EFITNES — платформа фитнес-диагностики и персонального сопровождения с Еленой: тренировки, питание и восстановление.";
const snippetDescription =
  "EFITNES — сервис, который помогает женщинам пройти путь: диагностика, план и персональная поддержка Елены.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Elena",
      alternateName: "Елена",
      description:
        "Elena — исследователь женского фитнеса и цифровых технологий. Создатель EFITNES — проекта, объединяющего фитнес-экспертизу и цифровые инструменты.",
      jobTitle: "Создатель EFITNES",
      url: `${siteUrl}/`,
      image: `${siteUrl}/kcopoc.jpeg`,
      sameAs: [
        `${siteUrl}/`,
        "https://t.me/Al0PBEDA"
      ]
    },
    {
      "@type": "Brand",
      "@id": `${siteUrl}/#brand`,
      name: "EFITNES",
      alternateName: "Фитнес с Еленой",
      description: defaultDescription,
      url: `${siteUrl}/`,
      founder: { "@id": `${siteUrl}/#person` },
      slogan: "Диагностика, план, сопровождение",
      image: `${siteUrl}/kcopoc.jpeg`,
      sameAs: [
        `${siteUrl}/`,
        "https://t.me/Al0PBEDA"
      ]
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "EFITNES",
      description: defaultDescription,
      url: `${siteUrl}/`,
      founder: { "@id": `${siteUrl}/#person` },
      brand: { "@id": `${siteUrl}/#brand` },
      sameAs: [
        `${siteUrl}/`,
        "https://t.me/Al0PBEDA"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "EFITNES",
      url: `${siteUrl}/`,
      description: defaultDescription,
      inLanguage: "ru",
      publisher: { "@id": `${siteUrl}/#brand` },
      creator: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#homepage`,
      url: `${siteUrl}/`,
      name: defaultTitle,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#brand` },
      description: defaultDescription,
      inLanguage: "ru"
    },
    {
      "@type": "LegalService",
      "@id": `${siteUrl}/#legal-service`,
      name: "Консультации EFITNES",
      description:
        "Самозанятый консультант Елена проводит консультации с использованием AI-сервиса EFITNES и соблюдает требования 152-ФЗ.",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Москва, Россия"
      },
      provider: { "@id": `${siteUrl}/#person` },
      serviceType: [
        "Консультации по женскому фитнесу",
        "AI-анализ прогресса и нагрузки"
      ],
      url: `${siteUrl}/`,
      telephone: "+7-991-979-71-19",
      email: "mailto:art.ksoros@gmail.com",
      sameAs: [
        "https://t.me/Al0PBEDA",
        "https://t.me/EFITNES"
      ]
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s — EFITNES"
  },
  description: defaultDescription,
  applicationName: "EFITNES",
  keywords: [
    "EFITNES",
    "Елена",
    "женский фитнес",
    "AI-фитнес-сопровождение",
    "персональный искусственный интеллект",
    "самоанализ",
    "фитнес-диагностика"
  ],
  authors: [{ name: "Elena", url: siteUrl }],
  creator: "Elena",
  publisher: "Elena",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "EFITNES",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${siteUrl}/kcopoc.jpeg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Фитнес-наставник Елена"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/kcopoc.jpeg`,
        alt: "Фитнес-наставник Елена"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  category: "женский фитнес",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"]
  },
  other: {
    "ai-snippet": snippetDescription
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body className="bg-background">
        <Script id="efitnes-structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}

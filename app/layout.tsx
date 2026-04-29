import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { RouteAwareCookieConsent } from "./components/RouteAwareCookieConsent";
import { RouteAwareLandingHead } from "./components/RouteAwareLandingHead";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-heading"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.efitnes.site";
const defaultTitle = "Елена Ксорос — фитнес-тренер | EFITNES";
const defaultDescription =
  "EFITNES — фитнес-диагностика и персональное сопровождение для женщин: тренировки, питание, восстановление и поддержка Елены Ксорос.";
const snippetDescription =
  "EFITNES — сервис Елены Ксорос для женщин: фитнес-диагностика, индивидуальный план тренировок и питания, сопровождение и контроль прогресса.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Елена Ксорос",
      alternateName: "Elena Ksoros",
      description:
        "Елена Ксорос — фитнес-тренер для женщин и лицо проекта EFITNES.",
      jobTitle: "Фитнес-тренер",
      url: `${siteUrl}/`,
      image: `${siteUrl}/photo.png`,
      sameAs: [
        `${siteUrl}/`,
        "https://t.me/Al0PBEDA",
        "https://www.instagram.com/soroskanele/",
        "https://youtube.com/@elenaksoros2739"
      ]
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "EFITNES",
      description: defaultDescription,
      url: `${siteUrl}/`,
      founder: { "@id": `${siteUrl}/#person` },
      logo: `${siteUrl}/android-chrome-512x512.png`,
      image: `${siteUrl}/photo.png`,
      sameAs: [
        "https://t.me/EFITNES_BOT",
        "https://t.me/Al0PBEDA",
        "https://www.instagram.com/soroskanele/",
        "https://youtube.com/@elenaksoros2739"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "EFITNES",
      url: `${siteUrl}/`,
      description: defaultDescription,
      inLanguage: "ru",
      publisher: { "@id": `${siteUrl}/#organization` }
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Фитнес-диагностика и персональное сопровождение EFITNES",
      description:
        "Фитнес-диагностика, индивидуальный план тренировок, рекомендации по питанию и сопровождение прогресса для женщин.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: ["Москва", "Балашиха", "Бишкек", "онлайн"],
      serviceType: [
        "Женский фитнес",
        "Персональные тренировки",
        "План питания",
        "Фитнес-диагностика"
      ],
      audience: {
        "@type": "PeopleAudience",
        suggestedGender: "female"
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${siteUrl}/book`
      }
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
    "Елена Ксорос",
    "Елена Ксорос фитнес тренер",
    "EFITNES",
    "фитнес-тренер Москва",
    "фитнес-тренер Балашиха",
    "фитнес-тренер Бишкек",
    "фитнес-тренер онлайн",
    "женский фитнес",
    "персональный тренер для женщин",
    "фитнес-диагностика",
    "питание и тренировки"
  ],
  authors: [{ name: "Елена Ксорос", url: siteUrl }],
  creator: "Елена Ксорос",
  publisher: "EFITNES",
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
        url: `${siteUrl}/photo.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Елена Ксорос, фитнес-тренер EFITNES"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/photo.png`,
        alt: "Елена Ксорос, фитнес-тренер EFITNES"
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
  category: "fitness",
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
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="bg-background">
        <RouteAwareLandingHead id="efitnes-structured-data" payload={JSON.stringify(structuredData)} />
        <RouteAwareCookieConsent />
        {children}
      </body>
    </html>
  );
}

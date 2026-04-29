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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const defaultTitle = "EFITNES — персональное фитнес-сопровождение для женщин";
const defaultDescription =
  "EFITNES — платформа фитнес-диагностики и персонального сопровождения: тренировки, питание, восстановление и поддержка Елены.";
const snippetDescription =
  "EFITNES — сервис для женщин: диагностика, индивидуальный план тренировок и питания, сопровождение и контроль прогресса.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Елена",
      alternateName: "Elena",
      description:
        "Персональный фитнес-наставник и автор программы EFITNES для женщин.",
      jobTitle: "Фитнес-коуч",
      url: `${siteUrl}/`,
      image: `${siteUrl}/kcopoc.jpeg`,
      sameAs: [`${siteUrl}/`, "https://t.me/Al0PBEDA"]
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "EFITNES",
      description: defaultDescription,
      url: `${siteUrl}/`,
      founder: { "@id": `${siteUrl}/#person` },
      logo: `${siteUrl}/android-chrome-512x512.png`,
      image: `${siteUrl}/kcopoc.jpeg`,
      sameAs: ["https://t.me/EFITNES", "https://t.me/Al0PBEDA"]
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
      name: "Персональное фитнес-сопровождение EFITNES",
      description:
        "Диагностика, индивидуальный фитнес-план, рекомендации по питанию и сопровождение прогресса.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "RU",
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
  applicationName: "EFITNES Fitness",
  keywords: [
    "EFITNES",
    "женский фитнес",
    "персональный фитнес-коуч",
    "фитнес сопровождение онлайн",
    "питание и тренировки",
    "фитнес для женщин",
    "диагностика тела"
  ],
  authors: [{ name: "Елена", url: siteUrl }],
  creator: "Елена",
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
        url: `${siteUrl}/kcopoc.jpeg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "EFITNES — фитнес-сопровождение с Еленой"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    creator: "@EFITNES",
    images: [
      {
        url: `${siteUrl}/kcopoc.jpeg`,
        alt: "EFITNES — фитнес-сопровождение с Еленой"
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

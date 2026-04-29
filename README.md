# EFITNES — персональное фитнес-сопровождение

Next.js (App Router) + Tailwind CSS. Лендинг EFITNES про персональную фитнес-диагностику, тренировки, питание и сопровождение для женщин.

## Что внутри проекта
- SEO-настройка бренда EFITNES: `metadata`, Open Graph, Twitter и JSON-LD в `app/layout.tsx`.
- Маршруты лендинга, страницы записи и юридические страницы.
- Интеграция заявок и механика онлайн-записи через Google Sheets/Google Calendar (логика не менялась).

## Структура
- `app/page.tsx` — главная страница EFITNES.
- `app/book/page.tsx` — запись на консультацию/сопровождение.
- `app/questions/page.tsx` — подборка вопросов и сценариев.
- `app/privacy/page.tsx` — политика конфиденциальности.
- `app/layout.tsx` — глобальные метаданные, OG/Twitter, structured data.
- `app/sitemap.ts` и `app/robots.ts` — генерация sitemap и robots.
- `content/site-config.ts` — тексты и параметры для рендера контента.

## Запуск локально
```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения
Скопируйте `env.example` в `.env.local` и заполните значения.

Ключевые переменные:
- `NEXT_PUBLIC_SITE_URL` — домен проекта. Заполняется после покупки домена или получения постоянного Vercel URL.
- `NEXT_PUBLIC_TELEGRAM_LINK` — ссылка на Telegram-канал/аккаунт.
- `NEXT_PUBLIC_LEAD_WEBHOOK` — endpoint формы заявки.
- `NEXT_PUBLIC_AUTHOR_*` — данные автора/эксперта в интерфейсе.

Служебные переменные для записи:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_SHEETS_ID`
- `GOOGLE_CALENDAR_ID`
- `BOOKING_TZ`

> Важно: механизм работы с Google Calendar и Google Sheets в этом обновлении не изменялся.

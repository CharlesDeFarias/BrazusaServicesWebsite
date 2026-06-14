# Nurse Aloane — Landing Site

A bilingual (English / Brazilian Portuguese) landing page for **Nurse Aloane**, a
Certified Nurse Injector serving the Greater Boston area. WhatsApp is the primary
call-to-action. This is a presentation skeleton — content is original placeholder
copy meant to be reviewed and customized.

## Tech stack

- **Vite + React + TypeScript** — fast, modern, easy to extend
- **Tailwind CSS** — utility styling; the whole theme is driven by a small palette
- No backend. The contact form composes a WhatsApp message and opens the chat.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into /dist
npm run preview  # preview the production build locally
```

> Requires Node.js 18+.

## Where to customize things

| What | File |
| --- | --- |
| **WhatsApp number**, Instagram, location, email | `src/data/site.ts` |
| **All text** (English + Portuguese) | `src/i18n/translations.ts` |
| **Colors & fonts** (re-theme the whole site) | `tailwind.config.js` |
| **Aloane's photo** | `src/components/Hero.tsx` (replace the "Photo of Aloane" placeholder) |
| Section order | `src/App.tsx` |

### ⚠️ Before going live

1. Set the real `whatsappNumber` in `src/data/site.ts` (international format, digits
   only — e.g. a US number is `1` + area code + number).
2. Replace the placeholder testimonials with real, consented reviews.
3. Replace the hero photo placeholder with a real image.
4. Have Aloane review the medical/treatment copy and the disclaimer in the footer.

## Project structure

```
src/
├── App.tsx                 # page composition
├── main.tsx                # entry point + LanguageProvider
├── index.css               # Tailwind layers, buttons, grain texture, reveal anim
├── data/site.ts            # contact config + WhatsApp link helper
├── i18n/
│   ├── translations.ts     # EN + PT-BR copy (single source of text)
│   └── LanguageContext.tsx # language state, persistence, browser detection
├── hooks/useInView.ts      # scroll-reveal IntersectionObserver hook
└── components/             # Header, Hero, About, Services, WhyChoose,
                            # Testimonials, Contact, Footer, WhatsAppButton, ...
```

## Language behavior

- Defaults to Portuguese for `pt-*` browsers, otherwise English.
- The EN / PT toggle (header) persists the choice in `localStorage`.
- To change wording, edit **both** `en` and `pt` in `translations.ts`.

## Notes

- Built as a starting point to present and customize — not final content.
- Eventually intended to live under the Brazusa Services umbrella.

# HiLink — company website

Bilingual (English / Vietnamese) website for HiLink Vietnam: property and asset
management, workspace leasing, business and concierge services, industrial &
logistics. Workspace locations, prices and booking live on the HiLink
Workspaces site, **hilink.vn** — this site links there rather than copying them.

## Running

```bash
npm install
npm run dev      # development server
npm run build    # production build into dist/
```

Forms are front-end only for now: they show a confirmation but do not send
anything. Connect them to HiLink's inbox or CRM before launch.

## How it is organised

| Path | What |
|---|---|
| `src/app/routes.tsx` | Route table. Every URL starts with `/en` or `/vi`; paths without a language redirect to `/en/…` |
| `src/app/lib/i18n.tsx` | `useLang()` — current language, `l(path)` for links, page title/description |
| `src/app/data/site.ts` | Contact details, company info, social links, partners, service lines, workspace solutions |
| `src/app/data/aboutCopy.ts`, `careersCopy.ts`, `legalCopy.ts`, `locations.ts`, `posts.ts` | Generated from the approved copy of hilink.vn — regenerate rather than hand-edit |
| `src/styles/theme.css` | Colours and the type scale (same steps as hilink.vn) |
| `public/photos/` | HiLink photographs |

Text on a page is declared in both languages next to the page:

```tsx
const T = { en: { title: 'Contact' }, vi: { title: 'Liên hệ' } };
const { lang } = useLang();
const t = T[lang];
```

## Rules

- Only HiLink's own photographs. No stock images.
- Headings take their size from the type scale (`--step-h1` … `--step-h4`); do not set heading sizes per page.
- Facts (addresses, phone, partners, prices) come from HiLink — never placeholder numbers or names.

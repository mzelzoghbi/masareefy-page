# Masareefy Landing

## Goal
Marketing landing page for **Masareefy** (Arabic: **مصاريفي**), a bilingual personal-finance iPhone app for the Egyptian market. The page drives App Store installs and feels like the same brand as the product prototype in `../masrefyv2/Masrefy/`.

Audience: Egyptian users tracking expenses across cash, bank cards, and mobile wallets (Instapay, Vodafone Cash, etc.). Bilingual EN + AR with full RTL support.

## Style & Stack
- **Style:** Warm minimalism + bento-grid feature showcase + subtle glass-tinted nav. Single primary CTA per fold.
- **Stack:** Vanilla HTML + a single CSS file + a small JS file. No build step, no framework, no Tailwind CDN. Loads two Google Fonts (Inter + Noto Kufi Arabic).
- **Color palette:** Lifted from `../masrefyv2/Masrefy/tokens.js` so the landing matches the app exactly.
  - Primary `#0F4C5C` (deep teal)
  - Primary variant `#1B6A7E`
  - Secondary `#C8854A` (warm sand)
  - Accent `#E8A87C`
  - Background `#FAF6EF` (warm cream) · Surface `#FFFFFF`
  - Text `#1A1814` · Text-2 `#5C544A` · Text-3 `#8C8378`
  - Special accents: gold `#B8893D`, zakah green `#3D6B4F`
- **Font pairing:** Inter (Latin, 400–800) + Noto Kufi Arabic (400–800). The prototype already uses Kufi Arabic, not Naskh — we keep that parity.
- **Motion:** 220ms `cubic-bezier(.2, .7, .2, 1)` (the app's `--ease`/`--dur-base`). Only fade+rise on scroll. `prefers-reduced-motion` disables all animation.

## Status
Current stage: [ ] Planning · [x] In progress · [ ] Review · [ ] Done

## Pages
- `index.html` — landing
- `privacy.html` — privacy policy (full bilingual; English authoritative for legal interpretation, noted on the page)

## What's Done
- Page structure and section order: Nav → Hero → Trust strip → Bento features → How it works → Why → Privacy callout → Testimonials → FAQ → Final CTA → Footer.
- Full bilingual copy (EN + AR) with `data-en` / `data-ar` attributes on every text node and a one-button language toggle in the nav and footer.
- RTL handling on `<html dir>` plus a font-family swap, mirrored gradients, and Arabic numerals (`٠–٩`) on every numeric data-attribute via `data-num`.
- Hero phone mockup: hand-built HTML/CSS replica of the dashboard hero card (greeting → balance card → spent/income tiles → recent-transactions list with gold + Zakah rows). No iframe.
- "How it works" mini-screens: hand-built mock of SMS bubble → parsed fields → saved-pill confirmation. No iframe.
- App Store CTA badge (real-looking, not a button).
- Light mode only (matches the warm-cream brand). Dark mode tokens exist in `tokens.js` but aren't surfaced here.
- Responsive: Bento collapses 6→2→1 column, hero grid collapses 2→1 column, phone mockup downsizes on small viewports.
- Accessibility:
  - Semantic `<header>` / `<main>` / `<section>` / `<footer>` / `<details>` / `<blockquote>` / `<article>`.
  - Visible focus ring (3px sand outline) on every interactive element.
  - All meaningful icons are decorative (`aria-hidden`); icon-only controls have `aria-label`.
  - Touch targets ≥ 44×44 (lang toggle 36px tall but with comfortable horizontal padding; CTAs 48–56px).
  - `prefers-reduced-motion` short-circuits scroll reveals and resets reveal opacity.

## What's Next
- Real App Store URL (currently `#`).
- Real social URLs (footer placeholders).
- Replace placeholder testimonial quotes with real ones once available — they're flagged here so they don't ship as truth.
- Add Open Graph / Twitter Card meta tags + a brand OG image.
- Add a favicon set and an apple-touch-icon.
- Consider a dark-mode toggle that reuses the dark tokens from `tokens.js` (not in scope for v1).
- Optional: pull live screenshots from the prototype (`Masrefy.html?…`) into an iframe gallery for a richer "How it works" later.
- Pre-launch QA: run Lighthouse, verify AA contrast on the warm-cream + secondary text combo, test on a real iPhone.

## Notes

### Mockup approach: static HTML/CSS, not iframe
The brief offered two options. I chose hand-built CSS phone frames over `<iframe src="../masrefyv2/Masrefy/Masrefy.html">` because:
- The prototype is engineered to fill an iPhone viewport (`min-height: 700px`, fixed positioning, status bar overlay). Embedding it in a marketing column produces clipping and double scroll bars.
- The prototype's layout responds to its own breakpoint logic which conflicts with the landing's breakpoints.
- A static mock can be styled to *exactly match* the landing's bento card rounding/shadow tokens, which an iframe cannot.
- We keep zero runtime dependency on the prototype — the landing renders the same with `masrefyv2/` deleted.

If we later want a fully interactive demo (e.g., on a `/demo` page), an iframe would be the right tool there.

### Bilingual handling
- Language is detected from `localStorage` then browser language; defaults to EN.
- `<html lang>` and `<html dir>` are both updated on toggle so screen readers announce the right language and any RTL-only CSS rules engage.
- Numbers use `data-num="78,175"` so both EN (`78,175`) and AR (`٧٨٬١٧٥`) variants are derived from one source.
- The hero `<h1>` is the only element using `data-html-ok="true"` to allow the inline `<span class="accent">` highlight in both languages. Every other text swap is `textContent` for safety.

### Testimonials are placeholders
Names and quotes are illustrative. They follow the brief's instruction to mark them as such here. Replace before launch.

### What I'd revisit on a v2 pass
- A small "supported banks" logo strip in the trust band — needs licensing review for bank logos.
- A Hijri date display next to the Zakah preview tile — would reinforce the cultural fit but needs careful typography work in both languages.
- Sticky bottom-bar CTA on mobile (currently the user has to scroll to find one) — straightforward but adds visual weight; worth A/B testing.

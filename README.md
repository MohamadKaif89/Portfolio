# Kaif — portfolio

A single-page portfolio built to the [Web Developer Portfolio Website Template](https://www.figma.com/community/file/1308624569713896610/web-developer-portfolio-website-template). The page is a dark canvas (`#292F36`) with mint accents (`#12F7D6`), Ubuntu headlines, and IBM Plex Mono for interface text.

Open it locally with `npm run dev`. The home page runs through a short loader, then: navigation, hero, about, skills, works, experience, notes, contact, and footer.

## Features

- Sticky navigation that hides on scroll down and returns on scroll up
- Scroll spy for Home, About, Skills, Works, Blog, and Contact
- Scroll progress bar
- Hero typing effect for role titles
- Section reveals, skill hover, and project-card tilt
- Search across projects and notes
- Contact form (Web3Forms) and a WhatsApp click-to-chat button
- Dark and light themes, saved in the browser
- Custom cursor on fine pointers only
- `prefers-reduced-motion` support via Framer Motion and a CSS fallback
- Blog notes, privacy, and terms routes

## Tech stack

- React 19 and Vite
- TypeScript
- Tailwind CSS, with tokens in `tailwind.config.ts` and CSS variables in `src/styles/globals.css`
- Framer Motion
- Lucide icons, plus inline GitHub and LinkedIn marks
- React Router
- ESLint and Prettier

## Folder structure

```text
src/
  assets/                 extra images, icons, or fonts
  components/
    effects/              preloader, cursor, scroll progress, contour background
    icons/
    layout/               Navbar, Footer, Layout
    sections/             Hero, About, Skills, Projects, Experience, Blog, Contact
    seo/
    ui/                   Button, Card, Badge, SectionTitle, Container, WhatsAppButton
  data/portfolio.ts       all visible copy
  hooks/                  useScrollSpy, useMediaQuery, useTheme
  lib/                    motion variants, contact helpers, class helper
  pages/                  home, note, legal, not found
  styles/globals.css
  types/
public/
  resume.pdf              linked from Download CV
  favicon.svg
  og.svg
  robots.txt
  sitemap.xml
```

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck and production build
npm run preview  # serve the build
npm run lint
npm run format
```

Copy `.env.example` to `.env` and fill in the contact keys. See [Contact setup](#contact-setup). The notes subscribe dialog still uses `VITE_FORMSPREE_ID` when that value is set, and opens the visitor’s email app when it is blank.

## Edit the content

Change text, links, projects, posts, and experience in `src/data/portfolio.ts` only. Components read that module.

When you change `seo.title` or `seo.description`, update the same strings in `index.html` so the first HTML response matches. Update `public/sitemap.xml` if you add or rename a note slug.

Replace `public/resume.pdf` with your own PDF. The hero button downloads `/resume.pdf`.

To use a real project screenshot, set `image` on that project to a path in `public`, for example `"/projects/northwind.webp"`. Leave `image` as `""` to keep the drawn preview.

## Deploy

The project is a static Vite build.

- **Vercel:** import the repo. `vercel.json` rewrites every path to `index.html` so `/blog/...` works on refresh.
- **Netlify:** `netlify.toml` already sets the build command, the publish folder (`dist`), and the same SPA redirect.

Set `VITE_WEB3FORMS_KEY` and `VITE_WHATSAPP_NUMBER` in the host’s environment, then redeploy. After the site has a real domain, replace `https://example.com` in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `VITE_WEB3FORMS_KEY` | Yes, for the contact form | Web3Forms access key. Without it the form shows an error and a direct email link. |
| `VITE_WHATSAPP_NUMBER` | Yes, for WhatsApp | Digits only, with country code. Example: `919XXXXXXXXX`. |
| `VITE_FORMSPREE_ID` | No | Formspree id for the notes subscribe dialog. Blank falls back to `mailto:`. |
| `VITE_SITE_URL` | No | Documented public URL. The HTML tags are edited by hand so the first response stays correct without a build-time plugin. |

## Contact setup

The contact form posts to [Web3Forms](https://web3forms.com). WhatsApp uses a `wa.me` link. Both values are read from environment variables. They are not written into the source.

### Get a Web3Forms access key

1. Open [web3forms.com](https://web3forms.com).
2. Enter the email address that should receive messages.
3. Web3Forms emails you the access key. Check the spam folder if it does not arrive.
4. Copy that key. Do not commit it.

### Local variables

1. Copy `.env.example` to `.env` in the project root.
2. Set `VITE_WEB3FORMS_KEY` to the access key.
3. Set `VITE_WHATSAPP_NUMBER` to your number: digits only, country code included, no `+`, spaces, or dashes. Example: `919876543210`.
4. Stop the dev server and start it again. Vite only reads `.env` at startup. Names must start with `VITE_` or the browser will not see them.

The pre-filled WhatsApp text, labels, and success or error copy live in `src/data/portfolio.ts` under `contact`.

### Vercel or Netlify

Add the same two variables in the host’s project settings (Vercel: Settings → Environment Variables. Netlify: Site configuration → Environment variables). Use the production environment. Redeploy after saving. A new deploy is required because Vite bakes `VITE_` values into the build.

### Troubleshooting

- Restart `npm run dev` after every `.env` edit.
- Variable names must start with `VITE_`.
- The first Web3Forms email sometimes lands in spam.
- If the form shows the error line, the key is missing, the request failed, or Web3Forms rejected it. The “Email me directly” link uses `portfolio.email`.
- If the WhatsApp button is missing, `VITE_WHATSAPP_NUMBER` is empty or not 8–15 digits.

## How to customize

### Colors

Dark values are the Figma frame. Light values live beside them.

1. Edit the RGB channels in `src/styles/globals.css` under `:root[data-theme="dark"]` and `:root[data-theme="light"]`.
2. Keep the same names in `tailwind.config.ts` (`canvas`, `deep`, `ink`, `accent`, `accent-ink`, and the rest). Utilities such as `bg-canvas` and `text-accent-ink` read those variables, so components do not hard-code hex values.
3. Skill circle colors (`js`, `reactbrand`, `node`, `tailwind`) are fixed brand colors in the Tailwind config. Service chips use `chip`, `chip-ink`, and `chip-muted`.

Accent text on the light theme is a darker mint so it stays readable on the light canvas. Mint fills stay `#12F7D6`.

### Fonts

Headlines use Ubuntu (`font-display`). Interface text uses IBM Plex Mono (`font-sans`). Both are loaded in `index.html` with `display=swap`. Sizes (`text-hero`, `text-title`, `text-lead`, `text-nav`, `text-body`, `text-small`, `text-watermark`, `text-stat`) are in `tailwind.config.ts`.

### Sections

Home order is set in `src/pages/HomePage.tsx`. Each section has an `id` that matches `navLinks` in `portfolio.ts` (`home`, `about`, `skills`, `works`, `blog`, `contact`). Experience sits between works and notes and uses the same title, plate, and contour treatment. Remove a section from `HomePage` and its link from `navLinks` together.

### Animations

Shared variants are in `src/lib/animations.ts`. `Reveal` fades and rises a block once it enters the viewport. The hero staggers its profile card. Skill circles scale on hover. Project cards tilt a few degrees on a mouse or trackpad.

`MotionConfig reducedMotion="user"` in `App.tsx` follows the operating system. `globals.css` also shortens CSS animations when `prefers-reduced-motion: reduce` is set. The custom cursor and the typing caret turn off in that case. The preloader is skipped entirely.

Motion uses `transform` and `opacity`. The contour background is one repeating SVG, not a canvas loop.

## Credits

Visual layout follows the [Web Developer Portfolio Website Template](https://www.figma.com/community/file/1308624569713896610/web-developer-portfolio-website-template) on Figma. That credit is documented here only and is not shown in the site footer.

Sample copy in `src/data/portfolio.ts` is placeholder text for this build. Replace it before you publish the site as your own.

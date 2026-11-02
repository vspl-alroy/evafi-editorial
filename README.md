# Debt News USA (EvaFi news site)

Static news-style site built with [Gatsby](https://www.gatsbyjs.com/) 5 and React. Articles are Markdown files in `content/`; every file becomes a page.
Deployed to GitHub Pages: https://relintex.github.io/evafi-editorial

## For the Marketing team: adding an article

Short version: add `content/<file-name>.md` (lowercase letters, digits, hyphens) and its images in `content/images/` through a GitHub pull request.
The file name is the web address: `how-to-get-out-of-debt.md` → `/how-to-get-out-of-debt/`.

**Full step-by-step guide: [docs/adding-an-article.md](docs/adding-an-article.md)**, and how to write the `.md` itself (boxes, captions, header lines): [docs/writing-the-article-md.md](docs/writing-the-article-md.md), with the writing rules, image tips, the quiz button and a pre-publish checklist.
Use `content/state-residents-what-to-know-about-20k-debt.md` as a template.

## For developers

### Requirements and commands

Node 24 (see `.nvmrc`).

```bash
npm ci               # install
npm run develop      # dev server at http://localhost:8000 (restart it after adding content files)
npm run typecheck    # tsc --noEmit
npm run build        # production build into public/
npm run serve        # serve the build at http://localhost:9000
npm run clean        # clear Gatsby's cache (fixes odd "cannot find resources" errors)
npx tsx src/markdown.ts   # self-check of the Markdown parser, prints "ok"
```

### How it works

- `content/*.md` are parsed by `src/markdown.ts` into page data. `gatsby-node.ts` reads them and creates the pages. There is no GraphQL and no remark.
- Images live in `content/images/`. The build (`processImages` in `gatsby-node.ts`) copies everything in `content/` except `.md` files to `static/content/` (generated, git-ignored), so `images/x.png` is served at `/content/images/x.png`. For every png/jpg it also writes WebP variants (`x-480.webp`, `x-800.webp`, `x-1200.webp`, never upscaled) with `sharp`, and the templates emit `srcSet`/`sizes` so phones download the small ones. `og:image` uses the 1200px variant. New or changed images are picked up at the next build or dev-server restart.
- Language: English only, at `/<slug>/`. UI strings are in `src/i18n.ts`. See [docs/i18n.md](docs/i18n.md) to add a language.
- `{State}` placeholders are replaced in the browser from `?state=Texas` (`useStateName` in `src/components/shared.tsx`). The static HTML contains the fallback ("your state").
- The **last line** of an article, if it is a link, becomes the main quiz button and is removed from the text. A link alone in its own block (blank lines around it) elsewhere becomes a button with its own text.

```
content/                 articles (.md), content/images/
src/markdown.ts          Markdown subset parser (+ self-check at the bottom)
src/content.ts           page data types
src/i18n.ts              locales and UI strings
src/components/shared.tsx  header, footer, cards, <head> tags
src/components/pages/    footer pages (about.tsx, privacy.tsx, …): text per language, routes from footerLinks in i18n.ts
src/templates/           article.tsx, index.tsx (home), page.tsx (footer pages), not-found.tsx (404)
src/styles/              SCSS partials (_tokens, _base, _article)
gatsby-node.ts           creates pages, copies images, writes sitemap.xml/robots.txt
.github/workflows/       deploy.yml (GitHub Pages on push to main)
docs/                    guides
```

### Environment variables (build time)

| Variable | Purpose | Default |
|---|---|---|
| `GATSBY_SITE_URL` | Real domain, used for canonical, `hreflang`, Open Graph and sitemap URLs | `https://relintex.github.io/evafi-editorial` |
| `GATSBY_INDEXABLE` | Set to `1` at launch. Otherwise every page is `noindex` and `robots.txt` disallows all | off |

### Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
Work on a branch and open a pull request. There is no CI check on pull requests yet.

### Before launch

See `docs/` and the open items: real footer pages (Privacy, Terms, …), legal review of the copy, real dates, custom domain + `GATSBY_SITE_URL` + `GATSBY_INDEXABLE=1`, a unique hero image per article, native review of the Spanish UI strings in `src/i18n.ts`.


## .env.development  
```bash 
--Add this to .env.development
GATSBY_PRIVACY_FORM_URL=http://localhost:8787/

only testing purpose 
```
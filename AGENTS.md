# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, etc.) working in this repo. Humans: see [README.md](README.md).

## What this is
Gatsby 5 + React 18 + TypeScript static site. Articles are Markdown in `content/`, turned into pages by `gatsby-node.ts` using the small parser in `src/markdown.ts`. Hosted on GitHub Pages (`main` auto-deploys). Styles are SCSS in `src/styles/`.

## Commands
```bash
npm ci
npm run develop        # localhost:8000; restart after adding/removing content files
npm run typecheck
npm run build          # always run before saying a change works
npx tsx src/markdown.ts  # parser self-check: prints "ok", console.assert failures are silent-ish, read the output
npm run clean          # if Gatsby reports "Cannot find package gatsby-config" or stale resources
```
There is no test runner. Verify by building and looking at `public/<slug>/index.html`, or screenshot with `google-chrome --headless=new --screenshot` against `python3 -m http.server` in `public/`.

## Architecture rules
- Content format contract is defined in the comment at the top of `src/markdown.ts` and in `docs/adding-an-article.md` (written for Marketing). **If you change what the parser accepts, update both and extend the self-check at the bottom of `src/markdown.ts`.**
- No GraphQL, no remark/MDX, no CMS. Don't add dependencies for what a few lines can do.
- Pages: `gatsby-node.ts` → `createPages` (articles, home `/` and `/es/`, `/404.html`), `onPreBootstrap` (copies `content/` non-md files to `static/content/`), `onPostBuild` (robots.txt, sitemap.xml).
- Languages: `src/i18n.ts` lists locales and all UI strings. A new UI string goes in **every** locale block. Spanish text written by an AI is a draft that needs native review: say so.
- One stylesheet for all pages (`_tokens`, `_base`, `_article`), mobile-first with the `md` mixin (720px). The design is the Figma export: don't invent a new look.
- Footer links, the quiz URL (last line of each article) and dates are content, not code.

## Gotchas learned the hard way
- `<main class="wrap content">` carries both `.wrap` and `.content`. Don't use the `padding:` shorthand in `.content`, it wipes the side padding from `.wrap`. Use `padding-block`.
- Markdown link/button/hero detection works on **blocks separated by blank lines**; a link alone in a block is a button, the file's last line is the main CTA (label = link text).
- `static/content/` and `public/` are generated and git-ignored. Don't commit them.
- `GATSBY_INDEXABLE` is unset on purpose: the dev site must stay `noindex` until launch.
- Gatsby error "EnsureResources was not able to find resources" in dev = restart dev (new content file) or `npm run clean`.

## Working agreements
- Work on a branch, never commit straight to `main`.
- **Do not push, open pull requests or merge unless asked.** Commit locally and say what is ready.
- Do not edit the user's content files (`content/**/*.md`) beyond what was asked, and say what you changed. Their edits may be newer than what you read.
- Don't kill processes broadly (`pkill -f gatsby`); stop only what you started.
- Report honestly: say what you did not test (e.g. real browsers, the deployed site).
- `CHECKLIST.md` is a local, git-excluded notes file. Don't commit it.

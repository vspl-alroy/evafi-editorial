# How to write the article `.md` file

A worked guide based on the article `content/credit-card-minimum-payments.md`, which has since been removed from the site (see git history; the live example is now [`content/state-residents-what-to-know-about-20k-debt.md`](../content/state-residents-what-to-know-about-20k-debt.md)). Open that file next to this guide: every piece below is taken from it.
For publishing (file name, GitHub, images) see [adding-an-article.md](adding-an-article.md). This guide is only about what goes **inside** the file.

## 1. The big picture

An article is plain text. The order of the file is the order of the page, with a few exceptions:

```
# Headline                                  ← required, first line
Kicker: / Byline: / Description: / Tracking: ← optional header lines
![hero image](images/x.jpg)                 ← top photo (+ caption on the next line)
Standfirst paragraph                         ← large text under the headline
::: takeaways ... :::                        ← grey summary box (optional)
## Section 1                                 ← each ## = one numbered "Question n of N" + a contents entry
## Section 2
...
::: check / next / soft / related / method / rail ... :::   ← closing boxes, shown after the last section
```

Rules that never change:

- Blocks are separated by **one blank line**. A "box" (`::: ... :::`) is one block, so keep boxes together without a blank line between their first and last line.
- The `## ` sections are the numbered sections, the contents list ("In this explainer") and the "Question n of N" labels. Four `##` sections = "Question 1 of 4" … "Question 4 of 4".
- Closing boxes (`check`, `next`, `soft`, `related`, `method`, `rail`) can be written anywhere, but they always appear **after the last section**, in the order you wrote them. `rail` appears in the side column on desktop.
- Don't use italics, tables or `###` headings: they show exactly as typed.

## 2. The top of the file

```
# Credit card debt just hit $1.25 trillion. Here's why so few people can pay it down.

Kicker: Explainer · Credit Cards
Byline: 6 min read | Data: Federal Reserve, NY Fed, LendingTree · [Sources](#sources)
Description: On the average $7,886 balance, most of the minimum payment goes to interest. Here's what it really covers, in four quick questions.
Tracking: da101_credit_cards

![A person at a kitchen table reviewing a credit card statement...](images/credit-card-hero.jpg)
The average cardholder now carries a $7,886 balance — at a rate above 22 percent. | Photo illustration

The average cardholder now carries a balance of nearly $7,900 at an interest rate north of 22 percent — ...
```

| Part | What it does |
|---|---|
| `# Headline` | The page headline (and browser tab title). Must be the first line. |
| `Kicker:` | Small red label above the headline. ` · ` between words becomes the grey dot. Optional. |
| `Byline:` | The line under the standfirst. Parts are separated by ` \| `. Use `[Sources](#sources)` to jump to the "How we calculated this" box. Without it the page shows read time, date and author. |
| `Description:` | What Google shows under the title. Without it the first paragraph is used. |
| `Tracking:` | Name sent with analytics events. Keep the same name for an article's whole life. Without it the file name is used. |
| `Date:` | Only used when there is **no** `Byline:`. |
| Hero image | `![alt text](images/file.jpg)` right after the header lines. The alt text describes the picture for people who can't see it. |
| Caption | On the line **right below** an image: `Caption text \| Credit`. The part after ` \| ` is the small grey capital credit. No second line = no caption. |
| Standfirst | The **first normal paragraph** after the hero image becomes the large grey text under the headline. It is not repeated in the body. |

## 3. The grey summary box

```
::: takeaways The short version
- Total U.S. credit card debt reached **$1.252 trillion** in the first quarter of 2026 — up 63 percent since early 2021.
- The average cardholder carries a **$7,886 balance** at a **22.15% APR** on balances that are accruing interest.
:::
```

The text after `takeaways` is the box title. One `- ` per point. Put it before the first `##`.

## 4. Sections

```
## What's the minimum-payment trap?

Normal paragraph. Blank line between paragraphs.

![Alt text](images/credit-card-fuel.jpg)
Rent, groceries, and fuel costs climbed faster than paychecks. | Photo illustration
```

Inside a section you can use:

| You write | You get |
|---|---|
| A normal paragraph | Body text. `**bold**` and `[link text](https://...)` work inside it. |
| `- one` lines | A list of lines (shown with a bullet). Use `::: ways` instead for the styled options list. |
| `1. step` lines | Numbered steps, always shown **at the end** of the section. |
| An image block | A photo with optional caption (see section 2). |
| `[Button text](https://...)` alone in a block | A blue button. |
| `{State}` | The reader's state (`?state=Texas`), "your state" by default. |

### Boxes you can place inside a section

**Big number**

```
::: stat
$146 | of your $224 minimum payment
goes straight to interest this month on the average $7,886 balance — only $79 actually reduces what you owe.
:::
```
Line 1: the number, ` | `, the small caption under it. Line 2: the sentence beside it.

**Card statement illustration**

```
::: statement
Alt: Illustration of the Minimum Payment Warning box on a credit card statement: ...
Balance: $7,886.00
Minimum: $224.42
APR: 22.15%
- Only the minimum payment | **23 years** | **$21,372**
- $302 | 3 years | $10,864<br>(Savings = $10,508)
Caption: **The box on every statement.** Illustration based on the average U.S. card balance ($7,886) and APR (22.15%).
:::
```
`Alt:` is read aloud for screen readers (it should say what the picture says). Each `- ` line is a table row, cells separated by ` | `. `**…**` in a cell highlights it in yellow. `<br>` starts a new line inside a cell. The labels on the statement ("CARD STATEMENT", "Minimum Payment Warning"…) come from the site and can't be edited here.

**Tip**

```
::: tip Worth checking
See what a fixed monthly payment would actually cost you. [Comparing a fixed-rate debt consolidation loan against your current APRs](https://evafi.com/consolidation) takes a couple of minutes.
:::
```
Text after `tip` is the small title; the next line is the text.

**Options list**

```
::: ways
- **Pay down with a budget overhaul.** Redirecting any spare cash flow ...
- **[Fixed-rate debt consolidation loan.](https://evafi.com/consolidation)** Rolls multiple card balances ...
:::
```
Bold text at the start of each line is the option name. Put the link **inside** the bold to make the name a link.

## 5. Closing boxes

Written after the last section (any order you like; they appear in that order).

**30-second check**

```
::: check Try this: the 30-second check
Open your last two statements and compare the total balance.
- Lower | You're making progress. Keep the payment steady.
- ! About the same | Your payments may be mostly covering interest.
- ! Higher | You may be in what's called the minimum payment trap.
If the number isn't moving, [see what a fixed-rate consolidation loan would cost instead →](https://evafi.com/consolidation)
:::
```
First line: intro. `- Title | text`: one small card each; `- !` makes the title red. The line **after** the cards is the link line.

**Next step (dark block)**

```
::: next Next step
See what a fixed-rate consolidation loan would actually cost you
A few minutes of comparing options won't affect your credit score.
[Compare your options](https://evafi.com/consolidation)
:::
```
Lines: headline, optional description, then the link (its text is the button).

**Small paragraphs**

```
::: soft
Already wondering where you stand? EvaFi ... offers a free 2-minute [Debt Consolidation Check](https://evafi.com/consolidation).
:::

::: related
Also on Debt Advice 101: [Personal loan debt hits a record $276 billion](https://...) [Medical debt touches 100 million Americans](https://...)
:::
```
In `related`, put the links one after another, separated by a space; the site adds the dots.

**Sources**

```
::: method How we calculated this
Figures use a $7,886 balance ... Issuer formulas vary.
- [Federal Reserve Board, G.19 Consumer Credit](https://www.federalreserve.gov/releases/g19/current/)
- [Keys and Wang, "Minimum Payments and Debt Paydown in Consumer Credit Cards"](https://...) (2017)
:::
```
First line: the explanation. Each `- ` is a numbered source; text after the link (like the year) stays plain. The `[Sources](#sources)` link in the byline jumps here.

**Side column call-to-action (desktop)**

```
::: rail Next step
Compare fixed-rate debt consolidation offers
[Compare your options →](https://evafi.com/consolidation)
:::
```

## 6. Links and buttons: what to know

- Links must start with `https://` (or `http://`), or with `#` to jump inside the page. Anything else is shown as typed.
- Links to other sites open in a new tab.
- Links inside `tip`, `ways`, `check`, `next`, `soft` and `rail` are tracked as calls to action: the site adds source, session and the visitor's campaign (`utm_…`, `gclid`…) parameters and records the click. You only write the plain address.
- A link alone in a block, outside a box, is a plain blue button. The old style (a link as the **last line of the file**) still works and creates the dark "Next step" block with that text. Don't use both a last-line link and a `next` box: the last-line link is then dropped.

## 7. Starting a new article

1. Copy `content/state-residents-what-to-know-about-20k-debt.md` to `content/<new-name>.md` (lowercase letters, digits, hyphens).
2. Replace the headline, the header lines and the hero image.
3. Rewrite the sections. Delete the boxes you don't need (everything except the headline is optional). Keep the `:::` pairs complete.
4. Update every link, figure and source. The numbers in the example (balances, rates, years) are only that article's.
5. Keep **at least two** `##` sections if you want the contents list and side column to appear.
6. Ask a developer to preview it (`npm run develop`), or check the live page after the merge.

## 8. Checklist before you ask for a merge

- [ ] The first line is `# Headline`, and header lines come right after it, before the image.
- [ ] Every `::: name` has a closing `:::` on its own line.
- [ ] Every image exists in `content/images/` and has alt text.
- [ ] Links all start with `https://` or `#`; the consolidation link is the right one.
- [ ] Figures, sources and dates were approved by Legal / Compliance.
- [ ] No `**`, `[ ]`, `( )`, `:::` or `{State}` text is visible on the live page.

## 9. Troubleshooting

| What you see | Cause |
|---|---|
| `::: tip` or `:::` printed on the page | The box is missing its closing `:::`, or there is text on the same line as `:::` when closing. |
| A box is missing | Wrong name (it must be exactly `takeaways`, `stat`, `statement`, `tip`, `ways`, `check`, `next`, `soft`, `related`, `method` or `rail`). |
| A closing box sits in the middle of the article | It doesn't: closing boxes always move to the end. Check you didn't use `tip`/`ways` where you meant `check`/`next`. |
| The standfirst is not the paragraph you expected | It is the first **plain paragraph** of the intro (boxes and lists are skipped). Put the paragraph you want right after the hero image. |
| Image shows no caption | The caption must be on the line directly under the image, with no blank line between. |
| Date doesn't show | Dates only appear when there is no `Byline:`. Put the date inside the `Byline:` if you want it. |
| `**bold**` visible | A space after the opening `**` or before the closing `**`, or an odd number of `**`. |
| Contents list missing | Only one `##` section. |

For anything about how it works under the hood: `src/markdown.ts` (the parser, with a self-check at the bottom) and `src/templates/article.tsx`.

# How to add an article (for the Marketing team)

You don't need to code. An article is one text file (Markdown) plus its images, added on GitHub.
Once it is merged, the site rebuilds itself and the article is live at `https://<site>/<file-name>/`, usually within a couple of minutes.

Example: a file called `how-to-get-out-of-debt.md` becomes `https://<site>/how-to-get-out-of-debt/`.

## 1. Pick the file name (this is the web address)

- Only **lowercase letters, digits and hyphens**, then `.md`: `how-to-get-out-of-debt.md`.
- No spaces, accents, underscores or capitals. Use words people would search for.
- The name is permanent once published: changing it changes the URL.

## 2. Write the article

Copy `content/sample-article.md` as a starting point. The rules:

| You want | You write | Notes |
|---|---|---|
| **Headline** | `# Your headline` | First line of the file. Required. |
| **Date** (recommended) | `Date: October 6, 2026` | On its own line under the headline. Without it the page shows a default date. |
| **Top (hero) image** | `![Describe the image](images/my-photo.png)` | Right under the headline/date. Without it a default image is used. |
| **Intro** | Normal paragraphs | Everything before the first `##`. A blank line between paragraphs. |
| **Section heading** | `## Section title` | Each `##` starts a new section. |
| **Bullet list** | `- first point` | One `- ` per line. |
| **Numbered steps** | `1. first step` | Always shown at the **end** of its section, after the other text. |
| **Image in the text** | `![Describe the image](images/other.png)` | On its own line, with blank lines around it. |
| **Button in the middle** | `[Check if you qualify](https://example.com/quiz)` | A link **alone on its line, with a blank line above and below**, becomes a button with that text. |
| **Reader's state** | `{State}` | Replaced by the reader's state, e.g. "Is {State}'s trap catching up to you?". See "State" below. |
| **Main quiz button** | `[Take EvaFi's Free Quiz](https://evafi.relintex.dev/onboarding)` | **Last line of the file**, alone. This is the big button at the end of the article. |

Things that do **not** work (they show up exactly as typed): bold, italics, headings smaller than `##`, tables, and links inside a sentence.
Write a link as a button on its own line instead.

### The main quiz button

- The **very last line** of the file must be the quiz link. Without it the article has **no button at the end**.
- The text between `[ ]` is the button label, so you can change the wording per article (for example "See Where You Stand").
- The link must start with `https://`.

### State (`{State}`)

Put `{State}` where the state name should appear, for example in the headline. By default it shows "your state".
If the traffic link includes `?state=Texas` (for example `https://<site>/how-to-get-out-of-debt/?state=Texas`) it shows "Texas".
Test it by adding `?state=Texas` to the article address.

## 3. Add the images

1. Save the image with a simple name: lowercase letters, digits and hyphens, e.g. `divorce-story.png` (no spaces).
2. **Make it small first.** Aim for under **500 KB** and about **1200 pixels wide** (JPG for photos). Large images make the page slow on phones.
3. Upload it to the `content/images/` folder on GitHub (see step 4).
4. In the article refer to it as `images/divorce-story.png`.

Images can be reused: several articles can point to the same file.
Always write alt text between the `[ ]`: it is read aloud for visitors who can't see the image and helps search engines.

## 4. Publish it on GitHub (no tools needed)

1. Open the repository: https://github.com/vspl-alroy/vspl-alroy.github.io
2. Open the `content` folder. Click **Add file → Create new file**.
3. In the name box type `how-to-get-out-of-debt.md` (the file name from step 1) and paste your article.
   Use the **Preview** tab to check the text. It's plain, not the site's design.
4. For images: open `content/images`, click **Add file → Upload files**, drop them in.
5. At the bottom choose **Create a new branch for this commit and start a pull request**, then **Propose changes** and **Create pull request**.
6. Ask a developer to review and merge it. After the merge, the site updates by itself (about 2 minutes).

## 5. Check it before you tell anyone

After it is live, open the address and check:

- [ ] The headline, date and top image look right (also on your phone).
- [ ] No `{State}`, `[...]` or `![...]` text is visible on the page.
- [ ] Every image appears.
- [ ] The buttons go to the right quiz link.
- [ ] The numbered steps appear where you expect (at the end of their section).
- [ ] The article shows on the home page and in the "Todays Financial News" cards of other articles.

If something is off, edit the file on GitHub (pencil icon) and propose the change again.

## Spanish version

Put the translated file in `content/es/` with **exactly the same file name**: `content/es/how-to-get-out-of-debt.md` appears at `/es/how-to-get-out-of-debt/`.
Keep the same structure: same `##` sections, same images, `{State}`, and the quiz link on the last line.
Use the same file name or the English and Spanish pages will not be linked by the language switcher.
A Spanish article only appears in the Spanish site if its file exists. See also [i18n.md](i18n.md).

## Before the site launches

The site is still in development: it tells search engines **not** to index it. Articles added now will not appear in Google until a developer switches that on at launch.
Compliance note: articles contain savings figures, testimonials and credit-score statements. Get them approved by Legal before publishing.

## Troubleshooting

| Problem | Likely cause |
|---|---|
| The article is not on the site | File is not in `content/` (or `content/es/`), name has capitals/spaces/accents, or the pull request is not merged yet. |
| No button at the end | The last line is not a link, or it doesn't start with `https://`. |
| A picture is missing | The image file wasn't uploaded to `content/images/`, or the name in the article doesn't match exactly (including capitals and `.png` vs `.jpg`). |
| Text shows `[words](https://...)` | A link inside a sentence isn't supported. Put it on its own line as a button. |
| Page shows the default date | Add a `Date:` line under the headline. |

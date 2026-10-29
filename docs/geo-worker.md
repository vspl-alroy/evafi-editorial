# State lookup (`{State}` in headlines)

The page asks a small Cloudflare Worker for the visitor's state. The Worker never stores anything; it only reads the location Cloudflare already attaches to each request. The code is `workers/geo.js`.

## Set it up (once, needs the company Cloudflare account)
1. Cloudflare dashboard → Workers & Pages → Create → Worker → name it `evafi-geo`. Paste the contents of `workers/geo.js` and deploy.
2. Worker → Settings → Variables: add `ALLOWED_ORIGINS` = the site origins, comma separated, e.g. `https://debtadvice101.com,https://relintex.github.io`. Only these sites can read the answer.
3. Copy the Worker URL (`https://evafi-geo.<account>.workers.dev`).
4. GitHub repo → Settings → Secrets and variables → Actions → Variables: add `GATSBY_GEO_URL` = that URL. Re-run the deploy workflow.

## Check it
`curl -H "Origin: https://debtadvice101.com" <worker url>` returns `{"country_code":"US","region":"Texas"}` for a US visitor.
Without `GATSBY_GEO_URL` the site falls back to the free ipapi.co service, which is rate limited.

## Notes
- The state is looked up in the visitor's browser, so the headline first shows "your state", then swaps (and `?state=` is only used when the lookup fails or the visitor is outside the US).
- The free Workers plan allows 100,000 requests a day, one per visitor per session.
- Add the lookup to the privacy policy: the visitor's IP address is processed by Cloudflare to find their state.

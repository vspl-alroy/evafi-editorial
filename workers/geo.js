// Cloudflare Worker: tells the page which US state the visitor is in, from Cloudflare's own IP geolocation.
// Same JSON shape as ipapi.co ({ country_code, region }), so src/components/shared.tsx works with either.
// Deploy: see docs/geo-worker.md. Set ALLOWED_ORIGINS (comma separated) in the Worker's variables.
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? ""
    const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map(s => s.trim()).filter(Boolean)
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "private, no-store", // depends on the visitor's IP: never share a cached answer
      Vary: "Origin",
      ...(allowed.includes(origin) && { "Access-Control-Allow-Origin": origin }),
    }
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers })
    const cf = request.cf ?? {}
    return new Response(JSON.stringify({ country_code: cf.country ?? "", region: cf.region ?? "" }), { headers })
  },
}

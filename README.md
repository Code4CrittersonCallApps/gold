# Gold · Sheehan Homestead

Lead-magnet Gold access app: farm games (links to Critters Play), how to hold the animals, 25 kid facts, and a referral prize wheel (Stead Spin prizes).

- Live: https://code4crittersoncallapps.github.io/gold/
- Personalized gift: `?for=Lisa` → “Gifted to Miss Lisa, thank you for your review”
- Share link is always the generic Gold URL (no `?for=`)
- Claim CTA → https://www.sheehanhomestead.com/services

Nothing on this page sends email.

## Android / offline (Play-ready)
- `manifest.webmanifest` + `assets/icons/` make it installable; `sw.js` (scope `/gold/`) caches the app shell for offline.
- HTML is network-first, so edits show up on next open. CSS/JS keep their `?v=` cache-busting: when you bump a `?v=` in `index.html`, bump it in `SHELL_URLS` in `sw.js` and bump `VERSION` (e.g. `gold-v2`).
- Privacy policy: `privacy/` (linked in the Play listing).
- Play package `com.sheehanhomestead.gold` verifies through https://code4crittersoncallapps.github.io/.well-known/assetlinks.json (repo `code4crittersoncallapps.github.io`).

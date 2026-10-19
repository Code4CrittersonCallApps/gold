/* Gold service worker. Scope: /gold/
   Bump VERSION whenever the shell list changes. Old caches are deleted on activate.
   HTML: network-first (so updates show up right away), cached copy only when offline.
   CSS/JS/images: stale-while-revalidate, keyed by full URL, so ?v= cache-busting still works. */
var VERSION = "gold-v1";
var SHELL = VERSION + "-shell";
var RUNTIME = VERSION + "-runtime";
var SHELL_URLS = [
  "./",
  "css/styles.css?v=5",
  "js/gold-config.js?v=4",
  "manifest.webmanifest",
  "assets/pyrenees-logo.png",
  "assets/gold-card.jpg",
  "assets/gold-card-hub.jpg",
  "assets/sophie.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "privacy/"
];
var SCOPE = self.registration.scope; /* https://.../gold/ */

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) { return c.addAll(SHELL_URLS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k.indexOf("gold-") === 0 && k.indexOf(VERSION + "-") !== 0; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isFont(url) { return url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"; }

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var inScope = req.url.indexOf(SCOPE) === 0;
  if (!inScope && !isFont(url)) return; /* leave other sites and other project pages alone */

  if (req.mode === "navigate" || (req.headers.get("accept") || "").indexOf("text/html") !== -1) {
    e.respondWith(
      fetch(req).then(function (res) {
        if (res && res.ok) { var copy = res.clone(); caches.open(RUNTIME).then(function (c) { c.put(req, copy); }); }
        return res;
      }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match(new URL("./", SCOPE).href);
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && (res.ok || res.type === "opaque")) { var copy = res.clone(); caches.open(RUNTIME).then(function (c) { c.put(req, copy); }); }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});

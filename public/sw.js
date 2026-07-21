// Brazusa Ops service worker. Scoped to /ops (registered with scope '/ops').
// Goal: make the app installable + load the shell instantly, WITHOUT caching
// authenticated data pages (payroll, codes, etc.) on the device.
const CACHE = 'brazusa-ops-v2'

self.addEventListener('install', (e) => {
  // Precache only the public login shell so there is an offline fallback.
  e.waitUntil(caches.open(CACHE).then((c) => c.add('/ops/login')).catch(() => {}))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== location.origin) return

  // Static assets, icons, manifest: cache-first (non-sensitive, versioned by Next).
  const isStatic =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname === '/ops/manifest.webmanifest' ||
    /^\/ops\/(icon|apple)[\w-]*\.(png|ico)$/.test(url.pathname)
  if (isStatic) {
    e.respondWith(
      caches.match(req).then((hit) =>
        hit ||
        fetch(req).then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(req, copy))
          return res
        })
      )
    )
    return
  }

  // Page navigations: always go to network (fresh, authenticated). If offline,
  // fall back to the login shell instead of a cached data page.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('/ops/login')))
  }
})

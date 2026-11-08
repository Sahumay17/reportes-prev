// Service worker: la app completa (incluido el motor de PDF) funciona sin internet una vez abierta con conexión.
const CACHE="rp-33c5f558",CORE=["./","index.html","app.js","app.css","logo.png","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);self.skipWaiting()})()));
self.addEventListener("activate",e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith("rp-")&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res&&res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return res})
  .catch(()=>e.request.mode==="navigate"?caches.match("index.html"):Response.error())))});

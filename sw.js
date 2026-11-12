// Todo funciona sin conexión: la primera visita lo guarda; luego primero la red (por si hay versión nueva) y si no, lo guardado.
const V='cdmx-v1';
const SHELL=['./','index.html','setlist.json','manifest.webmanifest','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.open(V).then(async c=>{try{const n=await fetch(r);if(n.ok)c.put(r,n.clone());return n}catch(err){const h=await c.match(r,{ignoreSearch:true});if(h)return h;throw err}}))});

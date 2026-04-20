const CACHE='orion-v6';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  const{request}=e;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  const isHtml=request.headers.get('accept')?.includes('text/html');
  if(isHtml){
    e.respondWith(
      fetch(request).then(res=>{
        const clone=res.clone();
        caches.open(CACHE).then(c=>c.put(request,clone));
        return res;
      }).catch(()=>caches.match(request).then(r=>r||caches.match('./index.html')))
    );
  }else{
    e.respondWith(
      caches.match(request).then(cached=>cached||fetch(request).then(res=>{
        if(res.ok&&url.origin===location.origin){
          const clone=res.clone();
          caches.open(CACHE).then(c=>c.put(request,clone));
        }
        return res;
      }).catch(()=>new Response('',{status:408})))
    );
  }
});

// Notifications
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(cs=>{
    if(cs.length>0)return cs[0].focus();
    return clients.openWindow('./');
  }));
});

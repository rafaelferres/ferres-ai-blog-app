if(!self.define){let e,a={};const s=(s,n)=>(s=new URL(s+".js",n).href,a[s]||new Promise(a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()}).then(()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn't register its module`);return e}));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(a[i])return;let c={};const r=e=>s(e,i),o={module:{uri:i},exports:c,require:r};a[i]=Promise.all(n.map(e=>o[e]||r(e))).then(e=>(t(...e),c))}}define(["./workbox-4754cb34"],function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"cdb7f37279e95d76b44d4dfaa697e473"},{url:"/_next/static/aJ-aYs2Z7JajgIwnILv2w/_buildManifest.js",revision:"bb64c95ef925f22f3132c76462a98dd5"},{url:"/_next/static/aJ-aYs2Z7JajgIwnILv2w/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/277-9852fd43da8910cd.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/341.7286141183490970.js",revision:"7286141183490970"},{url:"/_next/static/chunks/346-06a3e8c4fd436993.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/472.a3826d29d6854395.js",revision:"a3826d29d6854395"},{url:"/_next/static/chunks/4bd1b696-8fbd85eb97475ccf.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/667-e2b220a333a11229.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/684-e2b9be76582c5490.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/766-3e1634fde424ccf3.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/775-9390d21767297299.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/79-965602bc5e3a7d49.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/874-bd04036bbdb5bc80.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/_not-found/page-24312b190b745589.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/about/layout-c6d01f7c286c1ad0.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/about/page-2f93b78b2d346046.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/api/cron/reset-weekly-visits/route-5bfa183c5a93cb5f.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/articles/%5Bslug%5D/layout-49ab65070f60929d.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/articles/%5Bslug%5D/loading-2bf751a754179a54.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/articles/%5Bslug%5D/page-a6e0d753a44c1173.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/articles/layout-bb355618dedd59a7.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/articles/loading-33df5a885eb001ec.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/articles/page-83db26f0aac44f0e.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/categories/%5Bslug%5D/layout-62807787ad77788e.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/categories/%5Bslug%5D/loading-c8c020b6303dd756.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/categories/%5Bslug%5D/page-8c5c6d2954ac2d23.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/community/layout-76ba805e0db746fc.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/community/page-34808eee1349e1db.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/cookies/layout-b1398205946e977b.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/cookies/page-6980b04e3fbd525b.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/layout-73691a4b354a7e01.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/loading-78de98583194b92d.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/not-found-f2dbb2bcf533dd75.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/page-261b42171b1a7463.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/privacy/layout-aabfba799ee64954.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/privacy/page-2e2351dd4e0e3b68.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/robots.txt/route-f2639bd1a332891e.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/sitemap.xml/route-c8e22e7bd6dfdd6b.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/terms/layout-4487c7813cacbf03.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/app/terms/page-02a9a4a025bd0b50.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/framework-f593a28cde54158e.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/main-1b77f6d458396fb5.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/main-app-e646e8c2eb112b0a.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/pages/_app-92f2aae776f86b9c.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/pages/_error-b71c16c08451d210.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-9af7f9cf1ff45831.js",revision:"aJ-aYs2Z7JajgIwnILv2w"},{url:"/_next/static/css/4515ecd105ee2a75.css",revision:"4515ecd105ee2a75"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/8d697b304b401681-s.woff2",revision:"cc728f6c0adb04da0dfcb0fc436a8ae5"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/9610d9e46709d722-s.woff2",revision:"7b7c0ef93df188a852344fc272fc096b"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon-192x192.fw.png",revision:"51eb2271140dbc541eafd5225b99dee4"},{url:"/icon-512x512.fw.png",revision:"cb0e455fbcede39dd68d9829baa8b108"},{url:"/icon.svg",revision:"7215ee9c7d9dc229d2921a40e899ec5f"},{url:"/manifest.json",revision:"b1d0977cc5ca510d02c13d8e718bd40e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/og-image.fw.png",revision:"07fd5e42c174e6a62cbbcf0347bfb1b7"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")},new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")},new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(({url:e})=>!(self.origin===e.origin),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")});

// Push Notifications Handler
self.addEventListener('push', function(event) {
  console.log('🔔 Push event recebido:', event);
  
  if (event.data) {
    try {
      const notificationData = event.data.json();
      console.log('📱 Dados da notificação:', notificationData);
      
      // Configurações padrão da notificação
      const options = {
        body: notificationData.body,
        icon: notificationData.icon || '/icon-192x192.fw.png',
        badge: notificationData.badge || '/icon-192x192.fw.png',
        image: notificationData.image,
        tag: notificationData.tag || 'default',
        data: notificationData.data,
        requireInteraction: true,
        actions: [
          {
            action: 'open',
            title: 'Abrir'
          },
          {
            action: 'close',
            title: 'Fechar'
          }
        ]
      };
      
      event.waitUntil(
        self.registration.showNotification(notificationData.title, options)
      );
    } catch (error) {
      console.error('❌ Erro ao processar push notification:', error);
    }
  }
});

// Lidar com cliques na notificação
self.addEventListener('notificationclick', function(event) {
  console.log('👆 Clique na notificação:', event);
  
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data;
  
  if (action === 'close') {
    // Não fazer nada, apenas fechar
    return;
  }
  
  // Ação 'open' ou clique na notificação
  if (data && data.url) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function(clientList) {
        // Verificar se já existe uma janela aberta
        for (const client of clientList) {
          if (client.url === data.url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Se não há janela aberta, abrir uma nova
        if (clients.openWindow) {
          return clients.openWindow(data.url);
        }
      })
    );
  } else {
    // Abrir a página inicial se não há URL específica
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function(clientList) {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Lidar com o fechamento da notificação
self.addEventListener('notificationclose', function(event) {
  console.log('❌ Notificação fechada:', event);
  
  // Opcional: enviar analytics ou logs
  // fetch('/api/analytics/notification-closed', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     tag: event.notification.tag,
  //     timestamp: new Date().toISOString()
  //   })
  // });
});

// Lidar com mudanças na subscription
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('🔄 Subscription mudou:', event);
  
  event.waitUntil(
    // Tentar renovar a subscription
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: null // Será definido pelo cliente
    }).then(function(newSubscription) {
      // Enviar nova subscription para o servidor
      return fetch('/api/push-notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription: newSubscription
        })
      });
    }).catch(function(error) {
      console.error('❌ Erro ao renovar subscription:', error);
    })
  );
});

console.log('✅ Push Service Worker carregado');

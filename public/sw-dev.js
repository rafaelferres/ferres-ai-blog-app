// Service Worker para desenvolvimento
// Apenas funcionalidades essenciais, sem precaching problemático

const CACHE_NAME = 'ferres-dev-cache-v1';

// Instalar service worker
self.addEventListener('install', () => {
  console.log('🔧 Service Worker instalado (desenvolvimento)');
  self.skipWaiting();
});

// Ativar service worker
self.addEventListener('activate', () => {
  console.log('✅ Service Worker ativado (desenvolvimento)');
  self.clients.claim();
});

// Handle push notifications
self.addEventListener('push', event => {
  console.log('📡 Push notification recebida:', event);
  
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('📝 Dados da notificação:', data);
      
      const notificationOptions = {
        body: data.body || 'Nova notificação',
        icon: data.icon || '/icon-192x192.fw.png',
        badge: '/icon-192x192.fw.png',
        data: data,
        requireInteraction: false,
        silent: false,
        tag: data.tag || 'ferres-notification',
        timestamp: Date.now()
      };
      
      event.waitUntil(
        self.registration.showNotification(
          data.title || 'Ferres',
          notificationOptions
        )
      );
    } catch (error) {
      console.error('❌ Erro ao processar push notification:', error);
      
      // Fallback notification
      event.waitUntil(
        self.registration.showNotification(
          'Ferres',
          {
            body: 'Nova notificação disponível',
            icon: '/icon-192x192.fw.png',
            badge: '/icon-192x192.fw.png'
          }
        )
      );
    }
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('🔔 Notification clicked:', event);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      // Verificar se já existe uma janela aberta
      for (const client of clientList) {
        if (client.url.includes(self.location.origin)) {
          client.focus();
          client.navigate(urlToOpen);
          return;
        }
      }
      
      // Abrir nova janela se não existir
      return clients.openWindow(urlToOpen);
    })
  );
});

// Handle fetch events (caching simples)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Ignorar requests problemáticos
  if (url.pathname.includes('app-build-manifest.json')) {
    console.log('🚫 Ignorando app-build-manifest.json');
    return;
  }
  
  // Cache apenas recursos estáticos importantes
  if (url.pathname.includes('/_next/static/') || 
      url.pathname.includes('/icon-') ||
      url.pathname.includes('/manifest.json')) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          }
          
          return fetch(event.request).then(response => {
            // Só fazer cache se a resposta for válida
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => {
            // Ignorar erros de fetch em desenvolvimento
            return new Response('Offline', { status: 503 });
          });
        });
      })
    );
  }
});

console.log('🚀 Service Worker de desenvolvimento carregado'); 
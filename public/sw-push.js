// Service Worker para Push Notifications
console.log("🔧 Service Worker para Push Notifications carregado");

// Event listener para push notifications
self.addEventListener('push', function(event) {
  console.log('📱 Push notification recebida:', event);
  
  if (!event.data) {
    console.log('❌ Push sem dados');
    return;
  }

  let notificationData;
  try {
    notificationData = event.data.json();
    console.log('📋 Dados da notificação:', notificationData);
  } catch (error) {
    console.error('❌ Erro ao parsear dados da push:', error);
    notificationData = {
      title: 'Nova notificação',
      body: event.data.text() || 'Você tem uma nova mensagem!'
    };
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon || '/icon-192x192.fw.png',
    badge: notificationData.badge || '/icon-192x192.fw.png',
    image: notificationData.image,
    data: notificationData.data || {},
    tag: notificationData.tag || 'default',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Ver',
        icon: '/icon-192x192.fw.png'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title || 'Nova notificação', options)
  );
});

// Event listener para cliques na notificação
self.addEventListener('notificationclick', function(event) {
  console.log('👆 Clique na notificação:', event);
  
  event.notification.close();

  if (event.action === 'close') {
    console.log('❌ Usuário fechou a notificação');
    return;
  }

  // Abrir URL se especificada
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Verificar se já há uma aba aberta
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          console.log('🔄 Focando aba existente');
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      
      // Abrir nova aba se não houver uma aberta
      if (clients.openWindow) {
        console.log('🆕 Abrindo nova aba');
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Event listener para push subscription change
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('🔄 Push subscription mudou:', event);
  
  event.waitUntil(
    fetch('/api/push-notifications/vapid-key')
      .then(response => response.json())
      .then(data => {
        return self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: data.publicKey
        });
      })
      .then(subscription => {
        return fetch('/api/push-notifications/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subscription,
            userAgent: navigator.userAgent
          })
        });
      })
      .catch(error => {
        console.error('❌ Erro ao renovar subscription:', error);
      })
  );
});

console.log("✅ Service Worker para Push Notifications pronto"); 
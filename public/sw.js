// Simple Service Worker
console.log('🔧 Service Worker loaded');

// Basic service worker registration
self.addEventListener('install', () => {
  console.log('🔄 Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Basic fetch handler for caching
self.addEventListener('fetch', (event) => {
  // Let requests go through normally
  event.respondWith(fetch(event.request));
});

console.log('✅ Simple Service Worker ready');

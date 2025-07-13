#!/usr/bin/env node

/**
 * Script para gerar VAPID keys para Push Notifications
 * Execute: node scripts/generate-vapid-keys.js
 */

const webpush = require('web-push');

console.log('🔐 Gerando VAPID Keys para Push Notifications...\n');

try {
  const vapidKeys = webpush.generateVAPIDKeys();
  
  console.log('✅ VAPID Keys geradas com sucesso!\n');
  console.log('📋 Adicione essas variáveis ao seu arquivo .env.local:\n');
  console.log('# Push Notifications');
  console.log(`VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
  console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
  console.log('VAPID_SUBJECT=mailto:your-email@example.com');
  console.log('\n# Webhook Security');
  console.log('STRAPI_WEBHOOK_SECRET=your_webhook_secret_here');
  
  console.log('\n⚠️  IMPORTANTE:');
  console.log('- Substitua "your-email@example.com" pelo seu email real');
  console.log('- Gere um secret seguro para o STRAPI_WEBHOOK_SECRET');
  console.log('- Mantenha essas chaves em segurança');
  console.log('- Não commite essas chaves no repositório');
  
  console.log('\n📖 Para mais informações, consulte: PUSH_NOTIFICATIONS_SETUP.md');
  
} catch (error) {
  console.error('❌ Erro ao gerar VAPID keys:', error);
  process.exit(1);
} 
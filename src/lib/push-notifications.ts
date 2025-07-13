import webpush from "web-push";

// Interface para dados da notificação
export interface PushNotificationData {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: {
    url?: string;
    articleId?: string;
    timestamp?: string;
    [key: string]: any;
  };
}

// Interface para subscription
export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// Interface para subscription no banco/storage
export interface StoredSubscription {
  id: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  userAgent?: string;
  createdAt: string;
  lastUsed?: string;
}

// Configurar web-push
function initializeWebPush() {
  const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
  const vapidSubject =
    process.env.VAPID_SUBJECT || "mailto:your-email@example.com";

  if (!vapidPublicKey || !vapidPrivateKey) {
    throw new Error(
      "VAPID keys não estão configuradas. Configure VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY."
    );
  }

  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
}

// Simular um banco de dados simples para subscriptions
// Em produção, você deveria usar um banco de dados real
let subscriptions: StoredSubscription[] = [];

// Função para salvar subscription
export function saveSubscription(
  subscription: PushSubscription,
  userAgent?: string
): StoredSubscription {
  const storedSubscription: StoredSubscription = {
    id: Math.random().toString(36).substr(2, 9),
    endpoint: subscription.endpoint,
    keys: subscription.keys,
    userAgent,
    createdAt: new Date().toISOString(),
  };

  // Remover subscription existente do mesmo endpoint
  subscriptions = subscriptions.filter(
    (sub) => sub.endpoint !== subscription.endpoint
  );

  // Adicionar nova subscription
  subscriptions.push(storedSubscription);

  console.log(`✅ Subscription salva: ${storedSubscription.id}`);
  return storedSubscription;
}

// Função para obter todas as subscriptions
export function getAllSubscriptions(): StoredSubscription[] {
  return subscriptions;
}

// Função para remover subscription
export function removeSubscription(endpoint: string): boolean {
  const initialLength = subscriptions.length;
  subscriptions = subscriptions.filter((sub) => sub.endpoint !== endpoint);

  if (subscriptions.length < initialLength) {
    console.log(`✅ Subscription removida: ${endpoint}`);
    return true;
  }

  return false;
}

// Função para enviar push notification para uma subscription específica
export async function sendNotificationToSubscription(
  subscription: StoredSubscription,
  notificationData: PushNotificationData
): Promise<boolean> {
  try {
    initializeWebPush();

    const payload = JSON.stringify({
      title: notificationData.title,
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      image: notificationData.image,
      tag: notificationData.tag,
      data: notificationData.data,
    });

    const pushSubscription = {
      endpoint: subscription.endpoint,
      keys: subscription.keys,
    };

    await webpush.sendNotification(pushSubscription, payload);

    // Atualizar lastUsed
    subscription.lastUsed = new Date().toISOString();

    console.log(`✅ Notificação enviada para: ${subscription.id}`);
    return true;
  } catch (error) {
    console.error(
      `❌ Erro ao enviar notificação para ${subscription.id}:`,
      error
    );

    // Se o erro for 410 (Gone), remover a subscription
    if (error instanceof Error && error.message.includes("410")) {
      console.log(`🗑️ Removendo subscription inválida: ${subscription.id}`);
      removeSubscription(subscription.endpoint);
    }

    return false;
  }
}

// Função principal para enviar push notification para todos os usuários
export async function sendPushNotification(
  notificationData: PushNotificationData
): Promise<{
  success: boolean;
  totalSubscriptions: number;
  successCount: number;
  failureCount: number;
  errors: string[];
}> {
  const allSubscriptions = getAllSubscriptions();

  if (allSubscriptions.length === 0) {
    console.log("⚠️ Nenhuma subscription encontrada");
    return {
      success: true,
      totalSubscriptions: 0,
      successCount: 0,
      failureCount: 0,
      errors: [],
    };
  }

  console.log(
    `📤 Enviando push notification para ${allSubscriptions.length} subscriptions`
  );

  const results = await Promise.allSettled(
    allSubscriptions.map((subscription) =>
      sendNotificationToSubscription(subscription, notificationData)
    )
  );

  const successCount = results.filter(
    (result) => result.status === "fulfilled" && result.value === true
  ).length;

  const failureCount = results.length - successCount;

  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) =>
      result.status === "rejected" ? result.reason.message : "Erro desconhecido"
    );

  console.log(`📊 Resultados: ${successCount} sucesso, ${failureCount} falhas`);

  return {
    success: successCount > 0,
    totalSubscriptions: allSubscriptions.length,
    successCount,
    failureCount,
    errors,
  };
}

// Função para gerar VAPID keys (usar apenas durante desenvolvimento)
export function generateVapidKeys() {
  const vapidKeys = webpush.generateVAPIDKeys();
  console.log("🔐 VAPID Keys geradas:");
  console.log("VAPID_PUBLIC_KEY:", vapidKeys.publicKey);
  console.log("VAPID_PRIVATE_KEY:", vapidKeys.privateKey);
  return vapidKeys;
}

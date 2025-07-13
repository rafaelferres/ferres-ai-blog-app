// Tipos para as push subscriptions
interface PushSubscriptionData {
  endpoint: string;
  p256dh: string;
  auth: string;
  userAgent?: string;
  subscriptionStatus: "active" | "inactive" | "invalid";
  lastUsed?: string;
  userId?: string;
  preferences?: {
    categories?: string[];
    allArticles?: boolean;
  };
  metadata?: {
    browser?: string;
    os?: string;
    version?: string;
    subscriptionDate?: string;
  };
}

interface StrapiPushSubscription {
  id: number;
  documentId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  userAgent: string | null;
  subscriptionStatus: "active" | "inactive" | "invalid";
  lastUsed: string | null;
  userId: string | null;
  preferences: any;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

class StrapiPushNotificationService {
  private readonly baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  private readonly token = process.env.STRAPI_API_TOKEN;

  private async makeRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Strapi request failed: ${response.status} ${response.statusText}`
      );
    }

    return response;
  }

  // Criar uma nova subscription
  async createSubscription(
    subscription: PushSubscription | any,
    userAgent?: string,
    userId?: string
  ): Promise<StrapiPushSubscription> {
    // Extrair dados da subscription
    let keys: {
      p256dh: ArrayBuffer | string;
      auth: ArrayBuffer | string;
    } | null = null;

    if (subscription.getKey) {
      // Se é um objeto PushSubscription real (no frontend)
      keys = {
        p256dh: subscription.getKey("p256dh"),
        auth: subscription.getKey("auth"),
      };
    } else if (subscription.keys) {
      // Se é um objeto JSON serializado (enviado para o servidor)
      keys = subscription.keys;
    }

    if (!keys?.p256dh || !keys?.auth) {
      throw new Error("Não foi possível extrair as chaves da subscription");
    }

    const data: PushSubscriptionData = {
      endpoint: subscription.endpoint,
      p256dh:
        typeof keys.p256dh === "string"
          ? keys.p256dh
          : this.arrayBufferToBase64(keys.p256dh),
      auth:
        typeof keys.auth === "string"
          ? keys.auth
          : this.arrayBufferToBase64(keys.auth),
      userAgent,
      subscriptionStatus: "active" as const,
      lastUsed: new Date().toISOString(),
      userId,
      preferences: {
        categories: [],
        allArticles: true,
      },
      metadata: {
        browser: this.getBrowserInfo(userAgent),
        os: this.getOSInfo(userAgent),
        subscriptionDate: new Date().toISOString(),
      },
    };

    const response = await this.makeRequest("/api/push-subscriptions", {
      method: "POST",
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    return result.data;
  }

  // Buscar subscription por endpoint
  async findSubscriptionByEndpoint(
    endpoint: string
  ): Promise<StrapiPushSubscription | null> {
    try {
      const response = await this.makeRequest(
        `/api/push-subscriptions?filters[endpoint][$eq]=${encodeURIComponent(
          endpoint
        )}`
      );

      const result: StrapiResponse<StrapiPushSubscription[]> =
        await response.json();

      return result.data[0] || null;
    } catch (error) {
      console.error("Erro ao buscar subscription:", error);
      return null;
    }
  }

  // Buscar todas as subscriptions ativas
  async getActiveSubscriptions(): Promise<StrapiPushSubscription[]> {
    const response = await this.makeRequest(
      "/api/push-subscriptions?filters[subscriptionStatus][$eq]=active&pagination[limit]=1000"
    );

    const result: StrapiResponse<StrapiPushSubscription[]> =
      await response.json();
    return result.data;
  }

  // Buscar subscriptions por categorias
  async getSubscriptionsByCategories(
    categories: string[]
  ): Promise<StrapiPushSubscription[]> {
    // Buscar por allArticles=true OU que tenham as categorias específicas
    const allArticlesResponse = await this.makeRequest(
      "/api/push-subscriptions?filters[subscriptionStatus][$eq]=active&filters[preferences][allArticles][$eq]=true&pagination[limit]=1000"
    );

    const categoryResponse = await this.makeRequest(
      `/api/push-subscriptions?filters[subscriptionStatus][$eq]=active&filters[preferences][categories][$in]=${categories.join(
        ","
      )}&pagination[limit]=1000`
    );

    const allArticlesResult: StrapiResponse<StrapiPushSubscription[]> =
      await allArticlesResponse.json();
    const categoryResult: StrapiResponse<StrapiPushSubscription[]> =
      await categoryResponse.json();

    // Combinar e remover duplicatas
    const combined = [...allArticlesResult.data, ...categoryResult.data];
    const unique = combined.filter(
      (subscription, index, self) =>
        index === self.findIndex((s) => s.endpoint === subscription.endpoint)
    );

    return unique;
  }

  // Atualizar subscription
  async updateSubscription(
    id: number,
    data: Partial<PushSubscriptionData>
  ): Promise<StrapiPushSubscription> {
    const response = await this.makeRequest(`/api/push-subscriptions/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    return result.data;
  }

  // Remover subscription
  async removeSubscription(endpoint: string): Promise<boolean> {
    const subscription = await this.findSubscriptionByEndpoint(endpoint);
    if (!subscription) {
      return false;
    }

    try {
      await this.makeRequest(`/api/push-subscriptions/${subscription.id}`, {
        method: "DELETE",
      });
      return true;
    } catch (error) {
      console.error("Erro ao remover subscription:", error);
      return false;
    }
  }

  // Marcar subscription como inválida
  async markSubscriptionAsInvalid(endpoint: string): Promise<void> {
    const subscription = await this.findSubscriptionByEndpoint(endpoint);
    if (subscription) {
      await this.updateSubscription(subscription.id, {
        subscriptionStatus: "invalid",
      });
    }
  }

  // Enviar notificação para uma subscription específica
  async sendNotificationToSubscription(
    subscription: StrapiPushSubscription,
    title: string,
    body: string,
    data?: any
  ): Promise<boolean> {
    if (!process.env.VAPID_PRIVATE_KEY) {
      throw new Error("VAPID_PRIVATE_KEY não configurada");
    }

    try {
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      };

      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=${process.env.VAPID_PRIVATE_KEY}`,
        },
        body: JSON.stringify({
          to: pushSubscription.endpoint,
          notification: {
            title,
            body,
          },
          data: data || {},
        }),
      });

      if (!response.ok) {
        console.error("Erro ao enviar notificação:", response.status);
        // Marcar como inválida se erro 410 (Gone)
        if (response.status === 410) {
          await this.markSubscriptionAsInvalid(subscription.endpoint);
        }
        return false;
      }

      // Atualizar lastUsed
      await this.updateSubscription(subscription.id, {
        lastUsed: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
      return false;
    }
  }

  // Enviar notificação para todas as subscriptions ativas
  async sendNotificationToAll(
    title: string,
    body: string,
    data?: any
  ): Promise<{ success: number; failed: number }> {
    const subscriptions = await this.getActiveSubscriptions();

    const promises = subscriptions.map((subscription) =>
      this.sendNotificationToSubscription(subscription, title, body, data)
    );

    const results = await Promise.allSettled(promises);

    const success = results.filter(
      (result) => result.status === "fulfilled" && result.value === true
    ).length;

    const failed = results.filter(
      (result) => result.status === "rejected"
    ).length;

    const errors = results
      .filter((result) => result.status === "rejected")
      .map((result) =>
        result.status === "rejected"
          ? result.reason.message
          : "Erro desconhecido"
      );

    if (errors.length > 0) {
      console.error("Erros ao enviar notificações:", errors);
    }

    return { success, failed };
  }

  // Enviar notificação para subscriptions de categorias específicas
  async sendNotificationToCategories(
    categories: string[],
    title: string,
    body: string,
    data?: any
  ): Promise<{ success: number; failed: number }> {
    const subscriptions = await this.getSubscriptionsByCategories(categories);

    const promises = subscriptions.map((subscription) =>
      this.sendNotificationToSubscription(subscription, title, body, data)
    );

    const results = await Promise.allSettled(promises);

    const success = results.filter(
      (result) => result.status === "fulfilled" && result.value === true
    ).length;

    const failed = results.filter(
      (result) => result.status === "rejected"
    ).length;

    return { success, failed };
  }

  // Limpeza automática de subscriptions inválidas ou antigas
  async cleanupInvalidSubscriptions(): Promise<{
    removed: number;
    errors: string[];
  }> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
      // Buscar subscriptions inválidas ou antigas
      const response = await this.makeRequest(
        `/api/push-subscriptions?filters[$or][0][subscriptionStatus][$eq]=invalid&filters[$or][1][lastUsed][$lt]=${thirtyDaysAgo.toISOString()}&pagination[limit]=1000`
      );

      const result: StrapiResponse<StrapiPushSubscription[]> =
        await response.json();

      if (result.data.length === 0) {
        return { removed: 0, errors: [] };
      }

      // Remover subscriptions
      const deletePromises = result.data.map((subscription) =>
        this.makeRequest(`/api/push-subscriptions/${subscription.id}`, {
          method: "DELETE",
        })
      );

      const deleteResults = await Promise.allSettled(deletePromises);

      const successful = deleteResults.filter(
        (result) => result.status === "fulfilled"
      ).length;

      const errors = deleteResults
        .filter((result) => result.status === "rejected")
        .map((result) =>
          result.status === "rejected"
            ? result.reason.message
            : "Erro desconhecido"
        );

      return { removed: successful, errors };
    } catch (error) {
      console.error("Erro na limpeza automática:", error);
      return { removed: 0, errors: [(error as Error).message] };
    }
  }

  // Obter estatísticas das subscriptions
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    invalid: number;
  }> {
    const [activeResponse, inactiveResponse, invalidResponse] =
      await Promise.all([
        this.makeRequest(
          "/api/push-subscriptions?filters[subscriptionStatus][$eq]=active&pagination[limit]=0"
        ),
        this.makeRequest(
          "/api/push-subscriptions?filters[subscriptionStatus][$eq]=inactive&pagination[limit]=0"
        ),
        this.makeRequest(
          "/api/push-subscriptions?filters[subscriptionStatus][$eq]=invalid&pagination[limit]=0"
        ),
      ]);

    const [activeResult, inactiveResult, invalidResult] = await Promise.all([
      activeResponse.json(),
      inactiveResponse.json(),
      invalidResponse.json(),
    ]);

    const active = activeResult.meta.pagination.total;
    const inactive = inactiveResult.meta.pagination.total;
    const invalid = invalidResult.meta.pagination.total;

    return {
      total: active + inactive + invalid,
      active,
      inactive,
      invalid,
    };
  }

  // Funções auxiliares
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
      ""
    );
    return btoa(binary);
  }

  private getBrowserInfo(userAgent?: string): string {
    if (!userAgent) return "Unknown";

    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";

    return "Unknown";
  }

  private getOSInfo(userAgent?: string): string {
    if (!userAgent) return "Unknown";

    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPhone")) return "iOS";

    return "Unknown";
  }
}

// Singleton instance
export const strapiPushService = new StrapiPushNotificationService();

// Função para notificar sobre novos artigos
export async function notifyNewArticle(
  articleTitle: string,
  articleSlug: string,
  categories: string[] = []
): Promise<void> {
  try {
    const title = "📰 Novo artigo disponível!";
    const body = `Confira: ${articleTitle}`;
    const data = {
      url: `/articles/${articleSlug}`,
      articleTitle,
      categories,
    };

    let result;
    if (categories.length > 0) {
      result = await strapiPushService.sendNotificationToCategories(
        categories,
        title,
        body,
        data
      );
    } else {
      result = await strapiPushService.sendNotificationToAll(title, body, data);
    }

    console.log(
      `✅ Notificação enviada: ${result.success} sucessos, ${result.failed} falhas`
    );
  } catch (error) {
    console.error("❌ Erro ao enviar notificação:", error);
  }
}

// Função para cleanup automático (pode ser chamada via cron)
export async function cleanupOldSubscriptions(): Promise<void> {
  try {
    const result = await strapiPushService.cleanupInvalidSubscriptions();
    console.log(
      `🧹 Limpeza automática: ${result.removed} subscriptions removidas`
    );

    if (result.errors.length > 0) {
      console.error("❌ Erros na limpeza:", result.errors);
    }
  } catch (error) {
    console.error("❌ Erro na limpeza automática:", error);
  }
}

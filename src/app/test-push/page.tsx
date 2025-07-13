import PushNotificationManager from "@/components/push-notification-manager";
import ResetNotificationButton from "./reset-notification";

export default function TestPushPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          🔔 Teste de Push Notifications
        </h1>

        <div className="space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
              ✅ Notificações Automáticas Ativadas
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-4">
              O sistema agora pergunta automaticamente se o usuário quer receber
              notificações quando entra no site pela primeira vez.
            </p>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <li>• Aparece automaticamente após 3 segundos</li>
              <li>• Só pergunta uma vez por usuário</li>
              <li>• Aparece no canto inferior direito</li>
              <li>• Não é intrusivo</li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">
              Componente Manual (Para Testes)
            </h2>
            <p className="text-muted-foreground mb-4">
              Use o componente abaixo apenas para testes manuais:
            </p>
            <PushNotificationManager />
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">📋 Como Testar</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Recarregue a página ou abra uma nova aba anônima</li>
              <li>
                Aguarde 3 segundos - aparecerá um popup no canto inferior
                direito
              </li>
              <li>
                Clique em &quot;Sim, quero&quot; para aceitar as notificações
              </li>
              <li>Aceite a permissão quando solicitado pelo navegador</li>
              <li>Abra o console do navegador (F12)</li>
              <li>Execute o teste manual abaixo</li>
            </ol>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">🧪 Teste Manual</h2>
            <p className="text-muted-foreground mb-4">
              Cole este código no console do navegador para testar:
            </p>
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              {`// Teste de webhook simulado
fetch('/api/webhook/strapi', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer test-token'
  },
  body: JSON.stringify({
    event: 'entry.publish',
    model: 'article',
    entry: {
      id: 1,
      title: 'Teste de Notificação',
      slug: 'teste-notificacao',
      cover: { url: '/og-image.fw.png' }
    }
  })
}).then(res => res.json()).then(console.log);`}
            </pre>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
              ⚠️ Importante
            </h3>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• As notificações só funcionam em HTTPS (ou localhost)</li>
              <li>• Você precisa configurar as variáveis de ambiente VAPID</li>
              <li>• O service worker precisa estar ativo</li>
              <li>• Verifique o console para possíveis erros</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">
              🔄 Para Testar Novamente
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              Se já foi perguntado antes, execute no console do navegador:
            </p>
            <pre className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded text-sm text-blue-800 dark:text-blue-200">
              localStorage.removeItem(&quot;push-notification-asked&quot;);
            </pre>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              Depois recarregue a página e aguarde 3 segundos.
            </p>
            <div className="mt-3">
              <ResetNotificationButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

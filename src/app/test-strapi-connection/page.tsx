"use client";

import { useState } from "react";

interface TestResult {
  name: string;
  status: number | string;
  success: boolean;
  url: string;
  data?: string;
}

interface TestResponse {
  success: boolean;
  message: string;
  tests: TestResult[];
  config?: {
    baseUrl: string;
    hasToken: boolean;
  };
  error?: string;
}

export default function TestStrapiConnection() {
  const [result, setResult] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/test-strapi");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao executar testes",
        error: error instanceof Error ? error.message : "Erro desconhecido",
        tests: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Teste de Conexão com Strapi</h1>

      <div className="space-y-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Testando..." : "Testar Conexão"}
        </button>

        {result && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded ${
                result.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              } border`}
            >
              <h2 className="font-semibold mb-2">
                {result.success
                  ? "✅ Todos os testes passaram"
                  : "❌ Alguns testes falharam"}
              </h2>
              <p className="text-sm">{result.message}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-3">Resultados dos Testes:</h3>
              <div className="space-y-2">
                {result.tests.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded border"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={
                          test.success ? "text-green-600" : "text-red-600"
                        }
                      >
                        {test.success ? "✅" : "❌"}
                      </span>
                      <span className="font-medium">{test.name}</span>
                    </span>
                    <div className="text-sm text-gray-600">
                      <span className="font-mono">{test.status}</span>
                      {test.data && (
                        <div className="text-xs mt-1">{test.data}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {result.config && (
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Configuração:</h3>
                <ul className="text-sm space-y-1">
                  <li>URL do Strapi: {result.config.baseUrl}</li>
                  <li>
                    Token:{" "}
                    {result.config.hasToken
                      ? "✅ Configurado"
                      : "❌ Não configurado"}
                  </li>
                </ul>
              </div>
            )}

            {result.error && (
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h3 className="font-semibold mb-2 text-red-700">Erro:</h3>
                <pre className="text-sm text-red-600 whitespace-pre-wrap">
                  {result.error}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded">
        <h3 className="font-semibold mb-2">Instruções:</h3>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Verifique se o Strapi está rodando</li>
          <li>
            Configure as variáveis de ambiente (NEXT_PUBLIC_STRAPI_URL e
            STRAPI_API_TOKEN)
          </li>
          <li>Crie a collection &quot;push-subscription&quot; no Strapi</li>
          <li>
            Configure as permissões da collection para o role &quot;Public&quot;
          </li>
        </ol>
      </div>
    </div>
  );
}

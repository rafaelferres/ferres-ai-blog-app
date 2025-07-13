"use client";

import { useState } from "react";
import { testStrapiImages, normalizeStrapiUrl } from "@/lib/test-images";
import { StrapiImage } from "@/components/ui/strapi-image";

export default function TestImagesPage() {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult("");

    // Capturar logs do console
    const originalLog = console.log;
    const logs: string[] = [];

    console.log = (...args) => {
      logs.push(args.join(" "));
      originalLog(...args);
    };

    try {
      await testStrapiImages();
      setTestResult(logs.join("\n"));
    } catch (error) {
      setTestResult(`Erro: ${error}`);
    } finally {
      console.log = originalLog;
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de Imagens do Strapi</h1>

        <div className="space-y-6">
          {/* Botão de teste */}
          <div>
            <button
              onClick={runTest}
              disabled={isLoading}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "Testando..." : "Executar Teste"}
            </button>
          </div>

          {/* Resultado do teste */}
          {testResult && (
            <div className="bg-muted p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Resultado do Teste:</h2>
              <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}

          {/* Teste de normalização de URL */}
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="font-semibold mb-4">
              Teste de Normalização de URL:
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <strong>URL relativa:</strong> /uploads/image.jpg
                <br />
                <strong>Normalizada:</strong>{" "}
                {normalizeStrapiUrl("/uploads/image.jpg")}
              </div>
              <div>
                <strong>URL absoluta:</strong> https://example.com/image.jpg
                <br />
                <strong>Normalizada:</strong>{" "}
                {normalizeStrapiUrl("https://example.com/image.jpg")}
              </div>
            </div>
          </div>

          {/* Teste de componente de imagem */}
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="font-semibold mb-4">
              Teste de Componente de Imagem:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">
                  Imagem de teste (URL relativa):
                </h3>
                <div className="relative h-48 bg-background rounded-lg overflow-hidden">
                  <StrapiImage
                    src="/uploads/test-image.jpg"
                    alt="Imagem de teste"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  Imagem de teste (URL absoluta):
                </h3>
                <div className="relative h-48 bg-background rounded-lg overflow-hidden">
                  <StrapiImage
                    src="https://via.placeholder.com/400x300"
                    alt="Imagem placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informações de configuração */}
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="font-semibold mb-4">Configuração Atual:</h2>
            <div className="space-y-2 text-sm">
              <div>
                <strong>NEXT_PUBLIC_STRAPI_URL:</strong>{" "}
                {process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}
              </div>
              <div>
                <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de JSON para Prompts de IA - Ferres",
  description:
    "Crie prompts profissionais de IA com nosso editor visual. Gere JSON estruturado para todos os modelos de IA.",
  openGraph: {
    title: "Gerador de JSON para Prompts de IA - Ferres",
    description:
      "Crie prompts profissionais de IA com nosso editor visual. Gere JSON estruturado para todos os modelos de IA.",
  },
};

export default function MediaJsonGenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

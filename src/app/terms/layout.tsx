export const metadata = {
  title: "Ferres - Termos de uso",
  description: "Termos de uso do Ferres",
  openGraph: {
    title: "Ferres - Termos de uso",
    description: "Termos de uso do Ferres",
    images: ["https://ferres.io/og-image.fw.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferres - Termos de uso",
    description: "Termos de uso do Ferres",
    images: ["https://ferres.io/og-image.fw.png"],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

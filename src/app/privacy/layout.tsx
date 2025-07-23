export const metadata = {
  title: "Ferres - Privacidade",
  description: "Política de privacidade do Ferres",
  openGraph: {
    title: "Ferres - Privacidade",
    description: "Política de privacidade do Ferres",
    images: ["https://ferres.io/og-image.fw.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferres - Privacidade",
    description: "Política de privacidade do Ferres",
    images: ["https://ferres.io/og-image.fw.png"],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export const metadata = {
  title: "Ferres - Cookies",
  description: "Política de cookies do Ferres",
  openGraph: {
    title: "Ferres - Cookies",
    description: "Política de cookies do Ferres",
    images: ["https://ferres.io/og-image.fw.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferres - Cookies",
    description: "Política de cookies do Ferres",
    images: ["https://ferres.io/og-image.fw.png"],
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export const metadata = {
  title: "Ferres - Comunidade",
  description: "Comunidade de tecnologia",
  openGraph: {
    title: "Ferres - Comunidade",
    description: "Comunidade de tecnologia",
    images: ["https://ferres.io/og-image.fw.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferres - Comunidade",
    description: "Comunidade de tecnologia",
    images: ["https://ferres.io/og-image.fw.png"],
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

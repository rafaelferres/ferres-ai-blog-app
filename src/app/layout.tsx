import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/Header";
import { NavbarSpacer } from "@/components/ui/navbar-spacer";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getCategories } from "@/actions/categories";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ferres - Blog sobre Tecnologia e Inovação",
  description:
    "Descubra as últimas notícias e insights sobre tecnologia e inovação no mundo dos negócios.",
  openGraph: {
    title: "Ferres - Blog sobre Tecnologia e Inovação",
    description:
      "Descubra as últimas notícias e insights sobre tecnologia e inovação no mundo dos negócios.",
    images: [
      {
        url: "https://ferres.io/og-image.fw.png",
        width: 1200,
        height: 630,
        alt: "Ferres - Blog sobre Tecnologia e Inovação",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferres - Blog sobre Tecnologia e Inovação",
    description:
      "Descubra as últimas notícias e insights sobre tecnologia e inovação no mundo dos negócios.",
    images: ["https://ferres.io/og-image.fw.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManager gtmId="G-58EP4LQ7LC" />
        <ThemeProvider>
          <Header />
          <NavbarSpacer>{children}</NavbarSpacer>
          <Footer categories={categories as any} />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/Header";
import { NavbarSpacer } from "@/components/ui/navbar-spacer";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getCategories } from "@/actions/categories";
import { GoogleAnalytics } from "@next/third-parties/google";
import SendPulseNotification from "@/components/sendpulse-notification";

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ferres Blog",
    startupImage: [
      {
        url: "/icon-192x192.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
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
  icons: {
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    icon: [
      { url: "/icon-192x192.fw.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.fw.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3026232522817308" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ferres Blog" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          charSet="UTF-8"
          src="//web.webpushs.com/js/push/56f5dabfb60218d5c1e60952141a958b_1.js"
          async
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-58EP4LQ7LC" />
        <ThemeProvider>
          <Header />
          <NavbarSpacer>{children}</NavbarSpacer>
          <Footer categories={categories as any} />
          <SendPulseNotification />
        </ThemeProvider>
      </body>
    </html>
  );
}

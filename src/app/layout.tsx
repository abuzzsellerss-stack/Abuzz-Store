import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://abuzz.store'),
  title: "Abuzz Store - Tools, Hardware & Construction Materials",
  description: "Premium industrial hardware, hand tools, power tools, and building materials. Optimized for professionals and DIY enthusiasts.",
  alternates: {
    canonical: "https://abuzz.store",
  },
  openGraph: {
    title: "Abuzz Store - Tools, Hardware & Construction Materials",
    description: "Premium industrial hardware, hand tools, power tools, and building materials.",
    url: "https://abuzz.store",
    siteName: "Abuzz Store",
    locale: "en_IN",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Abuzz Store",
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents mobile browser automatic zooming on inputs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Google Analytics Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GMDG143FY6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GMDG143FY6');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <ClientProviders>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}

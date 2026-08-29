import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CodeLand",
    template: "%s | CodeLand",
  },
  description: "The legendary developer platform. Build, share, and discover amazing software.",
  openGraph: {
    title: "CodeLand",
    description: "The legendary developer platform",
    url: "https://codeland-two.vercel.app",
    siteName: "CodeLand",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLand",
    description: "The legendary developer platform",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="min-h-screen bg-dark-0 font-sans text-dark-900">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

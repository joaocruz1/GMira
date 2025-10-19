import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"

// Lazy load header e footer para melhor performance
const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: true,
})
const Footer = dynamic(() => import("@/components/layout/footer"), {
  ssr: true,
})

// Fonte principal para títulos - com subset otimizado e fallback
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  weight: ["700", "800"],
  fallback: ["system-ui", "arial"],
})

// Fonte secundária para corpo de texto - com subset otimizado e fallback
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
  fallback: ["system-ui", "arial"],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: {
    default: "GMira Marketing Digital - Sua marca no alvo certo!",
    template: "%s | GMira Marketing Digital"
  },
  description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital. Agência especializada em marketing digital estratégico.",
  keywords: ["marketing digital", "agência digital", "tráfego pago", "estratégia digital", "conteúdo digital", "GMira"],
  authors: [{ name: "GMira Marketing Digital" }],
  creator: "GMira Marketing Digital",
  publisher: "GMira Marketing Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.gmiramkt.com",
    title: "GMira Marketing Digital - Sua marca no alvo certo!",
    description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital",
    siteName: "GMira Marketing Digital",
    images: [
      {
        url: "https://www.gmiramkt.com/meta.png",
        width: 1200,
        height: 630,
        alt: "GMira Marketing Digital",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GMira Marketing Digital - Sua marca no alvo certo!",
    description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital",
    images: ["https://www.gmiramkt.com/meta.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.gmiramkt.com",
  },
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-black text-white overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

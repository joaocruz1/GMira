import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"

// Fonte principal para títulos - com subset otimizado
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  weight: ["700", "800"], // Carrega apenas os pesos necessários
})

// Fonte secundária para corpo de texto - com subset otimizado
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"], // Carrega apenas os pesos necessários
})

export const metadata: Metadata = {
  title: "GMira Marketing Digital - Sua marca no alvo certo!",
  description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital",

  openGraph: {
    title: "GMira Marketing Digital - Sua marca no alvo certo!",
    description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital",
    type: "website",
    url: "https://www.gmiramkt.com",
    images: [
      {
        url: "https://www.gmiramkt.com/meta.png",
        width: 1200,
        height: 630,
        alt: "GMira Marketing Digital",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

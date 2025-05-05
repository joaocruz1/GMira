import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"

// Fonte principal para títulos
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

// Fonte secundária para corpo de texto
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GMira Marketing Digital - Sua marca no alvo certo!",
  description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital",
  
  openGraph: {
    title: "GMira Marketing Digital",
    description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital",
    images: [
      {
        url: "/metaimage.svg", // Caminho relativo a partir da pasta public
        width: 600, // Ajuste para as dimensões reais da sua imagem (quadrada)
        height: 600,
        alt: "GMira Marketing Digital",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/metaimage.svg"], // Usa a mesma imagem para o Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}

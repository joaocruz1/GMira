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
    title: "GMira Marketing Digital - Sua marca no alvo certo!", 
    description: "Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital", 
    type: "website",
    url: "https://www.gmiramkt.com", 
    images: [
      {
        url: "https://www.gmiramkt.com/4.png", 
        width: 600, 
        height: 600,
        alt: "GMira Marketing Digital - Estratégias que impulsionam seu negócio",
      },
    ],
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

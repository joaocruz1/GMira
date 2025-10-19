"use client"

import { useRef, Suspense, lazy } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import { optimizeResourceLoading } from "@/lib/utils"

// Lazy load do componente SocialLink
const SocialLink = dynamic(() => import("@/components/links-page/social-link"), {
  loading: () => <div className="w-16 h-16 bg-gray-800 rounded-lg animate-pulse"></div>,
})

export default function LinksPage() {
  const containerRef = useRef(null)

  // Otimizar carregamento de recursos
  if (typeof window !== "undefined") {
    optimizeResourceLoading()
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0c0117] text-white overflow-hidden flex flex-col justify-center"
    >
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Logo circular com brilho */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-purple-600 blur-xl opacity-60"></div>
          <div className="relative bg-[#0c0117] rounded-full p-2 border-2 border-purple-500/30 w-24 h-24 overflow-hidden">
            <Image
              src="/profilepicture.png"
              alt="GMira Logo"
              width={100}
              height={100}
              className="w-full h-full object-cover scale-121"
              priority
            />
          </div>
        </div>

        {/* Título com verificação */}
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          GMira
          <span className="bg-purple-600 rounded-full p-0.5">
            <Check className="h-4 w-4 text-white" />
          </span>
        </h1>

        {/* Subtítulo atualizado */}
        <h2 className="text-xl text-purple-400 mb-3 text-center">
          Vamos colocar sua marca no{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">ALVO</span>{" "}
          certo
        </h2>

        {/* Descrição atualizada */}
        <p className="text-gray-400 text-center max-w-md mb-8">Veja como posso cuidar do marketing do seu negócio.<br/>Dá uma olhada nisso aqui 👇</p>

        {/* Botão Saiba Mais */}
        <Link
          href="/"
          className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2 mb-10"
        >
          Saiba Mais!
          <ChevronRight className="h-5 w-5" />
        </Link>

        {/* Texto em inglês */}
        <p className="text-purple-300 mb-8">Conheça nossas redes sociais.</p>

        {/* Grid de redes sociais */}
        <Suspense fallback={
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 w-full max-w-3xl">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        }>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 w-full max-w-3xl">
            <SocialLink type="instagram" username="@gmiramarketing" href="https://www.instagram.com/gustavomira.mkt/" />

            <SocialLink type="whatsapp" username="WhatsApp" href="https://wa.me/553599574977" />

            <SocialLink type="linkedin" username="GMira Studio" href="https://linkedin.com/in/gmira" />

            <SocialLink type="behance" username="@gmiradesign" href="https://behance.net/gmiradesign" />
          </div>
        </Suspense>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-4">
          <p>© {new Date().getFullYear()} GMira Marketing Digital</p>
        </footer>
      </div>
    </div>
  )
}

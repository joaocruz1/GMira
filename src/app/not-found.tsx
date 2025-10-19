"use client"

import { useRef, Suspense, lazy } from "react"
import { useScroll } from "framer-motion"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import dynamic from "next/dynamic"

// Lazy load do componente FadeIn
const FadeIn = dynamic(() => import("@/components/ui/fade-in"), {
  loading: () => <div></div>,
})

// Parallax background simplificado para a página 404
function SimpleParallaxBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Background gradiente principal */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),transparent_70%)]" />
      
      {/* Elementos animados */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-purple-900/10 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full bg-purple-800/5 blur-lg"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      {/* Overlay para melhor legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </div>
  )
}

export default function NotFound() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background parallax */}
      <SimpleParallaxBackground />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <FadeIn>
              <div className="mb-8">
                <Image
                  src="/img/logos/logoWhite.png"
                  alt="GMira Marketing Digital"
                  width={120}
                  height={40}
                  className="h-16 w-auto mx-auto"
                  priority
                />
              </div>
            </FadeIn>

            {/* Número 404 com estilo */}
            <FadeIn delay={0.2}>
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 relative">
                  404
                  <motion.div
                    className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-bold text-purple-500/20 blur-sm"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    404
                  </motion.div>
                </h1>
              </motion.div>
            </FadeIn>

            {/* Título */}
            <FadeIn delay={0.4}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                OPS! ESTA PÁGINA{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 relative inline-block">
                  DESAPARECEU
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></span>
                </span>
              </h2>
            </FadeIn>

            {/* Descrição */}
            <FadeIn delay={0.6}>
              <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Parece que esta página foi para o espaço digital! Mas não se preocupe, 
                podemos te ajudar a encontrar o que você está procurando.
              </p>
            </FadeIn>

            {/* Botões de ação */}
            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-lg px-10 py-8 rounded-xl shadow-[0_0_25px_rgba(138,43,226,0.4)] hover:shadow-[0_0_40px_rgba(138,43,226,0.7)] transition-all duration-300 border border-purple-500/30 font-bold tracking-wide"
                    >
                      <Home className="mr-2 h-6 w-6" />
                      VOLTAR AO INÍCIO
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.history.back()}
                    className="border-purple-500/50 text-white hover:bg-purple-500/10 hover:border-purple-400/70 text-lg px-8 py-6 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    PÁGINA ANTERIOR
                  </Button>
                </motion.div>
              </div>
            </FadeIn>

            {/* Links úteis */}
            <FadeIn delay={1.0}>
              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-gray-400 mb-6">Ou navegue pelas nossas principais páginas:</p>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  {[
                    { href: "/home", label: "Home" },
                    { href: "/servicos", label: "Serviços" },
                    { href: "/sobre", label: "Sobre" },
                    { href: "/portfolio", label: "Portfólio" },
                  ].map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import FadeIn from "@/components/ui/fade-in"
import { motion } from "framer-motion"

interface CtaSectionProps {
  onCtaClick: () => void
}

export default function CtaSection({ onCtaClick }: CtaSectionProps) {
  // Pulse animation for the CTA button
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    },
  }

  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-purple-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),transparent_70%)]" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-10">
            VAMOS COLOCAR SUA MARCA NO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">ALVO</span>{" "}
            CERTO?
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8">
            <motion.div variants={pulseVariants} initial="initial" animate="animate">
              <Button
                size="lg"
                onClick={onCtaClick}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-lg px-10 py-8 rounded-xl shadow-glow hover:shadow-glow-hover transition-all duration-300 border border-purple-500/30"
              >
                <span className="text-xl font-bold tracking-wide">QUERO SABER MAIS</span>
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

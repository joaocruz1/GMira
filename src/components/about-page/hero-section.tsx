"use client"

import { memo } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import FadeIn from "@/components/ui/fade-in"

interface HeroSectionProps {
  onCtaClick: () => void
  scrollYProgress: MotionValue<number>
}

function HeroSection({ onCtaClick, scrollYProgress }: HeroSectionProps) {
  // Parallax effect for hero elements
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const imageY = useTransform(scrollYProgress, [0, 0.2], [0, -30])

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
    <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-8 min-h-[90vh] relative">
      <motion.div className="flex-1 space-y-8 z-10" style={{ y: titleY }}>
        <FadeIn>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            SUA MARCA NO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 relative inline-block">
              ALVO
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></span>
            </span>{" "}
            CERTO!
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital com resultados mensuráveis.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-gray-400 text-lg">
            Gestão de redes sociais, anúncios, design e vídeos com um plano sob medida para seu negócio.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="pt-8">
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
      </motion.div>

      <motion.div
        className="flex-1 flex justify-center z-10"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="relative w-full max-w-md"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        >
          <Image src="https://www.gmiramkt.com/GMira.svg" alt="GMira Logo" width={400} height={400} className="w-full h-auto" priority />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default memo(HeroSection)

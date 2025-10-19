"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface CtaBannerProps {
  title?: string
  subtitle?: string
  buttonText?: string
  onCtaClick?: () => void
}

function CtaBanner({
  title = "VAMOS COLOCAR SUA MARCA NO ALVO CERTO?",
  subtitle = "Entre em contato agora e descubra como podemos transformar sua presença digital.",
  buttonText = "QUERO SABER MAIS",
  onCtaClick,
}: CtaBannerProps) {
  // Default action if none provided
  const handleClick =
    onCtaClick ||
    (() => {
      const phoneNumber = "553599574977"
      const defaultMessage = "Olá, gostaria de mais informações!"
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`
      window.open(whatsappUrl, "_blank")
    })

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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          {title.includes("ALVO") ? (
            <>
              {title.split("ALVO")[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
                ALVO
              </span>
              {title.split("ALVO")[1]}
            </>
          ) : (
            title
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 max-w-2xl mx-auto mb-10"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div variants={pulseVariants} initial="initial" animate="animate">
            <Button
              size="lg"
              onClick={handleClick}
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-lg px-10 py-8 rounded-xl shadow-glow hover:shadow-glow-hover transition-all duration-300 border border-purple-500/30"
            >
              <span className="text-xl font-bold tracking-wide">{buttonText}</span>
              <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(CtaBanner)

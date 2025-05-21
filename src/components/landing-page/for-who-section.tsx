"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Check, X } from "lucide-react"
import FadeIn from "@/components/ui/fade-in"
import { motion } from "framer-motion"

interface ForWhoSectionProps {
  onCtaClick: () => void
}

function ForWhoSection({ onCtaClick }: ForWhoSectionProps) {
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            PARA QUEM É A <span className="text-purple-600">GMIRA</span>?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Para quem é */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-600/30 to-purple-600/10 backdrop-blur-md p-4 rounded-lg">
                  <Check className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">Ideal para você que:</h3>
              </div>
            </FadeIn>

            <div className="space-y-4">
              {forWho.map((item, index) => (
                <FadeIn key={index} delay={0.1 * (index + 1)} y={10}>
                  <motion.div
                    whileHover={{
                      x: 5,
                      boxShadow: "0 0 20px rgba(138, 43, 226, 0.3)",
                      transition: { duration: 0.2 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card className="bg-gradient-to-r from-purple-900/80 to-purple-800/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-purple-500 hover:border-purple-400 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-500/30 p-2 rounded-full flex-shrink-0">
                          <Check className="h-5 w-5 text-purple-300" />
                        </div>
                        <p className="text-white text-lg">{item}</p>
                      </div>
                    </Card>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Não é para você */}
          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-red-600/30 to-red-600/10 backdrop-blur-md p-4 rounded-lg">
                  <X className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold">Não é para você se:</h3>
              </div>
            </FadeIn>

            <div className="space-y-4">
              {notForWho.map((item, index) => (
                <FadeIn key={index} delay={0.1 * (index + 1) + 0.3} y={10}>
                  <motion.div
                    whileHover={{
                      x: 5,
                      boxShadow: "0 0 20px rgba(220, 38, 38, 0.2)",
                      transition: { duration: 0.2 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card className="bg-gradient-to-r from-red-900/30 to-red-800/20 backdrop-blur-sm p-6 rounded-xl border-l-4 border-red-500/50 hover:border-red-400/50 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-500/30 p-2 rounded-full flex-shrink-0">
                          <X className="h-5 w-5 text-red-300" />
                        </div>
                        <p className="text-white text-lg">{item}</p>
                      </div>
                    </Card>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center mt-16 relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl" />
            <motion.div variants={pulseVariants} initial="initial" animate="animate">
              <Button
                size="lg"
                onClick={onCtaClick}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-lg px-10 py-8 rounded-xl shadow-glow hover:shadow-glow-hover transition-all duration-300 border border-purple-500/30 relative z-10"
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

const forWho = [
  "Você está começando ou quer melhorar sua presença nas redes sociais",
  "Precisa de alguém que cuide do tráfego, criação de anúncios e estratégia",
  "Quer crescer com consistência, sem limitações negócio ou em atenção",
  "Sabe que marketing é investimento e não quer depender de agências caras",
  "Valoriza resultado real, com acompanhamento e visão estratégica",
]

const notForWho = [
  "Busca soluções imediatistas ou milagrosas",
  "Não está disposto a investir em comunicação",
  "Quer 'apenas post bonitinho' sem estratégia por trás",
]

export default memo(ForWhoSection)

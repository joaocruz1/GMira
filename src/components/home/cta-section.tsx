"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Check } from "lucide-react"
import Image from "next/image"

interface CtaSectionProps {
  onCtaClick: () => void
}

function CtaSection({ onCtaClick }: CtaSectionProps) {
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
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50/50 dark:from-black/80 dark:to-purple-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(126,34,206,0.03),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),transparent_70%)]" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-50/80 dark:bg-purple-600/10 blur-3xl"
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
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-50/80 dark:bg-fuchsia-600/10 blur-3xl"
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-purple-200/50 dark:border-purple-900/30">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Imagem */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Transforme sua presença digital"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                >
                  Pronto para <span className="text-purple-300">transformar</span> sua presença digital?
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="bg-purple-500/30 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-purple-300" />
                      </div>
                      <p className="text-white/90">{benefit}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Formulário/CTA */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6 text-indigo-950 dark:text-white"
              >
                VAMOS COLOCAR SUA MARCA NO{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600 dark:from-purple-400 dark:to-fuchsia-500">
                  ALVO
                </span>{" "}
                CERTO?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-indigo-700 dark:text-gray-300 mb-8"
              >
                Entre em contato agora e descubra como podemos transformar sua presença digital com estratégias
                personalizadas para o seu negócio.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex flex-col space-y-4">
                  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 p-px rounded-xl">
                    <div className="bg-white dark:bg-black/60 p-4 rounded-[calc(0.75rem-1px)] flex items-center gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                        <Check className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                      </div>
                      <p className="text-indigo-700 dark:text-gray-300">Primeira consulta estratégica gratuita</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 p-px rounded-xl">
                    <div className="bg-white dark:bg-black/60 p-4 rounded-[calc(0.75rem-1px)] flex items-center gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                        <Check className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                      </div>
                      <p className="text-indigo-700 dark:text-gray-300">Planos personalizados para seu orçamento</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 p-px rounded-xl">
                    <div className="bg-white dark:bg-black/60 p-4 rounded-[calc(0.75rem-1px)] flex items-center gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                        <Check className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                      </div>
                      <p className="text-indigo-700 dark:text-gray-300">Sem contratos de fidelidade de longo prazo</p>
                    </div>
                  </div>
                </div>

                <motion.div variants={pulseVariants} initial="initial" animate="animate" className="pt-4">
                  <Button
                    size="lg"
                    onClick={onCtaClick}
                    className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-lg py-7 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-500/30"
                  >
                    <span className="text-xl font-bold tracking-wide">QUERO TRANSFORMAR MINHA MARCA</span>
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const benefits = [
  "Estratégias personalizadas para seu negócio",
  "Conteúdo de alta qualidade que converte",
  "Campanhas de anúncios otimizadas para resultados",
  "Acompanhamento contínuo e relatórios detalhados",
]

export default memo(CtaSection)

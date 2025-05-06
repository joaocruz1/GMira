"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import FadeIn from "@/components/ui/fade-in"

function AboutSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            QUEM ESTÁ POR TRÁS DA <span className="text-purple-600">GMIRA</span>?
          </h2>
        </FadeIn>

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <FadeIn delay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative">
              <Image
                src="/fotoperfil.svg"
                alt="Gustavo Mira"
                width={500}
                height={500}
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="space-y-6 text-lg">
              <p className="text-gray-200">
                Meu nome é <span className="text-purple-400 font-semibold">Gustavo Mira</span>, sou especialista em
                marketing digital e ajudo marcas a se posicionarem com clareza, criatividade e estratégia.
              </p>

              <p className="text-gray-300">
                Atuo há mais de 2 anos no mercado criando conteúdos que conectam, gerenciando redes sociais, campanhas
                de tráfego pago e transformando ideias em resultados reais.
              </p>

              <p className="text-gray-300">Sou prático, direto e focado em fazer o que dá certo — sem enrolação.</p>

              <p className="text-gray-200 font-medium">
                Se você quer alguém pra cuidar da presença da sua marca com visão, técnica e execução, chegou no lugar
                certo.
              </p>

              <div className="pt-4">
                <motion.div
                  className="h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full w-24"
                  animate={{
                    width: ["0%", "100%", "24%"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default memo(AboutSection)

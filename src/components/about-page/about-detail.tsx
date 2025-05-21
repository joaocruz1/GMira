"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

function AboutDetail() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20"
            >
              <Image
                src="/fotoperfil.svg"
                alt="Gustavo Mira"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Olá, eu sou <span className="text-purple-500">Gustavo Mira</span>
            </h2>

            <div className="space-y-4 text-lg">
              <p className="text-gray-200">
                Sou especialista em marketing digital com mais de 2 anos de experiência ajudando marcas a se
                posicionarem com clareza, criatividade e estratégia no ambiente digital.
              </p>

              <p className="text-gray-300">
                Minha jornada começou quando percebi que muitas empresas tinham dificuldade em comunicar seu valor de
                forma eficaz nas redes sociais. Desde então, venho desenvolvendo estratégias que não apenas geram
                engajamento, mas também resultados mensuráveis para os negócios.
              </p>

              <p className="text-gray-300">
                Acredito que o marketing digital eficaz combina dados, criatividade e uma compreensão profunda do
                público-alvo. Minha abordagem é prática, direta e focada em fazer o que realmente funciona — sem
                enrolação ou promessas vazias.
              </p>

              <p className="text-gray-200 font-medium">
                Minha missão é ajudar negócios a crescerem no digital com estratégias personalizadas que geram
                resultados reais e duradouros.
              </p>
            </div>

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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(AboutDetail)

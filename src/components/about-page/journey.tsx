"use client"

import { memo } from "react"
import { motion } from "framer-motion"

function Journey() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            MINHA <span className="text-purple-500">JORNADA</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            O caminho que me trouxe até aqui e moldou minha experiência em marketing digital.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Linha do tempo vertical */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-fuchsia-600 transform md:-translate-x-1/2" />

          {journeyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } mb-16 last:mb-0 relative`}
            >
              {/* Marcador na linha do tempo */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 border-4 border-black z-10" />

              {/* Conteúdo */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="bg-gradient-to-br from-purple-900/30 to-black/60 backdrop-blur-sm p-6 rounded-xl border border-purple-900/30">
                  <div className="text-purple-400 font-bold mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const journeyItems = [
  {
    year: "2020",
    title: "Primeiros Passos",
    description:
      "Iniciei minha jornada no marketing digital, estudando e aplicando conceitos em projetos pessoais para desenvolver habilidades práticas.",
  },
  {
    year: "2021",
    title: "Primeiros Clientes",
    description:
      "Comecei a trabalhar com pequenos negócios locais, ajudando-os a estabelecer presença nas redes sociais e implementar estratégias básicas de marketing digital.",
  },
  {
    year: "2022",
    title: "Especialização em Tráfego Pago",
    description:
      "Aprofundei meus conhecimentos em gestão de tráfego pago, desenvolvendo campanhas de alta performance para diversos segmentos de mercado.",
  },
  {
    year: "2023",
    title: "Fundação da GMira",
    description:
      "Fundei a GMira Marketing Digital para oferecer soluções completas de marketing digital, combinando estratégia, conteúdo e tráfego pago.",
  },
  {
    year: "2024",
    title: "Expansão e Novos Horizontes",
    description:
      "Ampliação da carteira de clientes e desenvolvimento de metodologias próprias para maximizar resultados em diferentes segmentos de mercado.",
  },
]

export default memo(Journey)

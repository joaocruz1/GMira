"use client"

import { memo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Autoplay
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  // Pausar autoplay ao interagir
  const handleManualChange = (index: number) => {
    setCurrent(index)
    setAutoplay(false)

    // Retomar autoplay após 10 segundos de inatividade
    setTimeout(() => setAutoplay(true), 10000)
  }

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
            O QUE NOSSOS <span className="text-purple-500">CLIENTES</span> DIZEM
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Conheça as histórias de sucesso de quem já transformou sua presença digital com a GMira.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controles */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
            <button
              onClick={() => handleManualChange(current === 0 ? testimonials.length - 1 : current - 1)}
              className="bg-purple-900/30 hover:bg-purple-900/50 p-3 rounded-full transition-colors duration-300"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
            <button
              onClick={() => handleManualChange(current === testimonials.length - 1 ? 0 : current + 1)}
              className="bg-purple-900/30 hover:bg-purple-900/50 p-3 rounded-full transition-colors duration-300"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Carrossel */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-purple-900/20 to-black/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-purple-900/30"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600/30">
                      <Image
                        src={testimonials[current].avatar || "/placeholder.svg"}
                        alt={testimonials[current].name}
                        fill
                        className="object-cover"
                        sizes="128px"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <Quote className="h-10 w-10 text-purple-500/50" />
                    <p className="text-lg text-gray-200 italic">"{testimonials[current].text}"</p>
                    <div>
                      <h4 className="text-xl font-bold text-white">{testimonials[current].name}</h4>
                      <p className="text-purple-400">{testimonials[current].position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Ver depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: "Ana Silva",
    position: "CEO, Boutique Elegance",
    text: "A GMira transformou completamente nossa presença digital. Em apenas 3 meses, aumentamos nosso engajamento em 200% e as vendas pelo Instagram cresceram 150%. O Gustavo entende profundamente nosso negócio e entrega resultados reais.",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Carlos Mendes",
    position: "Fundador, Tech Solutions",
    text: "Contratar a GMira foi a melhor decisão que tomamos para nosso marketing. A estratégia de conteúdo e tráfego pago nos trouxe leads qualificados e aumentou nossa taxa de conversão. Recomendo sem hesitar!",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Mariana Costa",
    position: "Diretora de Marketing, Saúde Integral",
    text: "O que mais me impressiona na GMira é a combinação de criatividade com estratégia baseada em dados. Nossas campanhas agora têm uma identidade visual consistente e resultados mensuráveis. Nossa clínica nunca recebeu tantos novos pacientes.",
    avatar: "/placeholder.svg?height=128&width=128",
  },
]

export default memo(Testimonials)

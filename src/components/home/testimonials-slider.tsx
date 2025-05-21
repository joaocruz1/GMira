"use client"

import { memo, useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

function TestimonialsSlider() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrevious = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setAutoplay(false)
    // Restart autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000)
  }

  const handleNext = () => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setAutoplay(false)
    // Restart autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000)
  }

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-30"
        >
          <div className="bg-black/70 backdrop-blur-md py-6 rounded-xl inline-block px-10 shadow-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              O Que Nossos <span className="text-purple-400">Clientes</span> Dizem
            </h2>
            <p className="text-gray-200 max-w-3xl mx-auto">
              Conheça as histórias de quem já transformou sua presença digital com a GMira.
            </p>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-900/30 to-black/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-900/30"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="px-6 py-12 md:p-16"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600/40">
                        <Image
                          src={testimonials[active].avatar || "/placeholder.svg"}
                          alt={testimonials[active].name}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                        {testimonials[active].role}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <Quote className="h-12 w-12 text-purple-500/30 mb-4" />
                    <p className="text-xl text-gray-200 italic mb-6">{testimonials[active].quote}</p>
                    <div>
                      <h3 className="text-2xl font-bold">{testimonials[active].name}</h3>
                      <p className="text-purple-400">{testimonials[active].company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={handlePrevious}
              className="bg-purple-900/70 hover:bg-purple-800 text-white p-3 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={handleNext}
              className="bg-purple-900/70 hover:bg-purple-800 text-white p-3 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActive(index)
                  setAutoplay(false)
                  setTimeout(() => setAutoplay(true), 10000)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === active
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Depoimento ${index + 1}`}
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
    company: "Boutique Elegance",
    role: "CEO",
    quote:
      "A GMira transformou completamente nossa presença digital. Em apenas 3 meses, aumentamos nosso engajamento em 200% e as vendas pelo Instagram cresceram 150%. O Gustavo entende profundamente nosso negócio e entrega resultados reais.",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Carlos Mendes",
    company: "Tech Solutions",
    role: "Fundador",
    quote:
      "Contratar a GMira foi a melhor decisão que tomamos para nosso marketing. A estratégia de conteúdo e tráfego pago nos trouxe leads qualificados e aumentou nossa taxa de conversão. Recomendo sem hesitar!",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Mariana Costa",
    company: "Saúde Integral",
    role: "Diretora",
    quote:
      "O que mais me impressiona na GMira é a combinação de criatividade com estratégia baseada em dados. Nossas campanhas agora têm uma identidade visual consistente e resultados mensuráveis. Nossa clínica nunca recebeu tantos novos pacientes.",
    avatar: "/placeholder.svg?height=128&width=128",
  },
]

export default memo(TestimonialsSlider)

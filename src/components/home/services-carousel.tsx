"use client"

import { memo, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

function ServicesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextService = () => {
    setActiveIndex((prev) => (prev >= services.length - 1 ? 0 : prev + 1))
  }

  const prevService = () => {
    setActiveIndex((prev) => (prev <= 0 ? services.length - 1 : prev - 1))
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
              Nossos <span className="text-purple-400">Serviços</span>
            </h2>
            <p className="text-gray-200 max-w-3xl mx-auto">
              Soluções completas para impulsionar sua presença digital e atingir seus objetivos de negócio.
            </p>
          </div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * (100 / services.length)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: `${services.length * 100}%` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full" style={{ width: `${100 / services.length}%`, flexShrink: 0 }}>
                  <div className="p-4">
                    <div className="bg-gradient-to-br from-purple-900/20 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-900/30">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative h-64 lg:h-auto">
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
                        </div>

                        <div className="p-8 lg:p-12 space-y-6">
                          <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                          <p className="text-gray-300">{service.description}</p>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-purple-400">Inclusos:</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="mr-2 mt-1 text-purple-400">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <span className="text-gray-300 text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Link href={`/servicos#${service.id}`}>
                            <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white">
                              <span>Ver Detalhes</span>
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevService}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-purple-900/70 hover:bg-purple-800 text-white p-3 rounded-full transform -translate-x-1/2 z-10"
            aria-label="Serviço anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextService}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-purple-900/70 hover:bg-purple-800 text-white p-3 rounded-full transform translate-x-1/2 z-10"
            aria-label="Próximo serviço"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 w-8"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Ir para serviço ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    id: "social-media",
    title: "Gestão de Redes Sociais",
    description:
      "Cuidamos de toda a presença da sua marca nas redes sociais, desde a criação de conteúdo até o gerenciamento de comunidade e análise de resultados.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Planejamento estratégico de conteúdo",
      "Criação e design de posts para feed e stories",
      "Copywriting otimizado para cada plataforma",
      "Calendário editorial personalizado",
      "Gerenciamento de comunidade e interações",
      "Relatórios mensais de desempenho",
    ],
  },
  {
    id: "traffic",
    title: "Gestão de Tráfego",
    description:
      "Criamos e otimizamos campanhas de anúncios que geram resultados reais, com foco em conversão e retorno sobre investimento.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Estratégia de campanhas para Meta Ads e Google Ads",
      "Segmentação avançada de público",
      "Criação de anúncios de alta conversão",
      "Otimização contínua de campanhas",
      "Teste A/B para maximizar resultados",
      "Relatórios detalhados de performance",
    ],
  },
  {
    id: "design",
    title: "Design Gráfico",
    description:
      "Desenvolvemos materiais visuais que comunicam a essência da sua marca e capturam a atenção do seu público-alvo.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Identidade visual e branding",
      "Posts para redes sociais",
      "Materiais promocionais",
      "Banners e peças para anúncios",
      "Apresentações e propostas comerciais",
      "Templates personalizados",
    ],
  },
  {
    id: "content",
    title: "Criação de Conteúdo",
    description:
      "Produzimos conteúdos que engajam, educam e convertem, desde textos persuasivos até vídeos de alta qualidade.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Produção de vídeos para redes sociais",
      "Edição profissional de vídeo",
      "Copywriting para diversos formatos",
      "Criação de conteúdo para blog",
      "Roteiros para vídeos e podcasts",
      "E-books e materiais ricos",
    ],
  },
]

export default memo(ServicesCarousel)

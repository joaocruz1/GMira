"use client"

import { memo, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

function PortfolioPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

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
              Nosso <span className="text-purple-400">Portfólio</span>
            </h2>
            <p className="text-gray-200 max-w-3xl mx-auto">
              Conheça alguns dos projetos e resultados que alcançamos para nossos clientes.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-purple-900/20 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-900/30 group"
            >
              <div className="relative h-48">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-purple-900/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400 text-sm">{item.client}</span>
                  <div className="bg-purple-900/30 p-2 rounded-full group-hover:bg-purple-600 transition-colors duration-300">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Link href="/portfolio">
            <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white">
              <span>Ver Portfólio Completo</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const portfolioItems = [
  {
    title: "Boutique Elegance",
    description: "Estratégia de redes sociais e tráfego pago para loja de roupas femininas de alto padrão.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Redes Sociais",
    client: "Moda & Estilo",
  },
  {
    title: "Tech Solutions",
    description: "Campanhas de tráfego pago e landing pages para empresa de soluções tecnológicas B2B.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tráfego Pago",
    client: "Tecnologia",
  },
  {
    title: "Clínica Saúde Integral",
    description: "Estratégia completa de marketing digital para clínica médica multidisciplinar.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Marketing Digital",
    client: "Saúde",
  },
]

export default memo(PortfolioPreview)

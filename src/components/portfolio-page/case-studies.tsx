"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

function CaseStudies() {
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
            CASES DE <span className="text-purple-500">SUCESSO</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Conheça em detalhes alguns dos nossos principais cases e os resultados que alcançamos.
          </p>
        </motion.div>

        <div className="space-y-20">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
            >
              {/* Imagem */}
              <div className="w-full lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20"
                >
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-3">
                      {caseStudy.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-900/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Conteúdo */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold">{caseStudy.title}</h3>
                <p className="text-gray-300 text-lg">{caseStudy.description}</p>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-purple-400">Resultados:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.results.map((result, idx) => (
                      <Card
                        key={idx}
                        className="bg-gradient-to-br from-purple-900/30 to-black/60 backdrop-blur-sm border border-purple-900/30 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-green-500/20 p-2 rounded-full">
                            <TrendingUp className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">{result.value}</div>
                            <div className="text-sm text-gray-400">{result.label}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Link href={`/portfolio/${caseStudy.slug}`}>
                  <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white mt-4">
                    <span>Ver Case Completo</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const caseStudies = [
  {
    title: "Boutique Elegance",
    slug: "boutique-elegance",
    description:
      "Como transformamos a presença digital de uma loja de roupas femininas e aumentamos suas vendas online em 150% em apenas 6 meses.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Redes Sociais", "Tráfego Pago", "Design"],
    results: [
      { value: "+150%", label: "em vendas online" },
      { value: "+200%", label: "em engajamento" },
      { value: "+80%", label: "em seguidores" },
      { value: "-30%", label: "em custo por aquisição" },
    ],
  },
  {
    title: "Clínica Saúde Integral",
    slug: "clinica-saude-integral",
    description:
      "Estratégia completa de marketing digital que resultou em um aumento de 200% em agendamentos de consultas para uma clínica médica multidisciplinar.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Landing Pages", "Tráfego Pago", "Conteúdo"],
    results: [
      { value: "+200%", label: "em agendamentos" },
      { value: "+15%", label: "taxa de conversão" },
      { value: "-60%", label: "em custo por lead" },
      { value: "+320%", label: "ROI em campanhas" },
    ],
  },
  {
    title: "Tech Solutions",
    slug: "tech-solutions",
    description:
      "Como ajudamos uma empresa B2B de tecnologia a gerar leads qualificados e aumentar seu ROI em marketing digital em mais de 300%.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["B2B", "Tráfego Pago", "LinkedIn"],
    results: [
      { value: "+320%", label: "ROI em marketing" },
      { value: "+90%", label: "taxa de conversão" },
      { value: "-40%", label: "custo por lead" },
      { value: "+150%", label: "leads qualificados" },
    ],
  },
]

export default memo(CaseStudies)

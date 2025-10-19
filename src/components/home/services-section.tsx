"use client"

import { memo, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Target, BarChart2, PenTool, Layout, FileText, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null)

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f9f8ff] to-white dark:from-black dark:via-purple-950/10 dark:to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-indigo-950 dark:text-white">
            SERVIÇOS <span className="text-purple-700 dark:text-purple-500">PROFISSIONAIS</span>
          </h2>
          <p className="text-indigo-700 dark:text-gray-300 max-w-3xl mx-auto">
            Soluções completas de marketing digital para impulsionar seu negócio com estratégia, criatividade e
            resultados mensuráveis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <Card className="bg-white/95 dark:bg-black/60 backdrop-blur-md border border-purple-100/50 dark:border-purple-900/50 hover:border-purple-300/50 dark:hover:border-purple-600 transition-all p-8 rounded-xl overflow-hidden h-full hover:shadow-lg dark:hover:shadow-purple-900/20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/0 to-purple-100/30 dark:from-purple-900/0 dark:via-purple-900/0 dark:to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center shadow-md">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-indigo-950 dark:text-white">{service.title}</h3>
                  </div>

                  <p className="text-indigo-700 dark:text-gray-300 mb-6 flex-grow">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={activeService === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <div className="bg-purple-100 dark:bg-purple-900/50 p-1 rounded-full mt-1 flex-shrink-0">
                          <ArrowRight className="h-3 w-3 text-purple-700 dark:text-purple-400" />
                        </div>
                        <span className="text-sm text-indigo-700 dark:text-gray-400">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link href="/servicos" className="mt-auto">
                    <Button
                      variant="ghost"
                      className="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 p-0 flex items-center gap-2"
                    >
                      <span>Saiba mais</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    title: "Gestão de Redes Sociais",
    description: "Estratégia e gestão completa da presença da sua marca nas principais plataformas sociais.",
    icon: <Users className="h-8 w-8 text-white" />,
    features: [
      "Planejamento estratégico de conteúdo",
      "Criação e design de posts",
      "Copywriting especializado",
      "Gerenciamento de comunidade",
    ],
  },
  {
    title: "Gestão de Tráfego",
    description: "Campanhas de anúncios otimizadas para maximizar conversões e retorno sobre investimento.",
    icon: <BarChart2 className="h-8 w-8 text-white" />,
    features: [
      "Estratégia de campanhas",
      "Segmentação avançada de público",
      "Otimização contínua",
      "Relatórios detalhados de performance",
    ],
  },
  {
    title: "Design Gráfico",
    description: "Criação de materiais visuais que comunicam a essência da sua marca e capturam a atenção.",
    icon: <PenTool className="h-8 w-8 text-white" />,
    features: ["Identidade visual", "Posts para redes sociais", "Materiais promocionais", "Banners para anúncios"],
  },
  {
    title: "Criação de Conteúdo",
    description: "Produção de conteúdos que engajam, educam e convertem seu público-alvo em clientes.",
    icon: <FileText className="h-8 w-8 text-white" />,
    features: ["Produção de vídeos", "Edição profissional", "Copywriting persuasivo", "Conteúdo para blog"],
  },
  {
    title: "Landing Pages",
    description: "Páginas otimizadas para conversão que transformam visitantes em leads e clientes.",
    icon: <Layout className="h-8 w-8 text-white" />,
    features: [
      "Design responsivo",
      "Copywriting persuasivo",
      "Otimização para conversão",
      "Integração com ferramentas de marketing",
    ],
  },
  {
    title: "Estratégia Digital",
    description: "Planejamento estratégico baseado em dados para alcançar seus objetivos de negócio.",
    icon: <Target className="h-8 w-8 text-white" />,
    features: ["Análise de mercado", "Definição de persona", "Planejamento de canais", "Métricas e KPIs"],
  },
]

export default memo(ServicesSection)

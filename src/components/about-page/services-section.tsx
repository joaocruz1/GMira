"use client"

import { memo } from "react"
import { Card } from "@/components/ui/card"
import { Target, BarChart2, PenTool, Layout, FileText, Users } from "lucide-react"
import FadeIn from "@/components/ui/fade-in"
import { motion } from "framer-motion"

function ServicesSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            O QUE EU ENTREGO NA <span className="text-purple-600">PRÁTICA</span>?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-20">
            Do planejamento à execução, você tem um portfólio completo para cuidar da sua presença digital com
            estratégia, design, conteúdo, anúncios e páginas que convertem.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={0.1 * index} y={20}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-full"
              >
                <Card className="bg-black/60 backdrop-blur-md border border-purple-900/50 hover:border-purple-600 transition-all p-8 rounded-xl overflow-hidden group relative h-full hover:translate-y-[-5px] duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 via-purple-900/0 to-purple-600/20 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 md:opacity-0 opacity-100 transition-opacity duration-500" />

                  <div className="bg-purple-900 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 relative z-10 md:group-hover:bg-purple-700 md:bg-purple-900 bg-purple-700 transition-colors duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-10 md:group-hover:text-white text-white md:text-gray-100 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="md:text-gray-400 text-gray-300 relative z-10 md:group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    title: "Gestão de Redes Sociais",
    description: "Criação, agendamento e otimização de conteúdo para vender sua marca.",
    icon: <Users className="h-8 w-8 text-white" />,
  },
  {
    title: "Gestão de Tráfego",
    description: "Anúncios com foco em conversão e resultados para maximizar seu investimento.",
    icon: <BarChart2 className="h-8 w-8 text-white" />,
  },
  {
    title: "Design Gráfico",
    description: "Layouts personalizados que comunicam e posicionam sua marca.",
    icon: <PenTool className="h-8 w-8 text-white" />,
  },
  {
    title: "Criação e Edição de Conteúdo",
    description: "Produção de vídeos e textos para redes sociais e institucionais.",
    icon: <FileText className="h-8 w-8 text-white" />,
  },
  {
    title: "Criação de Landing Pages",
    description: "Páginas otimizadas para conversão e geração de leads.",
    icon: <Layout className="h-8 w-8 text-white" />,
  },
  {
    title: "Planejamento Estratégico",
    description: "Tudo baseado na análise de dados e posicionamento.",
    icon: <Target className="h-8 w-8 text-white" />,
  },
]

export default memo(ServicesSection)

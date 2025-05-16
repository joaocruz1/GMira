"use client"

import { memo, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Search, KeyIcon as Strategy, Palette, BarChart, Zap, Repeat } from "lucide-react"

function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 relative">
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
            COMO <span className="text-purple-700 dark:text-purple-500">TRABALHAMOS</span>
          </h2>
          <p className="text-indigo-700 dark:text-gray-300 max-w-3xl mx-auto">
            Metodologia estruturada para garantir resultados consistentes e mensuráveis para o seu negócio.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Linha de conexão */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-fuchsia-600 transform -translate-x-1/2 hidden lg:block" />

          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Número e ícone do passo */}
                <div className="lg:w-1/2 flex justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative">
                    <div className="absolute -top-6 -left-6 bg-white dark:bg-black rounded-full w-14 h-14 flex items-center justify-center border-2 border-purple-500 z-20 shadow-lg">
                      <span className="text-2xl font-bold text-purple-700 dark:text-purple-500">{index + 1}</span>
                    </div>

                    <Card className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-10 rounded-2xl shadow-xl shadow-purple-900/20 text-white">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-white/20 p-5 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                          {step.icon}
                        </div>

                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-white/90">{step.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Detalhes do passo */}
                <div className="lg:w-1/2 space-y-4">
                  {step.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      animate={activeStep === index ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                      className="bg-white/90 dark:bg-purple-900/20 backdrop-blur-sm p-5 rounded-xl border border-purple-200/50 dark:border-purple-900/50 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-purple-900/20 transition-all duration-300"
                    >
                      <p className="text-indigo-700 dark:text-gray-200">{detail}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const processSteps = [
  {
    title: "Diagnóstico",
    description: "Análise profunda do seu negócio, mercado e concorrência para entender o cenário atual.",
    icon: <Search className="h-12 w-12 text-white" />,
    details: [
      "Análise da presença digital atual e identificação de oportunidades",
      "Estudo da concorrência e benchmarking de mercado",
      "Definição de objetivos claros e mensuráveis",
      "Identificação do público-alvo e suas necessidades",
    ],
  },
  {
    title: "Estratégia",
    description: "Desenvolvimento de um plano personalizado com base nos objetivos do seu negócio.",
    icon: <Strategy className="h-12 w-12 text-white" />,
    details: [
      "Definição de canais e formatos de conteúdo mais adequados",
      "Planejamento de campanhas de anúncios e segmentação",
      "Criação de calendário editorial e estratégia de conteúdo",
      "Estabelecimento de KPIs e métricas de sucesso",
    ],
  },
  {
    title: "Criação",
    description: "Produção de conteúdo de alta qualidade que comunica a essência da sua marca.",
    icon: <Palette className="h-12 w-12 text-white" />,
    details: [
      "Design de materiais visuais alinhados com sua identidade",
      "Copywriting persuasivo para diferentes plataformas",
      "Produção de vídeos e conteúdos interativos",
      "Desenvolvimento de landing pages otimizadas para conversão",
    ],
  },
  {
    title: "Execução",
    description: "Implementação da estratégia com foco em qualidade e consistência.",
    icon: <Zap className="h-12 w-12 text-white" />,
    details: [
      "Publicação e gerenciamento de conteúdo nas redes sociais",
      "Configuração e otimização de campanhas de anúncios",
      "Gerenciamento de comunidade e interação com o público",
      "Implementação de automações e integrações",
    ],
  },
  {
    title: "Análise",
    description: "Monitoramento contínuo de resultados para otimização da estratégia.",
    icon: <BarChart className="h-12 w-12 text-white" />,
    details: [
      "Análise de métricas e KPIs definidos na estratégia",
      "Identificação de oportunidades de melhoria",
      "Testes A/B para otimização contínua",
      "Relatórios periódicos com insights acionáveis",
    ],
  },
  {
    title: "Otimização",
    description: "Refinamento contínuo da estratégia com base nos dados e resultados obtidos.",
    icon: <Repeat className="h-12 w-12 text-white" />,
    details: [
      "Ajustes na estratégia com base nos resultados",
      "Implementação de novas táticas e abordagens",
      "Escala das ações que estão gerando melhores resultados",
      "Adaptação às mudanças do mercado e algoritmos",
    ],
  },
]

export default memo(ProcessSection)

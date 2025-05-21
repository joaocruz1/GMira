"use client"

import { memo } from "react"
import { motion } from "framer-motion"

function ServiceProcess() {
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
            COMO <span className="text-purple-500">TRABALHAMOS</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Nossa metodologia é estruturada para garantir resultados consistentes e mensuráveis para o seu negócio.
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha de conexão */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-fuchsia-600 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                {/* Número do passo */}
                <div className="md:w-1/2 flex justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative">
                    <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl p-8 md:p-10 shadow-xl shadow-purple-900/20">
                      <div className="absolute -top-5 -left-5 bg-black rounded-full w-12 h-12 flex items-center justify-center border-2 border-purple-500">
                        <span className="text-xl font-bold text-purple-500">{index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-white/90">{step.description}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Detalhes do passo */}
                <div className="md:w-1/2 space-y-6">
                  <ul className="space-y-4">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-purple-900/20 backdrop-blur-sm p-4 rounded-lg border border-purple-900/50"
                      >
                        <p className="text-gray-200">{detail}</p>
                      </motion.li>
                    ))}
                  </ul>
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
    description: "Analisamos seu negócio, mercado e concorrência para entender o cenário atual.",
    details: [
      "Análise da presença digital atual",
      "Identificação de oportunidades e desafios",
      "Estudo da concorrência e benchmarking",
      "Definição de objetivos claros e mensuráveis",
    ],
  },
  {
    title: "Estratégia",
    description: "Desenvolvemos um plano personalizado com base nos objetivos do seu negócio.",
    details: [
      "Definição de canais e formatos de conteúdo",
      "Planejamento de campanhas de anúncios",
      "Criação de calendário editorial",
      "Estabelecimento de KPIs e métricas de sucesso",
    ],
  },
  {
    title: "Execução",
    description: "Colocamos a estratégia em prática com foco em qualidade e consistência.",
    details: [
      "Produção de conteúdo para redes sociais",
      "Configuração e otimização de campanhas",
      "Gerenciamento de comunidade",
      "Implementação de landing pages e materiais",
    ],
  },
  {
    title: "Análise e Otimização",
    description: "Monitoramos resultados e otimizamos continuamente para maximizar o desempenho.",
    details: [
      "Análise de métricas e KPIs",
      "Identificação de oportunidades de melhoria",
      "Testes A/B para otimização contínua",
      "Relatórios periódicos com insights acionáveis",
    ],
  },
]

export default memo(ServiceProcess)

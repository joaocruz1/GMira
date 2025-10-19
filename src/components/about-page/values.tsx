"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Target, TrendingUp, Lightbulb, Users, BarChart, Clock } from "lucide-react"

function Values() {
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
            MEUS <span className="text-purple-500">VALORES</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Princípios que guiam meu trabalho e definem como entrego valor para meus clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-full"
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-black/60 backdrop-blur-sm border border-purple-900/30 p-8 rounded-xl h-full hover:border-purple-500/50 transition-all duration-300">
                  <div className="bg-purple-900/50 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                    {value.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const values = [
  {
    title: "Resultados Mensuráveis",
    description:
      "Foco em métricas e KPIs que realmente importam para o crescimento do seu negócio, não apenas números vazios.",
    icon: <BarChart className="h-8 w-8 text-purple-300" />,
  },
  {
    title: "Transparência",
    description: "Comunicação clara e honesta sobre estratégias, resultados e desafios, sem promessas irrealistas.",
    icon: <Target className="h-8 w-8 text-purple-300" />,
  },
  {
    title: "Inovação Constante",
    description:
      "Atualização contínua sobre tendências e novas ferramentas para manter sua marca à frente da concorrência.",
    icon: <Lightbulb className="h-8 w-8 text-purple-300" />,
  },
  {
    title: "Crescimento Sustentável",
    description:
      "Estratégias que geram resultados consistentes e duradouros, não apenas picos temporários de performance.",
    icon: <TrendingUp className="h-8 w-8 text-purple-300" />,
  },
  {
    title: "Foco no Cliente",
    description: "Entendimento profundo do seu público para criar conexões genuínas e mensagens que realmente ressoam.",
    icon: <Users className="h-8 w-8 text-purple-300" />,
  },
  {
    title: "Eficiência",
    description: "Otimização de processos e recursos para maximizar o retorno sobre o investimento em marketing.",
    icon: <Clock className="h-8 w-8 text-purple-300" />,
  },
]

export default memo(Values)

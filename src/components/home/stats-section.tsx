"use client"

import { memo, useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Award, Target } from "lucide-react"

function StatsSection() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f9f8ff] to-white dark:from-black dark:via-purple-950/10 dark:to-black" />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-50/80 dark:bg-purple-600/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-50/80 dark:bg-fuchsia-600/10 blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-indigo-950 dark:text-white">
            RESULTADOS <span className="text-purple-700 dark:text-purple-500">COMPROVADOS</span>
          </h2>
          <p className="text-indigo-700 dark:text-gray-300 max-w-3xl mx-auto">
            Números que demonstram a eficácia das nossas estratégias e o impacto que podemos gerar para o seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/95 dark:bg-black/60 backdrop-blur-md border border-purple-100/50 dark:border-purple-900/50 hover:border-purple-300/50 dark:hover:border-purple-600 transition-all p-8 rounded-xl overflow-hidden h-full hover:shadow-lg dark:hover:shadow-purple-900/20 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center shadow-md">
                    {stat.icon}
                  </div>
                </div>

                <CountUpAnimation
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold text-indigo-950 dark:text-white mb-2"
                />

                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-3">{stat.label}</h3>
                <p className="text-indigo-700 dark:text-gray-300">{stat.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface CountUpAnimationProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

function CountUpAnimation({ target, duration = 2, prefix = "", suffix = "", className = "" }: CountUpAnimationProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, target, duration])

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

const stats = [
  {
    value: 150,
    prefix: "+",
    suffix: "%",
    label: "Aumento em Engajamento",
    description: "Média de crescimento no engajamento das redes sociais dos nossos clientes.",
    icon: <Users className="h-8 w-8 text-white" />,
  },
  {
    value: 200,
    prefix: "+",
    suffix: "%",
    label: "ROI em Campanhas",
    description: "Retorno médio sobre investimento nas campanhas de tráfego pago.",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
  },
  {
    value: 40,
    prefix: "-",
    suffix: "%",
    label: "Redução de CAC",
    description: "Redução média no custo de aquisição de clientes.",
    icon: <Target className="h-8 w-8 text-white" />,
  },
  {
    value: 50,
    prefix: "",
    suffix: "+",
    label: "Projetos Concluídos",
    description: "Clientes satisfeitos com resultados comprovados.",
    icon: <Award className="h-8 w-8 text-white" />,
  },
]

export default memo(StatsSection)

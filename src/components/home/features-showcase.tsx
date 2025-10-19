"use client"

import { memo, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, BarChart2, Target, PenTool, Users, CheckCircle } from "lucide-react"

function FeaturesShowcase() {
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
              Marketing Digital <span className="text-purple-400">Completo</span>
            </h2>
            <p className="text-gray-200 max-w-3xl mx-auto">
              Uma abordagem integrada que combina estratégia, criatividade e análise de dados para maximizar seus
              resultados online.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-purple-900/20 to-black/60 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30 hover:border-purple-600/50 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 text-purple-400 group-hover:text-white group-hover:from-purple-600 group-hover:to-fuchsia-600 transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-3">{feature.description}</p>

                  <div className="flex items-center text-purple-500 text-sm font-medium">
                    <span>Saiba mais</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 bg-gradient-to-br from-purple-900/30 to-black/60 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Por que escolher a GMira?
              </h3>

              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="mr-2 mt-1 text-green-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-2xl blur-xl" />

              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/80 backdrop-blur-sm rounded-2xl p-2 border border-purple-900/30 overflow-hidden">
                <Image
                  src="/marketing-dashboard.svg"
                  alt="Marketing Dashboard"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />

                <div className="absolute bottom-6 right-6">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold py-1 px-3 rounded-full"
                  >
                    RESULTADOS EM TEMPO REAL
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <BarChart2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-black font-bold text-sm">+127%</p>
                    <p className="text-gray-500 text-xs">Aumento no tráfego</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-black font-bold text-sm">+85%</p>
                    <p className="text-gray-500 text-xs">Leads qualificados</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Tráfego Pago",
    description: "Campanhas otimizadas que atraem clientes qualificados e maximizam seu ROI.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Gestão de Redes",
    description: "Estratégias de conteúdo que engajam seu público e fortalecem sua marca.",
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Design & Criação",
    description: "Conteúdo visual impactante que comunica a essência da sua marca.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Estratégia Digital",
    description: "Planejamento estratégico baseado em dados para resultados consistentes.",
  },
]

const benefits = [
  "Resultados mensuráveis e transparentes",
  "Estratégias personalizadas para seu negócio",
  "Especialista dedicado para sua conta",
  "Relatórios detalhados de performance",
  "Otimização contínua de campanhas",
]

export default memo(FeaturesShowcase)

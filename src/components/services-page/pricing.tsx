"use client"

import { memo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const handlePlanClick = (planName: string) => {
    const phoneNumber = "553599574977"
    const message = `Olá, gostaria de saber mais sobre o plano ${planName}!`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

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
            PLANOS E <span className="text-purple-500">INVESTIMENTOS</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu negócio e comece a transformar sua presença digital.
          </p>
        </motion.div>

        {/* Toggle de planos */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-purple-900/20 p-1 rounded-full flex items-center"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAnnual
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Anual <span className="text-xs font-bold text-green-400 ml-1">-20%</span>
            </button>
          </motion.div>
        </div>

        {/* Cards de preços */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-2xl overflow-hidden border ${
                  plan.popular ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-gray-800"
                }`}
              >
                <div
                  className={`p-8 h-full flex flex-col ${
                    plan.popular ? "bg-gradient-to-b from-purple-900/40 to-black" : "bg-black/60"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full self-start mb-4">
                      Mais Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {isAnnual ? `R$${Math.round(plan.price * 0.8 * 12)}` : `R$${plan.price}`}
                    </span>
                    <span className="text-gray-400 ml-2">{isAnnual ? "/ano" : "/mês"}</span>

                    {isAnnual && (
                      <div className="text-green-400 text-sm mt-2">
                        Economia de R${Math.round(plan.price * 0.2 * 12)} por ano
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="bg-purple-500/20 p-1 rounded-full mt-1 flex-shrink-0">
                          <Check className="h-3 w-3 text-purple-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(plan.name)}
                    className={`w-full py-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white"
                        : "bg-purple-900/30 hover:bg-purple-900/50 text-white border border-purple-900/50"
                    }`}
                  >
                    Escolher Plano
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Nota sobre planos personalizados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-gray-400"
        >
          <p>
            Precisa de um plano personalizado?{" "}
            <a href="/contato" className="text-purple-400 hover:text-purple-300 underline">
              Entre em contato
            </a>{" "}
            para uma proposta sob medida.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const pricingPlans = [
  {
    name: "Essencial",
    description: "Ideal para pequenos negócios que estão começando no digital",
    price: 997,
    features: [
      "Gestão de 2 redes sociais",
      "12 posts mensais",
      "4 stories por semana",
      "Relatório mensal de desempenho",
      "Suporte por e-mail",
      "1 campanha de anúncios básica",
    ],
    popular: false,
  },
  {
    name: "Profissional",
    description: "Perfeito para negócios em crescimento que buscam expandir sua presença",
    price: 1997,
    features: [
      "Gestão de 3 redes sociais",
      "20 posts mensais",
      "8 stories por semana",
      "2 reels/vídeos por mês",
      "Gestão de tráfego completa",
      "Relatórios quinzenais",
      "Suporte prioritário",
      "1 landing page por trimestre",
    ],
    popular: true,
  },
  {
    name: "Empresarial",
    description: "Solução completa para empresas que exigem resultados de alto nível",
    price: 3997,
    features: [
      "Gestão de 4 redes sociais",
      "30 posts mensais",
      "12 stories por semana",
      "4 reels/vídeos por mês",
      "Gestão de tráfego avançada",
      "Estratégia de conteúdo personalizada",
      "Relatórios semanais",
      "Suporte VIP com atendimento dedicado",
      "2 landing pages por trimestre",
      "Consultoria estratégica mensal",
    ],
    popular: false,
  },
]

export default memo(Pricing)

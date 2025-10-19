"use client"

import { memo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

function FAQ() {
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
            PERGUNTAS <span className="text-purple-500">FREQUENTES</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e como podemos ajudar seu negócio.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-r from-purple-900/40 to-purple-800/20 shadow-md"
            : "bg-purple-900/20 hover:bg-purple-900/30"
        }`}
      >
        <span className="font-medium text-white">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-purple-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-purple-900/10 rounded-b-lg border-t border-purple-900/20">
              <p className="text-gray-300">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const faqItems = [
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "O tempo para resultados varia conforme o serviço e o mercado. Geralmente, melhorias no engajamento são perceptíveis nos primeiros 30 dias. Para resultados mais significativos em tráfego e conversões, o prazo médio é de 2 a 3 meses de trabalho consistente.",
  },
  {
    question: "Vocês trabalham com contratos de fidelidade?",
    answer:
      "Trabalhamos com contratos mensais, trimestrais ou anuais. Os planos trimestrais e anuais oferecem descontos especiais. Não exigimos fidelidade de longo prazo, mas recomendamos no mínimo 3 meses para avaliar resultados consistentes.",
  },
  {
    question: "Como funciona o processo de onboarding?",
    answer:
      "Após a contratação, realizamos uma reunião de kickoff para alinhar expectativas e coletar informações essenciais sobre sua marca. Em seguida, desenvolvemos a estratégia inicial, criamos o calendário de conteúdo e definimos as métricas de acompanhamento. Todo o processo leva cerca de uma semana.",
  },
  {
    question: "Vocês atendem a qualquer tipo de negócio?",
    answer:
      "Atendemos diversos segmentos, mas nos especializamos em e-commerces, serviços profissionais, clínicas e pequenos negócios locais. Avaliamos cada caso para garantir que podemos entregar resultados de qualidade para o seu segmento específico.",
  },
  {
    question: "Como são feitos os relatórios de resultados?",
    answer:
      "Fornecemos relatórios periódicos (semanais, quinzenais ou mensais, dependendo do plano) com métricas relevantes para seu negócio. Os relatórios incluem dados de engajamento, alcance, conversões, ROI de campanhas e recomendações estratégicas para o próximo período.",
  },
  {
    question: "Posso cancelar o serviço a qualquer momento?",
    answer:
      "Sim, você pode cancelar o serviço com um aviso prévio de 30 dias, conforme estabelecido em contrato. Não aplicamos multas por cancelamento, apenas cobramos pelo período trabalhado.",
  },
]

export default memo(FAQ)

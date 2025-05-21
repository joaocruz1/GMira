"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/header"
import dynamic from "next/dynamic"

// Lazy load background
const ParallaxBackground = dynamic(() => import("@/components/home/parallax-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black"></div>,
})

export default function StartPage() {
  const [step, setStep] = useState(1)
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const containerRef = useRef(null)

  const handleBusinessSelect = (business: string) => {
    setSelectedBusiness(business)
  }

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal))
    } else {
      setSelectedGoals([...selectedGoals, goal])
    }
  }

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const nextStep = () => {
    if (
      (step === 1 && !selectedBusiness) ||
      (step === 2 && selectedGoals.length === 0) ||
      (step === 3 && selectedServices.length === 0) ||
      (step === 4 && (!formData.name || !formData.email))
    ) {
      return
    }

    if (step < 5) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Parallax Background - passando null para indicar que não queremos efeito de scroll */}
      <ParallaxBackground scrollYProgress={null} />

      <Header />

      <div className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Progress bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 h-2 rounded-full"
                initial={{ width: "20%" }}
                animate={{ width: `${step * 20}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-colors duration-300 ${
                      step > i + 1
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600"
                        : step === i + 1
                          ? "bg-gradient-to-r from-purple-700 to-fuchsia-700 border-2 border-white"
                          : "bg-gray-800"
                    }`}
                  >
                    {step > i + 1 ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-white font-bold">{i + 1}</span>
                    )}
                  </div>
                  <p
                    className={`text-xs md:text-sm transition-colors duration-300 ${
                      step === i + 1 ? "text-white font-medium" : "text-gray-400"
                    }`}
                  >
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <StepContent key="step1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Qual é o seu tipo de negócio?</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessTypes.map((business, index) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => handleBusinessSelect(business.id)}
                        className={`bg-gradient-to-br ${
                          selectedBusiness === business.id
                            ? "from-purple-900/50 to-fuchsia-900/30 border-purple-500"
                            : "from-purple-900/20 to-black/60 border-purple-900/30 hover:border-purple-600/50"
                        } backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              selectedBusiness === business.id
                                ? "bg-gradient-to-r from-purple-600 to-fuchsia-600"
                                : "bg-purple-900/50"
                            } transition-colors duration-300`}
                          >
                            {business.icon}
                          </div>

                          <h3 className="text-xl font-bold">{business.title}</h3>
                          <p className="text-gray-400 text-sm">{business.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </StepContent>
              )}

              {step === 2 && (
                <StepContent key="step2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                    Quais são seus principais objetivos?
                  </h2>
                  <p className="text-gray-300 text-center mb-10">Selecione todos que se aplicam</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessGoals.map((goal, index) => (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => handleGoalToggle(goal.id)}
                        className={`bg-gradient-to-br ${
                          selectedGoals.includes(goal.id)
                            ? "from-purple-900/50 to-fuchsia-900/30 border-purple-500"
                            : "from-purple-900/20 to-black/60 border-purple-900/30 hover:border-purple-600/50"
                        } backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                              selectedGoals.includes(goal.id)
                                ? "bg-gradient-to-r from-purple-600 to-fuchsia-600"
                                : "bg-purple-900/50"
                            } transition-colors duration-300`}
                          >
                            {goal.icon}
                          </div>

                          <div>
                            <h3 className="text-lg font-bold">{goal.title}</h3>
                            <p className="text-gray-400 text-sm">{goal.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </StepContent>
              )}

              {step === 3 && (
                <StepContent key="step3">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Quais serviços você precisa?</h2>
                  <p className="text-gray-300 text-center mb-10">Selecione todos que se aplicam</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {marketingServices.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`bg-gradient-to-br ${
                          selectedServices.includes(service.id)
                            ? "from-purple-900/50 to-fuchsia-900/30 border-purple-500"
                            : "from-purple-900/20 to-black/60 border-purple-900/30 hover:border-purple-600/50"
                        } backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                              selectedServices.includes(service.id)
                                ? "bg-gradient-to-r from-purple-600 to-fuchsia-600"
                                : "bg-purple-900/50"
                            } transition-colors duration-300`}
                          >
                            {service.icon}
                          </div>

                          <div>
                            <h3 className="text-lg font-bold">{service.title}</h3>
                            <p className="text-gray-400 text-sm">{service.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </StepContent>
              )}

              {step === 4 && (
                <StepContent key="step4">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Seus dados de contato</h2>
                  <p className="text-gray-300 text-center mb-10">
                    Compartilhe suas informações para recebermos sua proposta
                  </p>

                  <div className="bg-gradient-to-br from-purple-900/30 to-black/60 backdrop-blur-sm rounded-xl p-8 border border-purple-900/30">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Nome Completo*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-purple-900/20 border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          E-mail*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-purple-900/20 border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="seu.email@exemplo.com"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-purple-900/20 border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </StepContent>
              )}

              {step === 5 && (
                <StepContent key="step5">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6"
                    >
                      <Check className="h-10 w-10 text-white" />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Proposta Enviada com Sucesso!</h2>
                    <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                      Obrigado, {formData.name}! Sua proposta foi enviada e entraremos em contato em breve para discutir
                      os próximos passos.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/30 to-black/60 backdrop-blur-sm rounded-xl p-8 border border-purple-900/30 mb-8">
                    <h3 className="text-xl font-bold mb-4">Resumo da sua solicitação:</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Tipo de Negócio:</p>
                        <p className="font-medium">
                          {businessTypes.find((b) => b.id === selectedBusiness)?.title || "Não especificado"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Objetivos:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedGoals.map((goalId) => (
                            <li key={goalId}>{businessGoals.find((g) => g.id === goalId)?.title || ""}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Serviços:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedServices.map((serviceId) => (
                            <li key={serviceId}>{marketingServices.find((s) => s.id === serviceId)?.title || ""}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-xl">
                        <span>Voltar para Home</span>
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>

                    <Link href="/servicos">
                      <Button
                        variant="outline"
                        className="border-purple-500/30 text-white hover:bg-purple-900/20 px-8 py-4 rounded-xl"
                      >
                        <span>Ver Todos os Serviços</span>
                      </Button>
                    </Link>
                  </div>
                </StepContent>
              )}
            </AnimatePresence>

            {step < 5 && (
              <div className="flex justify-between mt-12">
                {step > 1 ? (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-purple-500/30 text-white hover:bg-purple-900/20"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    <span>Anterior</span>
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !selectedBusiness) ||
                    (step === 2 && selectedGoals.length === 0) ||
                    (step === 3 && selectedServices.length === 0) ||
                    (step === 4 && (!formData.name || !formData.email))
                  }
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{step === 4 ? "Enviar" : "Próximo"}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const StepContent = ({ children, key }: { children: React.ReactNode; key: string }) => (
  <motion.div
    key={key}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="mb-8"
  >
    {children}
  </motion.div>
)

const steps = ["Seu Negócio", "Objetivos", "Serviços", "Seus Dados", "Confirmação"]

const businessTypes = [
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Loja online que vende produtos físicos ou digitais",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    id: "service",
    title: "Serviços",
    description: "Empresa que oferece serviços profissionais",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "local",
    title: "Negócio Local",
    description: "Empresa com presença física local",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "agency",
    title: "Agência/Consultoria",
    description: "Empresa que presta serviços especializados",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "saas",
    title: "Software/SaaS",
    description: "Empresa de tecnologia/software como serviço",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  },
  {
    id: "other",
    title: "Outro",
    description: "Outro tipo de negócio ou projeto",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
]

const businessGoals = [
  {
    id: "brand",
    title: "Aumentar Reconhecimento da Marca",
    description: "Ampliar a visibilidade e notoriedade da sua marca",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    id: "sales",
    title: "Aumentar Vendas/Conversões",
    description: "Gerar mais vendas, leads e conversões",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "engagement",
    title: "Aumentar Engajamento",
    description: "Melhorar interação e relacionamento com clientes",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
    ),
  },
  {
    id: "loyalty",
    title: "Fidelizar Clientes",
    description: "Melhorar retenção e lealdade dos clientes",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: "traffic",
    title: "Aumentar Tráfego",
    description: "Atrair mais visitantes para seu site ou loja",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
    ),
  },
  {
    id: "authority",
    title: "Estabelecer Autoridade",
    description: "Posicionar-se como referência no seu segmento",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
  },
]

const marketingServices = [
  {
    id: "social-media",
    title: "Gestão de Redes Sociais",
    description: "Criação e gerenciamento de conteúdo para redes sociais",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: "paid-ads",
    title: "Tráfego Pago",
    description: "Campanhas de anúncios no Google, Facebook, Instagram, etc.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
  },
  {
    id: "content",
    title: "Criação de Conteúdo",
    description: "Produção de textos, vídeos e materiais para mídias digitais",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: "design",
    title: "Design Gráfico",
    description: "Criação de identidade visual e materiais gráficos",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Email Marketing",
    description: "Estratégias de comunicação por email e automação",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "seo",
    title: "SEO",
    description: "Otimização para mecanismos de busca",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    id: "website",
    title: "Criação de Site/Landing Page",
    description: "Desenvolvimento de sites e páginas de conversão",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "strategy",
    title: "Consultoria Estratégica",
    description: "Planejamento e direcionamento para marketing digital",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
]

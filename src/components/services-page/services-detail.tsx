"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Target, BarChart2, PenTool, Layout, FileText, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function ServicesDetail() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-12 items-center mb-32 last:mb-0`}
          >
            {/* Imagem */}
            <div className="w-full lg:w-1/2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20"
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </motion.div>
            </div>

            {/* Conteúdo */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-900 p-4 rounded-lg">{service.icon}</div>
                <h2 className="text-3xl font-bold">{service.title}</h2>
              </div>

              <p className="text-gray-300 text-lg">{service.description}</p>

              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="bg-purple-500/20 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-purple-400" />
                    </div>
                    <p className="text-gray-300">{feature}</p>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium mt-4"
                >
                  <span>Saiba mais sobre este serviço</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const services = [
  {
    id: "social-media",
    title: "Gestão de Redes Sociais",
    description:
      "Cuidamos de toda a presença da sua marca nas redes sociais, desde a criação de conteúdo até o gerenciamento de comunidade e análise de resultados.",
    icon: <Users className="h-8 w-8 text-white" />,
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Planejamento estratégico de conteúdo",
      "Criação e design de posts para feed e stories",
      "Copywriting otimizado para cada plataforma",
      "Calendário editorial personalizado",
      "Gerenciamento de comunidade e interações",
      "Relatórios mensais de desempenho",
    ],
  },
  {
    id: "traffic",
    title: "Gestão de Tráfego",
    description:
      "Criamos e otimizamos campanhas de anúncios que geram resultados reais, com foco em conversão e retorno sobre investimento.",
    icon: <BarChart2 className="h-8 w-8 text-white" />,
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Estratégia de campanhas para Meta Ads e Google Ads",
      "Segmentação avançada de público",
      "Criação de anúncios de alta conversão",
      "Otimização contínua de campanhas",
      "Teste A/B para maximizar resultados",
      "Relatórios detalhados de performance",
    ],
  },
  {
    id: "design",
    title: "Design Gráfico",
    description:
      "Desenvolvemos materiais visuais que comunicam a essência da sua marca e capturam a atenção do seu público-alvo.",
    icon: <PenTool className="h-8 w-8 text-white" />,
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Identidade visual e branding",
      "Posts para redes sociais",
      "Materiais promocionais",
      "Banners e peças para anúncios",
      "Apresentações e propostas comerciais",
      "Templates personalizados",
    ],
  },
  {
    id: "content",
    title: "Criação e Edição de Conteúdo",
    description:
      "Produzimos conteúdos que engajam, educam e convertem, desde textos persuasivos até vídeos de alta qualidade.",
    icon: <FileText className="h-8 w-8 text-white" />,
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Produção de vídeos para redes sociais",
      "Edição profissional de vídeo",
      "Copywriting para diversos formatos",
      "Criação de conteúdo para blog",
      "Roteiros para vídeos e podcasts",
      "E-books e materiais ricos",
    ],
  },
  {
    id: "landing-pages",
    title: "Criação de Landing Pages",
    description: "Desenvolvemos páginas otimizadas para conversão que transformam visitantes em leads e clientes.",
    icon: <Layout className="h-8 w-8 text-white" />,
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Design personalizado e responsivo",
      "Copywriting persuasivo",
      "Otimização para conversão (CRO)",
      "Integração com ferramentas de marketing",
      "Testes A/B para maximizar resultados",
      "Análise de comportamento do usuário",
    ],
  },
  {
    id: "strategy",
    title: "Planejamento Estratégico",
    description:
      "Desenvolvemos estratégias de marketing digital baseadas em dados e alinhadas aos objetivos do seu negócio.",
    icon: <Target className="h-8 w-8 text-white" />,
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Análise de mercado e concorrência",
      "Definição de persona e jornada do cliente",
      "Planejamento de canais e conteúdo",
      "Estratégia de funil de vendas",
      "KPIs e métricas de acompanhamento",
      "Revisões trimestrais e ajustes estratégicos",
    ],
  },
]

export default memo(ServicesDetail)

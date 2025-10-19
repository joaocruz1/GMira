"use client"

import { memo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Globe, ExternalLink, X, Check, TrendingUp } from "lucide-react"

function PortfolioGrid() {
  const [filter, setFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<null | number>(null)

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            PROJETOS <span className="text-purple-500">RECENTES</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Uma seleção dos nossos melhores trabalhos em diferentes segmentos e plataformas.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((item) => (
            <Button
              key={item.value}
              onClick={() => setFilter(item.value)}
              variant={filter === item.value ? "default" : "outline"}
              className={`rounded-full px-6 ${
                filter === item.value
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                  : "bg-purple-900/20 text-gray-300 hover:bg-purple-900/40 hover:text-white"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </motion.div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-purple-900/20 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-900/30 h-full"
                >
                  {/* Imagem do projeto */}
                  <div
                    className="relative overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="outline"
                        className="bg-purple-900/50 border-purple-500/50 text-white hover:bg-purple-800/70"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>

                  {/* Informações do projeto */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="bg-purple-900/50 text-purple-300 text-xs px-3 py-1 rounded-full">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-900/30 hover:bg-purple-900/50 p-2 rounded-full transition-colors duration-300"
                          aria-label={link.type}
                        >
                          {link.type === "instagram" && <Instagram className="h-5 w-5 text-purple-300" />}
                          {link.type === "facebook" && <Facebook className="h-5 w-5 text-purple-300" />}
                          {link.type === "website" && <Globe className="h-5 w-5 text-purple-300" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal de detalhes do projeto */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-purple-900/40 to-black/90 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {projects.find((p) => p.id === selectedProject) && (
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {projects.find((p) => p.id === selectedProject)?.title}
                      </h3>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="bg-purple-900/30 hover:bg-purple-900/50 p-2 rounded-full transition-colors duration-300"
                      >
                        <X className="h-6 w-6 text-white" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Image
                          src={projects.find((p) => p.id === selectedProject)?.image || ""}
                          alt={projects.find((p) => p.id === selectedProject)?.title || ""}
                          width={600}
                          height={400}
                          className="w-full h-auto rounded-xl"
                        />

                        <div className="flex gap-4 mt-6">
                          {projects
                            .find((p) => p.id === selectedProject)
                            ?.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-purple-900/30 hover:bg-purple-900/50 px-4 py-2 rounded-lg transition-colors duration-300"
                              >
                                {link.type === "instagram" && <Instagram className="h-5 w-5 text-purple-300" />}
                                {link.type === "facebook" && <Facebook className="h-5 w-5 text-purple-300" />}
                                {link.type === "website" && <Globe className="h-5 w-5 text-purple-300" />}
                                <span>Visitar {link.type}</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-purple-400">Sobre o Projeto</h4>
                          <p className="text-gray-300">
                            {projects.find((p) => p.id === selectedProject)?.fullDescription}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-2 text-purple-400">Serviços Realizados</h4>
                          <ul className="space-y-2">
                            {projects
                              .find((p) => p.id === selectedProject)
                              ?.services.map((service, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="bg-purple-500/20 p-1 rounded-full mt-1">
                                    <Check className="h-3 w-3 text-purple-400" />
                                  </div>
                                  <span className="text-gray-300">{service}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-2 text-purple-400">Resultados</h4>
                          <ul className="space-y-2">
                            {projects
                              .find((p) => p.id === selectedProject)
                              ?.results.map((result, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="bg-green-500/20 p-1 rounded-full mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-400" />
                                  </div>
                                  <span className="text-gray-300">{result}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

const filters = [
  { label: "Todos", value: "all" },
  { label: "Redes Sociais", value: "social" },
  { label: "Tráfego Pago", value: "traffic" },
  { label: "Design", value: "design" },
  { label: "Landing Pages", value: "landing" },
]

const projects = [
  {
    id: 1,
    title: "Boutique Elegance",
    category: "social",
    categoryLabel: "Redes Sociais",
    description: "Gestão completa de redes sociais para loja de roupas femininas de alto padrão.",
    fullDescription:
      "Desenvolvimento de estratégia de conteúdo e gestão completa das redes sociais para a Boutique Elegance, uma loja de roupas femininas de alto padrão. O projeto incluiu a criação de identidade visual para o feed, produção de conteúdo, copywriting e gestão de comunidade.",
    image: "/placeholder.svg?height=400&width=600",
    links: [
      { type: "instagram", url: "https://instagram.com" },
      { type: "facebook", url: "https://facebook.com" },
    ],
    services: [
      "Planejamento estratégico de conteúdo",
      "Criação de identidade visual para feed",
      "Produção de conteúdo para feed e stories",
      "Copywriting",
      "Gestão de comunidade",
    ],
    results: [
      "Aumento de 150% no engajamento",
      "Crescimento de 80% em seguidores em 6 meses",
      "Aumento de 120% em vendas originadas do Instagram",
    ],
  },
  {
    id: 2,
    title: "Tech Solutions",
    category: "traffic",
    categoryLabel: "Tráfego Pago",
    description: "Campanhas de tráfego pago para empresa de soluções tecnológicas B2B.",
    fullDescription:
      "Desenvolvimento e gestão de campanhas de tráfego pago para a Tech Solutions, empresa de soluções tecnológicas B2B. O projeto incluiu a criação de estratégia de anúncios, segmentação avançada de público, criação de criativos e otimização contínua de campanhas.",
    image: "/placeholder.svg?height=400&width=600",
    links: [
      { type: "website", url: "https://example.com" },
      { type: "linkedin", url: "https://linkedin.com" },
    ],
    services: [
      "Estratégia de campanhas para Google Ads e LinkedIn Ads",
      "Segmentação avançada de público",
      "Criação de anúncios de alta conversão",
      "Otimização contínua de campanhas",
      "Relatórios detalhados de performance",
    ],
    results: [
      "Redução de 40% no custo por lead",
      "Aumento de 90% na taxa de conversão",
      "ROI de 320% nas campanhas de Google Ads",
    ],
  },
  {
    id: 3,
    title: "Café Aroma",
    category: "design",
    categoryLabel: "Design",
    description: "Redesign de identidade visual para cafeteria artesanal.",
    fullDescription:
      "Redesign completo da identidade visual do Café Aroma, uma cafeteria artesanal. O projeto incluiu a criação de logo, paleta de cores, tipografia, materiais impressos e templates para redes sociais.",
    image: "/placeholder.svg?height=400&width=600",
    links: [
      { type: "instagram", url: "https://instagram.com" },
      { type: "website", url: "https://example.com" },
    ],
    services: [
      "Redesign de logo",
      "Desenvolvimento de identidade visual completa",
      "Criação de materiais impressos",
      "Design de cardápio",
      "Templates para redes sociais",
    ],
    results: [
      "Aumento de 70% no reconhecimento de marca",
      "Crescimento de 50% em novos clientes",
      "Feedback positivo de 95% dos clientes sobre a nova identidade",
    ],
  },
  {
    id: 4,
    title: "Clínica Saúde Integral",
    category: "landing",
    categoryLabel: "Landing Page",
    description: "Desenvolvimento de landing pages para captação de leads para clínica médica.",
    fullDescription:
      "Desenvolvimento de landing pages otimizadas para conversão para a Clínica Saúde Integral. O projeto incluiu a criação de páginas para diferentes especialidades médicas, com foco em captação de leads e agendamento de consultas.",
    image: "/placeholder.svg?height=400&width=600",
    links: [
      { type: "website", url: "https://example.com" },
      { type: "facebook", url: "https://facebook.com" },
    ],
    services: [
      "Design personalizado e responsivo",
      "Copywriting persuasivo",
      "Otimização para conversão (CRO)",
      "Integração com sistema de agendamento",
      "Testes A/B para maximizar resultados",
    ],
    results: [
      "Taxa de conversão de 15% (3x acima da média do setor)",
      "Redução de 60% no custo por lead",
      "Aumento de 200% em agendamentos online",
    ],
  },
  {
    id: 5,
    title: "Fitness Pro",
    category: "social",
    categoryLabel: "Redes Sociais",
    description: "Estratégia de conteúdo para academia de alto padrão.",
    fullDescription:
      "Desenvolvimento de estratégia de conteúdo e gestão de redes sociais para a Fitness Pro, uma academia de alto padrão. O projeto incluiu a criação de conteúdo educativo, motivacional e promocional, além de gestão de comunidade e resposta a comentários.",
    image: "/placeholder.svg?height=400&width=600",
    links: [
      { type: "instagram", url: "https://instagram.com" },
      { type: "facebook", url: "https://facebook.com" },
    ],
    services: [
      "Planejamento estratégico de conteúdo",
      "Produção de vídeos para reels e stories",
      "Criação de posts educativos e motivacionais",
      "Gestão de comunidade",
      "Campanhas promocionais sazonais",
    ],
    results: [
      "Crescimento de 200% em seguidores em 4 meses",
      "Aumento de 180% no engajamento",
      "Crescimento de 70% em matrículas originadas do Instagram",
    ],
  },
  {
    id: 6,
    title: "Imobiliária Premium",
    category: "traffic",
    categoryLabel: "Tráfego Pago",
    description: "Campanhas de Facebook e Instagram Ads para imobiliária de alto padrão.",
    fullDescription:
      "Desenvolvimento e gestão de campanhas de Facebook e Instagram Ads para a Imobiliária Premium, especializada em imóveis de alto padrão. O projeto incluiu a criação de estratégia de anúncios, segmentação de público, criação de criativos e otimização contínua de campanhas.",
    image: "/placeholder.svg?height=400&width=600",
    links: [
      { type: "instagram", url: "https://instagram.com" },
      { type: "website", url: "https://example.com" },
    ],
    services: [
      "Estratégia de campanhas para Facebook e Instagram Ads",
      "Segmentação avançada de público",
      "Criação de anúncios de alta conversão",
      "Otimização contínua de campanhas",
      "Relatórios detalhados de performance",
    ],
    results: [
      "ROI de 450% nas campanhas",
      "Redução de 35% no custo por lead qualificado",
      "Aumento de 120% em visitas a imóveis",
    ],
  },
]

export default memo(PortfolioGrid)

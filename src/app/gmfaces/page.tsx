"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FadeIn from "@/components/ui/fade-in"
import { Menu, X, ChevronDown, Lock } from "lucide-react"

const niches = [
  "Todos",
  "Moda / Look / Lifestyle",
  "Beleza / Maquiagem / Skincare",
  "Fitness / Saúde / Bem-estar",
  "Alimentação / Gastronomia",
  "Moda Infantil / Maternidade",
  "Música / Artista / Performance",
  "Agro / Rural / Campo",
  "Negócios / Empreendedorismo",
  "Humor / Entretenimento",
  "Pets / Animais",
  "Relacionamentos / Vida pessoal",
  "Educação / Estudos / Profissional",
  "Esportes",
  "Games / Tecnologia",
]
const cities = ["Todas", "São Paulo", "Rio de Janeiro", "Belo Horizonte"]

function AnimatedCounter({ value, label, description }: { value: number; label: string; description?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let current = 0
    const target = value
    const increment = target / 50
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplayValue(target)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(interval)
  }, [value])

  // Determina o sufixo baseado no label
  const suffix = label.includes("Criadores") ? "+" : label.includes("Campanhas") ? "+" : "M+"

  return (
    <div className="text-center space-y-2 group cursor-default transform hover:scale-110 transition-transform duration-300">
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {displayValue}
        {suffix}
      </div>
      <p className="text-gray-300 text-sm md:text-base group-hover:text-purple-300 transition-colors duration-300 font-bold">
        {label}
      </p>
      {description && (
        <p className="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors duration-300 max-w-xs mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}

function ProcessStep({
  number,
  title,
  description,
  icon,
  delay,
}: {
  number: number
  title: string
  description: string
  icon: string
  delay: number
}) {
  return (
    <FadeIn delay={delay}>
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 hover:border-purple-500/50 p-8 rounded-xl backdrop-blur-xl transition-all duration-500 h-full transform group-hover:scale-105 group-hover:-translate-y-2">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-2xl font-bold text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-600/50">
                {number}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
      <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-white/5 hover:border-purple-500/30 p-8 rounded-xl backdrop-blur-sm transition-all duration-500 h-full transform group-hover:scale-105 group-hover:-translate-y-1">
        <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{icon}</div>
        <h4 className="text-white font-bold mb-2 text-lg group-hover:text-purple-300 transition-colors">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function GMFacesHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)

    // Detectar seção ativa baseado no scroll
    const sections = ["home", "influenciadores", "como-funciona", "para-empresas", "para-influenciadores", "contato"]
    const scrollPosition = window.scrollY + 100

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i])
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sections[i])
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Verificar seção inicial
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const headerClasses = useMemo(
    () =>
      `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`,
    [scrolled]
  )

  const navItems = [
    { id: "home", label: "Home" },
    { id: "influenciadores", label: "Influenciadores" },
    { id: "como-funciona", label: "Como Funciona" },
    { id: "para-empresas", label: "Para Empresas" },
    { id: "para-influenciadores", label: "Para Influenciadores" },
    { id: "contato", label: "Contato" },
  ]

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Image
                src="/GMfaces.png"
                alt="GM Faces Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                onClick={() => (item.id === "home" ? scrollToTop() : scrollToSection(item.id))}
                label={item.label}
                isActive={activeSection === item.id}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50"
            onClick={toggleMenu}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 bottom-0 h-screen bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center z-40 md:hidden overflow-y-auto"
              >
                <nav className="flex flex-col items-center space-y-8 py-20">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <button
                        onClick={() => (item.id === "home" ? scrollToTop() : scrollToSection(item.id))}
                        className={`text-xl font-bold transition-colors duration-300 ${
                          activeSection === item.id
                            ? "text-purple-500"
                            : "text-white hover:text-purple-400"
                        }`}
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

// Componente de botão de navegação com animação
function NavButton({
  onClick,
  label,
  isActive,
}: {
  onClick: () => void
  label: string
  isActive: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`relative font-medium text-sm transition-colors duration-300 ${
        isActive ? "text-purple-500" : "text-white hover:text-purple-400"
      }`}
    >
      {label}
      <div
        className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ${
          isActive ? "opacity-100 w-full" : "opacity-0 w-0"
        }`}
      />
    </button>
  )
}

interface ApiInfluencer {
  id: string
  name: string
  photo?: string
  city: string
  niche: string
  bio: string
  gender?: string
  followers?: string
  reach?: string
  engagement?: string
  views30Days?: string
  reach30Days?: string
  averageReels?: string
  localAudience?: string
  priceMin?: string
  priceClient?: string
  priceFinal?: string
}

export default function GMFacesCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("Todos")
  const [selectedCity, setSelectedCity] = useState("Todas")
  const [selectedGender, setSelectedGender] = useState("Todos")
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEmpresasOpen, setIsEmpresasOpen] = useState(false)
  const [isInfluenciadoresOpen, setIsInfluenciadoresOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    niches: [] as string[],
    mainNiche: "",
    city: "",
    followers: "",
    views30Days: "",
    reach30Days: "",
    averageReels: "",
    localAudience: "",
    priceVideo: "",
    priceCopart: "",
    priceFinal: "",
    bio: "",
  })
  const [influencers, setInfluencers] = useState<ApiInfluencer[]>([])
  const [isLoadingInfluencers, setIsLoadingInfluencers] = useState(true)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        const res = await fetch("/api/gmfaces/influencers")
        if (!res.ok) throw new Error("Erro ao carregar influenciadores")
        const data = await res.json()
        setInfluencers(data)
      } catch (error) {
        console.error(error)
        setInfluencers([])
      } finally {
        setIsLoadingInfluencers(false)
      }
    }

    loadInfluencers()
  }, [])

  // Função para lidar com o clique no botão do WhatsApp
  const handleWhatsAppClick = () => {
    const phoneNumber = "553599574977"
    const defaultMessage = "Olá, gostaria de mais informações!"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

    window.open(whatsappUrl, "_blank")
  }

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Verificar se o nicho selecionado está nos nichos do influenciador
    let matchesNiche = true
    if (selectedNiche !== "Todos") {
      try {
        // Tentar parsear como JSON (objeto com niches e mainNiche ou array)
        const nicheData = JSON.parse(influencer.niche || "[]")
        if (typeof nicheData === "object" && nicheData !== null && nicheData.niches) {
          // Formato novo: { niches: [...], mainNiche: "..." }
          matchesNiche = nicheData.niches.includes(selectedNiche)
        } else if (Array.isArray(nicheData)) {
          // Formato antigo: array de nichos
          matchesNiche = nicheData.includes(selectedNiche)
        } else {
          // Fallback para string única (compatibilidade com dados antigos)
          matchesNiche = influencer.niche === selectedNiche
        }
      } catch {
        // Se não for JSON, tratar como string única
        matchesNiche = influencer.niche === selectedNiche
      }
    }
    
    const matchesCity = selectedCity === "Todas" || influencer.city === selectedCity
    const matchesGender = selectedGender === "Todos" || influencer.gender === selectedGender

    return matchesSearch && matchesNiche && matchesCity && matchesGender
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white pb-20 overflow-hidden">
      <GMFacesHeader />
      <section id="home" className="relative overflow-hidden py-20 md:py-32 px-4 md:px-8 pt-32 md:pt-40">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/3 right-0 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="space-y-8">
              {/* Main headline with gradient */}
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold tracking-wider uppercase">
                    Transforme sua Marca
                  </span>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter">
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    O Rosto que a Sua Marca Precisa
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
                  Conectamos empresas a influenciadores reais que humanizam sua presença nas redes, aumentam seu
                  engajamento e trazem mais vendas. Sem perfis frios. Sem conteúdo genérico. E sem você precisar aparecer.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => {
                    const element = document.getElementById("influenciadores")
                    if (element) {
                      const offset = 80
                      const elementPosition = element.getBoundingClientRect().top
                      const offsetPosition = elementPosition + window.pageYOffset - offset
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                    }
                  }}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 transform hover:scale-105"
                >
                  Explorar Influenciadores
                </Button>
                <Button
                  onClick={() => {
                    const element = document.getElementById("como-funciona")
                    if (element) {
                      const offset = 80
                      const elementPosition = element.getBoundingClientRect().top
                      const offsetPosition = elementPosition + window.pageYOffset - offset
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                    }
                  }}
                  variant="outline"
                  className="border border-white/20 hover:bg-white/10 hover:border-purple-500/50 text-white font-bold px-8 py-6 text-base rounded-lg bg-white/5 transition-all duration-300"
                >
                  Como Funciona
                </Button>
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-green-600/50 hover:shadow-green-600/70 transition-all duration-300 transform hover:scale-105"
                >
                  Fale com um Especialista
                </Button>
              </div>

              {/* Stats section with animated counters */}
              <div className="grid grid-cols-3 gap-6 md:gap-12 pt-12 md:pt-20 border-t border-white/10">
                <AnimatedCounter
                  value={10}
                  label="Criadores Pré-Selecionados"
                  description="Influenciadores reais prontos para representar sua marca."
                />
                <AnimatedCounter
                  value={100}
                  label="Campanhas Entregues"
                  description="Produção profissional do roteiro à edição."
                />
                <AnimatedCounter
                  value={50}
                  label="Alcance Total Gerado"
                  description="Conteúdo humano que conecta e engaja."
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="influenciadores" className="px-4 md:px-8 py-12 sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Encontre seu Influenciador</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="🔍 Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              />

              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 cursor-pointer font-medium"
              >
                {niches.map((niche) => (
                  <option key={niche} value={niche} className="bg-slate-950 text-white">
                    {niche === "Todos" ? "Todos os Nichos" : niche}
                  </option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 cursor-pointer font-medium"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-slate-950 text-white">
                    {city === "Todas" ? "Todas as Cidades" : city}
                  </option>
                ))}
              </select>

              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 cursor-pointer font-medium"
              >
                <option value="Todos" className="bg-slate-950 text-white">
                  Todos os Gêneros
                </option>
                <option value="Masculino" className="bg-slate-950 text-white">
                  Masculino
                </option>
                <option value="Feminino" className="bg-slate-950 text-white">
                  Feminino
                </option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500"></div>
                <span className="text-sm font-medium text-purple-300 px-2">
                  {isLoadingInfluencers
                    ? "Carregando influenciadores..."
                    : `${filteredInfluencers.length} resultado${
                        filteredInfluencers.length !== 1 ? "s" : ""
                      }`}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingInfluencers ? (
            <div className="col-span-full text-center py-24 text-gray-400">Carregando catálogo...</div>
          ) : filteredInfluencers.length > 0 ? (
            filteredInfluencers.map((influencer, index) => (
              <FadeIn key={influencer.id} delay={index * 0.05}>
                <div
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredId(influencer.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>

                  <Card className="relative bg-slate-950/50 border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden h-full flex flex-col backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-600/20 transform group-hover:scale-105 group-hover:-translate-y-2">
                    {/* Foto do influenciador */}
                    <div className="aspect-square bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 relative overflow-hidden">
                      {influencer.photo ? (
                        <>
                          <img
                            src={influencer.photo}
                            alt={influencer.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 to-pink-900/40 opacity-60"></div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 to-pink-900/40 opacity-60"></div>
                          <svg
                            className="w-20 h-20 text-purple-400/40 mb-2 relative z-10"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 relative z-10 tracking-wider">
                            {influencer.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}

                      {/* Badge da categoria - Nicho Principal */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm border border-purple-400/30 z-20">
                        {(() => {
                          try {
                            const nicheData = JSON.parse(influencer.niche || "[]")
                            if (typeof nicheData === "object" && nicheData !== null && nicheData.mainNiche) {
                              return nicheData.mainNiche
                            }
                            if (Array.isArray(nicheData) && nicheData.length > 0) {
                              return nicheData[0]
                            }
                            return influencer.niche
                          } catch {
                            return influencer.niche
                          }
                        })()}
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      {/* Nome da categoria - Nicho Principal */}
                      <div className="mb-3">
                        <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                          {(() => {
                            try {
                              const nicheData = JSON.parse(influencer.niche || "[]")
                              if (typeof nicheData === "object" && nicheData !== null && nicheData.mainNiche) {
                                return nicheData.mainNiche.toUpperCase()
                              }
                              if (Array.isArray(nicheData) && nicheData.length > 0) {
                                return nicheData[0].toUpperCase()
                              }
                            } catch {}
                            return influencer.niche.toUpperCase()
                          })()}
                        </p>
                      </div>

                      {/* Nome */}
                      <CardTitle className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                        {influencer.name}
                      </CardTitle>

                      {/* Localização */}
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex items-center gap-1 mb-4">
                        📍 {influencer.city}
                      </p>

                      {/* Descrição curta */}
                      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300 mb-4">
                        {influencer.bio}
                      </p>
                    </CardHeader>

                    <CardContent className="flex-grow pb-4 space-y-3">
                      {/* Seguidores */}
                      {influencer.followers && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-300">
                            <span className="font-semibold text-white">Seguidores:</span>{" "}
                            {influencer.followers}
                          </span>
                        </div>
                      )}

                      {/* Média por reels */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-300">
                          <span className="font-semibold text-white">Média por reels:</span>{" "}
                          {influencer.averageReels || "—"}
                        </span>
                      </div>

                      {/* Preço final */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-300">
                          <span className="font-semibold text-white">Preço final:</span>{" "}
                          {influencer.priceFinal || influencer.priceClient || "Sob consulta"}
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-white/5">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold shadow-lg hover:shadow-purple-600/50 transition-all duration-300 transform group-hover:scale-105"
                      >
                        <Link href={`/gmfaces/${influencer.id}`}>👉 Ver Perfil</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full text-center py-32">
              <div className="space-y-4">
                <svg
                  className="w-24 h-24 mx-auto text-gray-600 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-400 text-lg">Nenhum influenciador encontrado com esses filtros.</p>
                <p className="text-gray-500 text-sm">Tente ajustar seus filtros para ver mais resultados.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works section */}
      <section id="como-funciona" className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Como Funciona</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <ProcessStep
            number={1}
            title="Escolha o Rosto da Sua Marca"
            description="Navegue pelo catálogo, filtre por nicho, estilo e cidade. Selecione quem mais combina com a identidade da sua empresa."
            icon="🎬"
            delay={0}
          />
          <ProcessStep
            number={2}
            title="Nós Produzimos Tudo"
            description="Criamos o roteiro, dirigimos a gravação e editamos o vídeo profissionalmente. Você recebe tudo pronto em poucos dias."
            icon="🎥"
            delay={0.1}
          />
          <ProcessStep
            number={3}
            title="Publique e Venda Mais"
            description="Com um rosto real representando sua marca, você conquista mais conexão, confiança e engajamento."
            icon="📱"
            delay={0.2}
          />
        </div>
      </section>

      {/* Para Empresas section - Expandable */}
      <section id="para-empresas" className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <FadeIn>
          <div
            className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 hover:border-purple-500/50 rounded-xl backdrop-blur-xl transition-all duration-500 overflow-hidden"
          >
            {/* Header clicável */}
            <button
              onClick={() => setIsEmpresasOpen(!isEmpresasOpen)}
              className="w-full p-8 flex items-center justify-between text-left group"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                  Para Empresas
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl">
                  Humanize sua marca com influenciadores reais. Conectamos sua empresa a criadores que representam sua marca com autenticidade e geram mais vendas.
                </p>
              </div>
              <motion.div
                animate={{ rotate: isEmpresasOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 ml-4"
              >
                <ChevronDown className="h-8 w-8 text-purple-400" />
              </motion.div>
            </button>

            {/* Conteúdo expandível */}
            <AnimatePresence>
              {isEmpresasOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 space-y-12">
                    {/* Título e Subtítulo */}
                    <div className="text-center pt-8">
                      <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">Humanize sua Marca com Influenciadores Reais</h3>
                      <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        Conectamos sua empresa a influenciadores que representam sua marca com autenticidade, geram engajamento real e aumentam suas vendas — sem você precisar aparecer.
                      </p>
                    </div>

                    {/* Por que funciona */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
                        ⭐ Por que o GM Faces funciona para sua empresa?
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <BenefitCard
                          icon="👤"
                          title="Rosto Real = Mais Conexão"
                          description="Pessoas compram de pessoas. Um influenciador falando pela sua marca aumenta a confiança e a proximidade com o público."
                        />
                        <BenefitCard
                          icon="🎬"
                          title="Conteúdo Profissional, Sem Trabalho para Você"
                          description="Roteiro, gravação e edição são feitos pela equipe GMira. Você só aprova e publica."
                        />
                        <BenefitCard
                          icon="🔒"
                          title="Zero Exposição do Dono"
                          description="Se você não gosta de gravar ou não tem tempo, o GM Faces resolve isso."
                        />
                        <BenefitCard
                          icon="📈"
                          title="Resultados Visíveis"
                          description="Conteúdo humanizado gera até 3x mais interação que post institucional. E melhora muito o desempenho no tráfego pago."
                        />
                        <BenefitCard
                          icon="✨"
                          title="Escolha o Rosto da sua Marca"
                          description="Você navega pelo catálogo e seleciona o criador que combina com o estilo da sua empresa."
                        />
                      </div>
                    </div>

                    {/* Como Funciona */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
                        🔧 Como Funciona — Passo a Passo
                      </h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        {[
                          { step: "1", title: "Escolha o influenciador", desc: "Filtre por nicho, estilo, cidade e valores." },
                          { step: "2", title: "Aprove o roteiro", desc: "Criamos um roteiro profissional baseado na mensagem que sua marca precisa transmitir." },
                          { step: "3", title: "Nós produzimos", desc: "Gravamos e editamos tudo com qualidade profissional." },
                          { step: "4", title: "Você publica e vende mais", desc: "Conteúdo humano = mais alcance, mais conexão e mais conversão." },
                        ].map((item, index) => (
                          <FadeIn key={item.step} delay={index * 0.1}>
                            <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 hover:border-purple-500/50 p-6 rounded-xl backdrop-blur-xl transition-all duration-500 h-full">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-xl font-bold text-white mb-4">
                                {item.step}
                              </div>
                              <h4 className="text-white font-bold mb-2 text-sm">{item.title}</h4>
                              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    </div>

                    {/* Quanto custa e Para quem */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-purple-950/30 to-slate-950/50 border border-purple-500/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">💰 Quanto custa?</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          O valor depende do influenciador escolhido, pois cada criador tem seu cachê.
                        </p>
                        <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                          Somamos o cachê + produção da GMira = preço final do vídeo.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-pink-950/30 to-slate-950/50 border border-pink-500/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">🧩 Para quem é indicado?</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>✔ Lojas físicas</li>
                          <li>✔ Restaurantes e cafés</li>
                          <li>✔ Clínicas de estética e saúde</li>
                          <li>✔ Academias</li>
                          <li>✔ Moda e beleza</li>
                          <li>✔ Serviços</li>
                          <li>✔ Negócios locais que não têm porta-voz</li>
                          <li>✔ Marcas que querem melhorar o tráfego pago</li>
                        </ul>
                      </div>
                    </div>

                    {/* O que você recebe */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">🔥 O que você recebe:</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          "Vídeo completo pronto para redes sociais",
                          "Influenciador falando pela sua marca",
                          "Tom de voz alinhado ao seu negócio",
                          "Roteiro profissional",
                          "Edição de alta qualidade",
                          "Conteúdo humanizado e persuasivo",
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-white/5 hover:border-purple-500/30 p-4 rounded-lg text-center transition-all duration-300"
                          >
                            <p className="text-gray-300 text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Final */}
                    <div className="text-center">
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Pronto para transformar a presença da sua marca?</h3>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => {
                            const element = document.getElementById("influenciadores")
                            if (element) {
                              const offset = 80
                              const elementPosition = element.getBoundingClientRect().top
                              const offsetPosition = elementPosition + window.pageYOffset - offset
                              window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                            }
                          }}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 transform hover:scale-105"
                        >
                          👉 Explore influenciadores
                        </Button>
                        <Button
                          onClick={handleWhatsAppClick}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-green-600/50 hover:shadow-green-600/70 transition-all duration-300 transform hover:scale-105"
                        >
                          👉 Solicite um orçamento
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </section>

      {/* Para Influenciadores section - Expandable */}
      <section id="para-influenciadores" className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <FadeIn>
          <div
            className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 hover:border-purple-500/50 rounded-xl backdrop-blur-xl transition-all duration-500 overflow-hidden"
          >
            {/* Header clicável */}
            <button
              onClick={() => setIsInfluenciadoresOpen(!isInfluenciadoresOpen)}
              className="w-full p-8 flex items-center justify-between text-left group"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                  Para Influenciadores
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl">
                  Seja o rosto de grandes marcas da região. Entre para o catálogo oficial do GM Faces e tenha acesso a campanhas pagas com empresas reais.
                </p>
              </div>
              <motion.div
                animate={{ rotate: isInfluenciadoresOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 ml-4"
              >
                <ChevronDown className="h-8 w-8 text-purple-400" />
              </motion.div>
            </button>

            {/* Conteúdo expandível */}
            <AnimatePresence>
              {isInfluenciadoresOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 space-y-12">
                    <div className="text-center pt-8">
                      <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">Seja o Rosto de Grandes Marcas da Região</h3>
                      <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        Entre para o catálogo oficial do GM Faces e tenha acesso a campanhas pagas com empresas reais — com produção profissional e suporte total.
                      </p>
                    </div>

          {/* Por que entrar */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
              ⭐ Por que entrar no GM Faces?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <BenefitCard
                icon="💰"
                title="Oportunidades Reais de Ganho"
                description="Você define seus valores. As empresas escolhem você e você recebe pelo seu trabalho."
          />
          <BenefitCard
            icon="🎬"
                title="Zero Edição — Apenas Grave"
                description="A equipe GMira cuida de roteiro, direção e edição. Você grava com orientação e tudo sai perfeito."
          />
          <BenefitCard
            icon="📈"
                title="Alcance Maior"
                description="Além da marca, seus vídeos são divulgados pela GMira e pelo GM Faces (e se quiser, você pode cobrar por repostagem no seu perfil)."
              />
              <BenefitCard
                icon="✨"
                title="Seleção Profissional"
                description="Seu nome estará em um catálogo exclusivo usado por empresas que querem investir em marketing humanizado."
          />
          <BenefitCard
                icon="🔓"
                title="Você mantém sua liberdade"
                description="Não é contrato fixo. Cada campanha é um job individual, pago e organizado."
          />
        </div>
          </div>

          {/* Como Funciona */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
              🔧 Como Funciona para Criadores
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Cadastro no Formulário", desc: "Preencha suas informações e valores." },
                { step: "2", title: "Avaliação", desc: "Nossa equipe valida nicho, estilo e autenticidade." },
                { step: "3", title: "Entrada no Catálogo", desc: "Seu perfil aparece no site para empresas." },
                { step: "4", title: "Empresas te escolhem", desc: "Quando uma marca combina com você, chamamos para gravar." },
                { step: "5", title: "Você recebe pelo job", desc: "Pagamento organizado e profissional — sem permutas." },
              ].map((item, index) => (
                <FadeIn key={item.step} delay={index * 0.1}>
                  <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 hover:border-purple-500/50 p-6 rounded-xl backdrop-blur-xl transition-all duration-500 h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-xl font-bold text-white mb-4">
                      {item.step}
                    </div>
                    <h4 className="text-white font-bold mb-2 text-sm">{item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Quanto ganha e quem pode */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-950/30 to-slate-950/50 border border-purple-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">💰 Quanto você ganha?</h3>
              <p className="text-gray-300 mb-4">Você define:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Seu cachê para gravar</li>
                <li>• Seu valor para repostar</li>
                <li>• Entregas adicionais se quiser (stories, fotos, etc.)</li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                A GMira apenas soma o seu valor + produção para gerar o preço final à empresa.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-950/30 to-slate-950/50 border border-pink-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">👤 Quem pode participar?</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✔ Criadores iniciantes ou experientes</li>
                <li>✔ Influenciadores locais</li>
                <li>✔ Pessoas que se comunicam bem</li>
                <li>✔ Quem grava conteúdos simples com naturalidade</li>
                <li>✔ Quem quer crescer e ganhar com isso</li>
              </ul>
            </div>
          </div>

          {/* O que recebe */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">🧩 O que você recebe:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Roteiro pronto",
                "Direção durante a gravação",
                "Edição profissional",
                "Suporte antes e depois do job",
                "Divulgação dentro do catálogo",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-white/5 hover:border-purple-500/30 p-4 rounded-lg text-center transition-all duration-300"
                >
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

                    {/* CTA Final */}
                    <div className="text-center">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Quer fazer parte do GM Faces?</h3>
                      <Button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 transform hover:scale-105"
                      >
                        👉 Preencha o formulário
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </section>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Cadastro GM Faces</h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    if (formData.niches.length === 0) {
                      setFormMessage("Selecione 3 nichos principais.")
                      return
                    }
                    if (formData.niches.length < 3) {
                      setFormMessage("Selecione exatamente 3 nichos principais.")
                      return
                    }
                    if (!formData.mainNiche) {
                      setFormMessage("Selecione qual é o nicho principal.")
                      return
                    }
                    if (!formData.niches.includes(formData.mainNiche)) {
                      setFormMessage("O nicho principal deve estar entre os 3 nichos selecionados.")
                      return
                    }
                    setFormMessage(null)
                    setFormSubmitting(true)
                    try {
                      const res = await fetch("/api/gmfaces/applications", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ...formData,
                          niche: JSON.stringify({
                            niches: formData.niches,
                            mainNiche: formData.mainNiche,
                          }),
                        }),
                      })
                      const data = await res.json()
                      if (!res.ok) {
                        throw new Error(data.error || "Erro ao enviar cadastro.")
                      }
                      setFormMessage(data.message || "Cadastro enviado com sucesso!")
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        instagram: "",
                        niches: [],
                        mainNiche: "",
                        city: "",
                        followers: "",
                        views30Days: "",
                        reach30Days: "",
                        averageReels: "",
                        localAudience: "",
                        priceVideo: "",
                        priceCopart: "",
                        priceFinal: "",
                        bio: "",
                      })
                      setIsFormOpen(false)
                    } catch (error: any) {
                      console.error(error)
                      setFormMessage(error.message ?? "Erro ao enviar cadastro. Tente novamente.")
                    } finally {
                      setFormSubmitting(false)
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nome completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Telefone/WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Instagram *</label>
                      <input
                        type="text"
                        required
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="@seuperfil"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nichos Principais (selecione 3) *
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto bg-white/5 border border-white/10 rounded-lg p-3">
                        {niches
                          .filter((niche) => niche !== "Todos")
                          .map((niche) => (
                            <label
                              key={niche}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={formData.niches.includes(niche)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    if (formData.niches.length < 3) {
                                      const newNiches = [...formData.niches, niche]
                                      setFormData({ 
                                        ...formData, 
                                        niches: newNiches,
                                        mainNiche: formData.mainNiche || (newNiches.length === 1 ? niche : formData.mainNiche)
                                      })
                                    }
                                  } else {
                                    const newNiches = formData.niches.filter((n) => n !== niche)
                                    setFormData({
                                      ...formData,
                                      niches: newNiches,
                                      mainNiche: formData.mainNiche === niche ? "" : formData.mainNiche,
                                    })
                                  }
                                }}
                                disabled={!formData.niches.includes(niche) && formData.niches.length >= 3}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-2"
                              />
                              <span className="text-sm text-gray-300">{niche}</span>
                            </label>
                          ))}
                      </div>
                      {formData.niches.length > 0 && (
                        <p className="text-xs text-purple-300 mt-2">
                          {formData.niches.length} de 3 nichos selecionados
                        </p>
                      )}
                      {formData.niches.length === 0 && (
                        <p className="text-xs text-gray-500 mt-2">Selecione 3 nichos principais</p>
                      )}
                      {formData.niches.length > 0 && formData.niches.length < 3 && (
                        <p className="text-xs text-yellow-400 mt-2">Selecione mais {3 - formData.niches.length} nicho(s) para completar</p>
                      )}
                    </div>
                    {formData.niches.length === 3 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Qual é o nicho principal? *
                        </label>
                        <div className="space-y-2">
                          {formData.niches.map((niche) => (
                            <label
                              key={niche}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-white/5 p-3 rounded-lg border border-white/10 transition-colors bg-white/5"
                            >
                              <input
                                type="radio"
                                name="mainNiche"
                                checked={formData.mainNiche === niche}
                                onChange={() => setFormData({ ...formData, mainNiche: niche })}
                                className="w-4 h-4 border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-2"
                              />
                              <span className={`text-sm font-medium ${formData.mainNiche === niche ? "text-purple-300" : "text-gray-300"}`}>
                                {niche}
                              </span>
                              {formData.mainNiche === niche && (
                                <span className="ml-auto text-xs text-purple-400 font-bold">PRINCIPAL</span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cidade *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Cidade, Estado"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Seguidores</label>
                      <input
                        type="text"
                        value={formData.followers}
                        onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 50k, 100k"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Vizualizações 30 dias</label>
                      <input
                        type="text"
                        value={formData.views30Days}
                        onChange={(e) => setFormData({ ...formData, views30Days: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 150k, 200k"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Alcance 30 dias</label>
                      <input
                        type="text"
                        value={formData.reach30Days}
                        onChange={(e) => setFormData({ ...formData, reach30Days: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 100k, 150k"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Média por reels</label>
                      <input
                        type="text"
                        value={formData.averageReels}
                        onChange={(e) => setFormData({ ...formData, averageReels: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 10k, 15k"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Público local</label>
                      <input
                        type="text"
                        value={formData.localAudience}
                        onChange={(e) => setFormData({ ...formData, localAudience: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 60%, 70%"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cachê de Vídeo (R$) *</label>
                      <input
                        type="text"
                        required
                        value={formData.priceVideo}
                        onChange={(e) => setFormData({ ...formData, priceVideo: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cachê de Coparticipação (R$) *</label>
                      <input
                        type="text"
                        required
                        value={formData.priceCopart}
                        onChange={(e) => setFormData({ ...formData, priceCopart: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 150"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preço Final (R$) *</label>
                      <input
                        type="text"
                        required
                        value={formData.priceFinal}
                        onChange={(e) => setFormData({ ...formData, priceFinal: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 400"
                      />
                      <p className="text-xs text-purple-300 mt-1">Este é o preço que será usado</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio/Descrição *</label>
                    <textarea
                      required
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                      placeholder="Conte um pouco sobre você e seu conteúdo..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={formSubmitting}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-600/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {formSubmitting ? "Enviando..." : "Enviar Cadastro"}
                      </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsFormOpen(false)}
                      className="border border-white/20 hover:bg-white/10 text-white font-bold py-3 rounded-lg transition-all duration-300"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final CTA */}
      <section id="contato" className="px-4 md:px-8 py-20 max-w-7xl mx-auto text-center">
        <FadeIn delay={0.2}>
          <div className="space-y-8 bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/20 rounded-2xl p-12 md:p-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white">Pronto para Humanizar sua Marca?</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Escolha um influenciador, aprove o roteiro e receba um vídeo profissional pronto para publicar. Simples, rápido e efetivo.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 transform hover:scale-105">
                Começar Agora
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Botão Admin Sutil */}
      <Link
        href="/gmfaces/admin/login"
        className="fixed bottom-6 right-6 z-50 group"
        title="Área Admin"
      >
        <div className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-purple-500/20">
          <Lock className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
        </div>
      </Link>
    </div>
  )
}

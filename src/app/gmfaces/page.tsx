"use client"

import { useState } from "react"
import Link from "next/link"
import { influencers } from "@/data/influencers"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FadeIn from "@/components/ui/fade-in"

const niches = ["Todos", "Moda", "Tecnologia", "Entretenimento"]
const cities = ["Todas", "São Paulo", "Rio de Janeiro", "Belo Horizonte"]

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useState(() => {
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

  return (
    <div className="text-center space-y-2 group cursor-default transform hover:scale-110 transition-transform duration-300">
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {displayValue}
        {label.includes("Influenciadores") ? "+" : label.includes("Campanhas") ? "+" : "M+"}
      </div>
      <p className="text-gray-400 text-sm md:text-base group-hover:text-purple-300 transition-colors duration-300 font-medium">
        {label}
      </p>
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

export default function GMFacesCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("Todos")
  const [selectedCity, setSelectedCity] = useState("Todas")
  const [selectedGender, setSelectedGender] = useState("Todos")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNiche = selectedNiche === "Todos" || influencer.niche === selectedNiche
    const matchesCity = selectedCity === "Todas" || influencer.city === selectedCity
    const matchesGender = selectedGender === "Todos" || influencer.gender === selectedGender

    return matchesSearch && matchesNiche && matchesCity && matchesGender
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white pb-20 overflow-hidden">
      <section className="relative overflow-hidden py-20 md:py-32 px-4 md:px-8">
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
                  <span className="block">Seu Rosto</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    na Rede
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
                  Conectamos marcas a influenciadores autênticos que humanizam sua presença nas redes sociais e geram
                  engajamento real. Sem perfis frios. Sem conteúdo genérico.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 transform hover:scale-105">
                  Explorar Influenciadores
                </Button>
                <Button
                  variant="outline"
                  className="border border-white/20 hover:bg-white/10 hover:border-purple-500/50 text-white font-bold px-8 py-6 text-base rounded-lg bg-white/5 transition-all duration-300"
                >
                  Como Funciona
                </Button>
              </div>

              {/* Stats section with animated counters */}
              <div className="grid grid-cols-3 gap-6 md:gap-12 pt-12 md:pt-20 border-t border-white/10">
                <AnimatedCounter value={150} label="Influenciadores" />
                <AnimatedCounter value={1000} label="Campanhas" />
                <AnimatedCounter value={50} label="Alcance Total" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 md:px-8 py-12 sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
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
                  {filteredInfluencers.length} resultado{filteredInfluencers.length !== 1 ? "s" : ""}
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
          {filteredInfluencers.length > 0 ? (
            filteredInfluencers.map((influencer, index) => (
              <FadeIn key={influencer.id} delay={index * 0.05}>
                <div
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredId(influencer.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>

                  <Card className="relative bg-slate-950/50 border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden h-full flex flex-col backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-600/20 transform group-hover:scale-105 group-hover:-translate-y-2">
                    <div className="aspect-square bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 relative overflow-hidden">
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

                      <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm border border-purple-400/30 z-20">
                        {influencer.niche}
                      </div>

                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm border border-pink-400/30 z-20">
                        {influencer.gender === "Masculino" ? "♂ M" : "♀ F"}
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-bold text-white line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                        {influencer.name}
                      </CardTitle>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex items-center gap-1">
                        📍 {influencer.city}
                      </p>
                    </CardHeader>

                    <CardContent className="flex-grow pb-4">
                      <p className="text-gray-300 text-sm line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                        {influencer.bio}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-white/5">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold shadow-lg hover:shadow-purple-600/50 transition-all duration-300 transform group-hover:scale-105"
                      >
                        <Link href={`/gmfaces/${influencer.id}`}>Ver Perfil</Link>
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
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Como Funciona</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <ProcessStep
            number={1}
            title="Escolha seu Influenciador"
            description="Navegue por influenciadores selecionados, filtre por niche, cidade e preferências. Encontre o rosto perfeito para sua marca."
            icon="🎬"
            delay={0}
          />
          <ProcessStep
            number={2}
            title="Nós Produzimos"
            description="Roteiro personalizado, gravação profissional e edição de qualidade. Receba conteúdo pronto em dias, não semanas."
            icon="🎥"
            delay={0.1}
          />
          <ProcessStep
            number={3}
            title="Publique e Engaje"
            description="Seu influenciador traz autenticidade e conecta sua marca com o público de forma real e orgânica."
            icon="📱"
            delay={0.2}
          />
        </div>
      </section>

      {/* Benefits section */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Por Que GM Faces?</h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitCard
            icon="👥"
            title="Influenciadores Verificados"
            description="Catálogo curado com rostos autênticos, prontos para representar sua marca."
          />
          <BenefitCard
            icon="🎬"
            title="Produção Completa"
            description="Do roteiro à edição final, nossa equipe garante conteúdo profissional."
          />
          <BenefitCard
            icon="📈"
            title="Mais Engajamento"
            description="Conteúdo humanizado gera 3x mais interação que perfis corporativos."
          />
          <BenefitCard
            icon="⏰"
            title="Rápido e Eficiente"
            description="Processo ágil que entrega conteúdo pronto em dias."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto text-center">
        <FadeIn delay={0.2}>
          <div className="space-y-8 bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/20 rounded-2xl p-12 md:p-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white">Pronto para Humanizar sua Marca?</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Escolha um influenciador, aprove o roteiro e receba conteúdo profissional pronto para publicar. Simples,
              rápido e efetivo.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold px-8 py-6 text-base rounded-lg shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 transform hover:scale-105">
                Começar Agora
              </Button>
              <Button
                variant="outline"
                className="border border-purple-500/30 hover:bg-purple-500/10 text-white font-bold px-8 py-6 text-base bg-transparent rounded-lg transition-all duration-300"
              >
                Ver Casos de Sucesso
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

 "use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState, use } from "react"
import { Heart, MessageCircle, Share2, Instagram, TrendingUp, Users, Eye } from "lucide-react"

interface Props {
  params: Promise<{ id: string }>
}

interface AnimatedCountProps {
  target: number
  label: string
}

function AnimatedCount({ target, label }: AnimatedCountProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps) {
        currentStep++
        setCount(Math.floor(increment * currentStep))
      } else {
        setCount(target)
        clearInterval(interval)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [target])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="group">
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-pink-500 group-hover:to-purple-400 transition-all duration-300">
        {formatNumber(count)}
      </div>
      <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">{label}</p>
    </div>
  )
}

// Função para converter string de seguidores/alcance para número
function parseCount(value?: string): number {
  if (!value) return 0
  const cleaned = value.replace(/[^\d.,]/g, "").replace(",", ".")
  const num = parseFloat(cleaned)
  if (isNaN(num)) {
    // Tenta extrair número de strings como "50k", "100k", "1.5M"
    const lower = value.toLowerCase()
    if (lower.includes("k")) {
      const kNum = parseFloat(lower.replace("k", "").trim())
      return isNaN(kNum) ? 0 : kNum * 1000
    }
    if (lower.includes("m")) {
      const mNum = parseFloat(lower.replace("m", "").trim())
      return isNaN(mNum) ? 0 : mNum * 1000000
    }
    return 0
  }
  return num
}

// Função para converter engagement de string para número
function parseEngagement(value?: string): number {
  if (!value) return 0
  const cleaned = value.replace(/[^\d.,]/g, "").replace(",", ".")
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

interface Service {
  icon: string
  name: string
  description: string
}

interface PortfolioItem {
  title: string
  category: string
  engagement: string
}

interface Review {
  author: string
  company: string
  rating: number
  text: string
}

interface ApiInfluencer {
  id: string
  name: string
  photo?: string
  city: string
  niche: string
  bio: string
  gender?: string
  email?: string
  phone?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  followers?: string
  reach?: string
  engagement?: string
  views30Days?: string
  reach30Days?: string
  averageReels?: string
  localAudience?: string
  priceMin?: string
  priceClient?: string
  priceCopart?: string
  priceVideo?: string
  priceRepost?: string
  priceFinal?: string
  restrictions?: string
  services?: string
  portfolio?: string
  reviews?: string
  status?: string
}

export default function InfluencerProfile({ params }: Props) {
  const resolvedParams = use(params)
  const [influencer, setInfluencer] = useState<ApiInfluencer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadInfluencer = async () => {
      try {
        const res = await fetch(`/api/gmfaces/influencers/${resolvedParams.id}`)
        if (!res.ok) {
          if (res.status === 404) {
            notFound()
            return
          }
          throw new Error("Erro ao carregar influenciador")
        }
        const data = await res.json()
        setInfluencer(data)
      } catch (error) {
        console.error(error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    loadInfluencer()
  }, [resolvedParams.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Carregando perfil...</p>
      </div>
    )
  }

  if (!influencer) {
    notFound()
  }

  const whatsappMessage = `Olá! Gostaria de solicitar um orçamento para ${influencer.name} do GM Faces.`
  const phoneNumber = influencer.phone?.replace(/\D/g, "") || "553599574977"
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Converter valores para números
  const followersCount = parseCount(influencer.followers)
  const reachCount = parseCount(influencer.reach)
  const engagementValue = parseEngagement(influencer.engagement)

  // Parsear dados do banco
  const portfolioItems: PortfolioItem[] = influencer.portfolio
    ? (() => {
        try {
          return JSON.parse(influencer.portfolio)
        } catch {
          return []
        }
      })()
    : []

  const services: Service[] = influencer.services
    ? (() => {
        try {
          return JSON.parse(influencer.services)
        } catch {
          return [
            { icon: "📸", name: "Posts Patrocinados", description: "1-5 posts com alta qualidade" },
            { icon: "🎬", name: "Vídeos/Reels", description: "Conteúdo para Instagram e TikTok" },
            { icon: "✍️", name: "Storytelling", description: "Narrativas autênticas da marca" },
            { icon: "📊", name: "Consultorias", description: "Estratégia de conteúdo e growth" },
          ]
        }
      })()
    : [
        { icon: "📸", name: "Posts Patrocinados", description: "1-5 posts com alta qualidade" },
        { icon: "🎬", name: "Vídeos/Reels", description: "Conteúdo para Instagram e TikTok" },
        { icon: "✍️", name: "Storytelling", description: "Narrativas autênticas da marca" },
        { icon: "📊", name: "Consultorias", description: "Estratégia de conteúdo e growth" },
      ]

  const reviews: Review[] = influencer.reviews
    ? (() => {
        try {
          return JSON.parse(influencer.reviews)
        } catch {
          return []
        }
      })()
    : []

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <button
        onClick={() => window.history.back()}
        className="fixed top-6 left-6 z-50 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
      >
        ← Voltar
      </button>

      <div className="relative h-96 md:h-[500px] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 to-black/80 z-10"></div>

        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
          {influencer.photo ? (
            <div className="absolute inset-0">
              <img
                src={influencer.photo}
                alt={influencer.name}
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          ) : (
            <div className="text-8xl font-bold text-white/10 mb-4 absolute inset-0 flex items-center justify-center">
              {influencer.name.substring(0, 1)}
            </div>
          )}
          <div className="text-center relative z-10">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {influencer.name}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
          {influencer.status === "PUBLISHED" ? (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300"></span>
            </>
          ) : influencer.status === "PENDING" ? (
            <>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Aguardando aprovação</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Indisponível</span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-3 gap-4 -mt-20 mb-12 relative z-30">
          <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group/card flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Nicho{(() => {
                  try {
                    const nicheData = JSON.parse(influencer.niche || "[]")
                    if (typeof nicheData === "object" && nicheData !== null && nicheData.niches) {
                      return nicheData.niches.length > 1 ? "s" : ""
                    }
                    if (Array.isArray(nicheData) && nicheData.length > 1) {
                      return "s"
                    }
                  } catch {}
                  return ""
                })()}
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              {(() => {
                try {
                  const nicheData = JSON.parse(influencer.niche || "[]")
                  if (typeof nicheData === "object" && nicheData !== null && nicheData.niches && nicheData.mainNiche) {
                    const mainNiche = nicheData.mainNiche
                    const otherNiches = nicheData.niches.filter((n: string) => n !== mainNiche)
                    
                    return (
                      <>
                        {/* Nicho Principal - Grande */}
                        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          {mainNiche}
                        </p>
                        {/* Outros Nichos - Pequenos */}
                        {otherNiches.length > 0 && (
                          <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 mt-1.5">
                            {otherNiches.map((niche: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-[9px] text-gray-500 font-normal opacity-60 leading-tight"
                              >
                                {niche}
                                {idx < otherNiches.length - 1 && <span className="mx-1 text-gray-600">•</span>}
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )
                  }
                  if (Array.isArray(nicheData) && nicheData.length > 0) {
                    return (
                      <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {nicheData[0]}
                      </p>
                    )
                  }
                } catch {}
                return (
                  <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {influencer.niche}
                  </p>
                )
              })()}
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group/card">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-pink-400" />
              <p className="text-xs text-gray-400 uppercase tracking-wider">Localização</p>
            </div>
            <p className="text-xl font-bold text-white">{influencer.city}</p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group/card">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-purple-400" />
              <p className="text-xs text-gray-400 uppercase tracking-wider">Gênero</p>
            </div>
            <p className="text-xl font-bold text-white">{influencer.gender}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"></div>
              <CardHeader>
                <CardTitle className="text-white text-lg">Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-sm">{influencer.bio}</p>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider">Conecte</h3>
              <div className="space-y-3">
                {influencer.instagram && (
                  <a
                    href={`https://instagram.com/${influencer.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/link"
                  >
                    <Instagram className="w-5 h-5 text-pink-400" />
                    <span className="text-sm text-gray-300 group-hover/link:text-white">
                      {influencer.instagram}
                    </span>
                    <Share2 className="w-4 h-4 text-gray-600 group-hover/link:text-gray-300 ml-auto" />
                  </a>
                )}
                {influencer.tiktok && (
                  <a
                    href={`https://tiktok.com/@${influencer.tiktok.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/link"
                  >
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-300 group-hover/link:text-white">
                      {influencer.tiktok}
                    </span>
                    <Share2 className="w-4 h-4 text-gray-600 group-hover/link:text-gray-300 ml-auto" />
                  </a>
                )}
                {influencer.youtube && (
                  <a
                    href={`https://youtube.com/@${influencer.youtube.replace("@", "").replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/link"
                  >
                    <Share2 className="w-5 h-5 text-red-400" />
                    <span className="text-sm text-gray-300 group-hover/link:text-white">
                      {influencer.youtube}
                    </span>
                    <Share2 className="w-4 h-4 text-gray-600 group-hover/link:text-gray-300 ml-auto" />
                  </a>
                )}
                {!influencer.instagram && !influencer.tiktok && !influencer.youtube && (
                  <p className="text-sm text-gray-500 text-center py-4">Nenhuma rede social cadastrada</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats Adicionais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seguidores */}
            {influencer.followers && (
              <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 mb-6">
                <div className="group">
                  {followersCount > 0 ? (
                    <AnimatedCount target={followersCount} label="Seguidores" />
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {influencer.followers || "—"}
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Seguidores</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Métricas Adicionais (30 dias, reels, etc) */}
            {(influencer.views30Days || influencer.reach30Days || influencer.averageReels || influencer.localAudience) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {influencer.views30Days && (
                  <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                    <div className="group">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {influencer.views30Days}
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Vizualizações 30 dias</p>
                    </div>
                  </div>
                )}
                {influencer.reach30Days && (
                  <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                    <div className="group">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {influencer.reach30Days}
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Alcance 30 dias</p>
                    </div>
                  </div>
                )}
                {influencer.averageReels && (
                  <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                    <div className="group">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {influencer.averageReels}
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Média por reels</p>
                    </div>
                  </div>
                )}
                {influencer.localAudience && (
                  <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                    <div className="group">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {influencer.localAudience}
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Público local</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border-white/20 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-2">Portfolio</CardTitle>
                <p className="text-sm text-gray-400">Conheça alguns dos trabalhos realizados</p>
              </CardHeader>
              <CardContent>
                {portfolioItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolioItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-slate-700/70 to-slate-800/70 hover:from-slate-700/90 hover:to-slate-800/90 border border-slate-600/50 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-300 group/item cursor-pointer transform hover:scale-105"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="text-lg font-bold text-white group-hover/item:text-purple-300 transition-colors mb-2">{item.title}</p>
                            <p className="text-sm text-gray-300 mb-4">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-4 border-t border-slate-600/50">
                          <Heart className="w-5 h-5 text-pink-400" />
                          <span className="text-sm text-gray-200 font-semibold">{item.engagement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">Nenhum item no portfólio ainda</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            Avaliações
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-200">{review.author}</p>
                    <p className="text-xs text-gray-500">{review.company}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-300 italic group-hover:text-gray-200 transition-colors">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricing Card */}
            <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 group">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300"></div>
              <CardHeader>
                <CardTitle className="text-xl">Avaliações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(influencer.priceVideo || influencer.priceCopart || influencer.priceFinal) && (
                  <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                    <div className="space-y-3">
                      {influencer.priceVideo && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Cachê de Vídeo</span>
                          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {influencer.priceVideo}
                          </span>
                        </div>
                      )}
                      {influencer.priceCopart && (
                        <>
                          {influencer.priceVideo && (
                            <div className="h-px bg-gradient-to-r from-purple-500/30 to-pink-500/30"></div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Cachê de Coparticipação</span>
                            <span className="text-xl font-bold text-purple-400">{influencer.priceCopart}</span>
                          </div>
                        </>
                      )}
                      {influencer.priceFinal && (
                        <>
                          {(influencer.priceVideo || influencer.priceCopart) && (
                            <div className="h-px bg-gradient-to-r from-purple-500/30 to-pink-500/30"></div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 font-semibold">Preço Final</span>
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                              {influencer.priceFinal}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-gray-300 mb-1">Preço Final</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {influencer.priceFinal || influencer.priceClient || influencer.priceCopart || "Sob consulta"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Valores podem variar conforme tipo de conteúdo, roteiro, deslocamento e necessidade da marca.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <div className="flex flex-col justify-between">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Pronto para colaborar?</h3>
                <p className="text-gray-400">
                  Entre em contato diretamente via WhatsApp para discutir sua campanha personalizada.
                </p>
              </div>
              <Button
                asChild
                className="w-full h-14 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300 group"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Solicitar Orçamento
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="pb-12 text-center">
          <p className="text-gray-500 mb-4">Outras opções de contato?</p>
          <Button
            asChild
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300 bg-transparent"
          >
            <Link href="/gmfaces">Ver mais influenciadores</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

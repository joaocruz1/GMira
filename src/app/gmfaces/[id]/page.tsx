"use client"

import { influencers } from "@/data/influencers"
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

export default function InfluencerProfile({ params }: Props) {
  const resolvedParams = use(params)
  const influencer = influencers.find((i) => i.id === resolvedParams.id)

  if (!influencer) {
    notFound()
  }

  const whatsappMessage = `Olá! Gostaria de solicitar um orçamento para a influenciadora ${influencer.name} do GM Faces.`
  const whatsappLink = `https://wa.me/5562999999999?text=${encodeURIComponent(whatsappMessage)}`

  const portfolioItems = [
    { title: "Campanha de Moda", category: "Moda", engagement: "8.5%" },
    { title: "Collab com Marca X", category: "Partnership", engagement: "12.3%" },
    { title: "Conteúdo Lifestyle", category: "Lifestyle", engagement: "6.8%" },
    { title: "Video Tutorial", category: "Educacional", engagement: "14.2%" },
  ]

  const services = [
    { icon: "📸", name: "Posts Patrocinados", description: "1-5 posts com alta qualidade" },
    { icon: "🎬", name: "Vídeos/Reels", description: "Conteúdo para Instagram e TikTok" },
    { icon: "✍️", name: "Storytelling", description: "Narrativas autênticas da marca" },
    { icon: "📊", name: "Consultorias", description: "Estratégia de conteúdo e growth" },
  ]

  const reviews = [
    { author: "Brand Manager", company: "Brand X", rating: 5, text: "Profissional e muito criativa!" },
    { author: "Marketing Director", company: "Brand Y", rating: 5, text: "Excelente engagement e retorno." },
  ]

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
          <div className="text-center">
            <div className="text-8xl font-bold text-white/10 mb-4">{influencer.name.substring(0, 1)}</div>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {influencer.name}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Disponível para colaborações</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-3 gap-4 -mt-20 mb-12 relative z-30">
          <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group/card">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <p className="text-xs text-gray-400 uppercase tracking-wider">Niche</p>
            </div>
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {influencer.niche}
            </p>
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
                <CardTitle className="text-lg">Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-sm">{influencer.bio}</p>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider">Conecte</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/link"
                >
                  <Instagram className="w-5 h-5 text-pink-400" />
                  <span className="text-sm text-gray-300 group-hover/link:text-white">Instagram</span>
                  <Share2 className="w-4 h-4 text-gray-600 group-hover/link:text-gray-300 ml-auto" />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/link"
                >
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-300 group-hover/link:text-white">TikTok</span>
                  <Share2 className="w-4 h-4 text-gray-600 group-hover/link:text-gray-300 ml-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                <AnimatedCount target={850000} label="Seguidores" />
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                <AnimatedCount target={125000} label="Alcance Médio" />
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                <AnimatedCount target={8.5} label="Engagement %" />
              </div>
            </div>

            <Card className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-lg p-3 transition-all duration-300 group/service cursor-pointer"
                    >
                      <div className="text-2xl mb-2">{service.icon}</div>
                      <p className="text-xs font-semibold text-gray-200 group-hover/service:text-purple-300 transition-colors">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {portfolioItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 group/item cursor-pointer"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-200 group-hover/item:text-white">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-400 font-medium">{item.engagement}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
                <CardTitle className="text-xl">Investimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Para Cliente Final</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      R$ 5.000
                    </span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-purple-500/30 to-pink-500/30"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Coparticipação</span>
                    <span className="text-xl font-bold text-purple-400">R$ 1.500</span>
                  </div>
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

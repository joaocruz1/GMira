 "use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, LogOut, GripVertical } from "lucide-react"
import { useRouter } from "next/navigation"

const availableNiches = [
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

interface AdminInfluencer {
  id: string
  name: string
  photo?: string
  city: string
  niche: string
  gender?: string
  reach?: string
  priceClient?: string
  email?: string
  phone?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  bio?: string
  followers?: string
  engagement?: string
  views30Days?: string
  reach30Days?: string
  averageReels?: string
  localAudience?: string
  priceMin?: string
  priceCopart?: string
  priceVideo?: string
  priceRepost?: string
  priceFinal?: string
  restrictions?: string
  services?: string
  portfolio?: string
  reviews?: string
  status?: string
  displayOrder?: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("all")
  const [influencers, setInfluencers] = useState<AdminInfluencer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [draggedOverId, setDraggedOverId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    email: "",
    phone: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    city: "",
    niches: [] as string[],
    mainNiche: "",
    bio: "",
    gender: "OUTRO",
    followers: "",
    reach: "",
    engagement: "",
    views30Days: "",
    reach30Days: "",
    averageReels: "",
    localAudience: "",
    priceVideo: "",
    priceCopart: "",
    priceFinal: "",
    restrictions: "",
    status: "PUBLISHED",
  })

  const loadInfluencers = async () => {
    try {
      const res = await fetch("/api/gmfaces/influencers?all=true")
      if (!res.ok) throw new Error("Erro ao carregar influenciadores")
      const data = await res.json()
      setInfluencers(data)
    } catch (error) {
      console.error(error)
      setInfluencers([])
    } finally {
      setIsLoading(false)
    }
  }

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          router.push("/gmfaces/admin/login")
        }
      } catch (error) {
        console.error(error)
        router.push("/gmfaces/admin/login")
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      loadInfluencers()
    }
  }, [isAuthenticated])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/gmfaces/admin/login")
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenModal = (influencer?: AdminInfluencer) => {
    if (influencer) {
      setIsEditing(true)
      setEditingId(influencer.id)
      setFormData({
        name: influencer.name || "",
        photo: influencer.photo || "",
        email: influencer.email || "",
        phone: influencer.phone || "",
        instagram: influencer.instagram || "",
        tiktok: influencer.tiktok || "",
        youtube: influencer.youtube || "",
        city: influencer.city || "",
        niches: (() => {
          try {
            const nicheData = JSON.parse(influencer.niche || "[]")
            if (typeof nicheData === "object" && nicheData !== null && nicheData.niches) {
              return nicheData.niches
            }
            if (Array.isArray(nicheData)) {
              return nicheData
            }
            return influencer.niche ? [influencer.niche] : []
          } catch {
            return influencer.niche ? [influencer.niche] : []
          }
        })(),
        mainNiche: (() => {
          try {
            const nicheData = JSON.parse(influencer.niche || "[]")
            if (typeof nicheData === "object" && nicheData !== null && nicheData.mainNiche) {
              return nicheData.mainNiche
            }
            if (Array.isArray(nicheData) && nicheData.length > 0) {
              return nicheData[0]
            }
            return influencer.niche || ""
          } catch {
            return influencer.niche || ""
          }
        })(),
        bio: influencer.bio || "",
        gender: influencer.gender || "OUTRO",
        followers: influencer.followers || "",
        reach: influencer.reach || "",
        engagement: influencer.engagement || "",
        views30Days: influencer.views30Days || "",
        reach30Days: influencer.reach30Days || "",
        averageReels: influencer.averageReels || "",
        localAudience: (() => {
          // Converter formato separado por vírgula para linhas ao editar
          // Usar regex para identificar padrões "número% cidade" sem quebrar vírgulas dos decimais
          const value = influencer.localAudience || ""
          if (value && value.includes(',')) {
            // Regex para encontrar padrão: número (com vírgula ou ponto decimal) seguido de % e cidade
            const pattern = /([\d]+[,.]?[\d]*)\%\s+([^,]+)/g
            const matches = [...value.matchAll(pattern)]
            
            if (matches.length > 0) {
              // Reconstruir linhas preservando formato original
              return matches.map(match => {
                const percentage = match[1]
                const city = match[2].trim()
                return `${percentage}% ${city}`
              }).join('\n')
            }
            
            // Fallback: tentar split simples (pode quebrar porcentagens com vírgula)
            return value.split(',').map(item => item.trim()).join('\n')
          }
          return value
        })(),
        priceVideo: influencer.priceVideo || "",
        priceCopart: influencer.priceCopart || "",
        priceFinal: influencer.priceFinal || "",
        restrictions: influencer.restrictions || "",
        status: influencer.status || "PUBLISHED",
      })
      setPhotoPreview(influencer.photo || null)
      
      // Carregar portfolio e reviews
      try {
        if (influencer.portfolio) {
          setPortfolioItems(JSON.parse(influencer.portfolio))
        } else {
          setPortfolioItems([])
        }
        if (influencer.reviews) {
          setReviews(JSON.parse(influencer.reviews))
        } else {
          setReviews([])
        }
      } catch (error) {
        console.error("Erro ao parsear JSON:", error)
        setPortfolioItems([])
        setReviews([])
      }
    } else {
      setIsEditing(false)
      setEditingId(null)
      setFormData({
        name: "",
        photo: "",
        email: "",
        phone: "",
        instagram: "",
        tiktok: "",
        youtube: "",
        city: "",
        niches: [],
        mainNiche: "",
        bio: "",
        gender: "OUTRO",
        followers: "",
        reach: "",
        engagement: "",
        views30Days: "",
        reach30Days: "",
        averageReels: "",
        localAudience: "",
        priceVideo: "",
        priceCopart: "",
        priceFinal: "",
        restrictions: "",
        status: "PUBLISHED",
      })
      setPhotoPreview(null)
      setPortfolioItems([])
      setReviews([])
    }
    setPhotoFile(null)
    setIsModalOpen(true)
    setFormMessage(null)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      // Criar preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUpload = async (): Promise<string | null> => {
    if (!photoFile) {
      return formData.photo || null
    }

    setIsUploadingPhoto(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", photoFile)

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: uploadFormData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Erro ao fazer upload")
      }

      return data.url
    } catch (error: any) {
      console.error(error)
      setFormMessage(error.message || "Erro ao fazer upload da imagem")
      return null
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
    setEditingId(null)
    setFormMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormMessage(null)
    
    // Validar nichos
    if (formData.niches.length === 0) {
      setFormMessage("Selecione pelo menos 1 nicho.")
      return
    }
    if (formData.niches.length === 3 && !formData.mainNiche) {
      setFormMessage("Selecione qual é o nicho principal.")
      return
    }
    if (formData.mainNiche && !formData.niches.includes(formData.mainNiche)) {
      setFormMessage("O nicho principal deve estar entre os nichos selecionados.")
      return
    }
    
    setFormSubmitting(true)

    try {
      // Fazer upload da foto se houver arquivo novo
      let photoUrl = formData.photo
      if (photoFile) {
        const uploadedUrl = await handlePhotoUpload()
        if (uploadedUrl) {
          photoUrl = uploadedUrl
        } else {
          setFormSubmitting(false)
          return
        }
      }

      const url = isEditing && editingId
        ? `/api/gmfaces/influencers/${editingId}`
        : "/api/gmfaces/influencers"

      const method = isEditing ? "PATCH" : "POST"

      // Preparar dados de nicho no formato correto
      const nicheData = formData.niches.length === 3
        ? {
            niches: formData.niches,
            mainNiche: formData.mainNiche || formData.niches[0],
          }
        : formData.niches.length > 0
        ? {
            niches: formData.niches,
            mainNiche: formData.mainNiche || formData.niches[0],
          }
        : { niches: [], mainNiche: "" }

      // Converter localAudience de linhas para formato separado por vírgula
      const localAudienceFormatted = formData.localAudience
        ? formData.localAudience.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join(', ')
        : formData.localAudience

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          localAudience: localAudienceFormatted,
          photo: photoUrl,
          niche: JSON.stringify(nicheData),
          services: JSON.stringify([]),
          portfolio: JSON.stringify(portfolioItems),
          reviews: JSON.stringify(reviews),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Erro ao salvar influenciador")
      }

      setFormMessage(isEditing ? "Influenciador atualizado com sucesso!" : "Influenciador criado com sucesso!")
      
      // Recarregar lista
      setIsLoading(true)
      await loadInfluencers()

      // Fechar modal após 1 segundo
      setTimeout(() => {
        handleCloseModal()
      }, 1000)
    } catch (error: any) {
      console.error(error)
      setFormMessage(error.message || "Erro ao salvar influenciador. Tente novamente.")
    } finally {
      setFormSubmitting(false)
    }
  }

  // Funções para gerenciar Portfolio
  const addPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, { title: "", category: "", engagement: "" }])
  }

  const updatePortfolioItem = (index: number, field: keyof PortfolioItem, value: string) => {
    const updated = [...portfolioItems]
    updated[index] = { ...updated[index], [field]: value }
    setPortfolioItems(updated)
  }

  const removePortfolioItem = (index: number) => {
    setPortfolioItems(portfolioItems.filter((_, i) => i !== index))
  }

  // Funções para gerenciar Reviews
  const addReview = () => {
    setReviews([...reviews, { author: "", company: "", rating: 5, text: "" }])
  }

  const updateReview = (index: number, field: keyof Review, value: string | number) => {
    const updated = [...reviews]
    updated[index] = { ...updated[index], [field]: value }
    setReviews(updated)
  }

  const removeReview = (index: number) => {
    setReviews(reviews.filter((_, i) => i !== index))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setDraggedOverId(id)
  }

  const handleDragEnd = async () => {
    if (!draggedId || !draggedOverId || draggedId === draggedOverId) {
      setDraggedId(null)
      setDraggedOverId(null)
      return
    }

    const draggedIndex = filteredInfluencers.findIndex((inf) => inf.id === draggedId)
    const draggedOverIndex = filteredInfluencers.findIndex((inf) => inf.id === draggedOverId)

    if (draggedIndex === -1 || draggedOverIndex === -1) {
      setDraggedId(null)
      setDraggedOverId(null)
      return
    }

    // Criar nova ordem
    const newOrder = [...filteredInfluencers]
    const [removed] = newOrder.splice(draggedIndex, 1)
    newOrder.splice(draggedOverIndex, 0, removed)

    // Atualizar ordem localmente
    const updatedInfluencers = newOrder.map((inf, index) => ({
      ...inf,
      displayOrder: index + 1,
    }))
    setInfluencers(updatedInfluencers)

    // Enviar nova ordem para o servidor
    try {
      const res = await fetch("/api/gmfaces/influencers/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          influencerIds: newOrder.map((inf) => inf.id),
        }),
      })

      if (!res.ok) {
        throw new Error("Erro ao atualizar ordem")
      }
    } catch (error) {
      console.error(error)
      // Reverter em caso de erro
      await loadInfluencers()
    }

    setDraggedId(null)
    setDraggedOverId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este influenciador?")) {
      return
    }

    try {
      const res = await fetch(`/api/gmfaces/influencers/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Erro ao excluir influenciador")
      }

      // Recarregar lista
      setIsLoading(true)
      await loadInfluencers()
    } catch (error) {
      console.error(error)
      alert("Erro ao excluir influenciador. Tente novamente.")
    }
  }

  // Ordenar influenciadores por displayOrder antes de filtrar
  const sortedInfluencers = [...influencers].sort((a, b) => {
    const orderA = a.displayOrder ?? 999999
    const orderB = b.displayOrder ?? 999999
    return orderA - orderB
  })

  const filteredInfluencers = sortedInfluencers.filter((inf) => {
    const matchesSearch =
      inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.city.toLowerCase().includes(searchTerm.toLowerCase())
    // Verificar se o nicho selecionado está nos nichos do influenciador
    let matchesNiche = true
    if (selectedNiche !== "all") {
      try {
        const nicheData = JSON.parse(inf.niche || "[]")
        if (typeof nicheData === "object" && nicheData !== null && nicheData.niches) {
          matchesNiche = nicheData.niches.includes(selectedNiche)
        } else if (Array.isArray(nicheData)) {
          matchesNiche = nicheData.includes(selectedNiche)
        } else {
          matchesNiche = inf.niche === selectedNiche
        }
      } catch {
        matchesNiche = inf.niche === selectedNiche
      }
    }
    return matchesSearch && matchesNiche
  })

  // Extrair todos os nichos únicos dos influenciadores
  const allNiches = new Set<string>()
  influencers.forEach((inf) => {
    try {
      const nicheData = JSON.parse(inf.niche || "[]")
      if (typeof nicheData === "object" && nicheData !== null && nicheData.niches) {
        nicheData.niches.forEach((n: string) => allNiches.add(n))
      } else if (Array.isArray(nicheData)) {
        nicheData.forEach((n: string) => allNiches.add(n))
      } else if (inf.niche) {
        allNiches.add(inf.niche)
      }
    } catch {
      if (inf.niche) {
        allNiches.add(inf.niche)
      }
    }
  })
  const niches = ["all", ...Array.from(allNiches).sort()]

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white flex items-center justify-center">
        <p className="text-gray-400">Verificando autenticação...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white pt-24 pb-6 px-6 md:pt-28 md:pb-8 md:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg">
                  GM
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    GM Faces
                  </h1>
                  <p className="text-sm text-gray-400">Painel de Administração</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-end">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link href="/gmfaces">← Ver Catálogo</Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <Button
                onClick={() => handleOpenModal()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                + Novo Influenciador
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/10 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  Total de Influenciadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-bold text-white">
                    {isLoading ? "…" : influencers.length}
                  </div>
                  <span className="text-xs text-green-400 mb-1">+2 este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <span className="text-xl">⏳</span>
                  Solicitações Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-bold text-yellow-400">3</div>
                  <span className="text-xs text-red-400 mb-1">Atender hoje</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  Nicho Mais Popular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-bold text-green-400">Beleza</div>
                  <span className="text-xs text-gray-400 mb-1">45% do catálogo</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="🔍 Buscar por nome ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
            <div className="flex gap-2 flex-wrap">
              {niches.map((niche) => (
                <button
                  key={niche}
                  onClick={() => setSelectedNiche(niche)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedNiche === niche
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {niche === "all" ? "Todos" : niche}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Influencers Table */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-4 border-b border-white/10">
            <CardTitle className="flex items-center justify-between">
              <span className="text-white text-lg font-bold">Catálogo de Influenciadores</span>
                <span className="text-xs font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                  {isLoading
                    ? "Carregando..."
                    : `${filteredInfluencers.length} resultado${
                        filteredInfluencers.length !== 1 ? "s" : ""
                      }`}
                </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="py-4 px-4 font-semibold text-left">Influenciador</th>
                    <th className="py-4 px-4 font-semibold text-left">Nicho</th>
                    <th className="py-4 px-4 font-semibold text-left">Localização</th>
                    <th className="py-4 px-4 font-semibold text-left">Alcance</th>
                    <th className="py-4 px-4 font-semibold text-right">Preço Final</th>
                    <th className="py-4 px-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-8 px-4 text-center text-gray-400">
                        Carregando influenciadores...
                      </td>
                    </tr>
                  ) : filteredInfluencers.length > 0 ? (
                    filteredInfluencers.map((influencer) => (
                      <tr
                        key={influencer.id}
                        draggable
                        onDragStart={() => handleDragStart(influencer.id)}
                        onDragOver={(e) => handleDragOver(e, influencer.id)}
                        onDragEnd={handleDragEnd}
                        className={`hover:bg-white/5 transition-all duration-200 group cursor-move ${
                          draggedId === influencer.id ? "opacity-50" : ""
                        } ${
                          draggedOverId === influencer.id ? "bg-purple-500/20 border-t-2 border-purple-400" : ""
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-gray-500 cursor-grab active:cursor-grabbing" />
                            <div className="flex items-center gap-3">
                            {influencer.photo ? (
                              <img
                                src={influencer.photo}
                                alt={influencer.name}
                                className="w-10 h-10 rounded-full object-cover border border-purple-500/30 group-hover:border-purple-500/60 transition-colors"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-xs font-bold text-purple-300 border border-purple-500/30 group-hover:border-purple-500/60 transition-colors">
                                {influencer.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                {influencer.name}
                              </div>
                              <div className="text-xs text-gray-500">{influencer.gender}</div>
                            </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {(() => {
                              try {
                                const nicheData = JSON.parse(influencer.niche || "[]")
                                if (typeof nicheData === "object" && nicheData !== null && nicheData.niches) {
                                  // Formato novo: mostrar todos os nichos, com o principal destacado
                                  return nicheData.niches.map((niche: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                        niche === nicheData.mainNiche
                                          ? "bg-purple-600/40 text-purple-200 border-purple-400/50 font-bold"
                                          : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                      }`}
                                    >
                                      {niche === nicheData.mainNiche ? `${niche} ⭐` : niche}
                                    </span>
                                  ))
                                }
                                if (Array.isArray(nicheData) && nicheData.length > 0) {
                                  return nicheData.map((niche: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    >
                                      {niche}
                                    </span>
                                  ))
                                }
                              } catch {}
                              return (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                  {influencer.niche}
                                </span>
                              )
                            })()}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-300">📍 {influencer.city}</td>
                        <td className="py-4 px-4 text-gray-300">{influencer.reach}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-bold text-green-400">{influencer.priceFinal || "—"}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleOpenModal(influencer)}
                              className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 rounded"
                              title="Editar"
                            >
                              ✎
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(influencer.id)}
                              className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded"
                              title="Excluir"
                            >
                              ✕
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 px-4 text-center text-gray-400">
                        Nenhum influenciador encontrado com os filtros aplicados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Cadastro/Edição */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {isEditing ? "Editar Influenciador" : "Novo Influenciador"}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {formMessage && (
                  <div
                    className={`mb-4 p-3 rounded-lg ${
                      formMessage.includes("sucesso")
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {formMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Campo de Foto */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Foto do Perfil
                    </label>
                    <div className="flex items-center gap-4">
                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/30"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoFile(null)
                              setPhotoPreview(formData.photo || null)
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-2xl font-bold text-purple-300 border-2 border-purple-500/30">
                          {formData.name.substring(0, 2).toUpperCase() || "??"}
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handlePhotoChange}
                          disabled={isUploadingPhoto}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG ou WEBP (máx. 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Nome do influenciador"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="@usuario"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">TikTok</label>
                      <input
                        type="text"
                        value={formData.tiktok}
                        onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="@usuario"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">YouTube</label>
                      <input
                        type="text"
                        value={formData.youtube}
                        onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Nome do canal"
                      />
                    </div>
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nichos Principais (selecione 3) *
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto bg-white/5 border border-white/10 rounded-lg p-3">
                        {availableNiches.map((niche) => (
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">Gênero *</label>
                      <select
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      >
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status *</label>
                      <select
                        required
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      >
                        <option value="PENDING">Pendente</option>
                        <option value="PUBLISHED">Publicado</option>
                        <option value="REJECTED">Rejeitado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Seguidores *</label>
                      <input
                        type="text"
                        required
                        value={formData.followers}
                        onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: 734, 50k, 100k"
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
                      <textarea
                        value={formData.localAudience}
                        onChange={(e) => setFormData({ ...formData, localAudience: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all min-h-[120px] resize-y font-mono text-sm"
                        placeholder="47% Ouro Fino&#10;3,4% Inconfidentes&#10;3,1% Pouso Alegre"
                      />
                      <p className="text-xs text-purple-300 mt-1">
                        Digite uma cidade por linha (pressione Enter para nova linha). As porcentagens serão preservadas exatamente como digitadas ao salvar.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cachê de Vídeo *</label>
                      <input
                        type="text"
                        required
                        value={formData.priceVideo}
                        onChange={(e) => setFormData({ ...formData, priceVideo: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: R$ 300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cachê de Coparticipação *</label>
                      <input
                        type="text"
                        required
                        value={formData.priceCopart}
                        onChange={(e) => setFormData({ ...formData, priceCopart: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: R$ 150"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preço Final *</label>
                      <input
                        type="text"
                        required
                        value={formData.priceFinal}
                        onChange={(e) => setFormData({ ...formData, priceFinal: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Ex: R$ 400"
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
                      placeholder="Descrição do influenciador..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Restrições</label>
                    <textarea
                      value={formData.restrictions}
                      onChange={(e) => setFormData({ ...formData, restrictions: e.target.value })}
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                      placeholder="Ex: Não divulga jogos de azar, apenas marcas cruelty-free..."
                    />
                  </div>

                  {/* Seção de Portfolio */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-300">Portfolio</label>
                      <Button
                        type="button"
                        onClick={addPortfolioItem}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        + Adicionar Item
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {portfolioItems.map((item, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-4">
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => updatePortfolioItem(index, "title", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                                placeholder="Título"
                              />
                            </div>
                            <div className="col-span-3">
                              <input
                                type="text"
                                value={item.category}
                                onChange={(e) => updatePortfolioItem(index, "category", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                                placeholder="Categoria"
                              />
                            </div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                value={item.engagement}
                                onChange={(e) => updatePortfolioItem(index, "engagement", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                                placeholder="Engagement (ex: 8.5%)"
                              />
                            </div>
                            <div className="col-span-1">
                              <Button
                                type="button"
                                onClick={() => removePortfolioItem(index)}
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:text-red-300"
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seção de Reviews */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-300">Avaliações</label>
                      <Button
                        type="button"
                        onClick={addReview}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        + Adicionar Avaliação
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {reviews.map((review, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={review.author}
                                onChange={(e) => updateReview(index, "author", e.target.value)}
                                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                                placeholder="Autor"
                              />
                              <input
                                type="text"
                                value={review.company}
                                onChange={(e) => updateReview(index, "company", e.target.value)}
                                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                                placeholder="Empresa"
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <label className="text-sm text-gray-400">Avaliação:</label>
                              <select
                                value={review.rating}
                                onChange={(e) => updateReview(index, "rating", parseInt(e.target.value))}
                                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                              >
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <option key={num} value={num}>
                                    {num} {num === 1 ? "estrela" : "estrelas"}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <textarea
                              value={review.text}
                              onChange={(e) => updateReview(index, "text", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                              rows={2}
                              placeholder="Texto da avaliação"
                            />
                            <Button
                              type="button"
                              onClick={() => removeReview(index)}
                              size="sm"
                              variant="ghost"
                              className="text-red-400 hover:text-red-300"
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={formSubmitting}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-600/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formSubmitting
                        ? isEditing
                          ? "Atualizando..."
                          : "Criando..."
                        : isEditing
                          ? "Atualizar Influenciador"
                          : "Criar Influenciador"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseModal}
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
    </div>
  )
}

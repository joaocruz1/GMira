import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // 1. Total de Influenciadores Ativos
    const totalActive = await prisma.influencer.count({
      where: { status: "PUBLISHED" },
    })

    const totalActiveLastMonth = await prisma.influencer.count({
      where: {
        status: "PUBLISHED",
        createdAt: { lt: startOfMonth },
      },
    })

    const growthThisMonth = totalActive - totalActiveLastMonth

    // 2. Meta Mensal de Influenciadores
    const addedThisMonth = await prisma.influencer.count({
      where: {
        createdAt: { gte: startOfMonth },
      },
    })
    const monthlyGoal = 3
    const progress = Math.min(addedThisMonth, monthlyGoal)
    const progressPercentage = (progress / monthlyGoal) * 100

    // 3. Nicho Mais Presente
    const allInfluencers = await prisma.influencer.findMany({
      where: { status: "PUBLISHED" },
      select: { niche: true },
    })

    const nicheCount: Record<string, number> = {}
    allInfluencers.forEach((inf) => {
      try {
        const nicheData = JSON.parse(inf.niche || "[]")
        const niches = nicheData.niches || (Array.isArray(nicheData) ? nicheData : [nicheData])
        niches.forEach((niche: string) => {
          nicheCount[niche] = (nicheCount[niche] || 0) + 1
        })
      } catch {
        if (inf.niche) {
          nicheCount[inf.niche] = (nicheCount[inf.niche] || 0) + 1
        }
      }
    })

    const topNiche = Object.entries(nicheCount).sort((a, b) => b[1] - a[1])[0]
    const topNichePercentage = totalActive > 0 ? ((topNiche?.[1] || 0) / totalActive) * 100 : 0

    // 4. Top Influenciadores do Mês (por visualizações)
    const profileViews = await prisma.analytics.findMany({
      where: {
        eventType: "profile_view",
        createdAt: { gte: startOfMonth },
      },
      select: { influencerId: true },
    })

    const viewCounts: Record<string, number> = {}
    profileViews.forEach((view) => {
      if (view.influencerId) {
        viewCounts[view.influencerId] = (viewCounts[view.influencerId] || 0) + 1
      }
    })

    const topInfluencersIds = Object.entries(viewCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id)

    const topInfluencers = await prisma.influencer.findMany({
      where: { id: { in: topInfluencersIds } },
      select: { id: true, name: true, photo: true },
    })

    const topInfluencersWithViews = topInfluencers.map((inf) => ({
      id: inf.id,
      name: inf.name,
      photo: inf.photo,
      views: viewCounts[inf.id] || 0,
    }))
    topInfluencersWithViews.sort((a, b) => b.views - a.views)

    // 5. Visão Geral do Catálogo (últimos 30 dias)
    const catalogAccesses = await prisma.analytics.count({
      where: {
        eventType: "catalog_access",
        createdAt: { gte: thirtyDaysAgo },
      },
    })

    const catalogAccessesLastMonth = await prisma.analytics.count({
      where: {
        eventType: "catalog_access",
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
    })

    const whatsappClicks = await prisma.analytics.count({
      where: {
        eventType: "whatsapp_click",
        createdAt: { gte: thirtyDaysAgo },
      },
    })

    const whatsappClicksLastMonth = await prisma.analytics.count({
      where: {
        eventType: "whatsapp_click",
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
    })

    const conversionRate = catalogAccesses > 0 ? (whatsappClicks / catalogAccesses) * 100 : 0

    const catalogGrowth =
      catalogAccessesLastMonth > 0
        ? ((catalogAccesses - catalogAccessesLastMonth) / catalogAccessesLastMonth) * 100
        : 0

    // 6. Engajamento Médio do Catálogo
    const influencersWithEngagement = await prisma.influencer.findMany({
      where: {
        status: "PUBLISHED",
        engagement: { not: null },
      },
      select: { engagement: true },
    })

    let totalEngagement = 0
    let count = 0
    influencersWithEngagement.forEach((inf) => {
      if (inf.engagement) {
        const cleaned = inf.engagement.replace(/[^\d.,]/g, "").replace(",", ".")
        const num = parseFloat(cleaned)
        if (!isNaN(num)) {
          totalEngagement += num
          count++
        }
      }
    })

    const averageEngagement = count > 0 ? totalEngagement / count : 0

    // 7. Distribuição Geral de Nichos (incluir todos os nichos disponíveis)
    const allAvailableNiches = [
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

    const nicheDistribution = allAvailableNiches.map((niche) => {
      const count = nicheCount[niche] || 0
      return {
        niche,
        count,
        percentage: totalActive > 0 ? (count / totalActive) * 100 : 0,
      }
    }).sort((a, b) => b.count - a.count)

    return NextResponse.json({
      totalActive,
      growthThisMonth,
      addedThisMonth,
      monthlyGoal,
      progressPercentage,
      topNiche: topNiche ? { name: topNiche[0], count: topNiche[1], percentage: topNichePercentage } : null,
      topInfluencers: topInfluencersWithViews,
      catalogAccesses,
      catalogGrowth,
      whatsappClicks,
      conversionRate,
      averageEngagement,
      nicheDistribution,
    })
  } catch (error: any) {
    console.error("Erro ao buscar estatísticas:", error)
    return NextResponse.json({ error: error.message || "Erro ao buscar estatísticas" }, { status: 500 })
  }
}


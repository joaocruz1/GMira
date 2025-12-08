import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get("all") === "true"

    const influencers = await prisma.influencer.findMany({
      where: all ? {} : { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(influencers)
  } catch (error) {
    console.error("Erro ao listar influenciadores:", error)
    return NextResponse.json({ error: "Erro ao listar influenciadores" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Remover campos que não existem no schema (niches, mainNiche)
    const {
      niches,
      mainNiche,
      ...restBody
    } = body

    const {
      name,
      photo,
      email,
      phone,
      instagram,
      tiktok,
      youtube,
      city,
      niche,
      bio,
      gender,
      followers,
      reach,
      engagement,
      views30Days,
      reach30Days,
      averageReels,
      localAudience,
      priceMin,
      priceClient,
      priceCopart,
      priceVideo,
      priceRepost,
      priceFinal,
      restrictions,
      services,
      portfolio,
      reviews,
      status,
    } = restBody

    if (!name || !city || !niche || !bio || !gender) {
      return NextResponse.json({ error: "Campos obrigatórios não informados." }, { status: 400 })
    }

    // Lista explícita de campos válidos do schema Prisma
    const influencerData: Record<string, any> = {
      name,
      city,
      niche,
      bio,
      gender,
      status: status ?? "PUBLISHED",
    }

    // Adicionar campos opcionais apenas se existirem e não forem undefined
    const optionalFields: Record<string, any> = {
      photo,
      email,
      phone,
      instagram,
      tiktok,
      youtube,
      followers,
      reach,
      engagement,
      views30Days,
      reach30Days,
      averageReels,
      localAudience,
      priceMin,
      priceClient,
      priceCopart,
      priceVideo,
      priceRepost,
      priceFinal,
      restrictions,
      services,
      portfolio,
      reviews,
    }

    // Adicionar apenas campos que têm valor (não undefined)
    Object.entries(optionalFields).forEach(([key, value]) => {
      if (value !== undefined) {
        influencerData[key] = value || null
      }
    })

    const influencer = await prisma.influencer.create({
      data: influencerData,
    })

    return NextResponse.json(influencer, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar influenciador:", error)
    return NextResponse.json({ error: "Erro ao criar influenciador" }, { status: 500 })
  }
}



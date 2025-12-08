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

    // Criar objeto apenas com campos válidos do schema
    const influencerData: any = {
      name,
      photo: photo || null,
      email: email || null,
      phone: phone || null,
      instagram: instagram || null,
      tiktok: tiktok || null,
      youtube: youtube || null,
      city,
      niche,
      bio,
      gender,
      followers: followers || null,
      reach: reach || null,
      engagement: engagement || null,
      views30Days: views30Days || null,
      reach30Days: reach30Days || null,
      averageReels: averageReels || null,
      localAudience: localAudience || null,
      priceMin: priceMin || null,
      priceClient: priceClient || null,
      priceCopart: priceCopart || null,
      priceVideo: priceVideo || null,
      priceRepost: priceRepost || null,
      priceFinal: priceFinal || null,
      restrictions: restrictions || null,
      services: services || null,
      portfolio: portfolio || null,
      reviews: reviews || null,
      status: status ?? "PUBLISHED",
    }

    // Remover campos undefined para evitar problemas
    Object.keys(influencerData).forEach(key => {
      if (influencerData[key] === undefined) {
        delete influencerData[key]
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



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
      priceMin,
      priceClient,
      priceCopart,
      priceVideo,
      priceRepost,
      restrictions,
      services,
      portfolio,
      reviews,
      status,
    } = body

    if (!name || !city || !niche || !bio || !gender) {
      return NextResponse.json({ error: "Campos obrigatórios não informados." }, { status: 400 })
    }

    const influencer = await prisma.influencer.create({
      data: {
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
        priceMin,
        priceClient,
        priceCopart,
        priceVideo,
        priceRepost,
        restrictions,
        services,
        portfolio,
        reviews,
        status: status ?? "PUBLISHED",
      },
    })

    return NextResponse.json(influencer, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar influenciador:", error)
    return NextResponse.json({ error: "Erro ao criar influenciador" }, { status: 500 })
  }
}



import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      name,
      email,
      phone,
      instagram,
      niche,
      city,
      followers,
      engagement,
      priceVideo,
      priceRepost,
      bio,
      gender,
    } = body

    if (!name || !email || !phone || !instagram || !niche || !city || !bio) {
      return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 })
    }

    // Para criadores que se cadastram, criamos o registro como PENDING
    const influencer = await prisma.influencer.create({
      data: {
        name,
        email,
        phone,
        instagram,
        niche,
        city,
        followers,
        engagement,
        priceVideo,
        priceRepost,
        bio,
        gender: gender ?? "OUTRO",
        status: "PENDING",
      },
    })

    return NextResponse.json(
      {
        message: "Cadastro recebido com sucesso! Em breve entraremos em contato.",
        influencerId: influencer.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao enviar cadastro GM Faces:", error)
    return NextResponse.json({ error: "Erro ao enviar cadastro. Tente novamente mais tarde." }, { status: 500 })
  }
}




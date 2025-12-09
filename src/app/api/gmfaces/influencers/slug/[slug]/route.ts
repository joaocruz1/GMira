import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteContext {
  params: { slug: string }
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { slug } = context.params
  const { searchParams } = new URL(req.url)
  const all = searchParams.get("all") === "true"

  try {
    const influencer = await prisma.influencer.findFirst({
      where: { slug },
    })

    if (!influencer) {
      return NextResponse.json({ error: "Influenciador não encontrado" }, { status: 404 })
    }

    // Se não for admin (all=true), só retorna se estiver publicado
    if (!all && influencer.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Influenciador não encontrado" }, { status: 404 })
    }

    return NextResponse.json(influencer)
  } catch (error) {
    console.error("Erro ao buscar influenciador:", error)
    return NextResponse.json({ error: "Erro ao buscar influenciador" }, { status: 500 })
  }
}


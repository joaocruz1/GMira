import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/lib/slug"

interface RouteContext {
  params: { id: string }
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = context.params
  const { searchParams } = new URL(req.url)
  const all = searchParams.get("all") === "true"

  try {
    const influencer = await prisma.influencer.findUnique({
      where: { id },
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

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = context.params

  try {
    const body = await req.json()
    
    // Filtrar apenas os campos válidos do schema do Prisma
    // Remover campos que não existem no schema (niches, mainNiche)
    const {
      niches,
      mainNiche,
      name,
      ...validData
    } = body

    // Se o nome mudou, gerar novo slug
    if (name) {
      const baseSlug = generateSlug(name)
      let slug = baseSlug
      let counter = 1
      
      // Verificar se slug já existe (exceto para o próprio influenciador)
      while (true) {
        const existing = await prisma.influencer.findFirst({
          where: { 
            slug,
            NOT: { id }
          },
        })
        if (!existing) break
        slug = `${baseSlug}-${counter}`
        counter++
      }
      
      validData.slug = slug
    }

    const influencer = await prisma.influencer.update({
      where: { id },
      data: {
        ...validData,
        ...(name && { name }),
      },
    })

    return NextResponse.json(influencer)
  } catch (error) {
    console.error("Erro ao atualizar influenciador:", error)
    return NextResponse.json({ error: "Erro ao atualizar influenciador" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = context.params

  try {
    await prisma.influencer.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao remover influenciador:", error)
    return NextResponse.json({ error: "Erro ao remover influenciador" }, { status: 500 })
  }
}



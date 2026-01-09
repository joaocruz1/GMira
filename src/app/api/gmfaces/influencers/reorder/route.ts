import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { influencerIds } = body

    if (!Array.isArray(influencerIds)) {
      return NextResponse.json({ error: "influencerIds deve ser um array" }, { status: 400 })
    }

    // Atualizar a ordem de cada influenciador
    const updatePromises = influencerIds.map((id: string, index: number) =>
      prisma.influencer.update({
        where: { id },
        data: { displayOrder: index + 1 },
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao reordenar influenciadores:", error)
    return NextResponse.json({ error: "Erro ao reordenar influenciadores" }, { status: 500 })
  }
}








import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Registrar evento de analytics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, influencerId, metadata } = body

    if (!eventType) {
      return NextResponse.json({ error: "eventType é obrigatório" }, { status: 400 })
    }

    const analytics = await prisma.analytics.create({
      data: {
        eventType,
        influencerId: influencerId || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    })

    return NextResponse.json({ success: true, id: analytics.id })
  } catch (error: any) {
    console.error("Erro ao registrar analytics:", error)
    return NextResponse.json({ error: error.message || "Erro ao registrar evento" }, { status: 500 })
  }
}




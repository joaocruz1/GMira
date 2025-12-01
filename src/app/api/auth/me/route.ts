import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("admin_session")?.value

    if (!sessionId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Buscar usuário pelo ID da sessão
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Erro ao verificar sessão:", error)
    return NextResponse.json({ error: "Erro ao verificar sessão" }, { status: 500 })
  }
}



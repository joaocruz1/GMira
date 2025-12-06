import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Buscar usuário no banco
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
    }

    // Criar resposta com dados do usuário (sem senha)
    const { password: _, ...userWithoutPassword } = user

    // Criar resposta de sucesso
    const response = NextResponse.json(
      {
        message: "Login realizado com sucesso",
        user: userWithoutPassword,
      },
      { status: 200 },
    )

    // Criar cookie de sessão simples (em produção, use JWT ou sessão segura)
    response.cookies.set("admin_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return response
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 })
  }
}





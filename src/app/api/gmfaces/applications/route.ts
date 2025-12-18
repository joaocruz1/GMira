import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendApplicationEmail } from "@/lib/email"

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
      views30Days,
      reach30Days,
      averageReels,
      localAudience,
      priceVideo,
      priceCopart,
      priceFinal,
      bio,
      gender,
    } = body

    // Validar que niche existe e não está vazio
    if (!name || !email || !phone || !instagram || !niche || !city || !bio) {
      return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 })
    }

    // Validar que niche é um JSON válido com formato { niches: [...], mainNiche: "..." }
    let nicheData: { niches: string[]; mainNiche: string } | null = null
    try {
      const parsed = JSON.parse(niche)
      if (typeof parsed === "object" && parsed !== null && parsed.niches && parsed.mainNiche) {
        // Formato novo: { niches: [...], mainNiche: "..." }
        if (!Array.isArray(parsed.niches) || parsed.niches.length !== 3) {
          return NextResponse.json({ error: "Selecione exatamente 3 nichos principais." }, { status: 400 })
        }
        if (!parsed.mainNiche || !parsed.niches.includes(parsed.mainNiche)) {
          return NextResponse.json({ error: "O nicho principal deve estar entre os 3 nichos selecionados." }, { status: 400 })
        }
        nicheData = parsed
      } else if (Array.isArray(parsed)) {
        // Formato antigo: array de nichos (compatibilidade)
        if (parsed.length === 0) {
          return NextResponse.json({ error: "Selecione pelo menos 1 nicho principal." }, { status: 400 })
        }
        nicheData = { niches: parsed, mainNiche: parsed[0] }
      } else {
        // String única (compatibilidade com dados antigos)
        nicheData = { niches: [niche], mainNiche: niche }
      }
    } catch {
      // Se não for JSON, tratar como string única (compatibilidade com dados antigos)
      nicheData = { niches: [niche], mainNiche: niche }
    }

    // Para criadores que se cadastram, criamos o registro como PENDING
    // Salvamos os nichos como JSON string no formato { niches: [...], mainNiche: "..." }
    const influencer = await prisma.influencer.create({
      data: {
        name,
        email,
        phone,
        instagram,
        niche: JSON.stringify(nicheData),
        city,
        followers,
        views30Days,
        reach30Days,
        averageReels,
        localAudience,
        priceVideo,
        priceCopart,
        priceFinal,
        bio,
        gender: gender ?? "OUTRO",
        status: "PENDING",
      },
    })

    // Enviar email de notificação (não bloqueia a resposta em caso de erro)
    sendApplicationEmail({
      name,
      email,
      phone,
      instagram,
      niche: JSON.stringify(nicheData),
      city,
      followers,
      views30Days,
      reach30Days,
      averageReels,
      localAudience,
      priceVideo,
      priceCopart,
      bio,
      gender,
    }).catch((error) => {
      console.error("Erro ao enviar email de notificação:", error)
      // Não falha o cadastro se o email falhar
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





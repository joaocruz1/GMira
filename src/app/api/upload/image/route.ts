import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Validar tipo de arquivo
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de arquivo inválido. Use JPG, PNG ou WEBP" },
        { status: 400 },
      )
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Arquivo muito grande. Máximo 5MB" }, { status: 400 })
    }

    // Verificar se o token está configurado
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN não configurado" },
        { status: 500 },
      )
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const fileName = `influencers/${timestamp}-${randomStr}.${extension}`

    // Converter File para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Fazer upload para Vercel Blob
    const { url } = await put(fileName, buffer, {
      access: "public",
      contentType: file.type,
    })

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error("Erro ao fazer upload:", error)
    return NextResponse.json({ error: "Erro ao fazer upload da imagem" }, { status: 500 })
  }
}



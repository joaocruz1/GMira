import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...")

  // Criar usuário admin padrão
  const email = "gmira@gmira.com"
  const password = "gmfaces123"

  // Verificar se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log("✅ Usuário admin já existe, pulando criação...")
  } else {
    // Gerar hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "GMira Admin",
        role: "admin",
      },
    })

    console.log("✅ Usuário admin criado com sucesso!")
    console.log(`   Email: ${user.email}`)
    console.log(`   ID: ${user.id}`)
  }

  console.log("✨ Seed concluído!")
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })






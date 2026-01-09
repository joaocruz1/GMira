import nodemailer from "nodemailer"

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface FormData {
  name: string
  email: string
  phone: string
  instagram: string
  niche: string
  city: string
  followers?: string
  views30Days?: string
  reach30Days?: string
  averageReels?: string
  localAudience?: string
  priceVideo?: string
  priceCopart?: string
  bio: string
  gender?: string
}

// Criar transporter do nodemailer
function createTransporter() {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  }

  return nodemailer.createTransport(config)
}

// Formatar dados do formulário para email
function formatFormData(data: FormData): string {
  let nicheData: { niches: string[]; mainNiche: string } | null = null
  
  try {
    const parsed = JSON.parse(data.niche)
    if (typeof parsed === "object" && parsed !== null && parsed.niches && parsed.mainNiche) {
      nicheData = parsed
    } else if (Array.isArray(parsed)) {
      nicheData = { niches: parsed, mainNiche: parsed[0] }
    } else {
      nicheData = { niches: [data.niche], mainNiche: data.niche }
    }
  } catch {
    nicheData = { niches: [data.niche], mainNiche: data.niche }
  }

  const nichesList = nicheData.niches.map((n, idx) => {
    const isMain = n === nicheData?.mainNiche
    return `${idx + 1}. ${n}${isMain ? " ⭐ (Principal)" : ""}`
  }).join("\n")

  return `
📋 DADOS DO CADASTRO

👤 INFORMAÇÕES PESSOAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome: ${data.name}
Email: ${data.email}
Telefone/WhatsApp: ${data.phone}
Instagram: ${data.instagram}
Cidade: ${data.city}
${data.gender ? `Gênero: ${data.gender}` : ""}

🎯 NICHOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${nichesList}

📊 MÉTRICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.followers ? `Seguidores: ${data.followers}` : "Seguidores: Não informado"}
${data.views30Days ? `Visualizações (30 dias): ${data.views30Days}` : "Visualizações (30 dias): Não informado"}
${data.reach30Days ? `Alcance (30 dias): ${data.reach30Days}` : "Alcance (30 dias): Não informado"}
${data.averageReels ? `Média por Reels: ${data.averageReels}` : "Média por Reels: Não informado"}
${data.localAudience ? `Público Local: ${data.localAudience}` : "Público Local: Não informado"}

💰 VALORES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cachê de Vídeo: R$ ${data.priceVideo || "Não informado"}
Cachê de Coparticipação: R$ ${data.priceCopart || "Não informado"}

📝 BIOGRAFIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.bio}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Data do cadastro: ${new Date().toLocaleString("pt-BR")}
  `.trim()
}

// Enviar email de notificação de novo cadastro
export async function sendApplicationEmail(data: FormData): Promise<void> {
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️ Variáveis de email não configuradas. Email não será enviado.")
      return
    }

    const transporter = createTransporter()
    const recipientEmail = process.env.EMAIL_RECIPIENT || process.env.SMTP_USER

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || "GM Faces"}" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `🎯 Novo Cadastro GM Faces - ${data.name}`,
      text: formatFormData(data),
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
                margin: -30px -30px 30px -30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .section {
                margin-bottom: 25px;
                padding-bottom: 20px;
                border-bottom: 1px solid #e5e5e5;
              }
              .section:last-child {
                border-bottom: none;
              }
              .section-title {
                font-size: 16px;
                font-weight: bold;
                color: #9333ea;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
              }
              .field {
                margin-bottom: 10px;
                padding: 8px 0;
              }
              .field-label {
                font-weight: 600;
                color: #666;
                display: inline-block;
                min-width: 150px;
              }
              .field-value {
                color: #333;
              }
              .niche-list {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              .niche-item {
                padding: 6px 0;
                color: #333;
              }
              .niche-main {
                font-weight: bold;
                color: #9333ea;
              }
              .bio {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #9333ea;
                margin-top: 10px;
                white-space: pre-wrap;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e5e5;
                text-align: center;
                color: #999;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎯 Novo Cadastro GM Faces</h1>
              </div>

              <div class="section">
                <div class="section-title">👤 Informações Pessoais</div>
                <div class="field">
                  <span class="field-label">Nome:</span>
                  <span class="field-value">${data.name}</span>
                </div>
                <div class="field">
                  <span class="field-label">Email:</span>
                  <span class="field-value">${data.email}</span>
                </div>
                <div class="field">
                  <span class="field-label">Telefone/WhatsApp:</span>
                  <span class="field-value">${data.phone}</span>
                </div>
                <div class="field">
                  <span class="field-label">Instagram:</span>
                  <span class="field-value">${data.instagram}</span>
                </div>
                <div class="field">
                  <span class="field-label">Cidade:</span>
                  <span class="field-value">${data.city}</span>
                </div>
                ${data.gender ? `
                <div class="field">
                  <span class="field-label">Gênero:</span>
                  <span class="field-value">${data.gender}</span>
                </div>
                ` : ""}
              </div>

              <div class="section">
                <div class="section-title">🎯 Nichos</div>
                <ul class="niche-list">
                  ${(() => {
                    let nicheData: { niches: string[]; mainNiche: string } | null = null
                    try {
                      const parsed = JSON.parse(data.niche)
                      if (typeof parsed === "object" && parsed !== null && parsed.niches && parsed.mainNiche) {
                        nicheData = parsed
                      } else if (Array.isArray(parsed)) {
                        nicheData = { niches: parsed, mainNiche: parsed[0] }
                      } else {
                        nicheData = { niches: [data.niche], mainNiche: data.niche }
                      }
                    } catch {
                      nicheData = { niches: [data.niche], mainNiche: data.niche }
                    }
                    return nicheData.niches.map((n, idx) => {
                      const isMain = n === nicheData?.mainNiche
                      return `<li class="niche-item ${isMain ? 'niche-main' : ''}">${idx + 1}. ${n}${isMain ? ' ⭐ (Principal)' : ''}</li>`
                    }).join("")
                  })()}
                </ul>
              </div>

              <div class="section">
                <div class="section-title">📊 Métricas</div>
                <div class="field">
                  <span class="field-label">Seguidores:</span>
                  <span class="field-value">${data.followers || "Não informado"}</span>
                </div>
                <div class="field">
                  <span class="field-label">Visualizações (30 dias):</span>
                  <span class="field-value">${data.views30Days || "Não informado"}</span>
                </div>
                <div class="field">
                  <span class="field-label">Alcance (30 dias):</span>
                  <span class="field-value">${data.reach30Days || "Não informado"}</span>
                </div>
                <div class="field">
                  <span class="field-label">Média por Reels:</span>
                  <span class="field-value">${data.averageReels || "Não informado"}</span>
                </div>
                <div class="field">
                  <span class="field-label">Público Local:</span>
                  <span class="field-value">${data.localAudience || "Não informado"}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">💰 Valores</div>
                <div class="field">
                  <span class="field-label">Cachê de Vídeo:</span>
                  <span class="field-value">R$ ${data.priceVideo || "Não informado"}</span>
                </div>
                <div class="field">
                  <span class="field-label">Cachê de Coparticipação:</span>
                  <span class="field-value">R$ ${data.priceCopart || "Não informado"}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">📝 Biografia</div>
                <div class="bio">${data.bio}</div>
              </div>

              <div class="footer">
                📅 Data do cadastro: ${new Date().toLocaleString("pt-BR")}
              </div>
            </div>
          </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("✅ Email de cadastro enviado com sucesso para:", recipientEmail)
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error)
    throw error
  }
}



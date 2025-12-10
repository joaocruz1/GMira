-- Criar tabela de Analytics para rastreamento de eventos
CREATE TABLE IF NOT EXISTS "Analytics" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "influencerId" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS "Analytics_eventType_idx" ON "Analytics"("eventType");
CREATE INDEX IF NOT EXISTS "Analytics_influencerId_idx" ON "Analytics"("influencerId");
CREATE INDEX IF NOT EXISTS "Analytics_createdAt_idx" ON "Analytics"("createdAt");


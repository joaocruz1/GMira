-- Script para criar a tabela Influencer do zero com todos os campos
-- Execute este script no seu banco de dados PostgreSQL

-- Criar enum para Gender se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Gender') THEN
        CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');
    END IF;
END $$;

-- Criar enum para InfluencerStatus se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InfluencerStatus') THEN
        CREATE TYPE "InfluencerStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');
    END IF;
END $$;

-- Dropar a tabela se existir (CUIDADO: isso apagará todos os dados!)
-- Descomente a linha abaixo apenas se quiser recriar a tabela do zero
-- DROP TABLE IF EXISTS "Influencer" CASCADE;

-- Criar a tabela Influencer
CREATE TABLE IF NOT EXISTS "Influencer" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "city" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "followers" TEXT,
    "reach" TEXT,
    "engagement" TEXT,
    "views30Days" TEXT,
    "reach30Days" TEXT,
    "averageReels" TEXT,
    "localAudience" TEXT,
    "priceMin" TEXT,
    "priceClient" TEXT,
    "priceCopart" TEXT,
    "priceVideo" TEXT,
    "priceRepost" TEXT,
    "priceFinal" TEXT,
    "restrictions" TEXT,
    "services" TEXT,
    "portfolio" TEXT,
    "reviews" TEXT,
    "status" "InfluencerStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS "Influencer_status_idx" ON "Influencer"("status");
CREATE INDEX IF NOT EXISTS "Influencer_city_idx" ON "Influencer"("city");
CREATE INDEX IF NOT EXISTS "Influencer_createdAt_idx" ON "Influencer"("createdAt");

-- Criar função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updatedAt
DROP TRIGGER IF EXISTS update_influencer_updated_at ON "Influencer";
CREATE TRIGGER update_influencer_updated_at
    BEFORE UPDATE ON "Influencer"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Mensagem de sucesso
DO $$ 
BEGIN
    RAISE NOTICE 'Tabela Influencer criada com sucesso!';
    RAISE NOTICE 'Todos os campos foram adicionados.';
    RAISE NOTICE 'Índices criados para melhor performance.';
    RAISE NOTICE 'Trigger para updatedAt configurado.';
END $$;









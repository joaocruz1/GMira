-- Script SEGURO para criar a tabela Influencer (não apaga dados existentes)
-- Execute este script no seu banco de dados PostgreSQL
-- Este script apenas adiciona a tabela se ela não existir e adiciona colunas que faltam

-- Criar enum para Gender se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Gender') THEN
        CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');
        RAISE NOTICE 'Enum Gender criado.';
    ELSE
        RAISE NOTICE 'Enum Gender já existe.';
    END IF;
END $$;

-- Criar enum para InfluencerStatus se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InfluencerStatus') THEN
        CREATE TYPE "InfluencerStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');
        RAISE NOTICE 'Enum InfluencerStatus criado.';
    ELSE
        RAISE NOTICE 'Enum InfluencerStatus já existe.';
    END IF;
END $$;

-- Criar a tabela Influencer se não existir
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

-- Adicionar colunas que podem não existir (se a tabela já existir)
DO $$ 
BEGIN
    -- views30Days
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'views30Days') THEN
        ALTER TABLE "Influencer" ADD COLUMN "views30Days" TEXT;
        RAISE NOTICE 'Coluna views30Days adicionada.';
    END IF;
    
    -- reach30Days
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'reach30Days') THEN
        ALTER TABLE "Influencer" ADD COLUMN "reach30Days" TEXT;
        RAISE NOTICE 'Coluna reach30Days adicionada.';
    END IF;
    
    -- averageReels
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'averageReels') THEN
        ALTER TABLE "Influencer" ADD COLUMN "averageReels" TEXT;
        RAISE NOTICE 'Coluna averageReels adicionada.';
    END IF;
    
    -- localAudience
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'localAudience') THEN
        ALTER TABLE "Influencer" ADD COLUMN "localAudience" TEXT;
        RAISE NOTICE 'Coluna localAudience adicionada.';
    END IF;
    
    -- priceFinal
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'priceFinal') THEN
        ALTER TABLE "Influencer" ADD COLUMN "priceFinal" TEXT;
        RAISE NOTICE 'Coluna priceFinal adicionada.';
    END IF;
END $$;

-- Criar índices se não existirem
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

-- Criar trigger para atualizar updatedAt se não existir
DROP TRIGGER IF EXISTS update_influencer_updated_at ON "Influencer";
CREATE TRIGGER update_influencer_updated_at
    BEFORE UPDATE ON "Influencer"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Mensagem de sucesso
DO $$ 
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Tabela Influencer verificada/criada!';
    RAISE NOTICE 'Todos os campos estão presentes.';
    RAISE NOTICE 'Índices criados/verificados.';
    RAISE NOTICE 'Trigger para updatedAt configurado.';
    RAISE NOTICE '========================================';
END $$;


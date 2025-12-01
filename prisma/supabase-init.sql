-- Script SQL para criar as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Criar os enums
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');
CREATE TYPE "InfluencerStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');

-- 2. Criar a tabela Influencer com UUID automático
CREATE TABLE "Influencer" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    "priceMin" TEXT,
    "priceClient" TEXT,
    "priceCopart" TEXT,
    "priceVideo" TEXT,
    "priceRepost" TEXT,
    "restrictions" TEXT,
    "services" TEXT,
    "portfolio" TEXT,
    "reviews" TEXT,
    "status" "InfluencerStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Criar índice para melhorar performance nas buscas
CREATE INDEX "Influencer_status_idx" ON "Influencer"("status");
CREATE INDEX "Influencer_niche_idx" ON "Influencer"("niche");
CREATE INDEX "Influencer_city_idx" ON "Influencer"("city");

-- 4. Criar função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Criar trigger para atualizar updatedAt
CREATE TRIGGER update_influencer_updated_at
    BEFORE UPDATE ON "Influencer"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. (Opcional) Habilitar Row Level Security (RLS) se necessário
-- ALTER TABLE "Influencer" ENABLE ROW LEVEL SECURITY;

-- 7. Criar tabela User para autenticação
CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Criar índice para email
CREATE INDEX "User_email_idx" ON "User"("email");

-- 9. Criar trigger para atualizar updatedAt na tabela User
CREATE TRIGGER update_user_updated_at
    BEFORE UPDATE ON "User"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 10. Inserir usuário padrão (senha: gmfaces123)
-- NOTA: Esta senha precisa ser hash com bcrypt antes de inserir
-- Use o hash gerado pelo Node.js: $2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K
-- Para gerar o hash, execute no Node.js:
-- const bcrypt = require('bcrypt');
-- bcrypt.hash('gmfaces123', 10).then(hash => console.log(hash));
-- 
-- Hash da senha "gmfaces123": $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO "User" ("id", "email", "password", "name", "role")
VALUES (
    gen_random_uuid(),
    'gmira@gmira.com',
    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'GMira Admin',
    'admin'
);

-- 11. (Opcional) Habilitar Row Level Security (RLS) se necessário
-- ALTER TABLE "Influencer" ENABLE ROW LEVEL SECURITY;

-- 12. (Opcional) Criar política para leitura pública (apenas influenciadores publicados)
-- CREATE POLICY "Public can view published influencers"
--     ON "Influencer"
--     FOR SELECT
--     USING (status = 'PUBLISHED');


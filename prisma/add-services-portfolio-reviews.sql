-- Script SQL para adicionar campos de Serviços, Portfolio e Reviews
-- Execute este script no SQL Editor do Supabase

-- Adicionar colunas na tabela Influencer
ALTER TABLE "Influencer"
ADD COLUMN IF NOT EXISTS "services" TEXT,
ADD COLUMN IF NOT EXISTS "portfolio" TEXT,
ADD COLUMN IF NOT EXISTS "reviews" TEXT;

-- Verificar se as colunas foram criadas
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Influencer' 
AND column_name IN ('services', 'portfolio', 'reviews');










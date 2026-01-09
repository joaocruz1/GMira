-- Script para adicionar o campo priceFinal na tabela Influencer
-- Execute este script no seu banco de dados PostgreSQL

-- Adicionar a coluna priceFinal se ela não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'Influencer' 
        AND column_name = 'priceFinal'
    ) THEN
        ALTER TABLE "Influencer" 
        ADD COLUMN "priceFinal" TEXT;
        
        RAISE NOTICE 'Coluna priceFinal adicionada com sucesso!';
    ELSE
        RAISE NOTICE 'Coluna priceFinal já existe na tabela Influencer.';
    END IF;
END $$;

-- Opcional: Migrar dados existentes de priceClient para priceFinal se priceFinal estiver vazio
-- Descomente as linhas abaixo se quiser migrar os dados existentes
/*
UPDATE "Influencer"
SET "priceFinal" = "priceClient"
WHERE "priceFinal" IS NULL 
  AND "priceClient" IS NOT NULL;
*/











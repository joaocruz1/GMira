-- Script para garantir que o campo followers existe na tabela Influencer
-- Execute este script no seu banco de dados PostgreSQL

-- Adicionar a coluna followers se ela não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'Influencer' 
        AND column_name = 'followers'
    ) THEN
        ALTER TABLE "Influencer" 
        ADD COLUMN "followers" TEXT;
        
        RAISE NOTICE 'Coluna followers adicionada com sucesso!';
    ELSE
        RAISE NOTICE 'Coluna followers já existe na tabela Influencer.';
    END IF;
END $$;









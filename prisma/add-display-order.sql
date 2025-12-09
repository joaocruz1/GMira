-- Adicionar coluna displayOrder à tabela Influencer
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'Influencer'
        AND column_name = 'displayOrder'
    ) THEN
        ALTER TABLE "Influencer"
        ADD COLUMN "displayOrder" INTEGER;

        -- Atualizar registros existentes com ordem baseada na data de criação
        UPDATE "Influencer"
        SET "displayOrder" = subquery.row_number
        FROM (
            SELECT id, ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) as row_number
            FROM "Influencer"
        ) AS subquery
        WHERE "Influencer".id = subquery.id;

        RAISE NOTICE 'Coluna displayOrder adicionada com sucesso!';
    ELSE
        RAISE NOTICE 'Coluna displayOrder já existe na tabela Influencer.';
    END IF;
END $$;


-- Adicionar coluna slug à tabela Influencer
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'Influencer'
        AND column_name = 'slug'
    ) THEN
        ALTER TABLE "Influencer"
        ADD COLUMN "slug" TEXT;

        -- Criar índice único para slug
        CREATE UNIQUE INDEX IF NOT EXISTS "Influencer_slug_key" ON "Influencer"("slug");

        RAISE NOTICE 'Coluna slug adicionada com sucesso!';
    ELSE
        RAISE NOTICE 'Coluna slug já existe na tabela Influencer.';
    END IF;
END $$;

-- Função para remover acentos (substituição manual)
CREATE OR REPLACE FUNCTION remove_accents(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN translate(
        input_text,
        'áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ',
        'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Função para gerar slug a partir do nome (similar à função JavaScript)
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    -- Remover acentos
    result := remove_accents(input_text);
    
    -- Converter para lowercase
    result := lower(result);
    
    -- Remover caracteres especiais (manter apenas letras, números, espaços e hífens)
    result := regexp_replace(result, '[^a-z0-9\s-]', '', 'g');
    
    -- Substituir espaços múltiplos por hífen único
    result := regexp_replace(result, '\s+', '-', 'g');
    
    -- Remover hífens múltiplos
    result := regexp_replace(result, '-+', '-', 'g');
    
    -- Remover hífens no início e fim
    result := regexp_replace(result, '^-|-$', '', 'g');
    
    RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Gerar slugs para registros existentes que não têm slug
DO $$
DECLARE
    rec RECORD;
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER;
BEGIN
    FOR rec IN SELECT id, name FROM "Influencer" WHERE slug IS NULL OR slug = '' LOOP
        base_slug := generate_slug(rec.name);
        final_slug := base_slug;
        counter := 1;
        
        -- Verificar se slug já existe e adicionar número se necessário
        WHILE EXISTS (SELECT 1 FROM "Influencer" WHERE slug = final_slug AND id != rec.id) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
        
        UPDATE "Influencer"
        SET slug = final_slug
        WHERE id = rec.id;
    END LOOP;
    
    RAISE NOTICE 'Slugs gerados para registros existentes!';
END $$;


-- ============================================================================
-- SCRIPT COMPLETO PARA CORRIGIR O BANCO DE DADOS
-- Adiciona todas as colunas faltantes e migra os nichos
-- ============================================================================

-- Adicionar colunas faltantes (se não existirem)
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "views30Days" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "reach30Days" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "averageReels" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "localAudience" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "priceMin" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "priceClient" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "priceCopart" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "priceVideo" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "priceRepost" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "restrictions" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "services" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "portfolio" TEXT;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "reviews" TEXT;

-- Criar enum para status se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InfluencerStatus') THEN
        CREATE TYPE "InfluencerStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');
    END IF;
END $$;

-- Adicionar coluna status
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "status" "InfluencerStatus" DEFAULT 'PENDING';

-- Adicionar createdAt e updatedAt
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Influencer" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Migrar nichos para o novo formato
DO $$
DECLARE
    rec RECORD;
    niche_json JSONB;
    niche_text TEXT;
    niche_array TEXT[];
    main_niche TEXT;
    new_format JSONB;
BEGIN
    FOR rec IN SELECT id, niche FROM "Influencer" WHERE niche IS NOT NULL AND niche != '' LOOP
        BEGIN
            niche_text := rec.niche;
            
            -- Tentar parsear como JSON
            BEGIN
                niche_json := niche_text::JSONB;
                
                -- Verificar se já está no formato novo
                IF jsonb_typeof(niche_json) = 'object' 
                   AND niche_json ? 'niches' 
                   AND niche_json ? 'mainNiche' THEN
                    CONTINUE;
                END IF;
                
                -- Se é um array
                IF jsonb_typeof(niche_json) = 'array' THEN
                    niche_array := ARRAY(SELECT jsonb_array_elements_text(niche_json));
                    main_niche := CASE 
                        WHEN array_length(niche_array, 1) > 0 THEN niche_array[1]
                        ELSE NULL
                    END;
                    
                    IF array_length(niche_array, 1) > 3 THEN
                        niche_array := ARRAY[niche_array[1], niche_array[2], niche_array[3]];
                    END IF;
                    
                    new_format := jsonb_build_object(
                        'niches', to_jsonb(niche_array),
                        'mainNiche', COALESCE(main_niche, niche_array[1])
                    );
                ELSE
                    -- String simples
                    new_format := jsonb_build_object(
                        'niches', jsonb_build_array(niche_text),
                        'mainNiche', niche_text
                    );
                END IF;
            EXCEPTION
                WHEN OTHERS THEN
                    -- Se não for JSON válido, tratar como string simples
                    new_format := jsonb_build_object(
                        'niches', jsonb_build_array(niche_text),
                        'mainNiche', niche_text
                    );
            END;
            
            -- Atualizar o registro
            UPDATE "Influencer"
            SET niche = new_format::TEXT
            WHERE id = rec.id;
            
        EXCEPTION WHEN OTHERS THEN
            -- Ignorar erros individuais e continuar
            NULL;
        END;
    END LOOP;
    
    RAISE NOTICE 'Migração concluída!';
END $$;

-- Verificar resultado
SELECT 'Script executado com sucesso! Todas as colunas foram adicionadas e nichos migrados.' as resultado;










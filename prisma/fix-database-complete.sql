-- ============================================================================
-- SCRIPT COMPLETO PARA CORRIGIR O BANCO DE DADOS
-- ============================================================================
-- Este script:
-- 1. Adiciona todas as colunas faltantes na tabela Influencer
-- 2. Migra os dados de nichos para o novo formato
-- 
-- IMPORTANTE: FAÇA BACKUP ANTES DE EXECUTAR!
-- ============================================================================

-- ============================================================================
-- PARTE 1: ADICIONAR COLUNAS FALTANTES
-- ============================================================================

-- views30Days
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'views30Days') THEN
        ALTER TABLE "Influencer" ADD COLUMN "views30Days" TEXT;
    END IF;
END $$;

-- reach30Days
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'reach30Days') THEN
        ALTER TABLE "Influencer" ADD COLUMN "reach30Days" TEXT;
    END IF;
END $$;

-- averageReels
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'averageReels') THEN
        ALTER TABLE "Influencer" ADD COLUMN "averageReels" TEXT;
    END IF;
END $$;

-- localAudience
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'localAudience') THEN
        ALTER TABLE "Influencer" ADD COLUMN "localAudience" TEXT;
    END IF;
END $$;

-- priceMin
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'priceMin') THEN
        ALTER TABLE "Influencer" ADD COLUMN "priceMin" TEXT;
    END IF;
END $$;

-- priceClient
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'priceClient') THEN
        ALTER TABLE "Influencer" ADD COLUMN "priceClient" TEXT;
    END IF;
END $$;

-- priceCopart
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'priceCopart') THEN
        ALTER TABLE "Influencer" ADD COLUMN "priceCopart" TEXT;
    END IF;
END $$;

-- priceVideo
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'priceVideo') THEN
        ALTER TABLE "Influencer" ADD COLUMN "priceVideo" TEXT;
    END IF;
END $$;

-- priceRepost
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'priceRepost') THEN
        ALTER TABLE "Influencer" ADD COLUMN "priceRepost" TEXT;
    END IF;
END $$;

-- restrictions
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'restrictions') THEN
        ALTER TABLE "Influencer" ADD COLUMN "restrictions" TEXT;
    END IF;
END $$;

-- services
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'services') THEN
        ALTER TABLE "Influencer" ADD COLUMN "services" TEXT;
    END IF;
END $$;

-- portfolio
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'portfolio') THEN
        ALTER TABLE "Influencer" ADD COLUMN "portfolio" TEXT;
    END IF;
END $$;

-- reviews
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'reviews') THEN
        ALTER TABLE "Influencer" ADD COLUMN "reviews" TEXT;
    END IF;
END $$;

-- status (com enum)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InfluencerStatus') THEN
        CREATE TYPE "InfluencerStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'status') THEN
        ALTER TABLE "Influencer" ADD COLUMN "status" "InfluencerStatus" DEFAULT 'PENDING';
    END IF;
END $$;

-- createdAt
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'createdAt') THEN
        ALTER TABLE "Influencer" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- updatedAt
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Influencer' AND column_name = 'updatedAt') THEN
        ALTER TABLE "Influencer" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- ============================================================================
-- PARTE 2: MIGRAR NICHOS PARA O NOVO FORMATO
-- ============================================================================

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
            niche_json := niche_text::JSONB;
            
            -- Se já está no formato novo, pular
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
            
            UPDATE "Influencer"
            SET niche = new_format::TEXT
            WHERE id = rec.id;
            
        EXCEPTION WHEN OTHERS THEN
            -- Se der erro, tratar como string simples
            BEGIN
                new_format := jsonb_build_object(
                    'niches', jsonb_build_array(niche_text),
                    'mainNiche', niche_text
                );
                
                UPDATE "Influencer"
                SET niche = new_format::TEXT
                WHERE id = rec.id;
            EXCEPTION WHEN OTHERS THEN
                -- Ignorar erros individuais
            END;
        END;
    END LOOP;
END $$;

-- ============================================================================
-- CONCLUÍDO!
-- ============================================================================

SELECT 'Migração concluída com sucesso!' as resultado;





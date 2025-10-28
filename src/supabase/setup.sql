-- ============================================
-- Setup Script para Galería Punto Bag
-- ============================================
-- Este script configura toda la base de datos necesaria
-- para el funcionamiento del e-commerce
-- ============================================

-- 1. Crear la tabla KV Store si no existe
CREATE TABLE IF NOT EXISTS kv_store_985839ee (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 2. Crear índice para búsquedas por prefijo (optimización)
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix 
ON kv_store_985839ee USING btree (key text_pattern_ops);

-- 3. Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_kv_store_updated_at ON kv_store_985839ee;
CREATE TRIGGER update_kv_store_updated_at
    BEFORE UPDATE ON kv_store_985839ee
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE kv_store_985839ee ENABLE ROW LEVEL SECURITY;

-- 6. Crear políticas de RLS (permite acceso desde edge functions con service_role)
DROP POLICY IF EXISTS "Allow service role all access" ON kv_store_985839ee;
CREATE POLICY "Allow service role all access" 
ON kv_store_985839ee 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 7. Verificar que todo se creó correctamente
DO $$
BEGIN
    -- Verificar tabla
    IF EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'kv_store_985839ee'
    ) THEN
        RAISE NOTICE '✅ Tabla kv_store_985839ee creada correctamente';
    ELSE
        RAISE EXCEPTION '❌ Error: No se pudo crear la tabla kv_store_985839ee';
    END IF;

    -- Verificar índice
    IF EXISTS (
        SELECT FROM pg_indexes 
        WHERE tablename = 'kv_store_985839ee' 
        AND indexname = 'idx_kv_store_key_prefix'
    ) THEN
        RAISE NOTICE '✅ Índice creado correctamente';
    ELSE
        RAISE WARNING '⚠️  Índice no se creó (no crítico)';
    END IF;

    -- Verificar RLS
    IF EXISTS (
        SELECT FROM pg_tables 
        WHERE tablename = 'kv_store_985839ee' 
        AND rowsecurity = true
    ) THEN
        RAISE NOTICE '✅ Row Level Security habilitado';
    ELSE
        RAISE WARNING '⚠️  RLS no habilitado (podría causar problemas de seguridad)';
    END IF;
END $$;

-- 8. Mostrar resumen
SELECT 
    'kv_store_985839ee' as tabla,
    COUNT(*) as total_registros,
    pg_size_pretty(pg_total_relation_size('kv_store_985839ee')) as tamaño_total
FROM kv_store_985839ee;

-- ============================================
-- NOTAS IMPORTANTES:
-- ============================================
-- 1. Ejecuta este script en: Database → SQL Editor en Supabase Dashboard
-- 2. Este script es idempotente (puedes ejecutarlo múltiples veces sin problemas)
-- 3. Después de ejecutar, verifica que veas mensajes de éxito (✅)
-- 4. Si ves errores, cópialos y revisa la documentación
-- ============================================

-- ============================================
-- QUERIES ÚTILES PARA DEBUGGING:
-- ============================================

-- Ver todos los productos almacenados:
-- SELECT * FROM kv_store_985839ee WHERE key LIKE 'product:%';

-- Contar productos:
-- SELECT COUNT(*) FROM kv_store_985839ee WHERE key LIKE 'product:%';

-- Ver productos de una categoría específica:
-- SELECT value FROM kv_store_985839ee 
-- WHERE key LIKE 'product:%' 
-- AND value->>'category' = 'toallas';

-- Eliminar todos los productos (¡CUIDADO!):
-- DELETE FROM kv_store_985839ee WHERE key LIKE 'product:%';

-- Eliminar TODO (¡MUCHO CUIDADO!):
-- TRUNCATE TABLE kv_store_985839ee;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

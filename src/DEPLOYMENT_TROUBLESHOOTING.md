# Solución de Problemas - Error 403 al Desplegar Edge Function

## Error Actual
```
Error while deploying: XHR for "/api/integrations/supabase/0NVjEwpO6h4fBshuaryAaM/edge_functions/make-server/deploy" failed with status 403
```

## Causas Comunes del Error 403

### 1. Problema de Permisos en Supabase

**Solución:**
1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Verifica que tienes rol de "Owner" o "Admin"
4. Si no tienes permisos, solicita acceso al propietario del proyecto

### 2. Proyecto Pausado o Inactivo

**Solución:**
1. Ve a Settings → General en Supabase Dashboard
2. Verifica el estado del proyecto
3. Si está pausado, reactívalo
4. Espera unos minutos y vuelve a intentar el despliegue

### 3. Tabla de Base de Datos No Creada

**Solución:**
1. Ve a Database → SQL Editor en Supabase Dashboard
2. Ejecuta este script SQL:

```sql
CREATE TABLE IF NOT EXISTS kv_store_985839ee (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

3. Verifica que la tabla se creó correctamente:

```sql
SELECT * FROM kv_store_985839ee LIMIT 1;
```

### 4. Límites del Plan Alcanzados

**Solución:**
1. Ve a Settings → Billing en Supabase Dashboard
2. Verifica tu uso actual vs. límites del plan
3. Si has excedido:
   - Actualiza tu plan, o
   - Limpia datos/funciones no utilizadas

### 5. Problemas de Autenticación de Figma Make

**Solución:**
1. En Figma Make, desconecta tu proyecto Supabase
2. Vuelve a conectar el proyecto
3. Asegúrate de dar todos los permisos necesarios
4. Intenta desplegar nuevamente

### 6. Bucket de Storage No Configurado

**Solución:**
El bucket se crea automáticamente, pero puedes crearlo manualmente:

1. Ve a Storage en Supabase Dashboard
2. Crea un nuevo bucket con estas configuraciones:
   - Nombre: `make-985839ee-products`
   - Público: NO (desactivado)
   - File size limit: 5MB
3. Guarda los cambios

### 7. Variables de Entorno Faltantes

**Verificación:**
1. Ve a Edge Functions → Settings en Supabase Dashboard
2. Verifica que existan estas variables:
   - `SUPABASE_URL` (se configura automáticamente)
   - `SUPABASE_SERVICE_ROLE_KEY` (se configura automáticamente)

Si faltan, el sistema debería configurarlas automáticamente. Si no:
1. Ve a Settings → API
2. Copia la URL del proyecto y el Service Role Key
3. Configúralos manualmente en Edge Functions → Settings

## Pasos de Diagnóstico Completo

### Paso 1: Verificar Estado del Proyecto
```
✓ Proyecto activo (no pausado)
✓ Permisos de administrador
✓ Plan con recursos disponibles
```

### Paso 2: Verificar Base de Datos
```sql
-- Verificar que la tabla existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'kv_store_985839ee';

-- Si existe, debería retornar una fila
```

### Paso 3: Verificar Storage
1. Ir a Storage en Dashboard
2. Verificar que el bucket existe o se puede crear
3. Verificar permisos de storage

### Paso 4: Verificar Logs
1. Ve a Edge Functions en Dashboard
2. Busca la función `make-server-985839ee`
3. Revisa los logs para errores específicos

### Paso 5: Intentar Despliegue Manual (Alternativa)

Si Figma Make continúa dando error 403, puedes desplegar manualmente:

1. Instala Supabase CLI:
```bash
npm install -g supabase
```

2. Inicia sesión:
```bash
supabase login
```

3. Vincula tu proyecto:
```bash
supabase link --project-ref TU_PROJECT_REF
```
(Encuentra tu PROJECT_REF en Settings → General)

4. Despliega la función:
```bash
cd /path/to/your/project
supabase functions deploy make-server-985839ee
```

## Soluciones Rápidas

### Solución Rápida 1: Refrescar Conexión
1. En Figma Make, cierra y reabre el proyecto
2. Desconecta Supabase
3. Vuelve a conectar
4. Intenta desplegar

### Solución Rápida 2: Limpiar Caché
1. Cierra Figma Make completamente
2. Limpia el caché del navegador si usas versión web
3. Reabre y vuelve a intentar

### Solución Rápida 3: Verificar Desde el Dashboard

En lugar de desplegar desde Figma Make, intenta:
1. Copiar el código de `/supabase/functions/server/index.tsx`
2. Ir a Edge Functions en Supabase Dashboard
3. Crear/actualizar la función manualmente
4. Pegar el código
5. Hacer lo mismo con `kv_store.tsx`

## Si Nada Funciona

### Opción 1: Soporte de Supabase
1. Ve a [Supabase Support](https://supabase.com/support)
2. Describe el error 403
3. Incluye tu Project ID
4. Menciona que intentaste crear una edge function

### Opción 2: Recrear el Proyecto
Como último recurso:
1. Crea un nuevo proyecto en Supabase
2. Configura la tabla KV store
3. Conecta el nuevo proyecto a Figma Make
4. Despliega la función

### Opción 3: Usar Backend Alternativo
Si Supabase continúa dando problemas:
- Considera usar Firebase Functions
- O un servidor Node.js/Express tradicional
- O Netlify/Vercel Functions

## Información de Contacto y Referencias

- [Documentación de Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Guía de Troubleshooting de Supabase](https://supabase.com/docs/guides/platform/troubleshooting)
- [Comunidad de Supabase](https://github.com/supabase/supabase/discussions)

## Checklist Final

Antes de contactar soporte, verifica:

- [ ] Proyecto de Supabase está activo
- [ ] Tienes permisos de administrador
- [ ] La tabla `kv_store_985839ee` existe
- [ ] No has excedido los límites de tu plan
- [ ] La conexión de Figma Make a Supabase está activa
- [ ] Has intentado desconectar y reconectar
- [ ] Los logs de Supabase no muestran errores específicos
- [ ] Has esperado al menos 5 minutos desde el último intento

## Notas Importantes

1. **No compartas tu Service Role Key** - Es una credencial sensible
2. **Los errores 403 generalmente son de permisos** - No de código
3. **El código de la función está correcto** - El problema es de configuración/permisos
4. **Paciencia** - A veces Supabase tarda unos minutos en sincronizar cambios

---

**Última actualización:** Octubre 2025
**Versión del código:** Compatible con Hono 4 y Supabase JS 2

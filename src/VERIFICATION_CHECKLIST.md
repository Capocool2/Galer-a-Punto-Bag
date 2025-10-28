# Lista de Verificación - Despliegue Exitoso

## ✅ Checklist Antes del Despliegue

### 1. Verificar Proyecto Supabase

- [ ] El proyecto está activo (no pausado)
- [ ] Tienes permisos de Owner o Admin
- [ ] El proyecto tiene recursos disponibles (no ha excedido límites)

**Cómo verificar:**
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a Settings → General
4. Verifica el estado y tu rol

### 2. Verificar Base de Datos

- [ ] La tabla `kv_store_985839ee` existe

**Script SQL para crear la tabla:**
```sql
CREATE TABLE IF NOT EXISTS kv_store_985839ee (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

**Ejecutar en:** Database → SQL Editor

### 3. Verificar Storage

- [ ] El bucket `make-985839ee-products` existe O se puede crear automáticamente

**Configuración del bucket (si lo creas manualmente):**
- Nombre: `make-985839ee-products`
- Público: **NO**
- Tamaño máximo: 5MB

**Ubicación:** Storage → Buckets

### 4. Verificar Estructura de Archivos

- [ ] `/supabase/functions/server/index.tsx` existe
- [ ] `/supabase/functions/server/kv_store.tsx` existe
- [ ] `/supabase/functions/server/deno.json` existe

**Verificar que los archivos tienen el contenido correcto**

### 5. Verificar Código

#### index.tsx debe tener:
- [x] Importaciones correctas (Hono 4, Supabase JS 2)
- [x] CORS configurado
- [x] Todas las rutas (`/make-server-985839ee/*`)
- [x] Manejo de errores
- [x] Autenticación en endpoints protegidos

#### kv_store.tsx debe tener:
- [x] Importación de Supabase correcta
- [x] Funciones: set, get, del, mset, mget, mdel, getByPrefix
- [x] Validación de variables de entorno

## 🔍 Diagnóstico del Error 403

### Paso 1: Verificar Conexión
```
Error actual: XHR for "/api/integrations/supabase/.../edge_functions/make-server/deploy" failed with status 403
```

**Posibles causas:**
1. Permisos insuficientes en Supabase
2. Conexión de Figma Make expirada
3. Proyecto pausado o inactivo
4. Límites del plan alcanzados
5. Nombre de función incorrecto

### Paso 2: Verificar Nombre de Función

El error menciona `make-server` pero podría necesitar ser `make-server-985839ee`.

**Acción:** Verifica en Figma Make que el nombre de la función coincida con las rutas en el código.

### Paso 3: Refrescar Conexión

1. En Figma Make → Settings → Integrations
2. Desconecta Supabase
3. Vuelve a conectar
4. Autoriza todos los permisos
5. Intenta desplegar de nuevo

## 🚀 Proceso de Despliegue Correcto

### Desde Figma Make (Recomendado)

1. **Preparación:**
   - Asegúrate de que todos los checkpoints anteriores están ✓
   - Guarda todos los cambios en los archivos
   - Verifica la conexión a Supabase

2. **Despliegue:**
   - Click en "Deploy" o el botón de despliegue
   - Espera a que se complete (puede tardar 1-2 minutos)
   - Verifica los logs

3. **Verificación Post-Despliegue:**
   - Ve a Supabase Dashboard → Edge Functions
   - Deberías ver la función `make-server-985839ee`
   - Verifica que esté activa (status: active)

### Desde Supabase CLI (Alternativa)

Si Figma Make continúa dando error 403:

```bash
# 1. Instalar CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Vincular proyecto
supabase link --project-ref TU_PROJECT_REF

# 4. Desplegar
supabase functions deploy make-server-985839ee --no-verify-jwt
```

**Nota:** Encuentra tu PROJECT_REF en Settings → General (es un código como: `myuxcigxokngwljwucwh`)

## 🧪 Pruebas Post-Despliegue

### Test 1: Health Check

```bash
curl https://TU_PROJECT_REF.supabase.co/functions/v1/make-server-985839ee/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-28T..."
}
```

### Test 2: Get Products

```bash
curl https://TU_PROJECT_REF.supabase.co/functions/v1/make-server-985839ee/products
```

**Respuesta esperada:**
```json
{
  "products": []
}
```

### Test 3: Desde la Aplicación

1. Abre la aplicación
2. Verifica que las secciones de productos cargan
3. Intenta login como admin
4. Sube un producto de prueba
5. Verifica que aparece en la tienda

## ⚠️ Problemas Comunes y Soluciones

### Error: "Missing Supabase environment variables"

**Solución:**
Las variables se configuran automáticamente. Si no:
1. Ve a Edge Functions → Settings en Dashboard
2. No deberías necesitar configurar nada manualmente
3. Si persiste, contacta soporte de Supabase

### Error: "Failed to upload image"

**Solución:**
1. Verifica que el bucket existe
2. Verifica permisos del bucket (debe ser privado)
3. Verifica que el archivo es menor a 5MB

### Error: "Unauthorized"

**Solución:**
1. Verifica que estás logueado
2. El token de autenticación debe estar en el header
3. Intenta hacer logout y login de nuevo

### Error: "Product not found"

**Solución:**
1. Verifica que la tabla KV store existe
2. Verifica que tienes productos creados
3. Revisa los logs de la edge function

## 📊 Verificación Final

Después de un despliegue exitoso, deberías ver:

**En Supabase Dashboard:**
- ✅ Edge Function `make-server-985839ee` activa
- ✅ Bucket `make-985839ee-products` creado
- ✅ Tabla `kv_store_985839ee` con datos
- ✅ Logs sin errores críticos

**En la Aplicación:**
- ✅ Secciones de productos cargan correctamente
- ✅ Login de admin funciona
- ✅ Panel de administración accesible
- ✅ Subida de productos funciona
- ✅ Edición y eliminación funcionan
- ✅ Imágenes se muestran correctamente
- ✅ Botón de WhatsApp funciona

## 📞 Soporte Adicional

Si después de seguir todos estos pasos continúas con error 403:

1. **Documenta el error:**
   - Screenshot del error completo
   - Logs de Supabase (si están disponibles)
   - Pasos que seguiste

2. **Contacta soporte:**
   - Supabase Support: https://supabase.com/support
   - Comunidad Discord de Supabase
   - GitHub Discussions de Supabase

3. **Información a incluir:**
   - Project ID (no el Service Role Key!)
   - Descripción del error 403
   - Que has verificado todos los pasos de este checklist
   - Si el despliegue manual con CLI funcionó

## 🎯 Resumen Ejecutivo

**Lo más importante:**

1. ✅ Tabla `kv_store_985839ee` debe existir
2. ✅ Debes tener permisos de admin en Supabase
3. ✅ El proyecto debe estar activo
4. ✅ La conexión de Figma Make debe estar activa
5. ✅ Los archivos deben estar en `/supabase/functions/server/`

**Si todo lo anterior está correcto y aún tienes error 403:**
→ El problema es de permisos en Supabase, no del código
→ Intenta el despliegue manual con CLI
→ Contacta soporte de Supabase

---

**Fecha:** Octubre 2025  
**Versión:** 1.0  
**Compatibilidad:** Hono 4, Supabase JS 2, Deno

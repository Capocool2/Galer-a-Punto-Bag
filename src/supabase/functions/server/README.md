# Supabase Edge Function - Galería Punto Bag Server

Esta edge function maneja todas las operaciones del servidor para el e-commerce Galería Punto Bag.

## Requisitos

- Supabase CLI instalado
- Proyecto de Supabase activo
- Variables de entorno configuradas

## Estructura

```
/supabase/functions/server/
├── index.tsx          # Punto de entrada principal con todas las rutas
├── kv_store.tsx       # Sistema de almacenamiento key-value
├── deno.json          # Configuración de Deno
└── README.md          # Este archivo
```

## Variables de Entorno Requeridas

Las siguientes variables se configuran automáticamente en Supabase:
- `SUPABASE_URL` - URL del proyecto Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Clave de servicio para operaciones administrativas

## Endpoints Disponibles

### Autenticación
- `POST /make-server-985839ee/signup` - Registro de nuevos administradores

### Productos
- `GET /make-server-985839ee/products?category={id}` - Obtener productos (filtro opcional)
- `POST /make-server-985839ee/products` - Crear producto (requiere autenticación)
- `PUT /make-server-985839ee/products/:id` - Actualizar producto (requiere autenticación)
- `DELETE /make-server-985839ee/products/:id` - Eliminar producto (requiere autenticación)

### Salud
- `GET /make-server-985839ee/health` - Verificar estado del servidor

## Storage Bucket

La función crea automáticamente un bucket llamado `make-985839ee-products` si no existe.

### Configuración del Bucket
- Público: No
- Tamaño máximo de archivo: 5MB
- Tiempo de expiración de URLs firmadas: 12 horas (43200 segundos)

## Base de Datos

### Tabla KV Store
```sql
CREATE TABLE kv_store_985839ee (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

Esta tabla debe existir en tu base de datos Supabase antes de desplegar la función.

## Despliegue

### Desde Figma Make
El despliegue se realiza automáticamente desde la interfaz de Figma Make.

### Desde CLI (Opcional)
```bash
supabase functions deploy make-server-985839ee
```

## Solución de Problemas

### Error 403 al Desplegar

Si recibes un error 403, verifica:

1. **Permisos del Proyecto**
   - Asegúrate de tener permisos de administrador en el proyecto Supabase
   - Verifica que el proyecto no esté pausado

2. **Autenticación CLI**
   ```bash
   supabase login
   supabase link --project-ref tu-project-id
   ```

3. **Variables de Entorno**
   - Verifica que las variables estén configuradas correctamente en Supabase Dashboard

4. **Tabla de Base de Datos**
   - Confirma que la tabla `kv_store_985839ee` existe
   - Ejecuta el script SQL de creación si no existe

5. **Límites del Proyecto**
   - Verifica que no hayas alcanzado los límites de tu plan
   - Revisa el dashboard de Supabase para ver el uso

### Error al Subir Imágenes

Si hay problemas al subir imágenes:
1. Verifica que el bucket `make-985839ee-products` existe
2. Confirma que el bucket no es público
3. Revisa los logs de la edge function en el dashboard

### URLs de Imagen Expiradas

Las URLs firmadas expiran después de 12 horas. Esto es intencional para seguridad.
Los clientes deben refrescar los productos periódicamente para obtener nuevas URLs.

## Logs y Monitoreo

Para ver los logs de la función:
1. Ve a Supabase Dashboard
2. Navega a Edge Functions
3. Selecciona `make-server-985839ee`
4. Ve a la pestaña de Logs

## Seguridad

- Todas las operaciones de escritura requieren autenticación
- Las URLs de imágenes son firmadas y temporales
- Los archivos se almacenan en un bucket privado
- Se usa el Service Role Key solo en el servidor

## Notas de Desarrollo

- Versión de Hono: 4
- Versión de Supabase JS: 2
- Runtime: Deno
- CORS habilitado para todos los orígenes (ajustar en producción si es necesario)

# 🚀 Inicio Rápido - Galería Punto Bag

## 📝 Antes de Empezar

Tu aplicación está **lista y optimizada**. Solo necesitas configurar la base de datos en Supabase.

## ⚡ 3 Pasos para Configuración Completa

### 🎯 Paso 1: Configurar la Base de Datos (2 minutos)

1. Abre [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Database** → **SQL Editor**
4. Copia y pega este código:

```sql
CREATE TABLE IF NOT EXISTS kv_store_985839ee (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

5. Haz clic en **RUN** (o presiona F5)
6. Deberías ver: ✅ "Success. No rows returned"

**¿Por qué es necesario?**
Esta tabla almacena todos los productos del e-commerce.

---

### 🔌 Paso 2: Desplegar la Edge Function (1 minuto)

#### Opción A: Desde Figma Make (Recomendado)

1. En Figma Make, busca el botón de **Deploy** o **Desplegar**
2. Haz clic y espera 1-2 minutos
3. Si aparece error 403:
   - Desconecta Supabase en Figma Make
   - Vuelve a conectar
   - Intenta de nuevo

#### Opción B: Desde Terminal (Si Opción A falla)

```bash
# 1. Instalar Supabase CLI (solo primera vez)
npm install -g supabase

# 2. Iniciar sesión
supabase login

# 3. Vincular tu proyecto
supabase link --project-ref TU_PROJECT_REF

# 4. Desplegar
supabase functions deploy make-server-985839ee
```

**¿Dónde encuentro mi PROJECT_REF?**
- Supabase Dashboard → Settings → General
- Es algo como: `myuxcigxokngwljwucwh`

---

### 👤 Paso 3: Crear Usuario Admin (1 minuto)

1. Abre tu aplicación en el navegador
2. Haz clic en **"Iniciar Sesión"** en el header
3. Abre la consola del navegador (F12)
4. Las instrucciones aparecerán automáticamente
5. Copia y ejecuta el código mostrado

**Credenciales por defecto:**
- Email: `admin@example.com`
- Password: `admin123456`

---

## ✅ Verificación

### ¿Cómo saber si todo funciona?

#### 1. La base de datos está configurada ✓
```sql
-- Ejecuta esto en SQL Editor
SELECT * FROM kv_store_985839ee;
-- Debería ejecutarse sin errores (puede estar vacío)
```

#### 2. La edge function está desplegada ✓
- Ve a Supabase Dashboard → **Edge Functions**
- Deberías ver: `make-server-985839ee` con status **Active**

#### 3. La aplicación funciona ✓
- Abre tu aplicación
- Las secciones de productos cargan (aunque estén vacías)
- No hay errores en la consola (F12)

#### 4. Puedes iniciar sesión ✓
- Haz clic en "Iniciar Sesión"
- Ingresa las credenciales de admin
- Deberías ver "Panel Admin" en el header

---

## 🎨 Uso del Panel de Administración

### Subir un Producto

1. Haz clic en **"Panel Admin"**
2. Selecciona una categoría (ej: Toallas)
3. Rellena el formulario:
   - **Nombre**: Ej: "Toalla de Baño Azul"
   - **Precio**: Ej: "$25.000"
   - **Descripción**: Ej: "Toalla suave de algodón 100%"
   - **Imagen**: Selecciona un archivo (max 5MB)
4. Haz clic en **"Subir Producto"**
5. ¡Listo! El producto aparecerá automáticamente

### Editar un Producto

1. En el Panel Admin, busca el producto
2. Haz clic en **"Editar"**
3. Modifica los campos que necesites
4. Haz clic en **"Guardar"**

### Eliminar un Producto

1. En el Panel Admin, busca el producto
2. Haz clic en **"Eliminar"**
3. Confirma la acción
4. El producto se eliminará automáticamente

---

## 📱 Características del E-commerce

### Para Visitantes

- ✅ 7 categorías de productos con carruseles automáticos
- ✅ Botón "Me interesa" que envía mensaje por WhatsApp
- ✅ Zoom en imágenes (presionar/tocar para ampliar)
- ✅ Diseño responsive para móvil, tablet y desktop
- ✅ Navegación suave entre secciones

### Para Administradores

- ✅ Panel completo de gestión de productos
- ✅ Organización por categorías con tabs
- ✅ Subida de imágenes a Supabase Storage
- ✅ Actualizaciones en tiempo real
- ✅ Sin errores falsos al subir/eliminar

---

## 🔧 Solución Rápida de Problemas

### ❌ Error 403 al desplegar

**Causa:** Tabla de base de datos no existe o falta permisos

**Solución:**
1. Ejecuta el SQL del Paso 1
2. Verifica que eres Owner/Admin en Supabase
3. Refresca la conexión en Figma Make

📖 Más detalles en: `/FIX_ERROR_403.md`

---

### ❌ "No puedo iniciar sesión"

**Causa:** No has creado el usuario admin

**Solución:**
1. Abre la aplicación
2. Haz clic en "Iniciar Sesión"
3. Abre la consola (F12)
4. Sigue las instrucciones automáticas

---

### ❌ "Las imágenes no cargan"

**Causa:** El bucket de storage no existe

**Solución:**
El bucket se crea automáticamente al subir la primera imagen.
Si persiste:
1. Ve a Supabase Dashboard → Storage
2. Crea bucket: `make-985839ee-products`
3. Configuración: Privado, 5MB max

---

### ❌ "Aparece error pero el producto se sube"

**Causa:** ¡Ya está solucionado!

**Verificación:**
- La última versión del código no tiene este problema
- Los productos se suben correctamente sin errores falsos
- La lista se actualiza automáticamente

---

## 🎯 Próximos Pasos

Una vez que tengas todo funcionando:

1. **Personaliza los productos:**
   - Sube imágenes reales de tus productos
   - Ajusta precios y descripciones
   - Organiza por categorías

2. **Personaliza el diseño:**
   - Modifica colores en `styles/globals.css`
   - Ajusta el Hero en `components/Hero.tsx`
   - Personaliza el Footer en `components/Footer.tsx`

3. **Prueba en diferentes dispositivos:**
   - Móvil (zoom de imágenes)
   - Tablet (layout de 2 columnas)
   - Desktop (layout de 3 columnas)

4. **Comparte con tus clientes:**
   - El botón de WhatsApp funciona automáticamente
   - URLs de imagen válidas por 12 horas
   - Mensaje incluye precio y link a la imagen

---

## 📚 Documentación Adicional

- **`/README.md`** - Documentación completa del proyecto
- **`/FIX_ERROR_403.md`** - Solución detallada error 403
- **`/VERIFICATION_CHECKLIST.md`** - Checklist completo
- **`/DEPLOYMENT_TROUBLESHOOTING.md`** - Troubleshooting avanzado
- **`/supabase/setup.sql`** - Script SQL completo
- **`/supabase/functions/server/README.md`** - Docs de la edge function

---

## 💡 Tips Útiles

### Desarrollo
- Usa **F12** para abrir la consola y ver logs
- Los errores específicos aparecen en la consola
- Recarga con **Ctrl+Shift+R** para limpiar caché

### Testing
- Prueba subir un producto en cada categoría
- Verifica el botón de WhatsApp
- Prueba el zoom en imágenes (móvil)
- Edita y elimina productos para verificar

### Seguridad
- Nunca compartas tu Service Role Key
- Cambia la contraseña del admin después del setup
- Las imágenes están en bucket privado (seguro)

---

## 🎉 ¡Listo!

Tu e-commerce está configurado y listo para usar.

**Checklist Final:**
- ✅ Tabla de base de datos creada
- ✅ Edge function desplegada
- ✅ Usuario admin creado
- ✅ Primer producto subido
- ✅ WhatsApp funciona
- ✅ Responsive verificado

**¿Problemas?**
- Lee `/FIX_ERROR_403.md` para errores de despliegue
- Revisa la consola (F12) para errores específicos
- Verifica cada paso del checklist

---

**Última actualización:** Octubre 2025  
**Versión:** 2.0 - Completamente optimizado  
**Estado:** ✅ Listo para producción

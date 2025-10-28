# 🛒 Galería Punto Bag - E-commerce Moderno

E-commerce completo y funcional con panel de administración, desarrollado con React, Tailwind CSS y Supabase.

## ✨ Características

### 🌐 Para Visitantes
- **Hero Section**: Página de inicio atractiva con llamada a la acción
- **8 Categorías de Productos**: Navegación completa por categorías
  - 🛏️ Sábanas (con tabla de medidas detallada)
  - 🧺 Toallas
  - 🪟 Cortinas
  - 🧸 Cobijas
  - 😴 Almohadas
  - 🍽️ Manteles
  - 🛌 Edredones
  - 🎨 Colchas
- **Carruseles Automáticos**: 
  - ⏱️ Reproducción automática (4 segundos por slide)
  - ◀️▶️ Botones de navegación adelante/atrás
  - 👆 Swipe táctil para móviles
  - 🔵 Indicadores de posición
- **Botón de WhatsApp**: Contacto directo desde cada producto
- **Diseño Limpio**: Sin contenedores pesados, estilo minimalista
- **Navegación Inteligente**: Menú desplegable con iconos por categoría
- **100% Responsive**: Adaptado a todos los dispositivos
- **Scroll Suave**: Navegación fluida entre secciones

### 🔐 Para Administradores
- **Autenticación Segura**: Login con Supabase Auth
- **Panel de Administración Avanzado**: Gestión completa por categorías
  - 📑 Selector de categorías con tabs visuales
  - ✅ Subir productos con nombre, descripción, precio e imagen
  - ✏️ Editar productos existentes
  - 🗑️ Eliminar productos con confirmación
  - 🎨 Cada categoría con color distintivo
- **Almacenamiento de Imágenes**: Supabase Storage para gestión de archivos
- **Notificaciones**: Feedback visual con toast notifications

## 🚀 Cómo Usar

### Paso 1: Crear un Administrador (Primera Vez)

**¡Es más fácil de lo que parece!** El sistema te guiará automáticamente:

1. Haz clic en **"Iniciar Sesión"** en el header
2. Intenta iniciar sesión con cualquier credencial
3. **Las instrucciones aparecerán automáticamente en la consola del navegador (F12)**
4. Copia y ejecuta el código mostrado en la consola
5. ¡Listo! Ahora puedes iniciar sesión con:
   - **Email**: admin@example.com
   - **Password**: admin123456

**Nota**: Solo necesitas hacer esto la primera vez. El usuario administrador quedará guardado en Supabase.

### Paso 2: Gestionar Productos

Una vez autenticado como administrador:

1. Haz clic en **"Panel Admin"** en el header
2. En el panel podrás:
   - **Subir productos**: Agrega una descripción (opcional) y selecciona una imagen (obligatoria)
   - **Editar productos**: Haz clic en "Editar" para modificar la descripción
   - **Eliminar productos**: Haz clic en "Eliminar" (con confirmación)

### Paso 3: Cerrar Sesión

- Haz clic en **"Cerrar Sesión"** en el header cuando termines

## 🎨 Estructura del Proyecto

```
/
├── App.tsx                          # Componente principal con todas las categorías
├── components/
│   ├── Header.tsx                   # Navegación con menú desplegable de categorías
│   ├── Hero.tsx                     # Sección hero
│   ├── SheetsSection.tsx           # Módulo especial de sábanas con tabla
│   ├── ProductSection.tsx          # Componente reutilizable para categorías
│   ├── SectionDivider.tsx          # Separador visual entre secciones
│   ├── LoginModal.tsx              # Modal de login
│   ├── AdminPanel.tsx              # Panel de administración con tabs por categoría
│   └── Footer.tsx                   # Footer del sitio
├── supabase/functions/server/
│   └── index.tsx                    # API backend con soporte de categorías
└── utils/
    ├── categories.ts                # Configuración de las 8 categorías
    ├── migrate-products.ts          # Script de migración (si es necesario)
    ├── supabase/
    │   ├── info.tsx                # Configuración de Supabase
    │   └── client.tsx              # Cliente Supabase singleton
    └── create-admin.ts             # Instrucciones para crear admin
```

## 🔧 Tecnologías Utilizadas

- **React**: Framework de UI
- **Tailwind CSS v4**: Estilos y diseño responsive
- **Supabase**: Backend (Auth, Storage, Database KV)
- **Hono**: Framework web para el servidor edge
- **Lucide React**: Iconos
- **Sonner**: Notificaciones toast

## 📱 Características de Diseño

- **Paleta de Colores**: Azul (#3498db), Gris oscuro (#2c3e50), Blanco (#ecf0f1), Rojo (#e63946)
- **Tipografía**: Sistema de fuentes por defecto optimizado
- **Responsive**: Mobile-first con breakpoints para tablet y desktop
- **Animaciones**: Transiciones suaves en hover y scroll
- **Accesibilidad**: Etiquetas ARIA y navegación por teclado

## 🔒 Seguridad

- ✅ Autenticación con Supabase Auth
- ✅ Tokens de acceso seguros
- ✅ Rutas protegidas en el backend
- ✅ Storage privado con URLs firmadas temporales
- ✅ CORS configurado correctamente
- ✅ Service Role Key solo en el backend (nunca en el frontend)
- ✅ Cliente Supabase singleton para evitar múltiples instancias

## 📝 Notas Importantes

1. **Solo Prototipo**: Este proyecto está diseñado para prototipado. Para producción, considera:
   - Sistema de pagos (Stripe, PayPal)
   - Carrito de compras
   - Sistema de envíos
   - Gestión de inventario
   - Analytics

2. **Datos de Prueba**: Los productos que subas son de prueba. La base de datos usa un sistema KV (clave-valor) simple y flexible.

3. **Imágenes**: Las imágenes se almacenan en Supabase Storage y se eliminan automáticamente cuando eliminas un producto.

4. **Errores Comunes Solucionados**:
   - ✅ "Multiple GoTrueClient instances detected" - Solucionado usando cliente singleton
   - ✅ "Invalid login credentials" - El sistema ahora guía al usuario para crear un admin

## 🎯 Próximos Pasos Sugeridos

- ✅ ~~Agregar títulos, precios y categorías a los productos~~ (Implementado)
- ✅ ~~Agregar más secciones de productos~~ (8 categorías implementadas)
- Implementar búsqueda y filtros de productos dentro de cada categoría
- Agregar sistema de calificaciones y reseñas
- Crear carrito de compras
- Integrar pasarela de pagos
- Implementar sistema de cupones/descuentos
- Agregar panel de estadísticas para el admin (productos por categoría, etc.)
- Vista de detalle individual de productos
- Sistema de favoritos
- Modo oscuro

## 🔄 Despliegue de la Edge Function

### Error 403 al Desplegar

Si recibes un error 403 al intentar desplegar la edge function, sigue estos pasos:

**📋 Solución Rápida (5 minutos):**

1. **Crear la tabla en Supabase:**
   - Ve a Supabase Dashboard → Database → SQL Editor
   - Ejecuta el script en `/supabase/setup.sql`
   - O simplemente ejecuta:
   ```sql
   CREATE TABLE IF NOT EXISTS kv_store_985839ee (
     key TEXT NOT NULL PRIMARY KEY,
     value JSONB NOT NULL
   );
   ```

2. **Refrescar conexión:**
   - En Figma Make, desconecta tu proyecto Supabase
   - Vuelve a conectar
   - Intenta desplegar nuevamente

3. **Verificar permisos:**
   - En Supabase Dashboard → Settings → General
   - Confirma que eres Owner o Admin
   - Verifica que el proyecto esté activo (no pausado)

📖 **Para más detalles, consulta:**
- `/FIX_ERROR_403.md` - Solución paso a paso
- `/VERIFICATION_CHECKLIST.md` - Lista de verificación completa
- `/DEPLOYMENT_TROUBLESHOOTING.md` - Guía detallada de troubleshooting

### Archivos de la Edge Function

```
/supabase/functions/server/
├── index.tsx          # Servidor principal (Hono 4 + Supabase JS 2)
├── kv_store.tsx       # Sistema de almacenamiento
├── deno.json          # Configuración de Deno
└── README.md          # Documentación de la función
```

## 🐛 Solución de Problemas

**Error 403 al desplegar**
- 📖 Lee `/FIX_ERROR_403.md` para solución detallada
- ✅ Ejecuta el script SQL de setup
- 🔄 Refresca la conexión de Supabase en Figma Make

**No puedo iniciar sesión**
- Asegúrate de haber creado el usuario administrador desde Supabase Dashboard primero
- Verifica que hayas marcado "Auto Confirm User" al crear el usuario en Supabase

**No se suben las imágenes / Aparece error pero se sube**
- ✅ **SOLUCIONADO**: Los errores falsos en el panel admin han sido corregidos
- Las operaciones ahora se ejecutan correctamente sin mensajes de error
- La lista se actualiza automáticamente sin necesidad de refrescar
- Verifica que la imagen sea menor a 5MB

**No aparecen los productos**
- Recarga la página
- Verifica la consola del navegador para errores
- Asegúrate de que Supabase esté conectado correctamente

**Error "Multiple GoTrueClient instances"**
- Este error ya está solucionado. Si persiste, limpia el caché del navegador

**Las imágenes se ven pequeñas en móvil**
- ✅ **SOLUCIONADO**: Las imágenes ahora son más grandes en móviles
- Presiona/toca una imagen para verla en zoom completo
- Suelta para volver al tamaño normal

**URLs de WhatsApp expiran muy rápido**
- ✅ **SOLUCIONADO**: Las URLs ahora duran 12 horas (antes 1 hora)
- Los enlaces enviados por WhatsApp serán válidos durante medio día

## 🎯 Mejoras Recientes

### ✨ Panel Administrativo
- ✅ Errores falsos corregidos al subir/eliminar productos
- ✅ Actualización automática de la lista sin refrescar
- ✅ Mejor manejo de respuestas del servidor

### 📱 Responsive Mobile
- ✅ Imágenes más grandes en dispositivos móviles
- ✅ Zoom al presionar/tocar imágenes
- ✅ Modal de vista ampliada
- ✅ Mejor padding y espaciado en carruseles

### 💬 WhatsApp Integration
- ✅ URLs de imagen válidas por 12 horas
- ✅ Mensaje incluye precio si está disponible
- ✅ Información completa del producto

---

¡Disfruta de tu e-commerce! 🎉

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

## 🐛 Solución de Problemas

**No puedo iniciar sesión**
- Asegúrate de haber creado el usuario administrador desde Supabase Dashboard primero
- Verifica que hayas marcado "Auto Confirm User" al crear el usuario en Supabase

**No se suben las imágenes**
- Verifica que la imagen sea menor a 5MB
- Asegúrate de estar autenticado como administrador
- Revisa la consola del navegador para ver errores específicos

**No aparecen los productos**
- Recarga la página
- Verifica la consola del navegador para errores
- Asegúrate de que Supabase esté conectado correctamente

**Error "Multiple GoTrueClient instances"**
- Este error ya está solucionado. Si persiste, limpia el caché del navegador

---

¡Disfruta de tu e-commerce! 🎉

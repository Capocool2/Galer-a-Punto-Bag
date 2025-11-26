# 📚 Guía del Sistema de Categorías - Galería Punto Bag

## Visión General

El e-commerce **Galería Punto Bag** ahora incluye un sistema completo de categorías que permite organizar productos en 8 categorías diferentes. Este documento explica cómo funciona el sistema y cómo usarlo.

---

## 🏷️ Las 8 Categorías

| Categoría | ID | Color | Icono | Descripción |
|-----------|-----|-------|-------|-------------|
| **Sábanas** | `sabanas` | #3498db (Azul) | 🛏️ Bed | Sábanas suaves y duraderas |
| **Toallas** | `toallas` | #2ecc71 (Verde) | 🧺 Wind | Toallas absorbentes de calidad |
| **Cortinas** | `cortinas` | #9b59b6 (Púrpura) | 🪟 Blinds | Cortinas elegantes |
| **Cobijas** | `cobijas` | #e74c3c (Rojo) | 🧸 Layers | Cobijas cálidas y confortables |
| **Almohadas** | `almohadas` | #f39c12 (Naranja) | 😴 Sofa | Almohadas ergonómicas |
| **Manteles** | `manteles` | #1abc9c (Turquesa) | 🍽️ Table2 | Manteles decorativos |
| **Edredones** | `edredones` | #e67e22 (Naranja oscuro) | 🛌 Shirt | Edredones suaves |
| **Colchas** | `colchas` | #34495e (Gris oscuro) | 🎨 Bed | Colchas decorativas |

---

## 🎯 Cómo Funciona

### Frontend (Vista del Usuario)

1. **Navegación por Categorías**
   - **Desktop**: Menú desplegable "Categorías" en el header
   - **Mobile**: Menú hamburguesa con lista de categorías
   - Click en una categoría = scroll suave a esa sección

2. **Secciones de Productos**
   - Cada categoría tiene su propia sección en la página principal
   - Diseño consistente con colores distintivos
   - Grid responsive (3 columnas → 2 → 1)

3. **Sección Especial: Sábanas**
   - Incluye tabla de medidas detallada
   - Diseño personalizado con más información
   - Precios fijos mostrados en la tabla

### Panel de Administración

1. **Selector de Categorías**
   - Tabs horizontales en la parte superior
   - Cada tab muestra el icono y nombre de la categoría
   - Color de tab activo = color de la categoría

2. **Subir Productos**
   - Selecciona la categoría usando las tabs
   - Completa el formulario:
     - **Nombre**: Requerido (ej: "Sábana Queen Blanca")
     - **Descripción**: Opcional (detalles del producto)
     - **Precio**: Opcional (ej: "$50.000")
     - **Imagen**: Requerida
   - La categoría se asigna automáticamente

3. **Gestionar Productos**
   - Ver productos filtrados por categoría seleccionada
   - Editar: nombre, descripción y precio
   - Eliminar: producto e imagen del storage

---

## 🔧 Estructura Técnica

### Archivo de Configuración

**Ubicación**: `/utils/categories.ts`

```typescript
export interface Category {
  id: string;           // Identificador único (sabanas, toallas, etc.)
  name: string;         // Nombre para mostrar
  icon: LucideIcon;     // Icono de Lucide React
  color: string;        // Color hexadecimal
  description: string;  // Descripción breve
}
```

### Componente Reutilizable

**Ubicación**: `/components/ProductSection.tsx`

- Recibe una categoría como prop
- Fetch automático de productos de esa categoría
- Renderiza grid responsive
- Maneja estados de carga y vacío

### API Backend

**Endpoints actualizados**:

```typescript
// Obtener todos los productos (o filtrados por categoría)
GET /make-server-985839ee/products?category=sabanas

// Crear producto (category es obligatorio)
POST /make-server-985839ee/products
FormData: {
  name: string,
  description: string,
  precio: string,
  category: string,  // ← OBLIGATORIO
  file: File
}

// Actualizar producto
PUT /make-server-985839ee/products/:id
Body: {
  name?: string,
  description?: string,
  precio?: string
}
// La categoría NO se puede cambiar después de crear el producto

// Eliminar producto
DELETE /make-server-985839ee/products/:id
```

---

## 📝 Mejores Prácticas

### Para Agregar Productos

1. **Elige la categoría correcta** desde el inicio
2. **Nombre descriptivo**: Incluye tamaño, color o características
   - ✅ Bueno: "Sábana Queen Algodón Blanco"
   - ❌ Malo: "Sábana 1"

3. **Descripción detallada**: Ayuda al cliente a decidir
   - Material, tamaño, características
   - Cuidados y mantenimiento

4. **Precio claro**: Usa formato consistente
   - ✅ "$50.000" o "COP 50.000"
   - ❌ "50000" o "cincuenta mil"

5. **Imágenes de calidad**:
   - Máximo 5MB
   - Buena iluminación
   - Fondo limpio
   - Muestra el producto claramente

### Organización de Productos

- **Mantén consistencia** en nombres y descripciones dentro de cada categoría
- **Usa precios similares** para productos similares
- **Organiza por popularidad**: Los productos más vendidos primero
- **Actualiza regularmente**: Elimina productos descontinuados

---

## 🎨 Personalización de Categorías

### Cambiar Colores

**Archivo**: `/utils/categories.ts`

```typescript
{
  id: 'sabanas',
  name: 'Sábanas',
  icon: Bed,
  color: '#3498db',  // ← Cambia este valor
  description: '...'
}
```

### Agregar Nueva Categoría

1. Agrega la categoría en `/utils/categories.ts`:
```typescript
{
  id: 'nueva-categoria',
  name: 'Nueva Categoría',
  icon: IconName,  // De lucide-react
  color: '#hexcolor',
  description: 'Descripción...'
}
```

2. ¡Listo! El sistema es completamente automático:
   - Se agregará al menú de navegación
   - Aparecerá en el panel de admin
   - Tendrá su propia sección en la página

### Eliminar una Categoría

1. Elimina la categoría de `/utils/categories.ts`
2. Los productos de esa categoría no se mostrarán
3. Considera mover los productos a otra categoría primero

---

## 🔍 Solución de Problemas

### No veo mis productos antiguos

**Causa**: Productos creados antes del sistema de categorías no tienen categoría asignada.

**Solución**:
- Opción 1: Recrea los productos desde el panel de admin
- Opción 2: Contacta al desarrollador para migración masiva

### No puedo cambiar la categoría de un producto

**Causa**: La categoría es inmutable después de crear el producto.

**Solución**:
- Elimina el producto
- Recréalo en la categoría correcta
- O contacta al desarrollador para edición manual

### Los colores no se ven bien

**Causa**: Colores con bajo contraste o incompatibles.

**Solución**:
- Usa colores con buen contraste
- Prueba con diferentes tonos
- Consulta guías de accesibilidad de color

### Productos no se cargan en una categoría

**Causa**: Error en la petición al backend o productos mal configurados.

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que los productos tengan `category` asignado
4. Recarga la página

---

## 📊 Estadísticas y Métricas

### Productos por Categoría

El panel de admin muestra el contador de productos en cada tab:

```
Sábanas (12) | Toallas (8) | Cortinas (5) | ...
```

### Próximas Mejoras Sugeridas

- [ ] Panel de estadísticas global
- [ ] Gráficas de productos por categoría
- [ ] Productos más vistos por categoría
- [ ] Búsqueda dentro de categorías
- [ ] Filtros avanzados (precio, popularidad)
- [ ] Ordenamiento personalizado

---

## 🚀 Conclusión

El sistema de categorías de **Galería Punto Bag** es:

- ✅ **Flexible**: Fácil de agregar/modificar categorías
- ✅ **Escalable**: Soporta crecimiento de productos
- ✅ **Intuitivo**: Navegación clara para usuarios
- ✅ **Robusto**: Validaciones en frontend y backend
- ✅ **Responsive**: Funciona en todos los dispositivos

¡Disfruta gestionando tus productos! 🎉

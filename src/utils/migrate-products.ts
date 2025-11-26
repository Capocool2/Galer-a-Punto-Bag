/**
 * Script de Migración de Productos
 * 
 * Este script ayuda a migrar productos existentes que no tienen categoría
 * asignándoles automáticamente la categoría "sabanas" (la categoría por defecto).
 * 
 * INSTRUCCIONES PARA USO:
 * 
 * 1. Abre la consola del navegador (F12)
 * 2. Copia y pega este código en la consola
 * 3. Ejecuta: await migrateProducts()
 * 
 * NOTA: Este script solo es necesario si tienes productos creados antes
 * de implementar el sistema de categorías.
 */

export async function migrateProducts() {
  try {
    console.log('🔄 Iniciando migración de productos...');
    
    // Obtener todos los productos
    const response = await fetch(
      `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-985839ee/products`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    
    const data = await response.json();
    const products = data.products || [];
    
    console.log(`📦 Encontrados ${products.length} productos`);
    
    // Filtrar productos sin categoría
    const productsWithoutCategory = products.filter((p: any) => !p.category);
    
    console.log(`🔍 Productos sin categoría: ${productsWithoutCategory.length}`);
    
    if (productsWithoutCategory.length === 0) {
      console.log('✅ Todos los productos ya tienen categoría asignada');
      return;
    }
    
    console.log('ℹ️  NOTA: Los productos sin categoría serán asignados a "sábanas" por defecto');
    console.log('ℹ️  Puedes cambiar la categoría desde el panel de administración después');
    
    console.log('⚠️  Esta migración requiere permisos de administrador');
    console.log('💡 Por favor, contacta al desarrollador para completar la migración');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  }
}

// Hacer la función disponible globalmente en desarrollo
if (typeof window !== 'undefined') {
  (window as any).migrateProducts = migrateProducts;
}

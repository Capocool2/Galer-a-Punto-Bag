import React, { useState, useEffect } from 'react';
import { Upload, Loader2, Trash2, Edit2, Save, XCircle, Package } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { LazyImage } from './LazyImage';
import { categories, getCategoryById } from '../utils/categories';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  precio?: string;
  category: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string;
  onProductsChange: () => void;
}

export function AdminPanel({ isOpen, onClose, accessToken, onProductsChange }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  
  // Upload form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [precio, setPrecio] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Edit mode
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrecio, setEditPrecio] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-985839ee/products?category=${selectedCategory}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.error || `Error ${response.status}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      // No mostrar toast para evitar errores molestos
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen, selectedCategory]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('La imagen es obligatoria');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('precio', precio);
      formData.append('category', selectedCategory);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-985839ee/products`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error al subir producto' }));
        throw new Error(errorData.error || 'Error al subir producto');
      }

      // Limpiar formulario
      setName('');
      setDescription('');
      setPrecio('');
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Pequeño delay para asegurar que el producto se guardó
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Recargar productos y actualizar frontend
      await fetchProducts();
      onProductsChange();
      
      // Mostrar éxito
      toast.success('Producto subido exitosamente');
    } catch (err) {
      console.error('Error al subir:', err);
      toast.error(err instanceof Error ? err.message : 'Error al subir producto');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-985839ee/products/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error al eliminar producto' }));
        throw new Error(errorData.error || 'Error al eliminar producto');
      }

      // Pequeño delay para asegurar que el producto se eliminó
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Recargar productos y actualizar frontend
      await fetchProducts();
      onProductsChange();
      
      // Mostrar éxito
      toast.success('Producto eliminado exitosamente');
    } catch (err) {
      console.error('Error al eliminar:', err);
      toast.error(err instanceof Error ? err.message : 'Error al eliminar producto');
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrecio(product.precio || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
    setEditPrecio('');
  };

  const handleUpdate = async (productId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-985839ee/products/${productId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: editName,
            description: editDescription,
            precio: editPrecio
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error al actualizar producto' }));
        throw new Error(errorData.error || 'Error al actualizar producto');
      }

      cancelEdit();
      
      // Pequeño delay para asegurar que el producto se actualizó
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Recargar productos y actualizar frontend
      await fetchProducts();
      onProductsChange();
      
      // Mostrar éxito
      toast.success('Producto actualizado exitosamente');
    } catch (err) {
      console.error('Error al actualizar:', err);
      toast.error(err instanceof Error ? err.message : 'Error al actualizar producto');
    }
  };

  if (!isOpen) return null;

  const currentCategory = getCategoryById(selectedCategory);
  const CategoryIcon = currentCategory?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header del Panel */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Gestiona tus productos por categoría</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Volver a la tienda
            </button>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido Principal con Scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Formulario de Subida */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div 
            className="px-6 py-4"
            style={{ background: `linear-gradient(135deg, ${currentCategory?.color || '#3498db'}, ${currentCategory?.color || '#3498db'}dd)` }}
          >
            <h2 className="text-2xl text-white flex items-center gap-3">
              <Upload className="w-7 h-7" />
              Subir Nuevo Producto en {currentCategory?.name}
            </h2>
          </div>
          
          <div className="p-8 bg-gray-50">
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Ej: Sábana Queen Blanca"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Precio
                  </label>
                  <input
                    type="text"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Ej: $50.000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Descripción del Producto
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Describe el producto en detalle..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Imagen del Producto *
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 md:col-span-2">
                  {CategoryIcon && <CategoryIcon className="w-6 h-6" style={{ color: currentCategory?.color }} />}
                  <div>
                    <div className="text-sm text-gray-600">Categoría seleccionada:</div>
                    <div className="text-lg" style={{ color: currentCategory?.color }}>{currentCategory?.name}</div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Subiendo producto...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6" />
                    <span>Subir Producto</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div 
            className="px-6 py-4"
            style={{ background: `linear-gradient(135deg, ${currentCategory?.color || '#3498db'}dd, ${currentCategory?.color || '#3498db'})` }}
          >
            <h2 className="text-2xl text-white flex items-center gap-3">
              <Package className="w-7 h-7" />
              Productos de {currentCategory?.name}
              {products.length > 0 && (
                <span className="ml-2 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  {products.length} {products.length === 1 ? 'producto' : 'productos'}
                </span>
              )}
            </h2>
          </div>

          <div className="p-8 bg-gray-50">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-gray-700 mb-2">No hay productos en esta categoría</h3>
                <p className="text-gray-500">Comienza subiendo tu primer producto usando el formulario de arriba.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {product.imageUrl ? (
                        <LazyImage 
                          src={product.imageUrl}
                          alt={product.name || product.description}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      {editingId === product.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Nombre</label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                              placeholder="Nombre del producto"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Descripción</label>
                            <textarea
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                              placeholder="Descripción"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Precio</label>
                            <input
                              type="text"
                              value={editPrecio}
                              onChange={(e) => setEditPrecio(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                              placeholder="Precio (ej: $50.000)"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleUpdate(product.id)}
                              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                            >
                              <Save className="w-4 h-4" />
                              Guardar
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex-1 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                            >
                              <XCircle className="w-4 h-4" />
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="min-h-[100px] mb-4">
                            {product.name && (
                              <h3 className="text-lg text-gray-900 mb-2">{product.name}</h3>
                            )}
                            {product.description && (
                              <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                                {product.description}
                              </p>
                            )}
                            {product.precio && (
                              <p className="text-xl text-blue-600">
                                {product.precio}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(product)}
                              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                            >
                              <Edit2 className="w-4 h-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                              Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer del Panel */}
      <div className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            Gestiona tus productos de manera eficiente • Galería Punto Bag Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}
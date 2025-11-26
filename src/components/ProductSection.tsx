import React, { useState, useEffect } from 'react';
import { Loader2, Package, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import Slider from 'react-slick';
import { LazyImage } from './LazyImage';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Category } from '../utils/categories';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  precio?: string;
  category: string;
}

interface ProductSectionProps {
  category: Category;
}

// Custom Arrow Components
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-lg md:shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all"
      style={{ opacity: 0.9 }}
    >
      <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-lg md:shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all"
      style={{ opacity: 0.9 }}
    >
      <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
    </button>
  );
}

export function ProductSection({ category }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (zoomedImage && isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [zoomedImage, isModalVisible]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-985839ee/products?category=${category.id}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();
        if (isMounted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        // Silently handle product fetch error
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [category.id]);

  const handleWhatsAppClick = (productName: string, precio?: string, imageUrl?: string) => {
    const phoneNumber = '573007506823';
    let message = `¡Hola! Me interesa este producto:\n\n`;
    message += `📦 *${productName}*\n`;
    if (precio) {
      message += `💰 ${precio}\n`;
    }
    if (imageUrl) {
      message += `\n📷 Ver imagen: ${imageUrl}\n`;
    }
    message += `\n¿Podrían darme más información sobre disponibilidad?\n\n`;
    message += `Gracias 😊`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const Icon = category.icon;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4 segundos (no muy rápido)
    pauseOnHover: true,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        }
      }
    ]
  };

  return (
    <section id={`section-${category.id}`} className="py-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <div className="flex justify-center mb-3 md:mb-4">
            <div 
              className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <Icon className="w-7 h-7 md:w-10 md:h-10" style={{ color: category.color }} />
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-gray-900 mb-2 md:mb-4">{category.name}</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            {category.description}
          </p>
        </div>

        {/* Products Carousel */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-700 mb-2">No hay productos disponibles</h3>
            <p className="text-gray-500">Pronto agregaremos nuevos productos en esta categoría.</p>
          </div>
        ) : (
          <div className="relative px-4 md:px-12">
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <div key={product.id} className="px-2 md:px-4">
                  <div className="bg-transparent">
                    {/* Imagen con zoom al hacer click */}
                    <div 
                      className="aspect-square bg-gray-100 overflow-hidden relative rounded-xl md:rounded-2xl mb-3 md:mb-4 cursor-pointer select-none"
                      onClick={(e) => {
                        e.preventDefault();
                        if (product.imageUrl) {
                          setZoomedImage(product.imageUrl);
                          setIsModalVisible(true);
                        }
                      }}
                    >
                      {product.imageUrl ? (
                        <LazyImage 
                          src={product.imageUrl}
                          alt={product.name || product.description}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          skeleton={true}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-20 h-20 text-gray-300" />
                        </div>
                      )}
                    </div>
                    
                    {/* Información sin contenedor */}
                    <div>
                      {product.name && (
                        <h3 className="text-lg md:text-xl text-gray-900 mb-1.5 md:mb-2">{product.name}</h3>
                      )}
                      {product.description && (
                        <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3 line-clamp-2">{product.description}</p>
                      )}
                      {product.precio && (
                        <p className="text-xl md:text-2xl mb-3 md:mb-4" style={{ color: category.color }}>
                          {product.precio}
                        </p>
                      )}
                      
                      {/* Botón WhatsApp */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppClick(product.name || product.description, product.precio, product.imageUrl || undefined);
                        }}
                        className="w-full px-4 py-2.5 md:px-6 md:py-3 bg-green-600 text-white rounded-lg md:rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 hover:shadow-lg text-sm md:text-base"
                      >
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Me interesa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      {/* Modal de zoom de imagen con animación suave */}
      {zoomedImage && (
        <div 
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center p-4 transition-opacity duration-300 ${
            isModalVisible ? 'bg-opacity-90 opacity-100' : 'bg-opacity-0 opacity-0'
          }`}
          onClick={() => {
            setIsModalVisible(false);
            setTimeout(() => setZoomedImage(null), 300);
          }}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all z-10 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalVisible(false);
              setTimeout(() => setZoomedImage(null), 300);
            }}
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
          <div 
            className={`max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center transition-transform duration-300 ${
              isModalVisible ? 'scale-100' : 'scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={zoomedImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
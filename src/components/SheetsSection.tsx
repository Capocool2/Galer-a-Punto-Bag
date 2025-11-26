import React from 'react';
import { Bed, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import Slider from 'react-slick';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Custom Arrow Components
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all"
      style={{ opacity: 0.9 }}
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all"
      style={{ opacity: 0.9 }}
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
  );
}

export function SheetsSection() {
  const sizes = [
    { size: 'Sencilla', measure: '1.90 x 1.00 m • 2.50 x 1.60 m', precio: '$45.000' },
    { size: 'Semidoble', measure: '1.90 x 1.20 m • 2.50 x 1.70 m', precio: '$50.000' },
    { size: 'Doble', measure: '1.90 x 1.40 m • 2.50 x 2.00 m', precio: '$55.000' },
    { size: 'Queen', measure: '1.90 x 1.60 m • 2.50 x 2.20 m', precio: '$60.000' },
    { size: 'King', measure: '2.00 x 2.00 m • 2.50 x 2.50 m', precio: '$65.000' },
  ];

  const features = [
    'Material suave y duradero',
    'Ajuste perfecto con elástico en todo el borde',
    'Diseño moderno y colores variados',
    'Fácil de lavar y mantener',
    'No se recomienda secar con calor ni planchar directamente'
  ];

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1552858725-693709cc17c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWQlMjBzaGVldHMlMjBiZWRyb29tfGVufDF8fHx8MTc2MTMxODkyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Sábanas de lujo',
      title: 'Sábanas Premium'
    },
    {
      src: 'https://images.unsplash.com/photo-1629078692570-e5b305b792de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwd2hpdGUlMjBzaGVldHN8ZW58MXx8fHwxNzYxMzE4OTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Sábanas modernas blancas',
      title: 'Sábanas Blancas Modernas'
    },
    {
      src: 'https://images.unsplash.com/photo-1657524497244-a58edfcec6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTMxODkyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Interior de dormitorio minimalista',
      title: 'Estilo Minimalista'
    }
  ];

  const handleWhatsAppClick = (productName: string) => {
    const phoneNumber = '573007506823';
    const message = `Hola, me interesa este producto: ${productName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section id="sheets-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-100">
              <Bed className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">Sábanas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sábanas suaves y duraderas para un descanso perfecto
          </p>
        </div>

        {/* Images Carousel - Sin contenedores */}
        <div className="relative px-12 mb-16">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="px-4">
                <div className="bg-transparent">
                  {/* Imagen sin contenedor */}
                  <div className="aspect-square bg-gray-100 overflow-hidden relative rounded-2xl mb-4">
                    <ImageWithFallback 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Información sin contenedor */}
                  <div>
                    <h3 className="text-xl text-gray-900 mb-2">{image.title}</h3>
                    <p className="text-gray-600 mb-4">
                      Disfruta del mejor descanso con nuestras sábanas de alta calidad
                    </p>
                    
                    {/* Botones */}
                    <div className="space-y-2">
                      <button 
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg"
                      >
                        Ver Detalles
                      </button>
                      
                      <button 
                        onClick={() => handleWhatsAppClick(image.title)}
                        className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Me interesa este producto
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Sizes Table - Sin contenedor con sombra */}
        <div className="mb-12">
          <h3 className="text-2xl text-gray-900 mb-6 text-center">
            Disponibles en todos los tamaños para adaptarse a tus necesidades:
          </h3>
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Tamaño</th>
                  <th className="px-6 py-4 text-left">Medida</th>
                  <th className="px-6 py-4 text-left">Precio</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-900">{item.size}</td>
                    <td className="px-6 py-4 text-gray-700">{item.measure}</td>
                    <td className="px-6 py-4 text-blue-600">{item.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features - Sin sombra pesada */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <h3 className="text-2xl text-gray-900 mb-8 text-center">Características:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xl text-gray-900 mt-8">
            Perfectas para renovar tu habitación con estilo y confort.
          </p>
        </div>
      </div>
    </section>
  );
}

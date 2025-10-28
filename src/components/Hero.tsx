import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div id="home" className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1568890643060-ef2293be79b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBoZXJvJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjEzMTg5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-4 md:mb-6">
            Bienvenido a Galería Punto Bag
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8">
            Descubre nuestra colección exclusiva de sábanas, toallas, cortinas, cobijas, almohadas, 
            manteles, edredones y colchas. Confort y estilo en cada detalle.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('section-sabanas');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform text-sm md:text-base"
          >
            Explorar Categorías
          </button>
        </div>
      </div>
    </div>
  );
}

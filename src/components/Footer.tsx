import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl mb-4">Galería Punto Bag</h3>
            <p className="text-gray-400 mb-4">
              Tu tienda de confianza para productos de alta calidad para el hogar. 
              Confort y estilo en cada compra.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>capocool.jq@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>300 750 6823</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Barranquilla, Colombia</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/573007506823" 
                className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Galería Punto Bag. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

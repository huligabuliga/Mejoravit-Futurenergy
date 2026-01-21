import { Phone, Mail, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#1B263B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/images/Logo-Futurenergy.png" 
                alt="FuturEnergy Logo" 
                className="w-20 h-20 md:w-24 md:h-24" 
              />
              <span className="text-xl md:text-2xl font-bold">FuturEnergy</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              For a Better Future. Ayudamos a familias mexicanas a aprovechar su crédito Mejoravit para instalar paneles solares.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contacto</h4>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#F48C06] flex-shrink-0" />
                <span>+52 81 8396 3532</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#F48C06] flex-shrink-0" />
                <span>info@futurenergy.mx</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#F48C06] flex-shrink-0" />
                <span>San pedro garza garcía, NL</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="#como-funciona" className="text-gray-400 hover:text-[#F48C06] transition-colors text-sm md:text-base">
                  ¿Cómo Funciona?
                </a>
              </li>
              <li>
                <a href="#requisitos" className="text-gray-400 hover:text-[#F48C06] transition-colors text-sm md:text-base">
                  Requisitos
                </a>
              </li>
              <li>
                <a href="#solicitar" className="text-gray-400 hover:text-[#F48C06] transition-colors text-sm md:text-base">
                  Solicitar Crédito
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 md:pt-8 text-center text-gray-500 text-xs md:text-sm">
          <p>© {new Date().getFullYear()} FuturEnergy. Todos los derechos reservados.</p>
          <p className="mt-2">Crédito Mejoravit para Paneles Solares</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

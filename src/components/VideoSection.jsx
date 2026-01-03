import { Clock, CheckCircle } from 'lucide-react';

function VideoSection() {
  return (
    <section id="como-funciona" className="bg-slate-50 py-12 md:py-20">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="step-badge">1</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B263B]">
              ¿Cómo Funciona?
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Mira este corto video para ver si eres elegible y cómo funciona el crédito Mejoravit para paneles solares
          </p>
        </div>
      </div>

      {/* Centered Video */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 animate-scale-in animation-delay-200">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#1B263B]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/8y-H0zvkwVI"
            title="Cómo funciona el crédito Mejoravit"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
          {/* Video duration badge */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>3:45</span>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="card border-l-4 border-[#E85D04] animate-fade-in-up animation-delay-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#E85D04]" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg text-[#1B263B] mb-2">
                  Sin enganche ni desembolso inicial
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Utiliza directamente tu saldo para financiar la instalación completa de tus paneles solares.
                </p>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-[#F48C06] animate-fade-in-up animation-delay-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#F48C06]" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg text-[#1B263B] mb-2">
                  Proceso más rápido del mercado
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Tendrás el dinero en menos de 2 semanas.
                </p>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-[#1B263B] animate-fade-in-up animation-delay-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#1B263B]" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg text-[#1B263B] mb-2">
                  Instalación profesional incluida
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Nuestro equipo certificado se encarga de todo: visita técnica, diseño, instalación, tramitología con CFE y gestión de garantías en caso de requerirlo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;

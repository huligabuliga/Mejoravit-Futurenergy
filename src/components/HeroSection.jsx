import { ArrowDown, Zap } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1B263B] via-[#415A77] to-[#1B263B] text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E85D04] rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F48C06] rounded-full opacity-15 blur-3xl animate-float animation-delay-500"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E85D04] rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in-down">
            <Zap className="w-5 h-5 text-[#F48C06]" />
            <span className="text-sm font-medium">Crédito Mejoravit</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
            Solicita tu crédito{' '}
            <span className="text-[#F48C06] inline-block animate-pulse-glow rounded-lg px-2">Mejoravit</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">para Paneles Solares</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 px-4">
            Aprovecha hasta $163,000 de crédito para tu proyecto de paneles solares
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12 animate-fade-in-up animation-delay-300 px-4">
            <a
              href="#como-funciona"
              className="btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Ver cómo funciona
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto pt-8 border-t border-white/20 animate-fade-in-up animation-delay-400">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F48C06]">100%</div>
              <div className="text-xs sm:text-sm text-gray-400">Ahorro en luz</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F48C06]">$52</div>
              <div className="text-xs sm:text-sm text-gray-400">Pagas al mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F48C06]">30+</div>
              <div className="text-xs sm:text-sm text-gray-400">Años de vida útil</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;

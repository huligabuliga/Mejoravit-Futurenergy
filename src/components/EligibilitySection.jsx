import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

function EligibilitySection() {
  const canApply = [
    'Estás cotizando ante el IMSS actualmente',
    'Tienes más de $100,000 en tu subcuenta',
    'Tienes tu NSS a la mano',
  ];

  const cannotApply = [
    'Tienes un crédito activo con el Infonavit',
    'Estás fuera de Nuevo León',
    'Estás jubilado o no estás cotizando actualmente',
  ];

  return (
    <section id="requisitos" className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B263B] mb-4">
            ¿Puedo aplicar al crédito?
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Revisa los requisitos antes de agendar tu videollamada
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          {/* Can Apply */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-green-200 animate-slide-in-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-green-800">Solo aplica si:</h3>
            </div>
            
            <ul className="space-y-3 md:space-y-4">
              {canApply.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cannot Apply */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 md:p-8 border border-red-200 animate-slide-in-right transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-red-800">No te podemos ayudar si:</h3>
            </div>
            
            <ul className="space-y-3 md:space-y-4">
              {cannotApply.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 md:mt-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-6 flex items-start gap-3 md:gap-4 transition-all duration-300 hover:shadow-md">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-1 text-sm md:text-base">¿No estás seguro?</h4>
              <p className="text-amber-700 text-xs md:text-sm">
                No te preocupes, en la videollamada revisamos juntos tu situación y te decimos si puedes aplicar al crédito Mejoravit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EligibilitySection;

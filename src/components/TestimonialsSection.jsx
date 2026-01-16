import { Star, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Andrés P.',
    location: 'Monterrey, NL',
    rating: 5,
    text: 'Les quiero externar mi agradecimiento por el trabajo tan profesional que hicieron en mi casa. Quedé sorprendido por los tiempos de respuesta de CFE y que en 30 días ya teníamos produciendo electricidad. ¡Una felicitación a todo el equipo! Con toda confianza serán muy bien recomendados con mis familiares y amigos.',
    date: 'Noviembre 2024',
    highlight: '30 días produciendo',
    image: '/images/clienteFeliz-1.jpeg',
  },
  {
    id: 2,
    name: 'Miguel S.',
    location: 'San pedro garza garcía, NL',
    rating: 5,
    text: 'Quiero felicitar a todo el equipo, estoy muy contenta de haberlos elegido. La instalación fue todo un éxito y toda la gente con la que tuve el gusto de tratar fue maravillosa. Me explicaron con mucha claridad y siempre hubo mucho orden y limpieza. ¡Gracias! ⚡😁🙏',
    date: 'Octubre 2024',
    highlight: 'Instalación exitosa',
    image: '/images/clienteFeliz-2.jpeg',
  },
  {
    id: 3,
    name: 'Roberto G.',
    location: 'Guadalupe, NL',
    rating: 5,
    text: 'Excelente servicio desde el primer contacto. El asesor me explicó todo el proceso del crédito Mejoravit muy claro. La instalación fue rápida y profesional. Ahora solo pago $52 pesos de luz cuando antes pagaba más de $5,000. ¡Totalmente recomendado!',
    date: 'Diciembre 2024',
    highlight: 'De $5,000 a $52',
    image: null,
  },
  {
    id: 4,
    name: 'María L.',
    location: 'Apodaca, NL',
    rating: 5,
    text: 'Al principio tenía dudas sobre usar mi Mejoravit para paneles solares, pero el equipo de FuturEnergy me dio toda la confianza. El proceso fue muy sencillo y ahora mi familia y yo disfrutamos de energía limpia. ¡Gracias por todo!',
    date: 'Septiembre 2024',
    highlight: 'Proceso sencillo',
    image: null,
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Testimonios reales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B263B] mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Más de 500 familias ya disfrutan de energía solar con FuturEnergy
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-start">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
                         transition-all duration-300 hover:shadow-xl hover:-translate-y-2
                         animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* If has image - show WhatsApp screenshot with name/date */}
              {testimonial.image ? (
                <div className="flex flex-col">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={`Testimonio de ${testimonial.name}`}
                      className="w-full h-auto block"
                    />
                  </div>
                  {/* Author info for image testimonials */}
                  <div className="flex items-center gap-3 p-4 border-t border-gray-100 bg-gray-50">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#E85D04] to-[#F48C06] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1B263B] text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.location} • {testimonial.date}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* If no image - show text testimonial */
                <div className="p-5 md:p-6 flex flex-col">
                  <div className="mb-3">
                    <Quote className="w-8 h-8 text-[#E85D04] opacity-50" />
                  </div>

                  {/* Highlight Badge */}
                  <div className="inline-block bg-orange-100 text-[#E85D04] text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                    {testimonial.highlight}
                  </div>

                  {/* Review Text - smaller font, full text shown */}
                  <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#E85D04] to-[#F48C06] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1B263B] text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.location} • {testimonial.date}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 md:mt-14 text-center animate-fade-in-up animation-delay-500">
          <div className="inline-flex flex-wrap justify-center items-center gap-6 md:gap-10 bg-white rounded-2xl px-6 md:px-10 py-5 md:py-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#E85D04]">500+</div>
              <div className="text-xs md:text-sm text-gray-500">Familias felices</div>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#E85D04]">4.9★</div>
              <div className="text-xs md:text-sm text-gray-500">Calificación</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

import { useState } from 'react';
import { Calendar, User, Phone, Mail, MapPin, Building, CreditCard, Send, Video } from 'lucide-react';

function FormSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    recibo: '',
    estado: '',
    cotizaIMSS: '',
    saldo: '',
    fechaInicio: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState({ status: false, reason: '' });
  const [assignedSalesperson, setAssignedSalesperson] = useState({ id: '', name: '' });

  // Salesforce ID to Calendly URL mapping
  const calendlyLinks = {
    '005V500000CEMMjIAP': 'https://calendly.com/guillermo-salazar-futurenergy', // Willy
    '005V5000009xlSLIAY': 'https://calendly.com/eduardo-soto-futurenergy/revision-de-claridad-paneles-solares-futurenergy', // Lalo Soto
    '005V500000CzUqLIAV': 'https://calendly.com/victor-ferrigno-futurenergy/30min', // Victor 
    '005Hr00000H1N0OIAV': 'https://calendly.com/ventas-futurenergy/30min', // Caro
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
      case 'apellido':
        if (!value.trim()) return 'Este campo es requerido';
        if (value.trim().length < 2) return 'Debe tener al menos 2 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)) return 'Solo se permiten letras';
        return '';
      case 'telefono':
        if (!value.trim()) return 'Este campo es requerido';
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length !== 10) return 'Debe tener exactamente 10 dígitos';
        return '';
      case 'correo':
        if (!value.trim()) return 'Este campo es requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo electrónico inválido';
        return '';
      case 'recibo':
      case 'estado':
      case 'cotizaIMSS':
      case 'saldo':
      case 'fechaInicio':
        if (!value) return 'Selecciona una opción';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'telefono') {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const openCalendly = () => {
    if (window.Calendly) {
      // Get the Calendly URL based on assigned salesperson, fallback to default
      console.log('=== OPENING CALENDLY ===');
      console.log('Current assignedSalesperson state:', assignedSalesperson);
      console.log('Looking up ID:', assignedSalesperson.id);
      console.log('Available calendly links:', calendlyLinks);
      
      const calendlyUrl = calendlyLinks[assignedSalesperson.id];
      
      if (!calendlyUrl) {
        console.error('❌ NO CALENDLY LINK FOUND for ID:', assignedSalesperson.id);
        console.error('This means either:');
        console.error('1. The webhook did not return a salesforceID');
        console.error('2. The salesforceID returned does not match any in our mapping');
        console.error('Using fallback...');
      } else {
        console.log('✅ Found Calendly link:', calendlyUrl);
      }
      
      const finalUrl = calendlyUrl || 'https://calendly.com/guillermo-salazar-futurenergy';
      console.log('Final Calendly URL:', finalUrl);

      window.Calendly.initPopupWidget({
        url: finalUrl,
        prefill: {
          name: `${formData.nombre} ${formData.apellido}`,
          email: formData.correo,
          customAnswers: {
            a1: formData.telefono
          }
        }
      });
    }
  };

  const checkEligibility = () => {
    if (formData.estado === 'Otro estado') {
      return { eligible: false, reason: 'El programa Mejoravit solo está disponible en Nuevo León. Realizamos instalaciones en otros estados, pero no a través de este crédito. Contáctanos para conocer otras opciones de financiamiento.' };
    }
    if (formData.recibo === 'Menos de $3,000') {
      return { eligible: false, reason: 'El programa Mejoravit requiere un consumo mínimo de $3,000 en tu recibo de luz para que el proyecto sea viable.' };
    }
    if (formData.cotizaIMSS === 'No estoy cotizando') {
      return { eligible: false, reason: 'Para acceder al crédito Mejoravit es necesario estar cotizando actualmente ante el IMSS.' };
    }
    if (formData.saldo === 'No, tengo menos') {
      return { eligible: false, reason: 'El programa requiere un saldo mínimo de $100,000 en tu subcuenta de vivienda para poder acceder al crédito.' };
    }
    return { eligible: true, reason: '' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const eligibility = checkEligibility();
    if (!eligibility.eligible) {
      setRejected({ status: true, reason: eligibility.reason });
      return;
    }

    setIsSubmitting(true);
    
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form data being sent:', formData);
    
    try {
      const response = await fetch('https://n8n.srv955702.hstgr.cloud/webhook/mejoravitwebsite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Parse webhook response to get assigned salesperson
      const webhookData = await response.json();
      console.log('=== WEBHOOK RESPONSE RECEIVED ===');
      console.log('Full webhook response:', JSON.stringify(webhookData, null, 2));
      console.log('Webhook data type:', typeof webhookData);
      console.log('Webhook data keys:', Object.keys(webhookData));

      // Store the assigned salesperson info
      if (webhookData.salesforceID) {
        console.log('✅ Salesforce ID found:', webhookData.salesforceID);
        setAssignedSalesperson({
          id: webhookData.salesforceID,
          name: webhookData.name || ''
        });
        const assignedCalendly = calendlyLinks[webhookData.salesforceID] || 'default';
        console.log('Assigned salesperson details:', {
          id: webhookData.salesforceID,
          name: webhookData.name,
          calendlyLink: assignedCalendly,
          hasMatchingCalendlyLink: !!calendlyLinks[webhookData.salesforceID]
        });
      } else {
        console.warn('⚠️ No salesforceID in webhook response');
        console.log('Available response fields:', Object.keys(webhookData));
      }
      
      console.log('=== FORM SUBMISSION COMPLETED ===');
      setSubmitted(true);
    } catch (error) {
      console.error('=== ERROR DURING SUBMISSION ===');
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (rejected.status) {
    return (
      <section id="solicitar" className="bg-slate-50 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center py-10 md:py-12 animate-scale-in">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1B263B] mb-4">¡Lo sentimos!</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base px-4">
              Por el momento no podemos procesar tu solicitud.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 mx-4">
              <p className="text-amber-800 text-sm md:text-base">
                {rejected.reason}
              </p>
            </div>
            
            {/* Contact section for alternative options */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 mx-4">
              <p className="text-blue-800 text-sm md:text-base font-semibold mb-2">
                ¿Te interesa conocer otras opciones de financiamiento?
              </p>
              <p className="text-blue-700 text-sm mb-3">
                Contamos con diferentes alternativas que podrían adaptarse a tu situación. ¡Contáctanos para más información!
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <a 
                  href="tel:+528183527867" 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Phone size={16} />
                  <span>81 8352 7867</span>
                </a>
                <span className="hidden sm:inline text-blue-300">|</span>
                <a 
                  href="https://wa.me/528183527867" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-800 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <span className="hidden sm:inline text-blue-300">|</span>
                <a 
                  href="mailto:info@futurenergy.com.mx" 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Mail size={16} />
                  <span>info@futurenergy.com.mx</span>
                </a>
              </div>
            </div>
            
            <p className="text-gray-500 mb-6 text-sm px-4">
              Estamos trabajando constantemente para expandir nuestros servicios. ¡Gracias por tu interés en FuturEnergy!
            </p>
            <button
              onClick={() => {
                setRejected({ status: false, reason: '' });
                setFormData({
                  nombre: '',
                  apellido: '',
                  telefono: '',
                  correo: '',
                  recibo: '',
                  estado: '',
                  cotizaIMSS: '',
                  saldo: '',
                  fechaInicio: '',
                });
              }}
              className="btn-secondary"
            >
              Volver al formulario
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section id="solicitar" className="bg-slate-50 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center py-10 md:py-12 animate-scale-in">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1B263B] mb-4">¡Gracias por tu solicitud!</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base px-4">
              Hemos recibido tus datos. Ahora agenda tu videollamada con un asesor de FuturEnergy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openCalendly}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" />
                Agendar Videollamada
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
              >
                Enviar otra solicitud
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="solicitar" className="bg-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="step-badge">2</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B263B]">
              Agenda tu Videollamada
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Ingresa tus datos para llamarte y agendar una videollamada personalizada
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card animate-fade-in-up animation-delay-200">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" noValidate>
              {/* Row 1: Nombre y Apellido */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tu nombre"
                    className={`input-field ${errors.nombre ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tu apellido"
                    className={`input-field ${errors.apellido ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
                </div>
              </div>

              {/* Row 2: Teléfono y Correo */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="10 dígitos"
                    maxLength={10}
                    className={`input-field ${errors.telefono ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Correo *
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="tu@correo.com"
                    className={`input-field ${errors.correo ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
                </div>
              </div>

              {/* Row 3: Recibo y Estado */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    ¿Cuánto pagas en tu recibo? *
                  </label>
                  <select
                    name="recibo"
                    value={formData.recibo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${errors.recibo ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="Menos de $3,000">Menos de $3,000</option>
                    <option value="$3,000 a $5,000">$3,000 a $5,000</option>
                    <option value="$5,000 a $10,000">$5,000 a $10,000</option>
                    <option value="Más de $10,000">Más de $10,000</option>
                    <option value="Más de $50,000">Más de $50,000</option>
                  </select>
                  {errors.recibo && <p className="text-red-500 text-xs mt-1">{errors.recibo}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Estado *
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${errors.estado ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Selecciona tu estado</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Otro estado">Otro estado</option>
                  </select>
                  {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado}</p>}
                </div>
              </div>

              {/* Row 4: IMSS y Saldo */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    ¿Estás cotizando ante IMSS? *
                  </label>
                  <select
                    name="cotizaIMSS"
                    value={formData.cotizaIMSS}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${errors.cotizaIMSS ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Sí, actualmente cotizo">Sí, actualmente cotizo</option>
                    <option value="No estoy cotizando">No estoy cotizando</option>
                    <option value="No estoy seguro">No estoy seguro</option>
                  </select>
                  {errors.cotizaIMSS && <p className="text-red-500 text-xs mt-1">{errors.cotizaIMSS}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    ¿Tienes más de $100,000 en tu subcuenta? *
                  </label>
                  <select
                    name="saldo"
                    value={formData.saldo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${errors.saldo ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Sí, tengo más de $100,000">Sí, tengo más de $100,000</option>
                    <option value="No, tengo menos">No, tengo menos</option>
                    <option value="No sé cuánto tengo">No sé cuánto tengo</option>
                  </select>
                  {errors.saldo && <p className="text-red-500 text-xs mt-1">{errors.saldo}</p>}
                </div>
              </div>

              {/* Row 5: Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  ¿Cuándo quieres empezar tu proyecto? *
                </label>
                <select
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-field ${errors.fechaInicio ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Inmediata">Inmediata</option>
                  <option value="Más De Un Mes">Más De Un Mes</option>
                  <option value="Más De Dos Meses">Más De Dos Meses</option>
                  <option value="Más De Tres Meses">Más De Tres Meses</option>
                  <option value="Más De Seis Meses">Más De Seis Meses</option>
                </select>
                {errors.fechaInicio && <p className="text-red-500 text-xs mt-1">{errors.fechaInicio}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2 md:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-base md:text-lg py-3 md:py-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Solicitud
                    </>
                  )}
                </button>
              </div>

              {/* Privacy note */}
              <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
                Al enviar este formulario, aceptas que FuturEnergy te contacte para darte información sobre el crédito Mejoravit.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormSection;

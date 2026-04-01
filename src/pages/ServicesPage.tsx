import { Shield, FileText, Building, Home, CheckCircle, ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from '../components/ScrollReveal'
import { useEffect } from 'react'

const ServicesPage = () => {
  const { t } = useLanguage()

  useEffect(() => {
    // Handle hash URL scrolling
    const hash = window.location.hash
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  const services = [
    {
      id: 'juridisch',
      icon: Shield,
      title: 'Juridische Expertise',
      subtitle: 'Wij regelen alles juridisch, van A tot Z',
      description: 'Onze juridische experts begeleiden u bij alle aspecten van leegstandswetgeving. Wij zorgen ervoor dat u geen zorgen heeft over juridische zaken.',
      features: [
        'Advies over de Leegstandswet en bestemmingsplannen',
        'Begeleiding bij het opstellen van huurovereenkomsten',
        'Ondersteuning bij geschillen met huurders of eigenaren',
        'Juridische risico-analyse voor vastgoedbezitters',
        'Consultatie over anti-kraak maatregelen',
        'Opzegging van huurovereenkomsten conform wetgeving',
        'Contact met notarissen en advocaten',
        'Volledige juridische afhandeling van overname tot sleuteloverdracht'
      ],
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    {
      id: 'fiscaal',
      icon: FileText,
      title: 'Fiscale Kennis',
      subtitle: 'Optimale fiscale voordelen voor uw situatie',
      description: 'Onze fiscale specialisten adviseren over alle fiscale aspecten van leegstand. Wij zorgen dat u maximaal profiteert van beschikbare voordelen.',
      features: [
        'BTW-vrijstellingen bij herbestemming',
        'Fiscale voordelen van anti-kraak bewoning',
        'Belastingaftrek voor onderhoudskosten',
        'WOZ-waarde optimalisatie',
        'Investeringsaftrek en subsidies',
        'Fiscale structurering van vastgoedportefeuilles',
        'Aangifte hulp en belastingadvies',
        'Contact met belastingadviseurs en accountants'
      ],
      color: '#10b981',
      bgColor: '#ecfdf5'
    },
    {
      id: 'vastgoed',
      icon: Building,
      title: 'Vastgoedbeheer',
      subtitle: 'Professioneel beheer van uw pand',
      description: 'Professioneel vastgoedbeheer voor leegstaande panden. Wij zorgen dat uw pand in topconditie blijft tot het weer bewoond wordt.',
      features: [
        'Periodieke inspecties en onderhoud',
        'Coördinatie van reparaties en renovaties',
        'Verzekeringsbeheer en schadeafhandeling',
        'Relatiebeheer met buren en gemeente',
        'Voorbereiding op nieuwe verhuur',
        'Energieprestatie optimalisatie',
        'Schoonmaak en tuinonderhoud',
        'Technische installaties beheer'
      ],
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      id: 'leegstandsbeheer',
      icon: Home,
      title: 'Leegstandsbeheer',
      subtitle: 'Veiligheid en bewaking van uw pand',
      description: 'Compleet leegstandsbeheer om uw pand veilig te houden. Geen zorgen over kraken, vandalisme of verval.',
      features: [
        '24/7 bewaking en alarmmonitoring',
        'Anti-kraak bewoning regeling',
        'Wekelijkse rondes en inspecties',
        'Directe melding bij calamiteiten',
        'Onderhoud van tuin en buitenruimtes',
        'Voorbereiding op herverhuur of verkoop',
        'Sleutelbeheer en toegangscontrole',
        'Rapportage en status updates'
      ],
      color: '#8b5cf6',
      bgColor: '#f5f3ff'
    }
  ]

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0047AB 0%, #0056b3 50%, #0066cc 100%)',
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
            Onze Diensten
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
            Van juridische ondersteuning tot volledig vastgoedbeheer. 
            Wij regelen alles, zodat u zich geen zorgen hoeft te maken.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <section
            key={service.id}
            id={`service-${service.id}`}
            style={{
              padding: '6rem 0',
              backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white',
              borderTop: index > 0 ? '1px solid #e2e8f0' : 'none'
            }}
          >
            <div className="container">
              <ScrollReveal>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      backgroundColor: service.bgColor,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 20px ${service.color}20`
                    }}>
                      <Icon size={35} style={{ color: service.color }} />
                    </div>
                    <div>
                      <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '0.5rem'
                      }}>
                        {service.title}
                      </h2>
                      <p style={{
                        fontSize: '1.25rem',
                        color: service.color,
                        fontWeight: '600'
                      }}>
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#475569',
                    lineHeight: '1.8',
                    marginBottom: '3rem'
                  }}>
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          padding: '1.5rem',
                          backgroundColor: 'white',
                          borderRadius: '12px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                          border: `2px solid ${service.bgColor}`
                        }}
                      >
                        <div style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: service.color,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <CheckCircle size={16} style={{ color: 'white' }} />
                        </div>
                        <span style={{
                          fontSize: '1rem',
                          color: '#1e293b',
                          fontWeight: '500',
                          lineHeight: '1.5'
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <a
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        backgroundColor: service.color,
                        color: 'white',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'all 0.2s',
                        boxShadow: `0 4px 15px ${service.color}40`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 6px 20px ${service.color}60`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = `0 4px 15px ${service.color}40`
                      }}
                    >
                      Neem contact op voor {service.title.toLowerCase()}
                      <ArrowRight size={20} />
                    </a>
                  </div>

                  {/* Scroll indicator (except for last section) */}
                  {index < services.length - 1 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '4rem'
                    }}>
                      <button
                        onClick={() => {
                          const nextSection = document.getElementById(`service-${services[index + 1].id}`)
                          nextSection?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        style={{
                          width: '50px',
                          height: '50px',
                          border: '3px solid #3b82f6',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'white',
                          cursor: 'pointer',
                          animation: 'bounce 2s infinite',
                          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                        }}
                        aria-label="Scroll naar volgende sectie"
                      >
                        <ArrowRight size={24} style={{ color: '#3b82f6', transform: 'rotate(90deg)' }} />
                      </button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )
      })}

      {/* Final CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0047AB 0%, #0056b3 50%, #0066cc 100%)',
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Klaar om samen te werken?
          </h2>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.95 }}>
            Wij regelen alles voor u. Van juridische zaken tot het beheer van uw pand.
            Neem vandaag nog contact met ons op.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: 'white',
                color: '#0047AB',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Neem Contact Op
            </a>
            <a
              href="/melden"
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Meld Leegstand
            </a>
          </div>
        </div>
      </section>

      {/* Add bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  )
}

export default ServicesPage

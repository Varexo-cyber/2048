import { useState, useEffect } from 'react'
import { MessageCircle, X, Home, Building, Users, FileText, Phone, ChevronDown, ChevronUp, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

interface FAQItem {
  id: string
  icon: React.ReactNode
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    icon: <Home size={20} />,
    question: 'Wat is Leegstandmeldpunt?',
    answer: 'Leegstandmeldpunt is het officiële meldpunt voor leegstaand vastgoed in Nederland. Wij werken samen met gemeenten, vastgoedeigenaren en woningzoekers om het woningtekort te verminderen door leegstand te signaleren en te activeren voor bewoning.'
  },
  {
    id: '2',
    icon: <Building size={20} />,
    question: 'Hoe meld ik een leegstaande woning of pand?',
    answer: 'U kunt eenvoudig een melding doen via ons online formulier. Vul het adres in, geef aan hoe lang het pand leegstaat, en voeg eventueel foto\'s toe. Dit kan anoniem of met uw contactgegevens. Onze experts analyseren de melding en nemen zo nodig contact op met de eigenaar.'
  },
  {
    id: '3',
    icon: <Users size={20} />,
    question: 'Hoe helpt dit mijn buurt?',
    answer: 'Door leegstand te melden en activeren, brengen we meer woningen terug op de markt. Dit betekent minder huisjagers, meer levendigheid in de straat, en minder kans op vandalisme of criminaliteit in leegstaande panden. U helpt mee aan leefbare buurten en oplossing van het woningtekort.'
  },
  {
    id: '4',
    icon: <FileText size={20} />,
    question: 'Wordt er een vergoeding gegeven voor meldingen?',
    answer: 'Ja, als melder ontvangt u een vergoeding van €100 wanneer uw melding leidt tot een succesvolle activering van het pand. Deze vergoeding wordt uitgekeerd nadat het project daadwerkelijk is gestart en de bewoning is gerealiseerd.'
  },
  {
    id: '5',
    icon: <Home size={20} />,
    question: 'Wat gebeurt er na het melden van leegstand?',
    answer: 'Na uw melding analyseren wij de situatie binnen 2-4 weken. We controleren de eigendomssituatie en beoordelen de mogelijkheden voor activering. Bij een geschikte melding nemen we contact op met de eigenaar om een plan te bespreken voor verhuur, renovatie of herbestemming.'
  },
  {
    id: '6',
    icon: <Building size={20} />,
    question: 'Welke type panden kunnen worden gemeld?',
    answer: 'Alle soorten vastgoed kunnen worden gemeld: woningen, appartementen, winkelpanden, kantoren, bedrijfsruimtes, en zelfs grond. Zolang het pand leegstaat en potentieel heeft voor bewoning of herbestemming, nemen wij de melding in behandeling.'
  }
]

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if mobile menu is open by looking for the mobile menu element
    const checkMobileMenu = () => {
      const mobileMenu = document.querySelector('[data-mobile-menu="true"]')
      setIsMobileMenuOpen(!!mobileMenu)
    }

    // Check initially and on mutations
    checkMobileMenu()
    const observer = new MutationObserver(checkMobileMenu)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Hide widget when mobile menu is open
  if (isMobileMenuOpen) {
    return null
  }

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/31641375900?text=Hallo%20Leegstandmeldpunt,%20ik%20heb%20een%20vraag%20over%20leegstand%20of%20vastgoed.%20Kunt%20u%20mij%20helpen?"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#25D366',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 20px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
          zIndex: 999,
          transition: 'all 0.2s',
          textDecoration: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#128C7E'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#25D366'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        WhatsApp
      </a>

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 20px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)',
            zIndex: 999,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <MessageCircle size={20} />
          Hulp nodig?
        </button>
      )}

      {/* Help Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '420px',
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: '80vh',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageCircle size={22} />
              <span style={{ fontSize: '18px', fontWeight: '600' }}>Hulp nodig?</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px'
              }}
            >
              Verkleinen
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            <h3 style={{ 
              fontSize: '17px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              Waarover wilt u meer informatie?
            </h3>

            {/* FAQ List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqData.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#2563eb',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '1.4'
                    }}
                  >
                    <span style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }}>
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.question}</span>
                    {expandedId === item.id ? (
                      <ChevronUp size={16} style={{ flexShrink: 0, color: '#9ca3af' }} />
                    ) : (
                      <ChevronDown size={16} style={{ flexShrink: 0, color: '#9ca3af' }} />
                    )}
                  </button>
                  
                  {expandedId === item.id && (
                    <div
                      style={{
                        padding: '0 0 16px 32px',
                        color: '#4b5563',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        animation: 'slideDown 0.2s ease'
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div
              style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: '#eff6ff',
                borderRadius: '10px',
                border: '1px solid #dbeafe'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Phone size={20} style={{ color: '#2563eb' }} />
                <span style={{ fontWeight: '600', color: '#1e40af', fontSize: '15px' }}>
                  Komt u er niet uit?
                </span>
              </div>
              <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
                Neem direct contact met ons op. We helpen u graag persoonlijk met uw vragen over leegstand of vastgoed.
              </p>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                }}
              >
                <Mail size={16} />
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default HelpWidget

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const CookieConsent = () => {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#0f172a',
      borderTop: '2px solid var(--accent-primary)',
      padding: '1rem 1.5rem',
      zIndex: 9999,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h3 style={{ 
            color: 'white', 
            fontSize: '0.95rem', 
            fontWeight: '600', 
            margin: '0 0 0.25rem 0' 
          }}>
            Cookies
          </h3>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '0.8rem', 
            lineHeight: '1.5',
            margin: 0 
          }}>
            {t.cookieText || 'Wij gebruiken cookies om uw ervaring op onze website te verbeteren. Door op "Accepteren" te klikken, gaat u akkoord met ons gebruik van cookies.'}
          </p>
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem',
          flexShrink: 0 
        }}>
          <button
            onClick={handleDecline}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid #475569',
              borderRadius: '6px',
              color: '#94a3b8',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#64748b'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#475569'
              e.currentTarget.style.color = '#94a3b8'
            }}
          >
            {t.cookieDecline || 'Weigeren'}
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--accent-primary)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '0.85rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#059669'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)'
            }}
          >
            {t.cookieAccept || 'Accepteren'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent

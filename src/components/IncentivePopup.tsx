import React, { useState, useEffect } from 'react'
import { X, Euro, FileText, Clock, CheckCircle } from 'lucide-react'

interface IncentivePopupProps {
  onClose: () => void
}

const IncentivePopup: React.FC<IncentivePopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if popup was already shown
    const hasSeenPopup = localStorage.getItem('incentive_popup_seen')
    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
        localStorage.setItem('incentive_popup_seen', 'true')
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleReportClick = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
    // Navigate to report page
    window.location.href = '/melden'
  }

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 71, 171, 0.15), 0 0 0 1px rgba(0, 71, 171, 0.1)',
        animation: 'slideInUp 0.4s ease-out'
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <X size={18} color="#475569" />
        </button>

        {/* €100 Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(255, 165, 0, 0.4), inset 0 -4px 10px rgba(0,0,0,0.1)',
            border: '4px solid #fff',
            transform: 'rotate(-5deg)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <Euro size={28} style={{ color: '#0047AB', marginBottom: '4px' }} />
            <span style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#0047AB',
              textShadow: '0 1px 2px rgba(255,255,255,0.5)'
            }}>€100</span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: '600',
              color: '#0047AB',
              textAlign: 'center',
              lineHeight: 1.2
            }}>VERGOEDING</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '1rem',
            lineHeight: '1.3'
          }}>
            Meld Leegstand en Ontvang €100!
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#475569',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            Help ons leegstand aan te pakken en ontvang een eenmalige vergoeding van €100 
            voor elke succesvolle melding die leidt tot een project.
          </p>
        </div>

        {/* Benefits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#e6f0ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <FileText size={18} style={{ color: '#0047AB' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
              Snel Melden
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#e6f0ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <Clock size={18} style={{ color: '#0047AB' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
              2-4 Weken
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#e6f0ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <CheckCircle size={18} style={{ color: '#0047AB' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
              Zeker Uitbetaald
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleReportClick}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #0047AB 0%, #0056b3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 71, 171, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 71, 171, 0.4)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 71, 171, 0.3)'
          }}
        >
          <FileText size={20} />
          Direct Leegstand Melden
        </button>

        {/* Small Text */}
        <p style={{
          fontSize: '0.75rem',
          color: '#94a3b8',
          textAlign: 'center',
          marginTop: '1rem',
          lineHeight: '1.4'
        }}>
          Uitbetaling binnen 2-4 weken na projectstart. 
          <br />
          Deze popup wordt slechts één keer getoond.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: rotate(-5deg) scale(1);
          }
          50% {
            transform: rotate(-5deg) scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}

export default IncentivePopup

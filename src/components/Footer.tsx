import { useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, Shield, FileText, Building } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleNavClick = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{ 
      background: '#0f172a', 
      color: 'white',
      borderTop: '4px solid var(--accent-primary)',
      padding: '3rem 0 1.5rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Main Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--accent-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building size={16} color="white" />
              </div>
              <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Leegstandmeldpunt</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
              {t.footerDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'white' }}>{t.quickLinks}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/melden')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer' }}>{t.reportVacancy}</a>
              </li>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/dashboard')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer' }}>{t.dashboard}</a>
              </li>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/over-ons')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer' }}>{t.about}</a>
              </li>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/diensten')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer' }}>{t.services}</a>
              </li>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/contact')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer' }}>{t.contact}</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'white' }}>{t.contactData}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="tel:+310XXXXXXXX" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', textDecoration: 'none' }}>
                  <Phone size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  +31 (0) XX XXX XXXX
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="mailto:info@voorbeeld.nl" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', textDecoration: 'none' }}>
                  <Mail size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  info@voorbeeld.nl
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="https://www.google.com/maps/search/Fultonstraat+2,+2562+XH+'s-Gravenhage" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', textDecoration: 'none' }}>
                  <MapPin size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  Fultonstraat 2, 2562 XH 's-Gravenhage
                </a>
              </li>
              <li style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                KVK: XXXXXXXX
              </li>
              <li style={{ color: '#64748b', fontSize: '0.75rem' }}>
                BTW: NLXXXXXXXXXXB01
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'white' }}>{t.legalPolicy}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/privacy')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <Shield size={14} /> {t.privacy}
                </a>
              </li>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/algemene-voorwaarden')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <FileText size={14} /> {t.terms}
                </a>
              </li>
              <li style={{ marginBottom: '0.4rem' }}>
                <a onClick={() => handleNavClick('/avg-compliance')} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <Shield size={14} /> {t.gdprCompliance}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
            &copy; 2026 Leegstandmeldpunt - {t.rights}
          </span>
          <span style={{ color: '#475569', fontSize: '0.75rem' }}>
            Medemogelijk gemaakt door <a href="https://www.varexo.nl" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>Varexo</a>
          </span>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '1rem', background: '#1e293b', padding: '0.75rem 1rem', borderRadius: '6px' }}>
          <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
            <strong>{t.disclaimerTitle}</strong> {t.disclaimerText}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

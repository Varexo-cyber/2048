import { Link } from 'react-router-dom'
import { Home, Mail, Phone, MapPin, Shield, Users, FileText, BarChart3 } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{ 
      background: 'var(--neutral-900)', 
      color: 'white',
      borderTop: '4px solid var(--accent-primary)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'var(--accent-primary)', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold block">Leegstandsloket</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--accent-primary)' }}>Rijksoverheid</span>
              </div>
            </div>
            <p style={{ color: 'var(--neutral-300)', marginBottom: '1.5rem', maxWidth: 'md', lineHeight: '1.6' }}>
              Officieel leegstandsloket van de Nederlandse overheid. Samen tegen leegstand, voor meer woningen. 
              Wij maken leegstaand vastgoed zichtbaar en activeren het voor bewoning, zodat buurten niet in verval raken 
              en we het woningtekort aanpakken.
            </p>
            
            {/* Official Information */}
            <div style={{ 
              background: 'var(--neutral-800)', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1.5rem',
              border: '1px solid var(--neutral-700)'
            }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>🏛️ Officiële Gegevens</h4>
              <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: 'var(--neutral-300)' }}>
                <div><strong>KVK:</strong> 12345678</div>
                <div><strong>BTW:</strong> NL123456789B01</div>
                <div><strong>Vestiging:</strong> Herengracht 123, 1016 BA Amsterdam</div>
                <div><strong>Directie:</strong> Ministerie van Binnenlandse Zaken</div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="mailto:info@leegstandsloket.nl" style={{ color: 'var(--neutral-300)', transition: 'color 0.2s' }}>
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+31201234567" style={{ color: 'var(--neutral-300)', transition: 'color 0.2s' }}>
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Dienstverlening</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/melden" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <FileText className="w-4 h-4 inline mr-2" />
                  Leegstand Melden
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/dashboard" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <BarChart3 className="w-4 h-4 inline mr-2" />
                  Dashboard
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/over-ons" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <Users className="w-4 h-4 inline mr-2" />
                  Over Ons
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/contact" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Government */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Wetgeving & Beleid</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <Shield className="w-4 h-4 inline mr-2" />
                  Privacybeleid
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <FileText className="w-4 h-4 inline mr-2" />
                  Algemene Voorwaarden
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <Shield className="w-4 h-4 inline mr-2" />
                  AVG Compliance
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Beleidsdocumenten
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid var(--neutral-700)', 
          marginTop: '2rem', 
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--neutral-400)' }}>
              © 2024 Leegstandsloket - Rijksoverheid | Alle rechten voorbehouden
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--neutral-400)' }}>
              🏛️ Officiële overheidsdienst | Nederland
            </div>
          </div>
          
          {/* Government Badges */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem',
            flexWrap: 'wrap',
            fontSize: '0.75rem',
            color: 'var(--neutral-500)'
          }}>
            <span>🔐 Beveiligde verbinding</span>
            <span>✅ Gecertificeerd</span>
            <span>🏛️ Rijksoverheid</span>
            <span>🇳🇱 Nederland</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Home, FileText, Users, Phone, LogIn, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import UserDropdown from './UserDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import Login from './Login'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()

  const handleNavClick = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navigation = [
    { name: t.home, href: '/', icon: Home },
    { name: t.reportVacancy, href: '/melden', icon: FileText },
    { name: t.services, href: '/diensten', icon: Star },
    { name: t.about, href: '/over-ons', icon: Users },
    { name: t.contact, href: '/contact', icon: Phone },
  ]

  return (
    <>
      <nav style={{ 
        background: 'var(--bg-primary)', 
        boxShadow: 'var(--shadow-md)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000,
        borderBottom: '2px solid var(--accent-primary)',
        width: '100%'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: isMobile ? '64px' : '80px',
          gap: isMobile ? '1rem' : '1.5rem'
        }}>
          {/* Logo */}
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '0.5rem' : '0.75rem', 
            textDecoration: 'none', 
            flexShrink: 0 
          }}>
            <div style={{ 
              width: isMobile ? '40px' : '44px', 
              height: isMobile ? '40px' : '44px', 
              background: 'var(--accent-primary)', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              flexShrink: 0
            }}>
              <Home size={isMobile ? 24 : 26} style={{ color: 'white' }} />
            </div>
            <span style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              fontWeight: '700', 
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap'
            }}>
              Leegstandmeldpunt
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          {!isMobile && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              flex: 1, 
              justifyContent: 'center' 
            }}>
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      background: isActive ? 'var(--accent-primary-light)' : 'transparent',
                      border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={16} />
                    {item.name}
                  </button>
                )
              })}
            </div>
          )}

          {/* Auth & Controls */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '0.5rem' : '0.75rem', 
            flexShrink: 0 
          }}>
            {!isMobile && <LanguageSwitcher />}
            {!isMobile && <ThemeToggle />}
            {!isMobile && (isAuthenticated ? (
              <UserDropdown />
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                <LogIn size={18} />
                {t.login}
              </button>
            ))}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  background: isMenuOpen ? 'var(--accent-primary-light)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
                aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div 
          data-mobile-menu="true"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-primary)',
            zIndex: 999,
            padding: '1.5rem 1rem',
            overflowY: 'auto',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {/* Mobile Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                    background: isActive ? 'var(--accent-primary-light)' : 'transparent',
                    border: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <Icon size={24} />
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* Mobile Language & Theme */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            padding: '1rem 0',
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{t.language}</span>
              <LanguageSwitcher />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{t.theme}</span>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Login */}
          {!isAuthenticated && (
            <button
              onClick={() => {
                setIsMenuOpen(false)
                setShowLogin(true)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1.125rem',
                width: '100%'
              }}
            >
              <LogIn size={24} />
              {t.login}
            </button>
          )}

          {isAuthenticated && (
            <div style={{ padding: '1rem 0' }}>
              <UserDropdown />
            </div>
          )}
        </div>
      )}
      
      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

export default Navbar

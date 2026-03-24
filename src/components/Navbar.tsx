import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Home, FileText, Users, Phone, LogIn } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import UserDropdown from './UserDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import Login from './Login'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Leegstand Melden', href: '/melden', icon: FileText },
    { name: 'Over Ons', href: '/over-ons', icon: Users },
    { name: 'Contact', href: '/contact', icon: Phone },
  ]

  return (
    <nav style={{ 
      background: 'var(--bg-primary)', 
      boxShadow: 'var(--shadow-md)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      borderBottom: '2px solid var(--accent-primary)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        gap: '3rem'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'var(--accent-primary)', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Home size={28} style={{ color: 'white' }} />
          </div>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap'
          }}>
            Leegstandmeldpunt
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center' }}>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--accent-primary-light)' : 'transparent',
                    border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--accent-primary)'
                      e.currentTarget.style.background = 'var(--accent-primary-light)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              )
            })}
        </div>

        {/* Auth & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <LanguageSwitcher />
            <ThemeToggle />
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-primary)'}
              >
                <LogIn size={20} />
                Inloggen
              </button>
            )}
        </div>
      </div>

      {/* Mobile menu button */}
      <div style={{ display: 'none' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-700 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
      </div>

      {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
        </div>
      )}
      
      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </nav>
  )
}

export default Navbar

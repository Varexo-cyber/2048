import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Settings, Shield, LogOut, ChevronDown } from 'lucide-react'

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--accent-primary-light)',
          border: '1px solid var(--accent-primary)',
          borderRadius: '8px',
          color: 'var(--accent-primary)',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '0.875rem',
          transition: 'all 0.2s'
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          background: 'var(--accent-primary)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <User size={18} />
        </div>
        <span>{user.username}</span>
        <ChevronDown size={16} style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: 0,
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          minWidth: '200px',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
          }}>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              {user.username}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {user.email}
            </div>
            {isAdmin && (
              <div style={{
                marginTop: '0.25rem',
                display: 'inline-block',
                padding: '0.125rem 0.5rem',
                background: 'var(--accent-secondary)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.625rem',
                fontWeight: '600'
              }}>
                ADMIN
              </div>
            )}
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            <button
              onClick={() => handleNavigation('/profiel')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                transition: 'background 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Settings size={18} />
              <span>Profiel</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNavigation('/portaal')}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  transition: 'background 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Shield size={18} />
                <span>Portaal</span>
              </button>
            )}

            <div style={{ 
              height: '1px', 
              background: 'var(--border-color)', 
              margin: '0.5rem 0' 
            }} />

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                color: 'var(--accent-danger)',
                fontSize: '0.875rem',
                transition: 'background 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-danger-light)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={18} />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown

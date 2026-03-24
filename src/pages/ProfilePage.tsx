import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Phone, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react'

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth()
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(email, phone)
    setMessage({ type: 'success', text: 'Profiel succesvol bijgewerkt!' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Nieuwe wachtwoorden komen niet overeen' })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Wachtwoord moet minimaal 6 tekens zijn' })
      return
    }

    const success = changePassword(oldPassword, newPassword)
    if (success) {
      setMessage({ type: 'success', text: 'Wachtwoord succesvol gewijzigd!' })
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setMessage(null), 3000)
    } else {
      setMessage({ type: 'error', text: 'Huidig wachtwoord is onjuist' })
    }
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Gelieve in te loggen om uw profiel te bekijken</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Mijn Profiel
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Beheer uw persoonlijke gegevens en beveiligingsinstellingen
        </p>

        {message && (
          <div style={{
            background: message.type === 'success' ? 'var(--accent-secondary-light)' : 'var(--accent-danger-light)',
            border: `1px solid ${message.type === 'success' ? 'var(--accent-secondary)' : 'var(--accent-danger)'}`,
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            {message.type === 'success' ? (
              <CheckCircle size={20} color="var(--accent-secondary)" />
            ) : (
              <AlertCircle size={20} color="var(--accent-danger)" />
            )}
            <span style={{ 
              color: message.type === 'success' ? 'var(--accent-secondary)' : 'var(--accent-danger)',
              fontWeight: '500'
            }}>
              {message.text}
            </span>
          </div>
        )}

        {/* Profile Information */}
        <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'var(--accent-primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <User size={30} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {user.username}
              </h2>
              <span style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                background: user.role === 'admin' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {user.role === 'admin' ? 'ADMINISTRATOR' : 'GEBRUIKER'}
              </span>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}>
                <Mail size={18} />
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-primary)'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}>
                <Phone size={18} />
                Telefoonnummer
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-primary)'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.875rem 2rem',
                background: 'var(--accent-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                alignSelf: 'flex-start'
              }}
            >
              <Save size={20} />
              Profiel Opslaan
            </button>
          </form>
        </div>

        {/* Password Change */}
        <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={24} />
            Wachtwoord Wijzigen
          </h3>

          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}>
                Huidig Wachtwoord
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Voer uw huidige wachtwoord in"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-primary)'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}>
                Nieuw Wachtwoord
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Voer uw nieuwe wachtwoord in"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-primary)'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}>
                Bevestig Nieuw Wachtwoord
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Bevestig uw nieuwe wachtwoord"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-primary)'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.875rem 2rem',
                background: 'var(--accent-secondary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                alignSelf: 'flex-start'
              }}
            >
              <Lock size={20} />
              Wachtwoord Wijzigen
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

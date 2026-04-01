import { useAuth } from '../contexts/AuthContext'
import { Shield, AlertTriangle, CheckCircle, Clock, MapPin, Building, Calculator, BarChart3, Mail, MessageSquare, Trash2, Reply } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import VastgoedCalculatorPage from './VastgoedCalculatorPage'
import MailboxPage from './MailboxPage'

interface Attachment {
  name: string
  type: string
  data: string
}

interface Melding {
  id: number
  address: string
  postalCode?: string
  city?: string
  type: string
  status: string
  date: string
  urgent: boolean
  reportType?: string
  reporterName?: string
  reporterEmail?: string
  reporterPhone?: string
  vacancyDuration?: string
  description?: string
  gpsLocation?: { lat: number; lng: number }
  attachments?: Attachment[]
  createdAt?: string
}

const PortaalPage = () => {
  const { isAdmin, user } = useAuth()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calculator' | 'mailbox' | 'berichten'>('dashboard')
  const [meldingen, setMeldingen] = useState<Melding[]>([])
  const [selectedMelding, setSelectedMelding] = useState<Melding | null>(null)
  const [berichten, setBerichten] = useState<any[]>([])
  const [selectedBericht, setSelectedBericht] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait a moment for auth to initialize from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/')
    }
  }, [isAdmin, isLoading, navigate])

  // Load meldingen and berichten from localStorage
  useEffect(() => {
    const loadData = () => {
      setMeldingen(JSON.parse(localStorage.getItem('leegstand_meldingen') || '[]'))
      setBerichten(JSON.parse(localStorage.getItem('contact_berichten') || '[]'))
    }
    loadData()
    const interval = setInterval(loadData, 2000)
    return () => clearInterval(interval)
  }, [])

  // Update melding status
  const updateStatus = (id: number, newStatus: string) => {
    const updated = meldingen.map(m => m.id === id ? { ...m, status: newStatus } : m)
    setMeldingen(updated)
    localStorage.setItem('leegstand_meldingen', JSON.stringify(updated))
    if (selectedMelding?.id === id) setSelectedMelding({ ...selectedMelding, status: newStatus })
  }

  // Toggle urgent
  const toggleUrgent = (id: number) => {
    const updated = meldingen.map(m => m.id === id ? { ...m, urgent: !m.urgent } : m)
    setMeldingen(updated)
    localStorage.setItem('leegstand_meldingen', JSON.stringify(updated))
    const m = updated.find(m => m.id === id)
    if (selectedMelding?.id === id && m) setSelectedMelding(m)
  }

  // Delete melding
  const deleteMelding = (id: number) => {
    const updated = meldingen.filter(m => m.id !== id)
    setMeldingen(updated)
    localStorage.setItem('leegstand_meldingen', JSON.stringify(updated))
    if (selectedMelding?.id === id) setSelectedMelding(null)
  }

  // Mark bericht as read
  const markBerichtRead = (id: number) => {
    const updated = berichten.map(b => b.id === id ? { ...b, read: true } : b)
    setBerichten(updated)
    localStorage.setItem('contact_berichten', JSON.stringify(updated))
  }

  // Delete bericht
  const deleteBericht = (id: number) => {
    const updated = berichten.filter(b => b.id !== id)
    setBerichten(updated)
    localStorage.setItem('contact_berichten', JSON.stringify(updated))
    if (selectedBericht?.id === id) setSelectedBericht(null)
  }

  // Reply to bericht via mailto
  const replyToBericht = (bericht: any) => {
    const subject = encodeURIComponent(`Re: ${bericht.subject}`)
    const body = encodeURIComponent(`\n\n--- Origineel bericht ---\nVan: ${bericht.name} (${bericht.email})\nDatum: ${bericht.date} ${bericht.time}\nOnderwerp: ${bericht.subject}\n\n${bericht.message}`)
    window.open(`mailto:${bericht.email}?subject=${subject}&body=${body}`, '_blank')
  }

  if (!isAdmin || !user) {
    return null
  }

  const totalMeldingen = meldingen.length
  const inBehandeling = meldingen.filter(m => m.status === t.inProgress || m.status === 'In Behandeling').length
  const afgehandeld = meldingen.filter(m => m.status === t.completed || m.status === 'Afgehandeld').length
  const urgent = meldingen.filter(m => m.urgent).length

  const stats = [
    { label: t.totalReports || 'Totaal Meldingen', value: String(totalMeldingen), icon: Building, color: 'var(--accent-primary)' },
    { label: t.inProgress || 'In Behandeling', value: String(inBehandeling), icon: Clock, color: 'var(--accent-secondary)' },
    { label: t.completed || 'Afgehandeld', value: String(afgehandeld), icon: CheckCircle, color: 'var(--accent-secondary)' },
    { label: t.urgent || 'Urgent', value: String(urgent), icon: AlertTriangle, color: 'var(--accent-danger)' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nieuw':
        return 'var(--accent-primary)'
      case 'In Behandeling':
        return 'var(--accent-secondary)'
      case 'Afgehandeld':
        return 'var(--neutral-500)'
      default:
        return 'var(--text-secondary)'
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'var(--accent-primary)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={28} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {t.adminPortal || 'Admin Portaal'}
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                {t.welcomeBack || 'Welkom terug'}, {user.username}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            borderBottom: '2px solid var(--border)', 
            marginTop: '2rem',
            overflowX: 'auto',
            flexWrap: 'nowrap',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'dashboard' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'dashboard' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: activeTab === 'dashboard' ? '3px solid var(--accent-primary)' : '3px solid transparent',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'dashboard') {
                  e.currentTarget.style.background = 'var(--bg-primary)'
                  e.currentTarget.style.color = 'var(--accent-primary)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'dashboard') {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <BarChart3 size={20} />
              {t.dashboard}
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'calculator' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'calculator' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: activeTab === 'calculator' ? '3px solid var(--accent-primary)' : '3px solid transparent',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'calculator') {
                  e.currentTarget.style.background = 'var(--bg-primary)'
                  e.currentTarget.style.color = 'var(--accent-primary)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'calculator') {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <Calculator size={20} />
              {t.propertyCalculator || 'Vastgoed Calculator'}
            </button>
            <button
              onClick={() => setActiveTab('mailbox')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'mailbox' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'mailbox' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: activeTab === 'mailbox' ? '3px solid var(--accent-primary)' : '3px solid transparent',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'mailbox') {
                  e.currentTarget.style.background = 'var(--bg-primary)'
                  e.currentTarget.style.color = 'var(--accent-primary)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'mailbox') {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <Mail size={20} />
              {t.mailbox || 'Mailbox'}
            </button>
            <button
              onClick={() => setActiveTab('berichten')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'berichten' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'berichten' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: activeTab === 'berichten' ? '3px solid var(--accent-primary)' : '3px solid transparent',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'berichten') {
                  e.currentTarget.style.background = 'var(--bg-primary)'
                  e.currentTarget.style.color = 'var(--accent-primary)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'berichten') {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <MessageSquare size={20} />
              {t.messages || 'Berichten'}
              {berichten.filter(b => !b.read).length > 0 && (
                <span style={{ background: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: '700', padding: '0.1rem 0.4rem', borderRadius: '10px', minWidth: '18px', textAlign: 'center' }}>
                  {berichten.filter(b => !b.read).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `${stat.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={28} color={stat.color} />
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Melding Detail */}
        {selectedMelding && (
          <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                Melding Details
              </h2>
              <button onClick={() => setSelectedMelding(null)} style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                ✕ Sluiten
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>ADRES</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{selectedMelding.address}</p>
                
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>POSTCODE</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedMelding.postalCode || 'Niet verstrekt'}</p>
                
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>PLAATS</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedMelding.city || 'Niet verstrekt'}</p>
                
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>TYPE VASTGOED</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedMelding.type}</p>
                
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>DUUR LEEGSTAND</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedMelding.vacancyDuration || 'Niet opgegeven'}</p>
                
                {selectedMelding.gpsLocation && (
                  <>
                    <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>GPS LOCATIE</p>
                    <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                      📍 {selectedMelding.gpsLocation.lat.toFixed(6)}, {selectedMelding.gpsLocation.lng.toFixed(6)}
                      <br />
                      <a 
                        href={`https://www.google.com/maps?q=${selectedMelding.gpsLocation.lat},${selectedMelding.gpsLocation.lng}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}
                      >
                        Bekijk op Google Maps →
                      </a>
                    </p>
                  </>
                )}
              </div>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>MELDER</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedMelding.reporterName || 'Anoniem'}</p>
                
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>EMAIL</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedMelding.reporterEmail || 'Niet opgegeven'}</p>
                
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>TELEFOON</p>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedMelding.reporterPhone || 'Niet opgegeven'}</p>
              </div>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>BESCHRIJVING</p>
              <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)', lineHeight: '1.6', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                {selectedMelding.description || 'Geen beschrijving'}
              </p>
            </div>
            {/* Attachments */}
            {selectedMelding.attachments && selectedMelding.attachments.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>BIJLAGEN ({selectedMelding.attachments.length})</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {selectedMelding.attachments.map((att, idx) => (
                    <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', maxWidth: '200px' }}>
                      {att.type.startsWith('image/') ? (
                        <a href={att.data} target="_blank" rel="noopener noreferrer">
                          <img src={att.data} alt={att.name} style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', display: 'block' }} />
                        </a>
                      ) : (
                        <a href={att.data} download={att.name} style={{ display: 'block', padding: '1rem', textDecoration: 'none', color: 'var(--accent-primary)', fontWeight: '500', fontSize: '0.85rem' }}>
                          📎 {att.name}
                        </a>
                      )}
                      <p style={{ margin: 0, padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {att.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <select
                value={selectedMelding.status}
                onChange={(e) => updateStatus(selectedMelding.id, e.target.value)}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <option value="Nieuw">Nieuw</option>
                <option value="In Behandeling">In Behandeling</option>
                <option value="Afgehandeld">Afgehandeld</option>
              </select>
              <button onClick={() => toggleUrgent(selectedMelding.id)} style={{ padding: '0.5rem 1rem', background: selectedMelding.urgent ? 'var(--accent-danger)' : 'var(--bg-secondary)', color: selectedMelding.urgent ? 'white' : 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertTriangle size={14} />
                {selectedMelding.urgent ? 'Urgent' : 'Markeer Urgent'}
              </button>
              <button onClick={() => deleteMelding(selectedMelding.id)} style={{ padding: '0.5rem 1rem', background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                Verwijderen
              </button>
            </div>
          </div>
        )}

        {/* Recent Reports */}
        <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {meldingen.length > 0 ? 'Alle Meldingen' : 'Geen Meldingen'}
          </h2>

          {meldingen.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <Building size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Nog geen meldingen ontvangen</p>
              <p style={{ fontSize: '0.9rem' }}>Meldingen die via "Leegstand Melden" worden ingediend verschijnen hier</p>
            </div>
          ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.875rem' }}>
                    ADRES
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.875rem' }}>
                    TYPE
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.875rem' }}>
                    STATUS
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.875rem' }}>
                    DATUM
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.875rem' }}>
                    URGENT
                  </th>
                </tr>
              </thead>
              <tbody>
                  {meldingen.map((report) => (
                  <tr 
                    key={report.id}
                    onClick={() => setSelectedMelding(report)}
                    style={{ 
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s',
                      cursor: 'pointer',
                      background: selectedMelding?.id === report.id ? 'var(--accent-primary-light)' : 'transparent',
                      display: 'table-row'
                    }}
                    onMouseEnter={(e) => { if (selectedMelding?.id !== report.id) e.currentTarget.style.background = 'var(--bg-secondary)' }}
                    onMouseLeave={(e) => { if (selectedMelding?.id !== report.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={16} color="var(--text-secondary)" />
                        <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                          {report.address}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {report.type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: `${getStatusColor(report.status)}20`,
                        color: getStatusColor(report.status),
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {report.date}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {report.urgent ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          background: 'var(--accent-danger-light)',
                          color: 'var(--accent-danger)',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          <AlertTriangle size={14} />
                          Urgent
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <VastgoedCalculatorPage />
        )}

        {/* Mailbox Tab */}
        {activeTab === 'mailbox' && (
          <MailboxPage />
        )}

        {/* Berichten Tab */}
        {activeTab === 'berichten' && (
          <div>
            {/* Berichten Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--accent-primary)20', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={24} color="var(--accent-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>{berichten.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Totaal Berichten</div>
                </div>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: '#ef444420', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={24} color="#ef4444" />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>{berichten.filter(b => !b.read).length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ongelezen</div>
                </div>
              </div>
            </div>

            {/* Selected Bericht Detail */}
            {selectedBericht && (
              <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                    {selectedBericht.subject}
                  </h2>
                  <button onClick={() => setSelectedBericht(null)} style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Sluiten
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>NAAM</p>
                    <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{selectedBericht.name}</p>
                    <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>EMAIL</p>
                    <p style={{ margin: '0 0 1rem', color: 'var(--accent-primary)', fontWeight: '500' }}>{selectedBericht.email}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>CATEGORIE</p>
                    <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedBericht.category}</p>
                    <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>DATUM</p>
                    <p style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>{selectedBericht.date} om {selectedBericht.time}</p>
                  </div>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>BERICHT</p>
                  <p style={{ margin: '0 0 1.5rem', color: 'var(--text-primary)', lineHeight: '1.7', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                    {selectedBericht.message}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => replyToBericht(selectedBericht)} style={{ padding: '0.75rem 1.5rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Reply size={16} /> Beantwoorden via E-mail
                  </button>
                  <button onClick={() => deleteBericht(selectedBericht.id)} style={{ padding: '0.75rem 1.5rem', background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trash2 size={16} /> Verwijderen
                  </button>
                </div>
              </div>
            )}

            {/* Berichten List */}
            <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                {berichten.length > 0 ? 'Alle Berichten' : 'Geen Berichten'}
              </h2>
              {berichten.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
                  <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Nog geen berichten ontvangen</p>
                  <p style={{ fontSize: '0.9rem' }}>Berichten die via het contactformulier worden verstuurd verschijnen hier</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {berichten.map(bericht => (
                    <div
                      key={bericht.id}
                      onClick={() => { setSelectedBericht(bericht); markBerichtRead(bericht.id) }}
                      style={{
                        padding: '1rem 1.25rem',
                        borderBottom: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        background: selectedBericht?.id === bericht.id ? 'var(--accent-primary-light)' : bericht.read ? 'transparent' : 'var(--accent-primary-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={e => { if (selectedBericht?.id !== bericht.id) e.currentTarget.style.background = 'var(--bg-secondary)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = selectedBericht?.id === bericht.id ? 'var(--accent-primary-light)' : bericht.read ? 'transparent' : 'var(--accent-primary-light)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: bericht.read ? '400' : '700', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{bericht.name}</p>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{bericht.email}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                          <span style={{ padding: '0.2rem 0.5rem', background: `${bericht.category === 'Samenwerking' ? 'var(--accent-secondary)' : 'var(--accent-primary)'}20`, color: bericht.category === 'Samenwerking' ? 'var(--accent-secondary)' : 'var(--accent-primary)', fontSize: '0.7rem', fontWeight: '600', borderRadius: '4px' }}>{bericht.category}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{bericht.date}</span>
                          {!bericht.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: 0 }} />}
                        </div>
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <span style={{ fontWeight: bericht.read ? '400' : '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{bericht.subject}</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}> — {bericht.message.substring(0, 60)}{bericht.message.length > 60 ? '...' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PortaalPage

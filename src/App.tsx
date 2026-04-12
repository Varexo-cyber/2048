import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  FileText, 
  Users, 
  Phone, 
  MapPin, 
  Building, 
  Shield, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Mail,
  Euro
} from 'lucide-react'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import ProfilePage from './pages/ProfilePage'
import PortaalPage from './pages/PortaalPage'
import ServicesPage from './pages/ServicesPage'
import Toast from './components/Toast'
import HelpWidget from './components/HelpWidget'
import IncentivePopup from './components/IncentivePopup'
import CookieConsent from './components/CookieConsent'
import { addMelding, initDatabase } from './services/neonDatabase'

const HomePage = () => {
  const { t } = useLanguage()
  const [openInfo, setOpenInfo] = useState<number | null>(null)
  
  const stats = [
    { number: "220.000+", label: t.vacantHomes, icon: Building, info: "In 2022 telde Nederland nog ruim 220.000 leegstaande woningen.", source: "CBS – Landelijke Monitor Leegstand", sourceUrl: "https://dashboards.cbs.nl/landelijke_monitor_leegstand/" },
    { number: "420.000", label: t.housingShortage, icon: TrendingUp, info: "Ongeveer 420.000 mensen zijn op zoek naar een woning die er niet is — het woningtekort blijft groeiend.", source: "CBS – Woningtekort", sourceUrl: "https://www.cbs.nl/nl-nl/cijfers/detail/86079NED?q=woning%20tekort%20" },
    { number: "24/7", label: t.reportingPoint, icon: Shield },
    { number: "50+", label: t.municipalities, icon: MapPin },
  ]

  const features = [
    {
      icon: Shield,
      title: t.discretion,
      description: t.discretionDesc
    },
    {
      icon: Users,
      title: t.expertise,
      description: t.expertiseDesc
    },
    {
      icon: TrendingUp,
      title: t.resultOriented,
      description: t.resultOrientedDesc
    },
    {
      icon: Building,
      title: t.propertyOwnerHelp,
      description: t.propertyOwnerHelpDesc
    },
    {
      icon: Euro,
      title: t.reward100,
      description: t.reward100Desc
    }
  ]

  const steps = [
    {
      step: 1,
      title: t.step1Title,
      description: t.step1Desc
    },
    {
      step: 2,
      title: t.step2Title,
      description: t.step2Desc
    },
    {
      step: 3,
      title: t.step3Title,
      description: t.step3Desc
    },
    {
      step: 4,
      title: t.step4Title,
      description: t.step4Desc
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          {/* €100 Badge - Hidden on mobile */}
          <div className="hero-badge">
            <span style={{
              fontSize: '2.2rem',
              fontWeight: '800',
              color: '#0047AB',
              textShadow: '0 1px 2px rgba(255,255,255,0.5)'
            }}>€100</span>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              color: '#0047AB',
              textAlign: 'center',
              lineHeight: 1.2,
              marginTop: '2px'
            }}>VERGOEDING</span>
          </div>
          <h1>
            {t.heroTitle}
            <br />
            <span>Van Leeg naar Leefbaar</span>
            <br />
            <span style={{ fontSize: '1.8rem', fontWeight: '600', opacity: 0.9, marginTop: '0.5rem', display: 'block' }}>
              Elk Pand Verdient een Kans
            </span>
          </h1>
          <p>
            {t.heroSubtitle}
          </p>
          <div className="hero-buttons">
            <Link to="/melden" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              <FileText size={22} style={{ marginRight: '8px' }} />
              {t.reportVacancyBtn}
            </Link>
            <button 
              onClick={() => {
                // Scroll to contact or open contact modal
                window.location.href = '/contact'
              }}
              className="btn btn-secondary" 
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              <Building size={22} style={{ marginRight: '8px' }} />
              {t.propertyOwnerHelp || 'Eigenaar? Neem Contact Op'}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="stat-item" style={{ position: 'relative' }}>
                    <div className="stat-icon">
                      <Icon size={24} />
                    </div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                    {stat.info && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenInfo(openInfo === index ? null : index) }}
                          style={{ marginTop: '0.5rem', background: 'none', border: '1px solid var(--border-color)', borderRadius: '50%', width: '22px', height: '22px', fontSize: '0.7rem', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', transition: 'all 0.2s' }}
                          title="Bron informatie"
                        >
                          i
                        </button>
                        {openInfo === index && (
                          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem 1rem', boxShadow: 'var(--shadow-lg)', zIndex: 50, width: '260px', textAlign: 'left' }}>
                            <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{stat.info}</p>
                            <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '600' }}>
                              {stat.source} ↗
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <ScrollReveal>
            <h2>{t.whyLeegstandsloket}</h2>
            <p className="features-subtitle">
              {t.professionalPartner}
            </p>
          </ScrollReveal>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <ScrollReveal key={index} delay={index * 120}>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="container">
          <ScrollReveal>
            <h2>{t.howItWorks}</h2>
            <p className="process-subtitle">
              {t.processSubtitle}
            </p>
          </ScrollReveal>
          <div className="process-grid">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="process-step">
                  <div className="step-number">
                    {step.step === 4 ? <CheckCircle size={20} /> : step.step}
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="container">
          <ScrollReveal>
            <h2>{t.ctaTitle}</h2>
            <p>
              {t.ctaSubtitle}
            </p>
            <div className="cta-buttons">
              <Link to="/melden" className="btn btn-primary">
                <FileText size={20} style={{ marginRight: '8px' }} />
                {t.reportVacancyCTA}
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <Phone size={20} style={{ marginRight: '8px' }} />
                {t.contactCTA}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

const ReportVacancyPage = () => {
  const { t } = useLanguage()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Property details
    address: '',
    propertyType: 'Woning',
    vacancyDuration: '',
    postalCode: '',
    city: '',
    description: '',
    
    // Reporting type
    reportType: 'anonymous', // 'anonymous' or 'named'
    
    // Personal details (only for named reporting)
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    
    // Location
    gpsLocation: null as { lat: number; lng: number } | null,
    
    // Privacy
    privacyAgreed: false,
    
    // Files
    attachments: [] as File[]
  })
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        attachments: Array.from(files) 
      }))
    }
  }
  
  const fileToBase64 = (file: File): Promise<{ name: string; type: string; data: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve({ name: file.name, type: file.type, data: reader.result as string })
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    // Required field validations
    if (!formData.address.trim()) {
      newErrors.address = 'Adres is verplicht'
    }
    if (!formData.vacancyDuration) {
      newErrors.vacancyDuration = 'Selecteer hoe lang het pand leegstaat'
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postcode is verplicht'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Plaats is verplicht'
    }
    
    // For named reports, require contact info
    if (formData.reportType === 'named') {
      if (!formData.reporterName.trim()) {
        newErrors.reporterName = 'Naam is verplicht voor een melding met contactgegevens'
      }
      if (!formData.reporterEmail.trim()) {
        newErrors.reporterEmail = 'E-mail is verplicht voor een melding met contactgegevens'
      }
    }
    
    // Privacy checkbox validation
    if (!formData.privacyAgreed) {
      newErrors.privacyAgreed = 'Je moet akkoord gaan met de privacyverklaring om door te gaan'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isSubmitting) return
    
    // Validate form first
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    
    // Lock the form
    setIsSubmitting(true)
    
    // Initialize database on first use
    try {
      await initDatabase()
    } catch (e) {
      console.log('Database already initialized or error:', e)
    }
    
    // Convert attachments to base64
    const attachmentData = await Promise.all(
      formData.attachments.map(file => fileToBase64(file))
    )
    
    // Create melding object for database
    const melding = {
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      propertyType: formData.propertyType,
      vacancyDuration: formData.vacancyDuration,
      description: formData.description,
      reporterName: formData.reporterName || 'Anoniem',
      reporterEmail: formData.reporterEmail || '',
      reporterPhone: formData.reporterPhone || '',
      reportType: formData.reportType,
      status: 'Nieuw',
      urgent: false
    }
    
    // Save to Neon database and get the ID
    let savedMeldingId = null
    try {
      const savedMelding = await addMelding(melding)
      savedMeldingId = savedMelding?.id || null
      console.log('Melding saved to database with ID:', savedMeldingId)
    } catch (error) {
      console.error('Error saving to database:', error)
      // Fallback to localStorage if database fails
      savedMeldingId = Date.now()
      const fallbackMelding = {
        id: savedMeldingId,
        ...melding,
        date: new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        attachments: attachmentData,
        gpsLocation: formData.gpsLocation
      }
      const existing = JSON.parse(localStorage.getItem('leegstand_meldingen') || '[]')
      existing.unshift(fallbackMelding)
      localStorage.setItem('leegstand_meldingen', JSON.stringify(existing))
    }
    
    // Send email via Netlify Function (background - no popup!)
    // Include the ID so the confirmation email can show the reference number
    try {
      const meldingWithId = {
        ...melding,
        id: savedMeldingId,
        date: new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' })
      }
      await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meldingWithId)
      })
    } catch (error) {
      console.log('Email not sent, but melding saved:', error)
    }
    
    setIsSubmitting(false)
    setToast({ message: t.submitSuccess, type: 'success' })
    
    // Reset form
    setFormData({
      address: '',
      propertyType: 'Woning',
      vacancyDuration: '',
      postalCode: '',
      city: '',
      description: '',
      reportType: 'anonymous',
      reporterName: '',
      reporterEmail: '',
      reporterPhone: '',
      gpsLocation: null,
      privacyAgreed: false,
      attachments: []
    })
  }
  
  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {/* Hero Section */}
      <section className="hero" style={{ padding: '4rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', textAlign: 'center' }}>
            {t.reportTitle}
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            {t.reportSubtitle}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section" style={{ padding: '4rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
          <div style={{ 
            background: 'var(--bg-primary)', 
            borderRadius: '16px', 
            padding: '3rem', 
            boxShadow: 'var(--shadow-xl)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Property Details Section */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  <Building size={20} style={{ marginRight: '8px', color: 'var(--accent-primary)' }} />
                  {t.propertyDetails}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div data-error={errors.address ? 'true' : 'false'}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600', 
                      color: errors.address ? '#dc2626' : 'var(--text-primary)',
                      fontSize: '0.95rem'
                    }}>
                      <MapPin size={16} style={{ marginRight: '6px', color: errors.address ? '#dc2626' : 'var(--accent-primary)' }} />
                      {t.addressLabel} *
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.addressPlaceholder}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem', 
                        border: errors.address ? '2px solid #dc2626' : '2px solid var(--border-color)', 
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        backgroundColor: errors.address ? '#fef2f2' : 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        transition: 'all 0.2s'
                      }}
                    />
                    {errors.address && (
                      <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '4px' }}>⚠️</span> {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem'
                    }}>
                      <Building size={16} style={{ marginRight: '6px', color: 'var(--accent-primary)' }} />
                      {t.propertyTypeLabel} *
                    </label>
                    <select 
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem', 
                        border: '2px solid var(--border-color)', 
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <option>{t.optionHome}</option>
                      <option>{t.optionApartment}</option>
                      <option>{t.optionShop}</option>
                      <option>{t.optionOffice}</option>
                      <option>{t.optionCommercial}</option>
                      <option>{t.optionOther}</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <div data-error={errors.vacancyDuration ? 'true' : 'false'}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600', 
                      color: errors.vacancyDuration ? '#dc2626' : 'var(--text-primary)',
                      fontSize: '0.95rem'
                    }}>
                      <Clock size={16} style={{ marginRight: '6px', color: errors.vacancyDuration ? '#dc2626' : 'var(--accent-primary)' }} />
                      {t.vacancyDurationLabel} *
                    </label>
                    <select 
                      value={formData.vacancyDuration}
                      onChange={(e) => handleInputChange('vacancyDuration', e.target.value)}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem', 
                        border: errors.vacancyDuration ? '2px solid #dc2626' : '2px solid var(--border-color)', 
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        backgroundColor: errors.vacancyDuration ? '#fef2f2' : 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">{t.selectDuration}</option>
                      <option value="0-3 maanden">{t.duration0to3}</option>
                      <option value="3-6 maanden">{t.duration3to6}</option>
                      <option value="6-12 maanden">{t.duration6to12}</option>
                      <option value="1-2 jaar">{t.duration1to2y}</option>
                      <option value="Meer dan 2 jaar">{t.durationOver2y}</option>
                      <option value="Ik weet het niet">{t.durationUnknown}</option>
                    </select>
                    {errors.vacancyDuration && (
                      <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '4px' }}>⚠️</span> {errors.vacancyDuration}
                      </p>
                    )}
                  </div>
                </div>

                <div data-error={errors.postalCode ? 'true' : 'false'} style={{ marginTop: '1.5rem' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.75rem', 
                    fontWeight: '600', 
                    color: errors.postalCode ? '#dc2626' : 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}>
                    <MapPin size={16} style={{ marginRight: '6px', color: errors.postalCode ? '#dc2626' : 'var(--accent-primary)' }} />
                    {t.postalCodeLabel} *
                  </label>
                  <input 
                    type="text" 
                    placeholder={t.postalCodePlaceholder}
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.875rem', 
                      border: errors.postalCode ? '2px solid #dc2626' : '2px solid var(--border-color)', 
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      backgroundColor: errors.postalCode ? '#fef2f2' : 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      transition: 'all 0.2s'
                    }}
                  />
                  {errors.postalCode && (
                    <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '4px' }}>⚠️</span> {errors.postalCode}
                    </p>
                  )}
                </div>

                <div data-error={errors.city ? 'true' : 'false'} style={{ marginTop: '1.5rem' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.75rem', 
                    fontWeight: '600', 
                    color: errors.city ? '#dc2626' : 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}>
                    <Building size={16} style={{ marginRight: '6px', color: errors.city ? '#dc2626' : 'var(--accent-primary)' }} />
                    {t.cityLabel} *
                  </label>
                  <input 
                    type="text" 
                    placeholder={t.cityPlaceholder}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.875rem', 
                      border: errors.city ? '2px solid #dc2626' : '2px solid var(--border-color)', 
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      backgroundColor: errors.city ? '#fef2f2' : 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      transition: 'all 0.2s'
                    }}
                  />
                  {errors.city && (
                    <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '4px' }}>⚠️</span> {errors.city}
                    </p>
                  )}
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.75rem', 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}>
                    <MapPin size={16} style={{ marginRight: '6px', color: 'var(--accent-primary)' }} />
                    Locatie delen (optioneel)
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            async (position) => {
                              const lat = position.coords.latitude
                              const lng = position.coords.longitude
                              handleInputChange('gpsLocation', { lat, lng })
                              
                              // Try to reverse geocode to get address
                              try {
                                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
                                const data = await response.json()
                                if (data && data.address) {
                                  const addr = data.address
                                  // Auto-fill fields if empty
                                  if (!formData.address && (addr.road || addr.house_number)) {
                                    const street = addr.road || ''
                                    const number = addr.house_number || ''
                                    handleInputChange('address', `${street} ${number}`.trim())
                                  }
                                  if (!formData.postalCode && addr.postcode) {
                                    handleInputChange('postalCode', addr.postcode)
                                  }
                                  if (!formData.city && (addr.city || addr.town || addr.village)) {
                                    handleInputChange('city', addr.city || addr.town || addr.village)
                                  }
                                  const locationText = `${addr.road || ''} ${addr.house_number || ''}, ${addr.postcode || ''} ${addr.city || addr.town || ''}`.trim()
                                  setToast({ message: `Locatie gevonden: ${locationText}`, type: 'success' })
                                } else {
                                  setToast({ message: `Locatie opgeslagen: ${lat.toFixed(4)}, ${lng.toFixed(4)}`, type: 'info' })
                                }
                              } catch (error) {
                                setToast({ message: `Locatie opgeslagen: ${lat.toFixed(4)}, ${lng.toFixed(4)}`, type: 'info' })
                              }
                            },
                            () => setToast({ message: 'Locatie niet beschikbaar. Controleer uw instellingen.', type: 'error' })
                          )
                        }
                      }}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: formData.gpsLocation ? '#10b981' : 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <MapPin size={18} />
                      {formData.gpsLocation ? 'Locatie opgeslagen' : 'Deel mijn locatie'}
                    </button>
                    
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="camera-capture"
                    />
                    <label
                      htmlFor="camera-capture"
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FileText size={18} />
                      Maak foto
                    </label>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Tip: Deel uw locatie en maak een foto van het pand, zelfs als u het exacte adres niet weet.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.75rem', 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}>
                    <FileText size={16} style={{ marginRight: '6px', color: 'var(--accent-primary)' }} />
                    {t.descriptionLabel}
                  </label>
                  <textarea 
                    rows={4}
                    placeholder={t.descriptionPlaceholder}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.875rem', 
                      border: '2px solid var(--border-color)', 
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>

              {/* Report Type Selection */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  <Shield size={20} style={{ marginRight: '8px', color: '#3b82f6' }} />
                  {t.reportTypeTitle}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <label 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem',
                      border: formData.reportType === 'anonymous' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: formData.reportType === 'anonymous' ? '#eff6ff' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="reportType" 
                      value="anonymous"
                      checked={formData.reportType === 'anonymous'}
                      onChange={(e) => handleInputChange('reportType', e.target.value)}
                      style={{ marginRight: '0.75rem' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Shield size={20} style={{ color: formData.reportType === 'anonymous' ? '#3b82f6' : '#9ca3af' }} />
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                          {t.anonymousReport}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {t.anonymousReportDesc}
                        </div>
                      </div>
                    </div>
                  </label>
                  
                  <label 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem',
                      border: formData.reportType === 'named' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: formData.reportType === 'named' ? '#eff6ff' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    {/* €100 Badge - Hidden on small mobile */}
                    <div className="reward-badge-mobile">
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '800',
                        color: '#0047AB',
                        textAlign: 'center',
                        lineHeight: 1
                      }}>€100</span>
                    </div>
                    <input 
                      type="radio" 
                      name="reportType" 
                      value="named"
                      checked={formData.reportType === 'named'}
                      onChange={(e) => handleInputChange('reportType', e.target.value)}
                      style={{ marginRight: '0.75rem' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Users size={20} style={{ color: formData.reportType === 'named' ? '#3b82f6' : '#9ca3af' }} />
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                          {t.namedReport}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {t.namedReportDesc}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Personal Details Section - Only show if named reporting */}
              {formData.reportType === 'named' && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                    <Users size={20} style={{ marginRight: '8px', color: '#3b82f6' }} />
                    {t.yourDetails}
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '0.75rem', 
                        fontWeight: '600', 
                        color: '#1f2937',
                        fontSize: '0.95rem'
                      }}>
                        <Users size={16} style={{ marginRight: '6px', color: '#3b82f6' }} />
                        {t.nameLabel} *
                      </label>
                      <input 
                        type="text" 
                        placeholder={t.namePlaceholder}
                        value={formData.reporterName}
                        onChange={(e) => handleInputChange('reporterName', e.target.value)}
                        required={formData.reportType === 'named'}
                        style={{ 
                          width: '100%', 
                          padding: '0.875rem', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '8px',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '0.75rem', 
                        fontWeight: '600', 
                        color: '#1f2937',
                        fontSize: '0.95rem'
                      }}>
                        <Mail size={16} style={{ marginRight: '6px', color: '#3b82f6' }} />
                        {t.emailLabel} *
                      </label>
                      <input 
                        type="email" 
                        placeholder="uw@email.nl"
                        value={formData.reporterEmail}
                        onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                        required={formData.reportType === 'named'}
                        style={{ 
                          width: '100%', 
                          padding: '0.875rem', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '8px',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '0.75rem', 
                        fontWeight: '600', 
                        color: '#1f2937',
                        fontSize: '0.95rem'
                      }}>
                        <Phone size={16} style={{ marginRight: '6px', color: '#3b82f6' }} />
                        {t.phoneLabel}
                      </label>
                      <input 
                        type="tel" 
                        placeholder="06-12345678"
                        value={formData.reporterPhone}
                        onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.875rem', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '8px',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Anonymous Notice */}
              {formData.reportType === 'anonymous' && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fbbf24',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#f59e0b',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Shield size={20} style={{ color: 'white' }} />
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#92400e', lineHeight: '1.6' }}>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', color: '#b45309' }}>
                      ⚠️ Geen €100 Vergoeding bij Anonieme Melding
                    </strong>
                    <p style={{ margin: '0', marginBottom: '0.75rem' }}>
                      {t.anonymousNoticeText}
                    </p>
                    <p style={{ margin: '0', fontWeight: '600', color: '#b45309' }}>
                      Voor de €100 vergoeding hebben we uw contactgegevens nodig. 
                      Kies voor "Met Naam Melden" als u de vergoeding wilt ontvangen.
                    </p>
                  </div>
                </div>
              )}

              {/* Attachments Section */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  <FileText size={20} style={{ marginRight: '8px', color: '#3b82f6' }} />
                  {t.attachmentsTitle}
                </h3>
                
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: '#f9fafb',
                  transition: 'all 0.2s'
                }}>
                  <input 
                    type="file" 
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                    <FileText size={32} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
                    <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                      {t.uploadText}
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                      {t.uploadFormats}
                    </p>
                  </label>
                  
                  {formData.attachments.length > 0 && (
                    <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                      <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                        {t.uploadedFiles}
                      </p>
                      {formData.attachments.map((file, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                          <button 
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                attachments: prev.attachments.filter((_, i) => i !== index)
                              }))
                            }}
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#ef4444', 
                              cursor: 'pointer',
                              fontSize: '1.25rem'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Agreement */}
              <div data-error={errors.privacyAgreed ? 'true' : 'false'}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: errors.privacyAgreed ? '#dc2626' : '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  <Shield size={20} style={{ marginRight: '8px', color: errors.privacyAgreed ? '#dc2626' : '#3b82f6' }} />
                  {t.privacyTitle}
                </h3>
                
                <div style={{ 
                  backgroundColor: errors.privacyAgreed ? '#fef2f2' : '#f0f9ff', 
                  border: errors.privacyAgreed ? '2px solid #dc2626' : '1px solid #bae6fd', 
                  borderRadius: '8px', 
                  padding: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: errors.privacyAgreed ? '#dc2626' : '#0369a1', fontWeight: '600', marginBottom: '0.75rem' }}>
                    {t.privacyStatementTitle}
                  </h4>
                  <p style={{ color: errors.privacyAgreed ? '#7f1d1d' : '#0c4a6e', lineHeight: '1.6', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {t.privacyText1}
                  </p>
                  <p style={{ color: errors.privacyAgreed ? '#7f1d1d' : '#0c4a6e', lineHeight: '1.6', fontSize: '0.875rem', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                    {t.privacyText2}
                  </p>
                  <p style={{ color: errors.privacyAgreed ? '#7f1d1d' : '#0c4a6e', fontSize: '0.875rem' }}>
                    {t.privacyText3} <Link to="/privacy" style={{ color: errors.privacyAgreed ? '#dc2626' : '#0369a1', textDecoration: 'underline' }}>privacybeleid</Link> & 
                    <Link to="/algemene-voorwaarden" style={{ color: errors.privacyAgreed ? '#dc2626' : '#0369a1', textDecoration: 'underline', marginLeft: '0.25rem' }}>algemene voorwaarden</Link>.
                  </p>
                </div>
                
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  cursor: 'pointer',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s',
                  backgroundColor: errors.privacyAgreed ? '#fef2f2' : 'transparent',
                  border: errors.privacyAgreed ? '2px solid #dc2626' : '2px solid transparent'
                }}>
                  <input 
                    type="checkbox" 
                    checked={formData.privacyAgreed}
                    onChange={(e) => handleInputChange('privacyAgreed', e.target.checked)}
                    style={{ 
                      marginRight: '0.75rem', 
                      marginTop: '2px',
                      width: '16px',
                      height: '16px',
                      accentColor: errors.privacyAgreed ? '#dc2626' : undefined
                    }}
                  />
                  <span style={{ color: errors.privacyAgreed ? '#dc2626' : '#374151', fontSize: '0.875rem', lineHeight: '1.5', fontWeight: errors.privacyAgreed ? '600' : 'normal' }}>
                    {t.privacyAgree}
                  </span>
                </label>
                
                {errors.privacyAgreed && (
                  <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#fef2f2', borderRadius: '6px', fontWeight: '600' }}>
                    <span style={{ marginRight: '6px', fontSize: '1rem' }}>⚠️</span> {errors.privacyAgreed}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                  style={{ 
                    fontSize: '1.125rem', 
                    padding: '1rem 3rem',
                    minWidth: '200px',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    position: 'relative'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTop: '3px solid white',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        marginRight: '8px'
                      }} />
                      Melding verzenden...
                    </>
                  ) : (
                    <>
                      <FileText size={20} style={{ marginRight: '8px' }} />
                      {t.reportBtn}
                    </>
                  )}
                </button>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '1rem' }}>
                  {t.requiredFields}
                </p>
              </div>
            </form>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

const AboutPage = () => {
  const { t } = useLanguage()
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '2rem 0' }}>
      <div className="container">
        <ScrollReveal>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)', textAlign: 'center' }}>
            {t.aboutTitle}
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            {t.aboutSubtitle}
          </p>
        </ScrollReveal>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <ScrollReveal delay={0}>
          <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '1rem' }}>{t.ourMission}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {t.ourMissionDesc}
            </p>
          </div>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
          <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '1rem' }}>{t.ourVision}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {t.ourVisionDesc}
            </p>
          </div>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
          <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '1rem' }}>{t.ourValues}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {t.ourValuesDesc}
            </p>
          </div>
          </ScrollReveal>
        </div>

        {/* Contact CTA Section */}
        <ScrollReveal delay={400}>
          <div style={{ 
            marginTop: '3rem', 
            background: 'var(--bg-primary)', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.5rem' }}>
              Meer weten over ons bedrijf?
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Voor meer informatie over ons bedrijf ga dan naar contact
            </p>
            <Link 
              to="/contact" 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Mail size={18} />
              Naar Contact
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}

const ContactPage = () => {
  const { t } = useLanguage()
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', category: '', message: '' })
  const [contactToast, setContactToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactToast({ message: t.fillRequired, type: 'warning' })
      return
    }
    const bericht = {
      id: Date.now(),
      name: contactForm.name,
      email: contactForm.email,
      subject: contactForm.subject || 'Geen onderwerp',
      category: contactForm.category || 'Algemeen',
      message: contactForm.message,
      date: new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      createdAt: new Date().toISOString()
    }
    const existing = JSON.parse(localStorage.getItem('contact_berichten') || '[]')
    existing.unshift(bericht)
    localStorage.setItem('contact_berichten', JSON.stringify(existing))
    setContactToast({ message: t.messageSent, type: 'success' })
    setContactForm({ name: '', email: '', subject: '', category: '', message: '' })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '2rem 0' }}>
      {contactToast && <Toast message={contactToast.message} type={contactToast.type} onClose={() => setContactToast(null)} />}
      <div className="container">
        <ScrollReveal>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)', textAlign: 'center' }}>
            {t.contactTitle}
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            {t.contactSubtitle}
          </p>
        </ScrollReveal>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left: Contact Form */}
          <ScrollReveal direction="left">
          <div style={{ background: 'var(--bg-primary)', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>
              {t.sendMessage}
            </h2>
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder={t.name} 
                  value={contactForm.name}
                  onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  style={{ 
                    padding: '1rem', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }} 
                />
                <input 
                  type="email" 
                  placeholder={t.email} 
                  value={contactForm.email}
                  onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  style={{ 
                    padding: '1rem', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }} 
                />
              </div>
              
              <input 
                type="text" 
                placeholder={t.subject} 
                value={contactForm.subject}
                onChange={e => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                style={{ 
                  padding: '1rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }} 
              />
              
              <select 
                value={contactForm.category}
                onChange={e => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                style={{ 
                  padding: '1rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                <option value="">{t.chooseCategory}</option>
                <option value="Algemeen">{t.categoryGeneral}</option>
                <option value="Leegstand melden">{t.categoryVacancy}</option>
                <option value="Samenwerking">{t.categoryCooperation}</option>
                <option value="Eigendom">{t.categoryProperty}</option>
                <option value="Overig">{t.categoryOther}</option>
              </select>
              
              <textarea 
                rows={6} 
                placeholder={t.messagePlaceholder} 
                value={contactForm.message}
                onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                required
                style={{ 
                  padding: '1rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  resize: 'vertical',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }} 
              />
              
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '1rem 2rem', alignSelf: 'flex-start' }}
              >
                {t.sendBtn}
              </button>
            </form>
          </div>
          </ScrollReveal>
          
          {/* Right: Contact Info */}
          <ScrollReveal direction="right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>
                {t.contactData}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: 'var(--accent-primary-light)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={24} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div>
                    <p style={{ margin: '0', fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.125rem' }}>E-mail</p>
                    <p style={{ margin: '0', color: 'var(--text-secondary)' }}>info@leegstandmeldpunt.nl</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: 'var(--accent-primary-light)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={24} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div>
                    <p style={{ margin: '0', fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.125rem' }}>{t.phone}</p>
                    <p style={{ margin: '0', color: 'var(--text-secondary)' }}>+31 6 413 759 00</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: 'var(--accent-primary-light)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={24} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div>
                    <p style={{ margin: '0', fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.125rem' }}>{t.addressLabel}</p>
                    <p style={{ margin: '0', color: 'var(--text-secondary)' }}>Fultonstraat 2<br />2562 XH Den Haag</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Opening Hours */}
            <div style={{ background: 'var(--bg-primary)', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>
                {t.openingHours}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '1rem' }}>{t.monFri}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem' }}>10:00 - 17:00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '1rem' }}>{t.saturday}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem' }}>{t.closed}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '1rem' }}>{t.sunday}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem' }}>{t.closed}</span>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

const PrivacyPage = () => (
  <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '4rem 0' }}>
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Privacybeleid
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Laatst bijgewerkt: 3 april 2026 | Versie 2.0
      </p>
      
      <div style={{ background: 'var(--bg-primary)', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          1. Inleiding en Definities
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Leegstandmeldpunt.nl (hierna: "wij", "ons" of "de Dienst") is een platform dat de bestrijding van leegstaand vastgoed faciliteert. Dit privacybeleid beschrijft hoe wij persoonsgegevens verwerken in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG, EU 2016/679) en de Nederlandse Uitvoeringswet AVG.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Definities:</strong>
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li><strong>Persoonsgegevens:</strong> Alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon.</li>
          <li><strong>Verwerking:</strong> Elke handeling met betrekking tot persoonsgegevens, inclusief verzamelen, opslaan, wijzigen, raadplegen en verwijderen.</li>
          <li><strong>Verwerkingsverantwoordelijke:</strong> Leegstandmeldpunt, Fultonstraat 2, 2562 XH Den Haag.</li>
          <li><strong>Betrokkene:</strong> De natuurlijke persoon wiens persoonsgegevens worden verwerkt (u als gebruiker).</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          2. Identiteit en Contactgegevens Verwerkingsverantwoordelijke
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Verwerkingsverantwoordelijke:</strong><br />
          Leegstandmeldpunt<br />
          Fultonstraat 2<br />
          2562 XH 's-Gravenhage<br />
          Nederland
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Contact privacyzaken:</strong><br />
          E-mail: info@leegstandmeldpunt.nl<br />
          Telefoon: +31 6 413 759 00
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          3. Welke Persoonsgegevens Verzamelen Wij en Waarvoor
        </h2>
        
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1.5rem', color: 'var(--text-primary)' }}>
          3.1 Gegevens bij Melding Leegstand (Naamloos)
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Adresgegevens van het gemelde pand (straat, huisnummer, postcode, plaats)</li>
          <li>GPS-coördinaten (indien door gebruiker geautoriseerd)</li>
          <li>Foto's van het pand (indien toegevoegd)</li>
          <li>Duur van leegstand (indien bekend)</li>
          <li>Eventuele beschrijving/observaties</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Doel:</strong> Doorgeleiding van melding naar gemeenten, woningcorporaties of eigenaren ter bestrijding van leegstand.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Rechtsgrondslag:</strong> Gerechtvaardigd belang (art. 6 lid 1 sub f AVG) - maatschappelijk belang van woningbestrijding.
        </p>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1.5rem', color: 'var(--text-primary)' }}>
          3.2 Gegevens bij Melding Leegstand (Met Contactgegevens voor €100 Vergoeding)
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Volledige naam (voornaam + achternaam)</li>
          <li>E-mailadres</li>
          <li>Telefoonnummer (optioneel maar aanbevolen)</li>
          <li>Alle gegevens uit paragraaf 3.1</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Opmerking:</strong> Wij nemen contact met u op via e-mail wanneer u in aanmerking komt voor de vergoeding. U hoeft geen IBAN vooraf in te vullen; wij vragen deze pas wanneer de uitbetaling daadwerkelijk plaatsvindt.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Doel:</strong> Verwerking van €100 vergoeding na succesvolle verificatie van melding en daadwerkelijke bewoning/herbestemming.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Rechtsgrondslag:</strong> Uitvoering overeenkomst (art. 6 lid 1 sub b AVG) - vergoedingsafspraak tussen melder en Leegstandmeldpunt.
        </p>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1.5rem', color: 'var(--text-primary)' }}>
          3.3 Gegevens bij Contactformulier
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Naam</li>
          <li>E-mailadres</li>
          <li>Telefoonnummer (optioneel)</li>
          <li>Onderwerp en inhoud bericht</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Doel:</strong> Beantwoorden van vragen, afhandelen van klachten, opvolgen van samenwerkingsverzoeken.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Rechtsgrondslag:</strong> Gerechtvaardigd belang (art. 6 lid 1 sub f AVG) en toestemming (art. 6 lid 1 sub a AVG) bij marketingcommunicatie.
        </p>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1.5rem', color: 'var(--text-primary)' }}>
          3.4 Gegevens bij Accountregistratie (Beheerders)
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Gebruikersnaam</li>
          <li>E-mailadres</li>
          <li>Telefoonnummer</li>
          <li>Wachtwoord (gehasht en versleuteld opgeslagen)</li>
          <li>Rol/Functie binnen organisatie</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Doel:</strong> Toegangsbeheer tot het admin portaal voor gemeenten, woningcorporaties en vastgoedeigenaren.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Rechtsgrondslag:</strong> Uitvoering overeenkomst (art. 6 lid 1 sub b AVG) voor dienstverlening aan overheidsinstanties en vastgoedpartijen.
        </p>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1.5rem', color: 'var(--text-primary)' }}>
          3.5 Gegevens bij Samenwerkingsverzoeken
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Naam contactpersoon</li>
          <li>Functie/titel</li>
          <li>Organisatienaam</li>
          <li>E-mailadres zakelijk</li>
          <li>Telefoonnummer zakelijk</li>
          <li>KvK-nummer (ter verificatie)</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Doel:</strong> Beoordeling en opvolging van samenwerkingsverzoeken met woningcorporaties, gemeenten en vastgoedpartijen.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          4. Ontvangers en Doorgifte van Persoonsgegevens
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Uw persoonsgegevens worden alleen gedeeld met:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li><strong>Gemeenten:</strong> Voor opvolging van leegstandmeldingen binnen hun jurisdictie (wettelijke taak leegstandsbestrijding).</li>
          <li><strong>Woningcorporaties:</strong> Alleen indien betrokken bij het gemelde pand en met gerechtvaardigd belang.</li>
          <li><strong>Eigenaren van vastgoed:</strong> Alleen het adres van hun eigen pand wordt gedeeld, geen contactgegevens van de melder (tenzij melder expliciet toestemming geeft).</li>
          <li><strong>Verwerkers:</strong> Technische dienstverleners zoals hostingproviders (onder verwerkersovereenkomst).</li>
          <li><strong>Overheid:</strong> Alleen op grond van wettelijke verplichting (bijv. rechterlijke uitspraak).</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Geen doorgifte buiten de EU:</strong> Alle gegevens blijven binnen de Europese Economische Ruimte (EER). Onze servers bevinden zich in Nederland.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          5. Bewaartermijnen
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: '600' }}>Gegevenscategorie</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: '600' }}>Bewaartermijn</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: '600' }}>Motivering</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>Leegstandmeldingen (anoniem)</td>
              <td style={{ padding: '0.75rem' }}>5 jaar</td>
              <td style={{ padding: '0.75rem' }}>Statistische doeleinden en trendanalyse</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>Leegstandmeldingen (met contactgegevens)</td>
              <td style={{ padding: '0.75rem' }}>2 jaar na afhandeling</td>
              <td style={{ padding: '0.75rem' }}>Vergoedingsadministratie en eventuele geschillen</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>Accountgegevens beheerders</td>
              <td style={{ padding: '0.75rem' }}>Duur van contract + 2 jaar</td>
              <td style={{ padding: '0.75rem' }}>Administratieve verplichtingen en geschillen</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>Contactformulierberichten</td>
              <td style={{ padding: '0.75rem' }}>1 jaar</td>
              <td style={{ padding: '0.75rem' }}>Klachtenafhandeling en serviceverbetering</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>Logbestanden (technisch)</td>
              <td style={{ padding: '0.75rem' }}>3 maanden</td>
              <td style={{ padding: '0.75rem' }}>Beveiliging en troubleshooting</td>
            </tr>
          </tbody>
        </table>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          6. Uw Rechten als Betrokkene (AVG Rechten)
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Op grond van de AVG heeft u de volgende rechten. U kunt deze rechten uitoefenen door een verzoek te sturen naar info@leegstandmeldpunt.nl:
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
          6.1 Recht op Inzage (Art. 15 AVG)
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          U heeft het recht om te weten welke persoonsgegevens wij van u verwerken, waarvoor, aan wie we deze verstrekken, en hoe lang we deze bewaren. Wij verstrekken u een kopie binnen 30 dagen.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
          6.2 Recht op Rectificatie (Art. 16 AVG)
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Indien uw gegevens onjuist of onvolledig zijn, kunt u ons verzoeken deze te corrigeren of aan te vullen.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
          6.3 Recht op Vergetelheid (Art. 17 AVG)
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          U kunt verzoeken om verwijdering van uw gegevens indien:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>De gegevens niet meer nodig zijn voor de doeleinden waarvoor ze zijn verzameld</li>
          <li>U uw toestemming intrekt (waar de verwerking op gebaseerd was)</li>
          <li>U bezwaar maakt tegen de verwerking</li>
          <li>De gegevens onrechtmatig zijn verwerkt</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Uitzondering:</strong> Wij kunnen een verzoek tot verwijdering weigeren indien een wettelijke verplichting ons dit verbiedt (bijv. belastingwetgeving) of voor de vaststelling, uitoefening of verdediging van rechtsvorderingen.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
          6.4 Recht op Beperking van Verwerking (Art. 18 AVG)
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          U kunt verzoeken om beperking van de verwerking indien u de juistheid van de gegevens betwist, de verwerking onrechtmatig is maar u zich verzet tegen verwijdering, of wij de gegevens niet meer nodig hebben maar u ze nodig heeft voor een rechtsvordering.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
          6.5 Recht op Dataportabiliteit (Art. 20 AVG)
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          U heeft het recht om uw gegevens in een gestructureerde, gangbare en machineleesbare vorm te ontvangen (JSON of CSV), en deze over te dragen aan een andere verwerkingsverantwoordelijke.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
          6.6 Recht van Bezwaar (Art. 21 AVG)
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          U kunt te allen tijde bezwaar maken tegen de verwerking van uw persoonsgegevens die plaatsvindt op grond van gerechtvaardigd belang. Wij zullen de verwerking staken, tenzij er dwingende gerechtvaardigde gronden zijn voor de verwerking die zwaarder wegen dan uw belangen, rechten en vrijheden.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          7. Technische en Organisatorische Beveiligingsmaatregelen
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Wij hebben passende maatregelen getroffen om uw persoonsgegevens te beschermen tegen verlies, onrechtmatige verwerking of onbevoegde toegang:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li><strong>Versleuteling:</strong> Alle gegevens worden verzonden via TLS 1.3 (HTTPS). Wachtwoorden worden gehasht met bcrypt (salt + pepper).</li>
          <li><strong>Toegangscontrole:</strong> Rolgebaseerde toegangscontrole (RBAC) voor het admin portaal. Multi-factor authenticatie (MFA) verplicht voor beheerders.</li>
          <li><strong>Pseudonimisering:</strong> Melder-identiteit wordt gescheiden van meldingsgegevens in de database tenzij vergoeding noodzakelijk is.</li>
          <li><strong>Logging:</strong> Alle toegang tot persoonsgegevens wordt gelogd en gecontroleerd op ongebruikelijke activiteit.</li>
          <li><strong>Back-ups:</strong> Dagelijkse geëncrypte back-ups met 30-dagen retentie, opgeslagen binnen de EU.</li>
          <li><strong>Security Audits:</strong> Jaarlijkse penetratietests en kwetsbaarheidsscans door externe partijen.</li>
          <li><strong>Awareness:</strong> Jaarlijkse privacy- en securitytraining voor alle medewerkers met toegang tot persoonsgegevens.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          8. Datalekken en Meldplicht
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          In geval van een datalek met waarschijnlijk een hoog risico voor uw rechten en vrijheden, zullen wij:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>De Autoriteit Persoonsgegevens (AP) binnen 72 uur informeren (indien wettelijk verplicht)</li>
          <li>U direct informeren indien het leek waarschijnlijk een hoog risico voor uw rechten en vrijheden met zich brengt</li>
          <li>Onmiddellijke mitigerende maatregelen treffen om het lek te beperken</li>
          <li>Een onderzoek instellen naar de oorzaak en herhaling voorkomen</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          9. Cookies en Tracking
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Wij maken gebruik van functionele cookies die noodzakelijk zijn voor de werking van de website (sessiebeheer, taalkeuze, themavoorkeuren). Deze cookies plaatsen wij op grond van gerechtvaardigd belang (art. 6 lid 1 sub f AVG).
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Wij gebruiken <strong>geen</strong> tracking cookies, marketing cookies of third-party analytics die persoonsgegevens verzamelen. Uw surfgedrag wordt niet gevolgd voor commerciële doeleinden.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          10. Wijzigingen in dit Privacybeleid
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Wij behouden ons het recht voor om dit privacybeleid aan te passen. Wijzigingen worden minimaal 30 dagen van tevoren op deze pagina gepubliceerd. Bij significante wijzigingen zullen wij actief geïnteresseerde partijen informeren via e-mail.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Het is uw verantwoordelijkheid om dit privacybeleid regelmatig te raadplegen. Door gebruik te blijven maken van onze diensten na wijzigingen, accepteert u het bijgewerkte privacybeleid.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          11. Klachtenprocedure en Toezichthouder
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Indien u een klacht heeft over de verwerking van uw persoonsgegevens, verzoeken wij u eerst contact met ons op te nemen via privacy@leegstandmeldpunt.nl. Wij streven ernaar om uw klacht binnen 4 weken te behandelen.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Indien u niet tevreden bent met onze afhandeling, heeft u het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP):
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Autoriteit Persoonsgegevens</strong><br />
          Bezuidenhoutseweg 30<br />
          2594 AV Den Haag<br />
          Telefoon: 070 - 888 8500<br />
          Website: <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>autoriteitpersoonsgegevens.nl</a>
        </p>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0, fontSize: '0.9rem' }}>
            <strong>Contact voor privacyvragen:</strong><br />
            E-mail: info@leegstandmeldpunt.nl<br />
            Post: Leegstandmeldpunt, Fultonstraat 2, 2562 XH Den Haag
          </p>
        </div>
      </div>
    </div>
  </div>
)

const TermsPage = () => (
  <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '4rem 0' }}>
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Algemene Voorwaarden
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Laatst bijgewerkt: 3 april 2026 | Versie 3.0 | Van toepassing op alle gebruikers van Leegstandmeldpunt.nl
      </p>
      
      <div style={{ background: 'var(--bg-primary)', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Artikel 1 - Definities en Toepassingsgebied
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          In deze algemene voorwaarden worden de volgende termen gebruikt:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li><strong>Platform:</strong> De website Leegstandmeldpunt.nl en alle bijbehorende diensten, functionaliteiten en subdomeinen.</li>
          <li><strong>Gebruiker:</strong> Iedere natuurlijke of rechtspersoon die gebruik maakt van het Platform, inclusief melders, bezoekers, en geregistreerde gebruikers.</li>
          <li><strong>Melding:</strong> Een registratie van een vermoeden van leegstaand vastgoed via het Platform.</li>
          <li><strong>Aanbieder:</strong> Leegstandmeldpunt, statutair gevestigd te Den Haag, hierna te noemen "wij", "ons" of "Leegstandmeldpunt".</li>
          <li><strong>Vergoeding:</strong> De financiële beloning van €100 (exclusief BTW indien van toepassing) die onder bepaalde voorwaarden wordt uitgekeerd aan een melder.</li>
          <li><strong>Beheerder:</strong> Een Gebruiker met een geregistreerd account voor het Admin Portaal, waaronder gemeenten, woningcorporaties en vastgoedeigenaren.</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>Toepassingsgebied:</strong> Deze voorwaarden zijn van toepassing op alle gebruik van het Platform, alle diensten die wij aanbieden, en alle overeenkomsten die tussen de Aanbieder en de Gebruiker tot stand komen. Door gebruik te maken van het Platform accepteert u deze voorwaarden onvoorwaardelijk.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 2 - Dienstverlening en Platformbeschrijving
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>2.1 Aard van de dienst:</strong> Leegstandmeldpunt is een onafhankelijk digitaal platform dat faciliteert in de signalering en bestrijding van leegstaand vastgoed. Wij zijn een technische dienstverlener en geen overheidsinstantie, woningcorporatie of vastgoedadviseur.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>2.2 Werkingswijze:</strong> Het Platform stelt Gebruikers in staat om meldingen te doen van vermoedelijk leegstaande panden. Deze meldingen worden vervolgens, afhankelijk van de aard van de melding, doorgeleid naar relevante partijen zoals gemeenten, woningcorporaties of vastgoedeigenaren.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>2.3 Geen tussenkomst:</strong> Wij zijn geen partij bij eventuele vervolgacties die ontstaan naar aanleiding van een melding. Wij faciliteren uitsluitend de melding en eerste doorleiding. Alle verdere correspondentie, juridische stappen of onderhandelingen vinden plaats tussen de betrokken partijen buiten het Platform om.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>2.4 Onafhankelijkheid:</strong> Leegstandmeldpunt is financieel en organisatorisch onafhankelijk van de Nederlandse overheid, gemeenten en specifieke vastgoedpartijen. Wij onderhouden samenwerkingsverbanden met diverse partijen, maar blijven neutraal en onafhankelijk in onze dienstverlening.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>2.5 Beschikbaarheid:</strong> Wij streven naar een maximale beschikbaarheid van het Platform, maar garanderen geen ononderbroken toegang. Onderhoud, updates of technische storingen kunnen leiden tot tijdelijke niet-beschikbaarheid.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 3 - Meldingen en Gebruikersverplichtingen
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>3.1 Juistheid van meldingen:</strong> De Gebruiker is verantwoordelijk voor de juistheid en volledigheid van de informatie die bij een melding wordt verstrekt. Het doen van opzettelijk onjuiste meldingen of meldingen met kwaadwillige intentie is strikt verboden en kan leiden tot juridische stappen.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>3.2 Anoniem vs. Geregistreerd:</strong> Gebruikers kunnen kiezen voor anonieme melding (zonder persoonsgegevens) of geregistreerde melding (met contactgegevens voor de €100 vergoeding). Anonieme meldingen kunnen niet later worden geclaimd voor vergoeding.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>3.3 Privacy en toestemming:</strong> Bij het uploaden van foto's of andere mediabestanden dient de Gebruiker ervoor te zorgen dat:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Er geen herkenbare personen zichtbaar zijn zonder hun uitdrukkelijke toestemming</li>
          <li>Er geen privéterrein wordt gefotografeerd zonder toestemming van de eigenaar</li>
          <li>De foto's geen inbreuk maken op de privacy van bewoners of eigenaars</li>
          <li>De foto's uitsluitend het pand en de directe omgeving tonen, geen persoonlijke bezittingen</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>3.4 Verboden gedrag:</strong> Het is de Gebruiker verboden om:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Automatische systemen, bots of scrapers te gebruiken op het Platform</li>
          <li>Schadelijke code, virussen of malware te uploaden of verspreiden</li>
          <li>Andere Gebruikers lastig te vallen, te bedreigen of te intimideren</li>
          <li>Spam, oplichting of misleidende informatie te verspreiden</li>
          <li>De beveiliging van het Platform te omzeilen of te testen zonder voorafgaande schriftelijke toestemming</li>
          <li>Persoonsgegevens van derden te verzamelen zonder hun toestemming</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 4 - De €100 Vergoedingsregeling
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>4.1 Voorwaarden vergoeding:</strong> De vergoeding van €100 wordt uitsluitend uitgekeerd indien aan alle volgende cumulatieve voorwaarden is voldaan:
        </p>
        <ol style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>De melding is gedaan via het Platform met volledige contactgegevens van de melder</li>
          <li>De melding betreft een daadwerkelijk leegstaand pand (minimum duur leegstand: 3 maanden)</li>
          <li>De melding is geen duplicaat van een eerder geregistreerde melding voor hetzelfde pand</li>
          <li>De melding leidt binnen 12 maanden na melding tot daadwerkelijke bewoning of herbestemming van het pand</li>
          <li>De melding is niet anoniem gedaan</li>
          <li>De melder is de eerste melder voor dit specifieke pand via het Platform</li>
          <li>Het pand was op het moment van melding niet reeds in behandeling bij de eigenaar of gemeente voor verhuur/herbestemming</li>
        </ol>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>4.2 Verificatieprocedure:</strong> Alle meldingen onderhevig aan de vergoedingsregeling worden verificatieplichtig. De verificatie omvat:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Controle van de duur van de leegstand aan de hand van beschikbare bronnen (BAG, energielabels, etc.)</li>
          <li>Controle of het pand daadwerkelijk bewoond of herbestemd is (bewijs via huurcontracten, verhuizingen, etc.)</li>
          <li>Controle op uniciteit van de melding</li>
          <li>Eventueel contact met de melder voor aanvullende informatie</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>4.3 Uitbetalingsprocedure:</strong> Na succesvolle verificatie wordt de vergoeding binnen 30 werkdagen uitbetaald op het opgegeven IBAN-rekeningnummer. De melder dient een geldig identiteitsbewijs te kunnen overleggen indien daarom verzocht.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>4.4 Uitsluitingen:</strong> Geen recht op vergoeding bestaat indien:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>De melder een medewerker is van de eigenaar, gemeente of betrokken woningcorporatie</li>
          <li>De melding betrekking heeft op een pand waar de melder zelf eigenaar van is of was</li>
          <li>De melding is gedaan in strijd met deze algemene voorwaarden</li>
          <li>De melding is gebaseerd op onjuiste of misleidende informatie</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>4.5 BTW en belastingen:</strong> De vergoeding is inclusief BTW (indien van toepassing). De melder is zelf verantwoordelijk voor het opgeven van ontvangen vergoedingen bij de belastingdienst indien verplicht.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 5 - Intellectuele Eigendomsrechten
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>5.1 Eigendom:</strong> Alle intellectuele eigendomsrechten met betrekking tot het Platform, waaronder maar niet beperkt tot auteursrechten, merkenrechten, databaserechten en rechten op knowhow, zijn en blijven eigendom van Leegstandmeldpunt of haar licentiegevers.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>5.2 Licentie Gebruiker:</strong> De Gebruiker verkrijgt een beperkte, niet-exclusieve, niet-overdraagbare licentie om het Platform te gebruiken overeenkomstig deze voorwaarden. Deze licentie eindigt automatisch bij beëindiging van het gebruik.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>5.3 Licentie op gebruikerscontent:</strong> Door het uploaden van content (foto's, beschrijvingen, etc.) verleent de Gebruiker Leegstandmeldpunt een wereldwijde, royaltyvrije, sublicentieerbare licentie om deze content te gebruiken, reproduceren, aan te passen en te publiceren voor de doeleinden van het Platform, inclusief statistische analyses en rapportages.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 6 - Aansprakelijkheid en Vrijwaring
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>6.1 Beperking aansprakelijkheid:</strong> De aansprakelijkheid van Leegstandmeldpunt is beperkt tot directe schade die het rechtstreeks en met redelijke zekerheid voorzienbare gevolg is van een toerekenbare tekortkoming in de nakoming van de overeenkomst. De totale aansprakelijkheid is in alle gevallen beperkt tot maximaal €500 per gebeurtenis, met een maximum van €1.000 per jaar.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>6.2 Uitsluiting indirecte schade:</strong> Leegstandmeldpunt is in geen geval aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, schade door bedrijfsstagnatie, of immateriële schade.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>6.3 Geen garantie resultaat:</strong> Wij geven geen garantie dat een melding leidt tot actie, herbestemming of bewoning. Wij faciliteren slechts de melding; succes is afhankelijk van externe factoren (eigenaar, gemeente, markt).
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>6.4 Vrijwaring:</strong> De Gebruiker vrijwaart Leegstandmeldpunt tegen alle aanspraken van derden die voortvloeien uit:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Het gebruik van het Platform in strijd met deze voorwaarden</li>
          <li>Onjuiste of onrechtmatige meldingen door de Gebruiker</li>
          <li>Inbreuk op rechten van derden, waaronder intellectuele eigendomsrechten en privacyrechten</li>
          <li>Overtreding van toepasselijke wet- en regelgeving</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>6.5 Verjaring:</strong> Vorderingen tegen Leegstandmeldpunt verjaren door verloop van één jaar na het ontstaan van de vordering.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 7 - Beveiliging en Privacy
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>7.1 Privacybeleid:</strong> Alle verwerkingen van persoonsgegevens vinden plaats in overeenstemming met ons Privacybeleid, dat als onderdeel van deze voorwaarden wordt beschouwd.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>7.2 Beveiligingsverplichting Gebruiker:</strong> De Gebruiker dient zorgvuldig om te gaan met inloggegevens en deze niet te delen met derden. Onmiddellijke melding bij vermoeden van ongeautoriseerd gebruik is verplicht.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>7.3 Datalekken:</strong> In geval van een bevestigd datalek met mogelijk impact op Gebruikers, zullen wij deze Gebruikers informeren conform onze wettelijke verplichtingen (art. 34 AVG).
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 8 - Wijzigingen en Opzegging
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>8.1 Wijzigingen voorwaarden:</strong> Wij behouden ons het recht voor om deze algemene voorwaarden te wijzigen. Wijzigingen worden minimaal 30 dagen van tevoren aangekondigd via het Platform en, indien relevant, via e-mail aan geregistreerde Gebruikers.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>8.2 Tegenwerping:</strong> Indien de Gebruiker niet akkoord gaat met gewijzigde voorwaarden, dient hij het gebruik van het Platform te staken. Voortzetting van gebruik na wijzigingen geldt als acceptatie.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>8.3 Opzegging door Gebruiker:</strong> De Gebruiker kan op elk moment stoppen met het gebruik van het Platform. Dit heeft geen gevolgen voor reeds gedane meldingen of lopende vergoedingsaanvragen.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>8.4 Opzegging door Aanbieder:</strong> Wij kunnen de toegang tot het Platform beperken of beëindigen indien:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>De Gebruiker deze voorwaarden ernstig of herhaaldelijk schendt</li>
          <li>De Gebruiker het Platform gebruikt voor onrechtmatige of fraudegevoelige doeleinden</li>
          <li>Technische noodzaak dit vereist (na voorafgaande kennisgeving)</li>
          <li>De Aanbieder besluit de dienst te beëindigen (met minimaal 3 maanden aankondiging)</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 9 - Overmacht
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>9.1 Definitie:</strong> Onder overmacht wordt verstaan omstandigheden die de nakoming van de overeenkomst verhinderen en die niet zijn toe te rekenen aan de Aanbieder, waaronder: storingen in internet, computernetwerken, telecominfrastructuur, cyberaanvallen buiten redelijke beheersing, en overheidsmaatregelen.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>9.2 Gevolgen:</strong> In geval van overmacht worden de verplichtingen van de Aanbieder opgeschort gedurende de duur van de overmacht. Bij langdurige overmacht (&gt;30 dagen) hebben beide partijen het recht de overeenkomst te beëindigen.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem', color: 'var(--text-primary)' }}>
          Artikel 10 - Toepasselijk Recht en Geschillen
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>10.1 Toepasselijk recht:</strong> Op deze voorwaarden en alle overeenkomsten is Nederlands recht van toepassing. De toepasselijkheid van het Weens Koopverdrag (CISG) wordt uitdrukkelijk uitgesloten.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>10.2 Geschillen:</strong> Alle geschillen voortvloeiende uit of verband houdende met deze voorwaarden of het gebruik van het Platform zullen in eerste instantie worden voorgelegd aan de bevoegde rechter in het arrondissement Den Haag.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
          <strong>10.3 Bemiddeling:</strong> Partijen streven ernaar geschillen eerst in der minne te beslechten via onderhandeling of bemiddeling alvorens juridische stappen te ondernemen.
        </p>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            <strong>Contact:</strong><br />
            Leegstandmeldpunt<br />
            Fultonstraat 2, 2562 XH Den Haag<br />
            E-mail: info@leegstandmeldpunt.nl<br />
            Telefoon: +31 6 413 759 00
          </p>
        </div>
      </div>
    </div>
  </div>
)

const AVGCompliancePage = () => (
  <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '4rem 0' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--text-primary)' }}>
        AVG Compliance
      </h1>
      <div style={{ background: 'var(--bg-primary)', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          1. Algemene Verordening Gegevensbescherming (AVG)
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Leegstandmeldpunt voldoet aan de Algemene Verordening Gegevensbescherming (AVG/GDPR). 
          Wij nemen de bescherming van uw persoonsgegevens zeer serieus en verwerken deze uitsluitend 
          in overeenstemming met de geldende wet- en regelgeving.
        </p>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          2. Verwerkingsgrondslag
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Wij verwerken persoonsgegevens op basis van de volgende grondslagen:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li>Toestemming van de betrokkene</li>
          <li>Uitvoering van een overeenkomst</li>
          <li>Wettelijke verplichting</li>
          <li>Gerechtvaardigd belang</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          3. Rechten van Betrokkenen
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '0.75rem' }}>
          Op grond van de AVG heeft u de volgende rechten:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li><strong>Recht op inzage</strong> - U kunt opvragen welke gegevens wij van u verwerken</li>
          <li><strong>Recht op rectificatie</strong> - U kunt onjuiste gegevens laten corrigeren</li>
          <li><strong>Recht op vergetelheid</strong> - U kunt verzoeken uw gegevens te verwijderen</li>
          <li><strong>Recht op beperking</strong> - U kunt de verwerking van uw gegevens laten beperken</li>
          <li><strong>Recht op dataportabiliteit</strong> - U kunt uw gegevens in een gangbaar formaat ontvangen</li>
          <li><strong>Recht van bezwaar</strong> - U kunt bezwaar maken tegen de verwerking van uw gegevens</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          4. Beveiligingsmaatregelen
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen 
          tegen verlies, misbruik en ongeautoriseerde toegang. Dit omvat onder andere SSL-encryptie, 
          toegangscontrole, regelmatige beveiligingsaudits en training van medewerkers.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          5. Klachten
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Indien u een klacht heeft over de verwerking van uw persoonsgegevens, kunt u deze indienen bij de 
          Autoriteit Persoonsgegevens (AP). U kunt hiervoor terecht op <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>autoriteitpersoonsgegevens.nl</a>.
        </p>
      </div>
    </div>
  </div>
)

function App() {
  const [showIncentivePopup, setShowIncentivePopup] = useState(true)
  
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/melden" element={<ReportVacancyPage />} />
                  <Route path="/over-ons" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profiel" element={<ProfilePage />} />
                  <Route path="/portaal" element={<PortaalPage />} />
                  <Route path="/diensten" element={<ServicesPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/algemene-voorwaarden" element={<TermsPage />} />
                  <Route path="/avg-compliance" element={<AVGCompliancePage />} />
                </Routes>
              </main>
              <Footer />
              <CookieConsent />
              <HelpWidget />
              {/* Only show popup on homepage for non-logged users */}
              <Routes>
                <Route path="/" element={
                  showIncentivePopup && (
                    <IncentivePopup onClose={() => setShowIncentivePopup(false)} />
                  )
                } />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

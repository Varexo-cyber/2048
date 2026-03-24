import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  Home, 
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
import ScrollReveal from './components/ScrollReveal'
import ProfilePage from './pages/ProfilePage'
import PortaalPage from './pages/PortaalPage'
import Toast from './components/Toast'
import HelpWidget from './components/HelpWidget'
import IncentivePopup from './components/IncentivePopup'

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
          {/* €100 Badge */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            right: '3rem',
            width: '140px',
            height: '140px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(255, 165, 0, 0.4), inset 0 -4px 10px rgba(0,0,0,0.1)',
            border: '4px solid #fff',
            transform: 'rotate(15deg)',
            zIndex: 10,
            animation: 'pulse 2s ease-in-out infinite'
          }}>
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
              Eigenaar? Neem Contact Op
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
  const [formData, setFormData] = useState({
    // Property details
    address: '',
    propertyType: 'Woning',
    vacancyDuration: '',
    description: '',
    
    // Reporting type
    reportType: 'anonymous', // 'anonymous' or 'named'
    
    // Personal details (only for named reporting)
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    
    // Privacy
    privacyAgreed: false,
    
    // Files
    attachments: [] as File[]
  })
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert attachments to base64
    const attachmentData = await Promise.all(
      formData.attachments.map(file => fileToBase64(file))
    )
    
    // Create melding object
    const melding = {
      id: Date.now(),
      address: formData.address,
      type: formData.propertyType,
      status: 'Nieuw',
      date: new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      urgent: false,
      reportType: formData.reportType,
      reporterName: formData.reporterName || 'Anoniem',
      reporterEmail: formData.reporterEmail || '',
      reporterPhone: formData.reporterPhone || '',
      vacancyDuration: formData.vacancyDuration,
      description: formData.description,
      attachments: attachmentData,
      createdAt: new Date().toISOString()
    }
    
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('leegstand_meldingen') || '[]')
    existing.unshift(melding)
    localStorage.setItem('leegstand_meldingen', JSON.stringify(existing))
    
    setToast({ message: t.submitSuccess, type: 'success' })
    
    // Reset form
    setFormData({
      address: '',
      propertyType: 'Woning',
      vacancyDuration: '',
      description: '',
      reportType: 'anonymous',
      reporterName: '',
      reporterEmail: '',
      reporterPhone: '',
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
                  <div>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem'
                    }}>
                      <MapPin size={16} style={{ marginRight: '6px', color: 'var(--accent-primary)' }} />
                      {t.addressLabel} *
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.addressPlaceholder}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem', 
                        border: '2px solid var(--border-color)', 
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        transition: 'all 0.2s'
                      }}
                    />
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
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.75rem', 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}>
                    <Clock size={16} style={{ marginRight: '6px', color: 'var(--accent-primary)' }} />
                    {t.vacancyDurationLabel} *
                  </label>
                  <select 
                    value={formData.vacancyDuration}
                    onChange={(e) => handleInputChange('vacancyDuration', e.target.value)}
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
                    <option value="">{t.selectDuration}</option>
                    <option value="0-3 maanden">{t.duration0to3}</option>
                    <option value="3-6 maanden">{t.duration3to6}</option>
                    <option value="6-12 maanden">{t.duration6to12}</option>
                    <option value="1-2 jaar">{t.duration1to2y}</option>
                    <option value="Meer dan 2 jaar">{t.durationOver2y}</option>
                  </select>
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
                    {/* €100 Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(255, 165, 0, 0.3)',
                      border: '3px solid white',
                      transform: 'rotate(15deg)',
                      zIndex: 10
                    }}>
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
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  <Shield size={20} style={{ marginRight: '8px', color: '#3b82f6' }} />
                  {t.privacyTitle}
                </h3>
                
                <div style={{ 
                  backgroundColor: '#f0f9ff', 
                  border: '1px solid #bae6fd', 
                  borderRadius: '8px', 
                  padding: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: '#0369a1', fontWeight: '600', marginBottom: '0.75rem' }}>
                    {t.privacyStatementTitle}
                  </h4>
                  <p style={{ color: '#0c4a6e', lineHeight: '1.6', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {t.privacyText1}
                  </p>
                  <p style={{ color: '#0c4a6e', lineHeight: '1.6', fontSize: '0.875rem', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                    {t.privacyText2}
                  </p>
                  <p style={{ color: '#0c4a6e', fontSize: '0.875rem' }}>
                    {t.privacyText3} <a href="#" style={{ color: '#0369a1', textDecoration: 'underline' }}>privacy</a> & 
                    <a href="#" style={{ color: '#0369a1', textDecoration: 'underline', marginLeft: '0.25rem' }}>terms</a>.
                  </p>
                </div>
                
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  cursor: 'pointer',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s'
                }}>
                  <input 
                    type="checkbox" 
                    checked={formData.privacyAgreed}
                    onChange={(e) => handleInputChange('privacyAgreed', e.target.checked)}
                    required
                    style={{ 
                      marginRight: '0.75rem', 
                      marginTop: '2px',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <span style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {t.privacyAgree}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ 
                    fontSize: '1.125rem', 
                    padding: '1rem 3rem',
                    minWidth: '200px'
                  }}
                  disabled={!formData.privacyAgreed}
                >
                  <FileText size={20} style={{ marginRight: '8px' }} />
                  {t.reportBtn}
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

const DashboardPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Overzicht van gemelde leegstand
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--accent-primary-light)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                <Building size={20} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div>
                <h3 style={{ margin: '0', color: 'var(--text-primary)', fontWeight: '600' }}>Totaal Meldingen</h3>
                <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>24</p>
              </div>
            </div>
          </div>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: '#d1fae5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                <CheckCircle size={20} style={{ color: '#10b981' }} />
              </div>
              <div>
                <h3 style={{ margin: '0', color: 'var(--text-primary)', fontWeight: '600' }}>Afgehandeld</h3>
                <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>18</p>
              </div>
            </div>
          </div>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: '#fef3c7', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                <Clock size={20} style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <h3 style={{ margin: '0', color: 'var(--text-primary)', fontWeight: '600' }}>In Behandeling</h3>
                <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>6</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)', fontWeight: '600' }}>Recente Meldingen</h2>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--bg-tertiary)' }}>
              <div>
                <p style={{ margin: '0', fontWeight: '500', color: 'var(--text-primary)' }}>Hoofdstraat 12</p>
                <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Gemeente X</p>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '500' }}>
                In behandeling
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0' }}>
              <div>
                <p style={{ margin: '0', fontWeight: '500', color: 'var(--text-primary)' }}>Kerkstraat 5</p>
                <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Gemeente Y</p>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '500' }}>
                Afgehandeld
              </span>
            </div>
          </div>
        </div>
      </div>
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
                    <p style={{ margin: '0', color: 'var(--text-secondary)' }}>noemrawsingh@gmail.com</p>
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
                    <p style={{ margin: '0', color: 'var(--text-secondary)' }}>+31 6 41375900</p>
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

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-brand">
              <div className="logo">
                <Home size={16} />
              </div>
              Leegstandmeldpunt
            </div>
            <p className="footer-description">
              Meld leegstand en verdien tot €100! Wij maken leegstaand vastgoed zichtbaar 
              en activeren het voor bewoning. Samen lossen we het woningtekort op.
            </p>
          </div>
          
          <div className="footer-links">
            <h3>Snelle Links</h3>
            <ul>
              <li><Link to="/melden">Leegstand Melden</Link></li>
              <li><Link to="/over-ons">Over Ons</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Diensten</h3>
            <ul>
              <li><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} /> Juridische Expertise</span></li>
              <li><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16} /> Fiscale Kennis</span></li>
              <li><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} /> Vastgoedbeheer</span></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Leegstandmeldpunt. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}

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
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/over-ons" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profiel" element={<ProfilePage />} />
                  <Route path="/portaal" element={<PortaalPage />} />
                </Routes>
              </main>
              <Footer />
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

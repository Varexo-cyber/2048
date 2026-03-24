import { useLanguage } from '../contexts/LanguageContext'
import { Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'nl', name: 'NL', flag: '🇳🇱' },
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'de', name: 'DE', flag: '🇩🇪' }
  ]

  return (
    <div className="language-switcher">
      <div className="language-dropdown">
        <button className="language-button">
          <Globe size={16} style={{ marginRight: '6px' }} />
          {languages.find(lang => lang.code === language)?.flag} {languages.find(lang => lang.code === language)?.name}
          <svg width={12} height={12} style={{ marginLeft: '6px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="language-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher

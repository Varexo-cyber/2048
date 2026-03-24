import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        color: 'var(--text-primary)'
      }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  )
}

export default ThemeToggle

import { useEffect } from 'react'
import { CheckCircle, AlertTriangle, X, Info } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  onClose: () => void
  duration?: number
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} />
      case 'error':
        return <AlertTriangle size={24} />
      case 'warning':
        return <AlertTriangle size={24} />
      case 'info':
        return <Info size={24} />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          shadow: '0 10px 25px rgba(72, 187, 120, 0.3)'
        }
      case 'error':
        return {
          bg: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
          shadow: '0 10px 25px rgba(245, 101, 101, 0.3)'
        }
      case 'warning':
        return {
          bg: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
          shadow: '0 10px 25px rgba(237, 137, 54, 0.3)'
        }
      case 'info':
        return {
          bg: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
          shadow: '0 10px 25px rgba(66, 153, 225, 0.3)'
        }
    }
  }

  const colors = getColors()

  return (
    <div
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 10000,
        background: colors.bg,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: colors.shadow,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        minWidth: '300px',
        maxWidth: '500px',
        animation: 'slideIn 0.3s ease-out',
        fontWeight: '500',
        fontSize: '1rem'
      }}
    >
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(400px);
              opacity: 0;
            }
          }
        `}
      </style>
      
      <div style={{ flexShrink: 0 }}>
        {getIcon()}
      </div>
      
      <div style={{ flex: 1 }}>
        {message}
      </div>
      
      <button
        onClick={onClose}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '6px',
          padding: '0.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          color: 'white'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Toast

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  username: string
  email: string
  phone: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
  updateProfile: (email: string, phone: string) => void
  changePassword: (oldPassword: string, newPassword: string) => boolean
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('leegstandsloket_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    // Demo credentials - in production this would be an API call
    if (username === 'admin' && password === 'admin123') {
      const adminUser: User = {
        username: 'admin',
        email: 'admin@leegstandsloket.nl',
        phone: '020 123 4567',
        role: 'admin'
      }
      setUser(adminUser)
      localStorage.setItem('leegstandsloket_user', JSON.stringify(adminUser))
      return true
    }
    
    if (username === 'demo' && password === 'demo123') {
      const demoUser: User = {
        username: 'demo',
        email: 'demo@example.nl',
        phone: '020 987 6543',
        role: 'user'
      }
      setUser(demoUser)
      localStorage.setItem('leegstandsloket_user', JSON.stringify(demoUser))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('leegstandsloket_user')
  }

  const updateProfile = (email: string, phone: string) => {
    if (user) {
      const updatedUser = { ...user, email, phone }
      setUser(updatedUser)
      localStorage.setItem('leegstandsloket_user', JSON.stringify(updatedUser))
    }
  }

  const changePassword = (oldPassword: string, _newPassword: string): boolean => {
    // Demo implementation - in production this would be an API call
    if (oldPassword === 'admin123' || oldPassword === 'demo123') {
      // Password changed successfully (in real app, update backend)
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

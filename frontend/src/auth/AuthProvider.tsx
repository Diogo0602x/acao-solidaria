import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'

interface AuthContextProps {
  isLoggedIn: boolean
  user: any
  login: (userData: any, token: string) => void
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setIsLoggedIn(true)
    } else {
      setUser(null)
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = (userData: any, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }

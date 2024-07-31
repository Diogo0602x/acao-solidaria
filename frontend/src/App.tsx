import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Home } from '@/modules/Home/Home'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SignUp } from '@/modules/users/SignUp/SignUp'
import { Login } from '@/modules/users/Login/Login'
import { Profile } from '@/modules/users/Profile/Profile'
import { AuthProvider } from '@/auth/AuthProvider'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

const MainContent: React.FC = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <main
      className={`flex-grow ${isHome ? 'bg-background-default' : 'bg-white'}`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/*" element={<Profile />}>
          <Route path="" element={<div>Profile Content</div>} />
          <Route
            path="fundraisings-created"
            element={<div>Fundraisings Created Content</div>}
          />
          <Route
            path="fundraisings-bought"
            element={<div>Fundraisings Bought Content</div>}
          />
        </Route>
      </Routes>
    </main>
  )
}

export { App }

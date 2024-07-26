import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Home } from '@/pages/Home/Home'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SignUp } from '@/pages/SignUp/SignUp'
import { Login } from '@/pages/Login/Login'

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
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
      </Routes>
    </main>
  )
}

export { App }

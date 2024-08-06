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
import { CreateFundraising } from '@/modules/fundraising/create-fundraising/CreateFundraising'
import { FundraisingsCreated } from '@/modules/fundraising/fundraisings-created/FundraisingsCreated'
import { FundraisingsBought } from '@/modules/fundraising/fundraisings-bought/FundraisingsBought'
import { ProfileLayout } from '@/modules/users/Profile/components/ProfileLayout'

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
        <Route path="/profile/*" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route
            path="fundraisings-created"
            element={<FundraisingsCreated />}
          />
          <Route path="fundraisings-bought" element={<FundraisingsBought />} />
          <Route path="create-fundraising" element={<CreateFundraising />} />
        </Route>
      </Routes>
    </main>
  )
}

export { App }

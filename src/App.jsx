import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from "./components/auth/LoginForm"
import Unauthorized from './components/error/401'
import PageNotFound from './components/error/404'
import Dashboard from './components/dashboard/Dashboard'
import Analytics from './components/analytics/Analytics'

import MapPage from './pages/MapPage'

import Families from './components/families/Families'

import Members from './components/members/Members'
import { AuthProvider } from './components/auth/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoutes'
import Loading from './components/loading/Loading'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element="" />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/families" element={<Families />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/members" element={<Members />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App

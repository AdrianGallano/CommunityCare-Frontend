import { Route, Routes } from 'react-router-dom'
import './App.css'
import Unauthorized from './components/error/401'
import PageNotFound from './components/error/404'
import Dashboard from './components/dashboard/Dashboard'
import Analytics from './components/analytics/Analytics'

import LoginPage from './pages/LoginPage'
import MapPage from './pages/MapPage'
import FamilyPage from './pages/FamilyPage'

import Members from './components/members/Members'
import { AuthProvider } from './components/auth/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoutes'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element="" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/families" element={<FamilyPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/members" element={<Members />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App

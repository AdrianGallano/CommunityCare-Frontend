import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from "./components/auth/LoginForm"
import PageNotFound from './components/error/404'
import Dashboard from './components/dashboard/Dashboard'
import Analytics from './components/analytics/Analytics'

import MapPage from './pages/MapPage' 

import Families from './components/families/Families'

import Members from './components/members/Members'


function App() {

  return (
    <Routes>
      <Route exact path="/" element="" />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/families" element={<Families />} />
      <Route path="/members" element={<Members />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App

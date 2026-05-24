import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AnalyzerPage from './pages/AnalyzerPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analyze" element={<AnalyzerPage />} />
    </Routes>
  )
}
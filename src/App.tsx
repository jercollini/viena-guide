import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Places from './pages/Places'
import Restaurants from './pages/Restaurants'
import Transport from './pages/Transport'
import Phrases from './pages/Phrases'
import Emergency from './pages/Emergency'
import MapPage from './pages/MapPage'
import Itinerary from './pages/Itinerary'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<Itinerary />} />
        <Route path="/lugares" element={<Places />} />
        <Route path="/restaurantes" element={<Restaurants />} />
        <Route path="/transporte" element={<Transport />} />
        <Route path="/frases" element={<Phrases />} />
        <Route path="/emergencias" element={<Emergency />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}

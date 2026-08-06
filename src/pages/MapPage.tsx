import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { places } from '../data/places'
import { restaurants } from '../data/restaurants'

// Iconos con emoji para no depender de imágenes externas.
function emojiIcon(emoji: string) {
  return L.divIcon({
    className: 'emoji-marker',
    html: `<div style="font-size:26px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">${emoji}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
  })
}

const placeIcon = emojiIcon('📍')
const foodIcon = emojiIcon('🍽️')

const center: [number, number] = [48.2082, 16.3738]

export default function MapPage() {
  return (
    <div>
      <p className="page-intro">
        📍 lugares para visitar · 🍽️ sitios para comer. Toca un icono para ver
        el nombre.
      </p>
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {places.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={placeIcon}>
              <Popup>
                <strong>{p.name}</strong>
                <br />
                {p.category}
              </Popup>
            </Marker>
          ))}
          {restaurants.map((r) => (
            <Marker key={r.id} position={[r.lat, r.lng]} icon={foodIcon}>
              <Popup>
                <strong>{r.name}</strong>
                <br />
                {r.cuisine}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

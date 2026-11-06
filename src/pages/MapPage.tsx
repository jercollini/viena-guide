import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { places } from '../data/places'
import { restaurants } from '../data/restaurants'

// Marcadores en forma de gota, coloreados desde el tema (CSS).
function pinIcon(kind: 'place' | 'food') {
  return L.divIcon({
    className: 'map-pin map-pin--' + kind,
    html: '<span></span>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  })
}

const placeIcon = pinIcon('place')
const foodIcon = pinIcon('food')

// Carto exige clave de API desde hace poco; Esri sirve teselas sin clave.
// El mapa oscuro se usa con el tema "neon" y reacciona al cambio de tema.
function useTileStyle() {
  const read = () =>
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'neon'
      ? 'Canvas/World_Dark_Gray_Base'
      : 'World_Street_Map'
  const [style, setStyle] = useState(read)
  useEffect(() => {
    const obs = new MutationObserver(() => setStyle(read()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  return style
}

const center: [number, number] = [48.2082, 16.3738]

export default function MapPage() {
  const tileStyle = useTileStyle()
  return (
    <div>
      <p className="page-intro">
        <span className="legend legend--place">lugares para visitar</span>
        <span className="legend legend--food">sitios para comer</span>
        Toca un marcador para ver el nombre.
      </p>
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            key={tileStyle}
            attribution="Tiles &copy; Esri"
            url={`https://server.arcgisonline.com/ArcGIS/rest/services/${tileStyle}/MapServer/tile/{z}/{y}/{x}`}
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

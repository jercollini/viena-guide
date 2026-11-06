import { guide } from '../guide/config'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { places } from '../guide/places'
import { dishes } from '../guide/food'

// Only dishes tied to a famous spot get a marker.
const foodSpots = dishes.flatMap((d) => (d.spot ? [{ dish: d, spot: d.spot }] : []))

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

// Frame every marker (day trips included) instead of a fixed center/zoom.
const points: [number, number][] = [...places, ...foodSpots.map((f) => f.spot)].map((x) => [x.lat, x.lng])
const bounds = points.length
  ? L.latLngBounds(points)
  : L.latLngBounds([[guide.coords.lat, guide.coords.lng]])

export default function MapPage() {
  const tileStyle = useTileStyle()
  return (
    <div>
      <p className="page-intro">
        <span className="legend legend--place">lugares para visitar</span>
        <span className="legend legend--food">dónde probar la comida típica</span>
        Toca un marcador para ver el nombre.
      </p>
      <div className="map-container">
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [28, 28], maxZoom: guide.mapZoom + 2 }}
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
          {foodSpots.map(({ dish, spot }) => (
            <Marker key={dish.id} position={[spot.lat, spot.lng]} icon={foodIcon}>
              <Popup>
                <strong>{spot.name}</strong>
                <br />
                {dish.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

import { useState } from 'react'

// Muestra la foto; si falla la carga, deja un fondo con degradado y el nombre.
export default function PlaceImage({ place }: { place: { name: string; image: string } }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="card__img card__img--fallback">
        <span>{place.name}</span>
      </div>
    )
  }

  return (
    <img
      className="card__img"
      src={place.image}
      alt={place.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

import { useEffect, useState } from 'react'
import { guide } from '../guide/config'

interface WeatherState {
  temp: number
  code: number
}

// Open-Meteo is free and needs no API key.
const URL =
  'https://api.open-meteo.com/v1/forecast' +
  `?latitude=${guide.coords.lat}&longitude=${guide.coords.lng}` +
  `&current=temperature_2m,weather_code&timezone=${encodeURIComponent(guide.timezone)}`

function describe(code: number): { icon: string; text: string } {
  if (code === 0) return { icon: '☀️', text: 'Despejado' }
  if (code <= 2) return { icon: '🌤️', text: 'Poco nuboso' }
  if (code === 3) return { icon: '☁️', text: 'Nublado' }
  if (code <= 48) return { icon: '🌫️', text: 'Niebla' }
  if (code <= 67) return { icon: '🌧️', text: 'Lluvia' }
  if (code <= 77) return { icon: '🌨️', text: 'Nieve' }
  if (code <= 82) return { icon: '🌦️', text: 'Chubascos' }
  if (code <= 99) return { icon: '⛈️', text: 'Tormenta' }
  return { icon: '🌡️', text: 'Tiempo' }
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherState | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    fetch(URL)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
        })
      })
      .catch(() => active && setError(true))
    return () => {
      active = false
    }
  }, [])

  if (error) {
    return (
      <div className="weather weather--muted">
        <span className="weather__icon" aria-hidden="true">🌡️</span>
        <div>
          <div className="weather__desc">Tiempo en {guide.city}</div>
          <div>No disponible ahora mismo</div>
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="weather weather--muted">
        <span className="weather__icon" aria-hidden="true">⏳</span>
        <div>
          <div className="weather__desc">Cargando el tiempo…</div>
        </div>
      </div>
    )
  }

  const { icon, text } = describe(weather.code)
  return (
    <div className="weather">
      <span className="weather__icon" aria-hidden="true">{icon}</span>
      <div>
        <div className="weather__temp">{weather.temp}°C</div>
        <div className="weather__desc">{text} · {guide.city} ahora</div>
      </div>
    </div>
  )
}

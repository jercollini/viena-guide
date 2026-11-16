import { useEffect, useState } from 'react'
import { guide } from '../guide/config'
import { places } from '../guide/places'
import { itinerary } from '../guide/itinerary'
import type { Design } from '../types'

export const DESIGNS: Design[] = ['app', 'revista', 'ruta']

// The guide's own design, or ?design=<id> to preview another one.
export function resolveDesign(search = typeof location === 'undefined' ? '' : location.search): Design {
  const asked = new URLSearchParams(search).get('design')
  if (asked && (DESIGNS as string[]).includes(asked)) return asked as Design
  return guide.design ?? 'app'
}

// Fonts per design, loaded only when that design is in use.
export const DESIGN_FONTS: Partial<Record<Design, string>> = {
  revista:
    'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400&family=Instrument+Sans:wght@400;500;600&display=swap',
  ruta: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap',
}

export const mapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

export const placeById = new Map(places.map((p) => [p.id, p]))

/** First place photo of each day, used as the day's picture. */
export const dayImage = (day: number) => {
  const stop = itinerary.find((d) => d.day === day)?.stops.find((s) => s.placeId && placeById.has(s.placeId))
  return stop ? placeById.get(stop.placeId!)!.image : guide.heroImage
}

export const pad = (n: number) => String(n).padStart(2, '0')

/** Current time in the guide's city, refreshed every 30 s. */
export function useLocalTime() {
  const format = () =>
    new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: guide.timezone }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return time
}

export const SECTIONS = [
  { to: '/plan', label: 'Plan día a día', short: 'Plan', icon: 'calendar' },
  { to: '/lugares', label: 'Lugares imprescindibles', short: 'Lugares', icon: 'places' },
  { to: '/comida', label: 'Comida típica', short: 'Comer', icon: 'food' },
  { to: '/transporte', label: 'Cómo moverse', short: 'Moverse', icon: 'transport' },
  { to: '/frases', label: 'Frases útiles', short: 'Frases', icon: 'phrases' },
  { to: '/mapa', label: 'Mapa', short: 'Mapa', icon: 'map' },
  { to: '/emergencias', label: 'Emergencias', short: 'SOS', icon: 'sos' },
] as const

export const titleFor = (path: string) => SECTIONS.find((s) => s.to === path)?.label

/** Scroll to the top on route change, or to the #anchor in ?go=<id>. */
export function useScrollOnRoute(pathname: string, search: string) {
  useEffect(() => {
    const id = new URLSearchParams(search).get('go')
    const el = id ? document.getElementById(id) : null
    if (el) el.scrollIntoView({ block: 'start' })
    else window.scrollTo(0, 0)
  }, [pathname, search])
}

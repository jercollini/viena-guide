import type { GuideConfig } from '../types'
import { places } from './places'

export const guide: GuideConfig = {
  brand: 'Viajes J.R. Collini',
  city: 'Viena',
  country: 'Austria',
  days: 4,
  repo: 'viena-guide',
  tagline: 'Vuestra guía, sencilla y a mano.',
  heroImage: places.find((p) => p.id === 'schonbrunn')!.image,
  coords: { lat: 48.2082, lng: 16.3738 },
  timezone: 'Europe/Vienna',
  mapZoom: 13,
  language: 'alemán',
  intro: {
    itinerary:
      'Una propuesta día a día para aprovechar el viaje sin prisas. Cambiad el orden según el tiempo y las ganas.',
    places:
      'Los lugares más bonitos e importantes de Viena. Toca «Cómo llegar» para abrir el mapa con la ruta.',
    restaurants:
      'Sitios para comer cocina vienesa y cafés clásicos. Conviene reservar en los más conocidos.',
    transport: 'Cómo moverse por Viena de forma sencilla y cómoda.',
    phrases:
      'Frases básicas en alemán con una pronunciación aproximada (leedla como si fuera español).',
    emergency: 'Teléfonos importantes. Toca «Llamar» para marcar directamente.',
  },
}

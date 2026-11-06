// Shared data model. Everything city-specific lives in src/guide/ and follows
// these types, so a new guide only needs new data files.

export interface GuideConfig {
  /** Brand shown in the header on the home page. */
  brand: string
  /** City name as shown in the UI (Spanish), e.g. "Lisboa". */
  city: string
  country: string
  /** Trip length in days; drives the hero eyebrow and the itinerary. */
  days: number
  /** GitHub repository name; used as the Vite base path for GitHub Pages. */
  repo: string
  /** Short line under the city name in the hero. */
  tagline: string
  /** Hero photo URL (ideally Wikimedia, ~1000px wide). */
  heroImage: string
  coords: { lat: number; lng: number }
  /** IANA timezone, e.g. "Europe/Lisbon" (used by the weather widget). */
  timezone: string
  mapZoom: number
  /** Local language name in Spanish, e.g. "portugués". */
  language: string
  /** Intro paragraph for each section. */
  intro: {
    itinerary: string
    places: string
    food: string
    transport: string
    phrases: string
    emergency: string
  }
}

export interface Place {
  id: string
  name: string
  /** Free text in Spanish: Monumento, Palacio, Museo, Mirador, Barrio… */
  category: string
  description: string
  address: string
  lat: number
  lng: number
  image: string
  tip?: string
}

/** A long-standing place known for a dish. Optional: the dish is the point. */
export interface FoodSpot {
  name: string
  area: string
  lat: number
  lng: number
}

export interface Dish {
  id: string
  /** Name as you'd find it on a menu, in the local language. */
  name: string
  /** Short Spanish gloss, e.g. "escalope empanado". */
  nameEs?: string
  /** Plato, Dulce, Bebida, Para picar… */
  kind: string
  description: string
  /** Wikimedia photo of the dish (from scripts/wiki-image.mjs). */
  image?: string
  /** Timeless advice: when/how it's eaten, how to order it. */
  tip?: string
  spot?: FoodSpot
}

export interface TransportItem {
  title: string
  body: string
}

export interface Phrase {
  /** Spanish meaning. */
  es: string
  /** Phrase in the local language. */
  local: string
  /** Approximate pronunciation for a Spanish speaker (not IPA). */
  pron: string
}

export interface PhraseGroup {
  group: string
  items: Phrase[]
}

export interface EmergencyContact {
  label: string
  value: string
  phone?: string
  info?: string
}

export interface ItineraryStop {
  /** "Mañana", "Mediodía", "Tarde", "Noche" or a time like "10:00". */
  time: string
  text: string
  /** Optional link to a Place id to show its photo and map link. */
  placeId?: string
}

export interface ItineraryDay {
  day: number
  title: string
  summary?: string
  stops: ItineraryStop[]
}

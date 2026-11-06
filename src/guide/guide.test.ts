// Data sanity checks: they catch the usual mistakes when a new guide is generated.
import { describe, it, expect } from 'vitest'
import { guide } from './config'
import { places } from './places'
import { restaurants } from './restaurants'
import { itinerary } from './itinerary'
import { phraseGroups } from './phrases'
import { emergencyContacts } from './emergency'
import { transport } from './transport'

// ~45 km around the city center; day trips (e.g. Sintra from Lisbon) fit inside.
const MAX_DEG = 0.45
const near = (lat: number, lng: number) =>
  Math.abs(lat - guide.coords.lat) < MAX_DEG && Math.abs(lng - guide.coords.lng) < MAX_DEG

describe('guide data', () => {
  it('has a complete config', () => {
    expect(guide.city).toBeTruthy()
    expect(guide.repo).toMatch(/^[a-z0-9-]+$/)
    expect(guide.days).toBeGreaterThan(0)
    expect(guide.heroImage).toMatch(/^https:\/\//)
  })

  it('has one itinerary entry per trip day, numbered in order', () => {
    expect(itinerary.map((d) => d.day)).toEqual(
      Array.from({ length: guide.days }, (_, i) => i + 1),
    )
  })

  it('only links itinerary stops to existing places', () => {
    const ids = new Set(places.map((p) => p.id))
    for (const day of itinerary)
      for (const stop of day.stops)
        if (stop.placeId) expect(ids, `unknown placeId ${stop.placeId}`).toContain(stop.placeId)
  })

  it('uses unique ids', () => {
    for (const list of [places, restaurants]) {
      const ids = list.map((x) => x.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('places and restaurants are near the city and have https images', () => {
    for (const p of places) {
      expect(near(p.lat, p.lng), `${p.name} is far from ${guide.city}`).toBe(true)
      expect(p.image).toMatch(/^https:\/\//)
    }
    for (const r of restaurants)
      expect(near(r.lat, r.lng), `${r.name} is far from ${guide.city}`).toBe(true)
  })

  it('has content in every section', () => {
    expect(places.length).toBeGreaterThanOrEqual(6)
    expect(restaurants.length).toBeGreaterThanOrEqual(5)
    expect(transport.length).toBeGreaterThanOrEqual(3)
    expect(phraseGroups.flatMap((g) => g.items).length).toBeGreaterThanOrEqual(10)
    expect(emergencyContacts.some((c) => c.phone === '112')).toBe(true)
  })
})

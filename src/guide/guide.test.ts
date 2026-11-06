// Data sanity checks: they catch the usual mistakes when a new guide is generated.
import { describe, it, expect } from 'vitest'
import { guide } from './config'
import { places } from './places'
import { dishes } from './food'
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
    for (const list of [places, dishes]) {
      const ids = list.map((x) => x.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('places and food spots are near the city and have https images', () => {
    for (const p of places) {
      expect(near(p.lat, p.lng), `${p.name} is far from ${guide.city}`).toBe(true)
      expect(p.image).toMatch(/^https:\/\//)
    }
    for (const d of dishes) {
      if (d.image) expect(d.image).toMatch(/^https:\/\//)
      if (d.spot)
        expect(near(d.spot.lat, d.spot.lng), `${d.spot.name} is far from ${guide.city}`).toBe(true)
    }
  })

  it('has content in every section', () => {
    expect(places.length).toBeGreaterThanOrEqual(6)
    expect(dishes.length).toBeGreaterThanOrEqual(6)
    expect(transport.length).toBeGreaterThanOrEqual(3)
    expect(phraseGroups.flatMap((g) => g.items).length).toBeGreaterThanOrEqual(10)
    expect(emergencyContacts.some((c) => c.phone === '112')).toBe(true)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// react-leaflet and leaflet do not work in jsdom: replace them with stubs.
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div data-testid="tiles" />,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('leaflet', () => ({
  default: { divIcon: () => ({}), latLngBounds: () => ({}) },
}))

import MapPage from './MapPage'
import { places } from '../guide/places'
import { dishes } from '../guide/food'

describe('MapPage', () => {
  it('renders the map with a marker per place and food spot', () => {
    render(<MapPage />)
    expect(screen.getByTestId('map')).toBeInTheDocument()
    expect(screen.getAllByTestId('marker')).toHaveLength(
      places.length + dishes.filter((d) => d.spot).length,
    )
  })

  it('shows the page legend', () => {
    render(<MapPage />)
    expect(screen.getByText(/lugares para visitar/)).toBeInTheDocument()
  })
})
